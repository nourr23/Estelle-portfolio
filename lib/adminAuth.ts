import crypto from "crypto";

type AdminSessionPayload = {
  exp: number; // unix ms
  v: 1;
};

function mustGetEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function base64url(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64urlToBuffer(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  return Buffer.from(b64 + pad, "base64");
}

function sign(data: string) {
  const secret = mustGetEnv("ADMIN_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update(data).digest();
}

export function createAdminSessionToken(ttlHours = 12) {
  const payload: AdminSessionPayload = {
    v: 1,
    exp: Date.now() + ttlHours * 60 * 60 * 1000,
  };
  const payloadB64 = base64url(JSON.stringify(payload));
  const sigB64 = base64url(sign(payloadB64));
  return `${payloadB64}.${sigB64}`;
}

export function isValidAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return false;

  let payloadRaw: Buffer;
  let sigRaw: Buffer;
  try {
    payloadRaw = base64urlToBuffer(payloadB64);
    sigRaw = base64urlToBuffer(sigB64);
  } catch {
    return false;
  }

  const expected = sign(payloadB64);
  if (sigRaw.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(sigRaw, expected)) return false;

  try {
    const payload = JSON.parse(payloadRaw.toString("utf8")) as AdminSessionPayload;
    if (payload.v !== 1) return false;
    if (!payload.exp || typeof payload.exp !== "number") return false;
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

// Password validation is now handled by Supabase Auth (email + password).

