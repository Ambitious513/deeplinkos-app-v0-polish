const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

export function normalizeSlug(input?: string | null) {
  if (!input) {
    return "";
  }

  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export function createSlug(length = 7) {
  let slug = "";

  for (let index = 0; index < length; index += 1) {
    slug += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }

  return slug;
}
