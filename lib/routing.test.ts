import { describe, expect, it } from "vitest";

import { detectPlatform, resolveDestination } from "./routing";
import type { LinkRecord } from "./types";

const baseLink: LinkRecord = {
  id: "link_1",
  userId: "user_1",
  domainId: null,
  slug: "summer",
  title: "Summer",
  description: null,
  preset: "custom",
  status: "active",
  isActive: true,
  destinationUrl: "https://example.com",
  iosDeepLink: "example://open",
  iosStoreUrl: "https://apps.apple.com/app/example",
  androidDeepLink: "intent://example#Intent;scheme=https;end;",
  androidStoreUrl: "https://play.google.com/store/apps/details?id=example",
  desktopUrl: "https://example.com",
  fallbackUrl: "https://fallback.example.com",
  passwordHash: null,
  expiresAt: null,
  abTestUrl: null,
  abTestWeight: 50,
  campaign: null,
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmTerm: null,
  utmContent: null,
  routingConfig: {},
  metadata: {},
  tags: [],
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
};

describe("routing", () => {
  it("detects broad platform classes", () => {
    expect(detectPlatform("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe("ios");
    expect(detectPlatform("Mozilla/5.0 (Linux; Android 14; Pixel)")).toBe("android");
    expect(detectPlatform("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)")).toBe("desktop");
  });

  it("prefers native destinations on mobile and web fallback on desktop", () => {
    expect(resolveDestination(baseLink, "iPhone")?.destination).toBe("example://open");
    expect(resolveDestination(baseLink, "Android")?.destination).toBe("intent://example#Intent;scheme=https;end;");
    expect(resolveDestination(baseLink, "Macintosh")?.destination).toBe("https://example.com");
  });

  it("uses the selected A/B URL as the resolved destination", () => {
    expect(resolveDestination(baseLink, "Macintosh", "https://variant.example.com")?.destination).toBe("https://variant.example.com");
  });
});
