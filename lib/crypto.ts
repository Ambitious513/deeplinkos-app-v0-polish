function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(new Uint8Array(digest));
}

export async function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT || "deeplinkos-dev-salt";
  return (await sha256Hex(`${ip}:${salt}`)).slice(0, 16);
}

export async function hashPassword(password: string) {
  const salt = process.env.IP_HASH_SALT || "deeplinkos-dev-salt";
  return sha256Hex(`password:${password}:${salt}`);
}

export async function verifyPassword(password: string, expectedHash: string) {
  return (await hashPassword(password)) === expectedHash;
}
