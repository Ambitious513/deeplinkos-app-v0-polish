import { describe, expect, it } from "vitest";

import { detectPresetFromUrl, inferLinkFromDestination, normalizeUrl } from "./inference";

describe("link inference", () => {
  it("normalizes web URLs without a protocol", () => {
    expect(normalizeUrl("instagram.com/deeplinkos")).toBe("https://instagram.com/deeplinkos");
  });

  it("detects major presets from destination URLs", () => {
    expect(detectPresetFromUrl("https://instagram.com/deeplinkos")).toBe("instagram");
    expect(detectPresetFromUrl("https://youtu.be/abc123")).toBe("youtube");
    expect(detectPresetFromUrl("https://wa.me/15551234567")).toBe("whatsapp");
  });

  it("infers platform URLs and a usable slug", () => {
    const inferred = inferLinkFromDestination("https://youtube.com/@DeepLinkOS");

    expect(inferred.preset).toBe("youtube");
    expect(inferred.slug).toBe("deeplinkos");
    expect(inferred.desktopUrl).toBe("https://youtube.com/@DeepLinkOS");
    expect(inferred.iosDeepLink).toContain("vnd.youtube://");
    expect(inferred.androidDeepLink).toContain("Intent");
  });
});
