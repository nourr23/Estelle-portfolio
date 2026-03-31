import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

/** Decodes JWT payload (Node). Returns null if invalid. */
export function decodeJwtPayload(token: string): { role?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    let b64 = parts[1];
    b64 = b64.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad) b64 += "=".repeat(4 - pad);
    const json = Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(json) as { role?: string };
  } catch {
    return null;
  }
}

function mustGetEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

function supabaseBaseUrl() {
  // Accept both raw project ref and full URL.
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  return url.replace(/\/+$/, "");
}

function supabaseServiceKey() {
  // Server-only. Never expose to client.
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || null;
}

export function hasSupabaseAdminConfig() {
  return Boolean(supabaseBaseUrl() && supabaseServiceKey());
}

/**
 * Server-only Supabase client using the service role key.
 * RLS is bypassed only when the JWT `role` claim is `service_role`.
 */
export function createSupabaseAdminClient(): SupabaseClient {
  const url = supabaseBaseUrl() ?? mustGetEnv("SUPABASE_URL");
  const key = supabaseServiceKey() ?? mustGetEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Returns a clear message if `SUPABASE_SERVICE_ROLE_KEY` is not the service_role secret.
 * Call from API routes before DB writes so misconfiguration is obvious (anon key → RLS errors).
 */
export function supabaseServiceKeyMisconfigurationMessage(): string | null {
  const key = supabaseServiceKey();
  if (!key) return null;
  const payload = decodeJwtPayload(key);
  if (!payload?.role) {
    return "SUPABASE_SERVICE_ROLE_KEY is not a valid JWT. Copy the service_role key from Supabase → Settings → API.";
  }
  if (payload.role !== "service_role") {
    return `SUPABASE_SERVICE_ROLE_KEY must be the service_role secret (JWT role is "${payload.role}", not service_role). Dashboard → Settings → API → service_role.`;
  }
  return null;
}

export async function supabaseAdminRequest<T>(
  path: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    query?: Record<string, string>;
    body?: Json;
    prefer?: string;
  } = {},
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: unknown }> {
  const baseUrl = supabaseBaseUrl() ?? mustGetEnv("SUPABASE_URL");
  const key = supabaseServiceKey() ?? mustGetEnv("SUPABASE_SERVICE_ROLE_KEY");

  const url = new URL(`${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`);
  if (options.query) {
    Object.entries(options.query).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    method: options.method ?? "GET",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!res.ok) {
    let err: unknown = null;
    try {
      err = await res.json();
    } catch {
      err = await res.text().catch(() => null);
    }
    return { ok: false, status: res.status, error: err };
  }

  const text = await res.text();
  const data = text ? (JSON.parse(text) as T) : (null as T);
  return { ok: true, data };
}

