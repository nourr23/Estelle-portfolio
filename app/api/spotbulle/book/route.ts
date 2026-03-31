import { NextResponse } from "next/server";
import {
  hasSupabaseAdminConfig,
  supabaseAdminRequest,
  supabaseServiceKeyMisconfigurationMessage,
} from "../../../../lib/supabaseAdmin";

type Payload = {
  answersId: string;
  slotId: string;
};

export async function POST(req: Request) {
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

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const answersId = String(body.answersId ?? "").trim();
  const slotId = String(body.slotId ?? "").trim();
  if (!answersId || !slotId) {
    return NextResponse.json({ error: "answersId and slotId are required" }, { status: 400 });
  }

  // 1) Insert meeting. Unique constraint on slot_id prevents double booking.
  const meetingInsert = await supabaseAdminRequest<{ id: string }[]>(
    "/rest/v1/meetings",
    {
      method: "POST",
      body: {
        answers_id: answersId,
        slot_id: slotId,
        status: "booked",
      },
      prefer: "return=representation",
    },
  );

  if (!meetingInsert.ok) {
    // 409 can occur if the unique constraint is hit (slot already booked).
    const status = meetingInsert.status === 409 ? 409 : 500;
    return NextResponse.json(
      { error: "Booking failed", details: meetingInsert.error },
      { status },
    );
  }

  const meetingId = meetingInsert.data?.[0]?.id;

  // 2) Mark slot as booked for public availability listing.
  const slotUpdate = await supabaseAdminRequest<unknown>("/rest/v1/meeting_slots", {
    method: "PATCH",
    query: { id: `eq.${slotId}` },
    body: { status: "booked" },
    prefer: "return=minimal",
  });

  if (!slotUpdate.ok) {
    // Meeting exists, but slot status didn't update; still return success with warning.
    return NextResponse.json(
      { ok: true, meetingId, warning: "Slot status update failed", details: slotUpdate.error },
      { status: 200 },
    );
  }

  return NextResponse.json({ ok: true, meetingId });
}

