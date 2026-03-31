import { NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  hasSupabaseAdminConfig,
  supabaseServiceKeyMisconfigurationMessage,
} from "../../../../lib/supabaseAdmin";

type Payload = {
  locale: "fr" | "en";
  role: "imagine" | "organise" | "aide" | "mene";
  learning: "voir" | "ecouter" | "faire";
  passion: string;
  inspiration: string;
  birthdate?: string | null;
  name: string;
  email?: string | null;
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

  const record = {
    locale: body.locale,
    role: body.role,
    learning: body.learning,
    passion: String(body.passion ?? "").trim(),
    inspiration: String(body.inspiration ?? "").trim(),
    birthdate: body.birthdate ?? null,
    name: String(body.name ?? "").trim(),
    email: body.email ? String(body.email).trim() : null,
  };

  if (!record.passion || !record.inspiration || !record.name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data: row, error: insertError } = await supabase
    .from("spotbulle_answers")
    .insert(record)
    .select("id")
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Insert failed", details: insertError },
      { status: 500 },
    );
  }

  const id = row?.id;
  if (!id) {
    return NextResponse.json({ error: "Insert returned no id" }, { status: 500 });
  }

  return NextResponse.json({ answersId: id });
}

