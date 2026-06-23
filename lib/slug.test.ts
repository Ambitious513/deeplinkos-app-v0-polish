import { describe, expect, it } from "vitest";

import { createSlug, normalizeSlug } from "./slug";

describe("slug helpers", () => {
  it("normalizes human input into URL-safe slugs", () => {
    expect(normalizeSlug(" Summer Launch Video! ")).toBe("summer-launch-video");
    expect(normalizeSlug("__IG@@Profile__")).toBe("ig-profile");
    expect(normalizeSlug("already-good")).toBe("already-good");
  });

  it("creates compact random slugs", () => {
    expect(createSlug()).toMatch(/^[a-z2-9]{7}$/);
    expect(createSlug(10)).toMatch(/^[a-z2-9]{10}$/);
  });
});
