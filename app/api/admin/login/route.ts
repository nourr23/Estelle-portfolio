import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminSessionToken } from "../../../../lib/adminAuth";
import { createSupabaseAnonServerClient } from "../../../../lib/supabaseAuthServer";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const email =
      typeof body === "object" &&
      body !== null &&
      "email" in body &&
      typeof (body as { email?: unknown }).email === "string"
        ? ((body as { email: string }).email as string).trim().toLowerCase()
        : "";

    const password =
      typeof body === "object" &&
      body !== null &&
      "password" in body &&
      typeof (body as { password?: unknown }).password === "string"
        ? ((body as { password: string }).password as string)
        : "";
    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const allowListRaw = process.env.ADMIN_EMAIL_ALLOWLIST || "";
    const allowList = allowListRaw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (allowList.length > 0 && !allowList.includes(email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const supabase = createSupabaseAnonServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = createAdminSessionToken(12);
    const jar = await cookies();
    jar.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Admin login failed",
        message,
        hint:
          "Check .env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, ADMIN_SESSION_SECRET (and optional ADMIN_EMAIL_ALLOWLIST). Then restart `pnpm dev`.",
      },
      { status: 500 },
    );
  }
}

