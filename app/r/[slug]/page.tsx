import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { hashIp, verifyPassword } from "@/lib/crypto";
import { findActiveLinkForRedirect } from "@/lib/links";
import { detectPlatform, isInAppWebView, resolveDestination } from "@/lib/routing";
import { createTrackingClient } from "@/lib/supabase/tracking";
import { detectBrowser, detectOS, detectReferrer, deviceLabel, isBot, isPrefetch } from "@/lib/request-insights";

export const dynamic = "force-dynamic";

type RedirectSearchParams = {
  pw?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  [key: string]: string | string[] | undefined;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function utmEntries(searchParams: RedirectSearchParams) {
  const entries: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = firstParam(searchParams[key]);
    if (value) entries[key] = value;
  }
  return entries;
}

function appendUtm(rawUrl: string, stored: Record<string, string | null>, incoming: Record<string, string>) {
  const merged: Record<string, string> = {};
  for (const [key, value] of Object.entries({ ...stored, ...incoming })) {
    if (value) {
      merged[key] = value;
    }
  }
  if (!Object.keys(merged).length) return rawUrl;

  try {
    const url = new URL(rawUrl);
    for (const [key, value] of Object.entries(merged)) {
      url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}

function pickVariant(abTestUrl: string | null, abTestWeight: number): { variant: "a" | "b" | null; variantUrl: string | null } {
  if (!abTestUrl) return { variant: null, variantUrl: null };
  const useVariantB = Math.random() * 100 < abTestWeight;
  return { variant: useVariantB ? "b" : "a", variantUrl: useVariantB ? abTestUrl : null };
}

function minuteBucket(date = new Date()) {
  date.setSeconds(0, 0);
  return date.toISOString();
}

function PasswordGate({
  slug,
  title,
  wrongPassword,
  incomingUtm,
}: {
  slug: string;
  title: string;
  wrongPassword: boolean;
  incomingUtm: Record<string, string>;
}) {
  return (
    <main className="section">
      <div className="card" style={{ maxWidth: 420, margin: "12vh auto 0", textAlign: "center" }}>
        <div className="eyebrow">Protected link</div>
        <h1 className="dashboard-page__title" style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}>
          {title || "Enter password"}
        </h1>
        <p className="dashboard-page__summary">This destination is private. Enter the password to continue.</p>
        <form action={`/r/${slug}`} method="GET" style={{ display: "grid", gap: 12, marginTop: 22 }}>
          {Object.entries(incomingUtm).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          <input
            name="pw"
            type="password"
            required
            autoFocus
            placeholder="Password"
            style={{
              border: wrongPassword ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 16px",
              font: "inherit",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
          {wrongPassword ? <p style={{ margin: 0, color: "#ef4444", fontSize: 13 }}>Incorrect password. Try again.</p> : null}
          <button className="button button--primary" type="submit">
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}

export default async function DeepLinkRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<RedirectSearchParams>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const headersList = await headers();
  const hostname = headersList.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const record = await findActiveLinkForRedirect(slug, hostname);

  if (!record) redirect("/missing");
  if (record.expiresAt && new Date(record.expiresAt) < new Date()) redirect("/missing");

  const incomingUtm = utmEntries(query);
  const providedPassword = firstParam(query.pw);
  if (record.passwordHash) {
    if (!providedPassword || !(await verifyPassword(providedPassword, record.passwordHash))) {
      return <PasswordGate slug={record.slug} title={record.title} wrongPassword={Boolean(providedPassword)} incomingUtm={incomingUtm} />;
    }
  }

  const userAgent = headersList.get("user-agent") ?? "";
  const platform = detectPlatform(userAgent);
  const referer = headersList.get("referer");
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || headersList.get("x-real-ip") || "unknown";
  const { variant, variantUrl } = pickVariant(record.abTestUrl, record.abTestWeight);
  const destination = resolveDestination(record, userAgent, variantUrl);

  if (!destination) redirect("/missing");

  const storedUtm = {
    utm_source: record.utmSource,
    utm_medium: record.utmMedium,
    utm_campaign: record.utmCampaign,
    utm_term: record.utmTerm,
    utm_content: record.utmContent,
  };
  const finalDestination = appendUtm(destination.destination, storedUtm, incomingUtm);
  const prefetch = isPrefetch(headersList);
  const bot = isBot(userAgent);

  if (!bot && !prefetch) {
    after(async () => {
      try {
        const db = createTrackingClient();
        const { error } = await db.from("clicks").insert({
          link_id: record.id,
          dedupe_bucket: minuteBucket(),
          variant,
          device: deviceLabel(platform),
          os: detectOS(userAgent),
          browser: detectBrowser(userAgent),
          referrer: detectReferrer(userAgent, referer),
          country: headersList.get("cf-ipcountry"),
          ip_hash: await hashIp(ip),
          is_bot: false,
          is_prefetch: false,
          utm_source: incomingUtm.utm_source ?? record.utmSource,
          utm_medium: incomingUtm.utm_medium ?? record.utmMedium,
          utm_campaign: incomingUtm.utm_campaign ?? record.utmCampaign,
          utm_term: incomingUtm.utm_term ?? record.utmTerm,
          utm_content: incomingUtm.utm_content ?? record.utmContent,
        });

        if (error && error.code !== "23505") {
          console.error("[click-tracking]", error.message);
        }
      } catch (error) {
        console.error("[click-tracking]", error);
      }
    });
  }

  const shouldServeInterstitial =
    (platform === "ios" || platform === "android") &&
    destination.reason === "deep-link" &&
    isInAppWebView(userAgent, headersList.get("x-requested-with"), referer);

  if (!shouldServeInterstitial) {
    redirect(finalDestination);
  }

  const fallback = appendUtm(record.iosStoreUrl || record.androidStoreUrl || record.fallbackUrl || record.desktopUrl || record.destinationUrl || finalDestination, storedUtm, incomingUtm);
  const inlineScript = `(function(){var target=${JSON.stringify(finalDestination)};var fallback=${JSON.stringify(fallback)};var started=Date.now();window.location.href=target;setTimeout(function(){if(document.hidden||document.webkitHidden)return;if(Date.now()-started<1600)return;window.location.replace(fallback);},1800);}());`;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <main className="section">
        <div className="card" style={{ maxWidth: 560, margin: "12vh auto 0", textAlign: "center" }}>
          <div className="eyebrow">Opening link</div>
          <h1 className="dashboard-page__title" style={{ fontSize: "clamp(2.25rem, 7vw, 4rem)" }}>
            {record.title}
          </h1>
          <p className="dashboard-page__summary">If the app does not open automatically, continue with the fallback link.</p>
          <a className="button button--primary" href={fallback} style={{ marginTop: 18 }}>
            Continue
          </a>
        </div>
      </main>
    </>
  );
}
