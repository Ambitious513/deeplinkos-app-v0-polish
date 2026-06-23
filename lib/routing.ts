import type { DevicePlatform, LinkRecord, ResolvedDestination } from "@/lib/types";

export function detectPlatform(userAgent: string | null): DevicePlatform {
  const agent = (userAgent || "").toLowerCase();

  if (agent.includes("iphone") || agent.includes("ipad") || agent.includes("ipod")) return "ios";
  if (agent.includes("android")) return "android";
  if (agent.includes("windows") || agent.includes("macintosh") || agent.includes("linux")) return "desktop";

  return "unknown";
}

export function isInAppWebView(userAgent: string | null, xRequestedWith: string | null = null, referer: string | null = null) {
  const ua = userAgent || "";
  const xrw = (xRequestedWith || "").toLowerCase();
  const ref = referer || "";

  if (/t\.co|l\.facebook\.com|l\.instagram\.com|lnkd\.in|out\.reddit\.com/i.test(ref)) return true;
  if (xrw && xrw !== "com.android.chrome" && xrw !== "com.sec.android.app.sbrowser") return true;
  if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A|FB_UI|FB_WebView|Messenger|Instagram|musical_ly|TikTok|Twitter|Snapchat|Line\/|MicroMessenger|LinkedInApp|Pinterest|Reddit/i.test(ua)) {
    return true;
  }
  if (/wv\)/i.test(ua) && /Android/i.test(ua)) return true;
  if (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua)) return true;

  return false;
}

export function resolveDestination(record: LinkRecord, userAgent: string | null, variantUrl?: string | null): ResolvedDestination | null {
  const platform = detectPlatform(userAgent);

  if (variantUrl) {
    return { platform, destination: variantUrl, reason: "web-fallback" };
  }

  if (platform === "ios") {
    if (record.iosDeepLink) return { platform, destination: record.iosDeepLink, reason: "deep-link" };
    if (record.iosStoreUrl) return { platform, destination: record.iosStoreUrl, reason: "store-fallback" };
    if (record.desktopUrl || record.fallbackUrl || record.destinationUrl) {
      return { platform, destination: record.desktopUrl || record.fallbackUrl || record.destinationUrl!, reason: "web-fallback" };
    }
  }

  if (platform === "android") {
    if (record.androidDeepLink) return { platform, destination: record.androidDeepLink, reason: "deep-link" };
    if (record.androidStoreUrl) return { platform, destination: record.androidStoreUrl, reason: "store-fallback" };
    if (record.desktopUrl || record.fallbackUrl || record.destinationUrl) {
      return { platform, destination: record.desktopUrl || record.fallbackUrl || record.destinationUrl!, reason: "web-fallback" };
    }
  }

  if (platform === "desktop" && (record.desktopUrl || record.fallbackUrl || record.destinationUrl)) {
    return { platform, destination: record.desktopUrl || record.fallbackUrl || record.destinationUrl!, reason: "web-fallback" };
  }

  const fallback = record.fallbackUrl || record.desktopUrl || record.destinationUrl || record.iosStoreUrl || record.androidStoreUrl || record.iosDeepLink || record.androidDeepLink;
  if (!fallback) return null;

  return { platform, destination: fallback, reason: "generic-fallback" };
}
