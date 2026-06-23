import type { ReactNode } from "react";

// ── Content shape types (used by content/home.tsx and home section components) ──

export type Platform = {
  name: string;
  color: string;
  icon: ReactNode;
};

export type Step = {
  label: string;
  title: string;
  description: string;
  gradient?: "primary" | "secondary" | "green";
};

export type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
  tag?: string;
  wide?: boolean;
  hero?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type PricingTeaser = {
  name: string;
  price: string;
  suffix: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
};

export type PresetKey =
  | "custom"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "telegram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "google-maps";

export type DevicePlatform = "ios" | "android" | "desktop" | "unknown";

export type LinkRecord = {
  id: string;
  slug: string;
  title: string;
  preset: PresetKey;
  status: "active" | "inactive";
  isActive: boolean;
  expiresAt?: string | null;
  password?: string | null;
  abTestUrl?: string | null;
  iosDeepLink?: string;
  iosStoreUrl?: string;
  androidDeepLink?: string;
  androidStoreUrl?: string;
  desktopUrl?: string;
  campaign?: string;
  /* UTM parameters */
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  workspaceId?: string | null;
  createdByUserId?: string | null;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown> | null;
};

export type CreateLinkInput = {
  destinationUrl?: string;
  title?: string;
  preset?: PresetKey;
  slug?: string;
  iosDeepLink?: string;
  iosStoreUrl?: string;
  androidDeepLink?: string;
  androidStoreUrl?: string;
  desktopUrl?: string;
  campaign?: string;
  password?: string;
  expiresAt?: string;
  abTestUrl?: string;
  /* UTM parameters */
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export type ResolvedDestination = {
  platform: DevicePlatform;
  destination: string;
  reason: "deep-link" | "store-fallback" | "web-fallback" | "generic-fallback";
};

/** Used by HeroGeneratorPanel to detect and display a platform badge in the UI */
export type DetectedPlatform = {
  name: string;
  color: string;
  hint: string;
};

/**
 * Adapter that connects the public-facing HeroGeneratorPanel to the real backend.
 * Pass this from a Server Component (or page) that has access to auth state and
 * the link creation API.
 */
export type LinkGeneratorAdapter = {
  /** Called when the user clicks "Generate" with a valid URL */
  generate?: (url: string) => Promise<void> | void;
  /** Maps a raw URL to a DetectedPlatform for the live badge preview */
  detectPlatform?: (url: string) => DetectedPlatform | null;
  /** Opens the advanced compose modal/flow */
  openCompose?: (url: string) => void;
  /** Called when auth is required (e.g. open login modal) */
  requireAuth?: () => void;
};
