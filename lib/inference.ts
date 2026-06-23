import { normalizeSlug } from "./slug";
import type { CreateLinkInput, PresetKey } from "./types";

const presetLabels: Record<PresetKey, string> = {
  custom: "Custom",
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  tiktok: "TikTok",
  youtube: "YouTube",
  twitter: "X",
  "google-maps": "Google Maps",
};

type InferredLink = {
  preset: PresetKey;
  title: string;
  desktopUrl: string;
  slug: string;
  iosDeepLink?: string;
  androidDeepLink?: string;
};

export function normalizeUrl(input: string) {
  const trimmed = input.trim();
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function hostnameFor(url: URL) {
  return url.hostname.replace(/^www\./, "").toLowerCase();
}

export function detectPresetFromUrl(input: string): PresetKey {
  try {
    const parsed = new URL(normalizeUrl(input));
    const hostname = hostnameFor(parsed);
    const path = parsed.pathname.toLowerCase();

    if (hostname.includes("instagram.com")) return "instagram";
    if (hostname.includes("facebook.com") || hostname === "fb.com") return "facebook";
    if (hostname === "wa.me" || hostname.includes("whatsapp.com")) return "whatsapp";
    if (hostname === "t.me" || hostname.includes("telegram")) return "telegram";
    if (hostname.includes("tiktok.com")) return "tiktok";
    if (hostname === "youtu.be" || hostname.includes("youtube.com")) return "youtube";
    if (hostname === "x.com" || hostname.includes("twitter.com")) return "twitter";
    if (hostname.includes("google.") && path.startsWith("/maps")) return "google-maps";
  } catch {
    return "custom";
  }

  return "custom";
}

function slugFromUrl(input: string) {
  try {
    const parsed = new URL(normalizeUrl(input));
    const hostname = hostnameFor(parsed);
    const segments = parsed.pathname.replace(/\/+$/, "").split("/").filter(Boolean);

    if (hostname.includes("youtube.com") && segments[0]?.startsWith("@")) {
      return normalizeSlug(segments[0].slice(1));
    }
    if (hostname === "youtu.be" && segments[0]) return normalizeSlug(segments[0]);
    if (segments[0]?.startsWith("@")) return normalizeSlug(segments[0].slice(1));
    if ((hostname === "wa.me" || hostname === "t.me") && segments[0]) return normalizeSlug(segments[0]);
    if (segments.length) return normalizeSlug(segments[segments.length - 1]);

    return normalizeSlug(hostname.split(".")[0]);
  } catch {
    return "";
  }
}

function toIosScheme(preset: PresetKey, url: URL) {
  const path = url.pathname;

  switch (preset) {
    case "youtube":
      return `vnd.youtube://${url.hostname}${path}${url.search}`;
    case "instagram":
      return `instagram://${url.hostname}${path}${url.search}`;
    case "tiktok":
      return `snssdk1233://${url.hostname}${path}${url.search}`;
    case "twitter": {
      const parts = path.split("/").filter(Boolean);
      if (parts[1] === "status" && parts[2]) return `twitter://status?id=${parts[2]}`;
      if (parts[0]) return `twitter://user?screen_name=${parts[0]}`;
      return `twitter://${url.hostname}${path}${url.search}`;
    }
    case "facebook":
      return `fb://${url.hostname}${path}${url.search}`;
    case "whatsapp": {
      const phone = path.replace(/^\//, "");
      return phone ? `whatsapp://send?phone=${phone}` : undefined;
    }
    case "telegram": {
      const username = path.replace(/^\//, "");
      return username ? `tg://resolve?domain=${username}` : undefined;
    }
    default:
      return url.protocol === "https:" ? `googlechromes://${url.hostname}${path}${url.search}` : `googlechrome://${url.hostname}${path}${url.search}`;
  }
}

function toAndroidIntent(preset: PresetKey, url: URL) {
  const packages: Partial<Record<PresetKey, string>> = {
    youtube: "com.google.android.youtube",
    instagram: "com.instagram.android",
    tiktok: "com.zhiliaoapp.musically",
    twitter: "com.twitter.android",
    facebook: "com.facebook.katana",
    whatsapp: "com.whatsapp",
    telegram: "org.telegram.messenger",
  };

  const pkg = packages[preset] || "com.android.chrome";
  const fallback = encodeURIComponent(url.toString());

  if (preset === "whatsapp") {
    const phone = url.pathname.replace(/^\//, "");
    return phone ? `intent://send?phone=${phone}#Intent;scheme=whatsapp;package=${pkg};S.browser_fallback_url=${fallback};end;` : undefined;
  }

  if (preset === "telegram") {
    const username = url.pathname.replace(/^\//, "");
    return username ? `intent://resolve?domain=${username}#Intent;scheme=tg;package=${pkg};S.browser_fallback_url=${fallback};end;` : undefined;
  }

  return `intent://${url.hostname}${url.pathname}${url.search}#Intent;scheme=https;package=${pkg};S.browser_fallback_url=${fallback};end;`;
}

export function inferLinkFromDestination(input: string): InferredLink {
  const desktopUrl = normalizeUrl(input);
  const preset = detectPresetFromUrl(desktopUrl);

  try {
    const parsed = new URL(desktopUrl);
    return {
      preset,
      title: `${presetLabels[preset]} smart link`,
      slug: slugFromUrl(desktopUrl),
      desktopUrl,
      iosDeepLink: toIosScheme(preset, parsed) ?? desktopUrl,
      androidDeepLink: toAndroidIntent(preset, parsed) ?? desktopUrl,
    };
  } catch {
    return {
      preset,
      title: `${presetLabels[preset]} smart link`,
      slug: normalizeSlug(input),
      desktopUrl,
      iosDeepLink: desktopUrl,
      androidDeepLink: desktopUrl,
    };
  }
}

export function mergeInferredInput(input: CreateLinkInput): CreateLinkInput {
  const inferred = input.destinationUrl ? inferLinkFromDestination(input.destinationUrl) : null;

  return {
    ...input,
    destinationUrl: input.destinationUrl ? normalizeUrl(input.destinationUrl) : undefined,
    preset: input.preset || inferred?.preset || "custom",
    title: input.title?.trim() || inferred?.title || "Custom smart link",
    slug: input.slug || inferred?.slug,
    iosDeepLink: input.iosDeepLink || inferred?.iosDeepLink,
    androidDeepLink: input.androidDeepLink || inferred?.androidDeepLink,
    desktopUrl: input.desktopUrl || inferred?.desktopUrl || input.destinationUrl,
    fallbackUrl: input.fallbackUrl || input.desktopUrl || inferred?.desktopUrl || input.destinationUrl,
  };
}
