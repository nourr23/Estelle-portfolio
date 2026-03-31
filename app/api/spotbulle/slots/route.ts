import { NextResponse } from "next/server";
import {
  hasSupabaseAdminConfig,
  supabaseAdminRequest,
  supabaseServiceKeyMisconfigurationMessage,
} from "../../../../lib/supabaseAdmin";

type Slot = {
  id: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  status: "available" | "booked" | "blocked";
};

export async function GET(req: Request) {
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json(
      { error: "Supabase admin env is not configured" },
      { status: 500 },
    );
  }

  const keyMsg = supabaseServiceKeyMisconfigurationMessage();
  if (keyMsg) {
    return NextResponse.json({ error: keyMsg }, { status: 500 });
  }

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "60") || 60, 200);

  // Only expose available slots to the public API.
  const nowIso = new Date().toISOString();

  const res = await supabaseAdminRequest<Slot[]>("/rest/v1/meeting_slots", {
    method: "GET",
    query: {
      select: "id,starts_at,ends_at,timezone,status",
      status: "eq.available",
      starts_at: `gte.${nowIso}`,
      order: "starts_at.asc",
      limit: String(limit),
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Fetch slots failed", details: res.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ slots: res.data });
}

