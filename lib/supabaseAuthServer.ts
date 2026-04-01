import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function mustGetEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export function createSupabaseAnonServerClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || mustGetEnv("SUPABASE_URL");
  const anon =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    mustGetEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  return createClient(url.replace(/\/+$/, ""), anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

