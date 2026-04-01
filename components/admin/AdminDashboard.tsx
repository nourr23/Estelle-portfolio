import { createSupabaseAdminClient, hasSupabaseAdminConfig } from "@/lib/supabaseAdmin";

type Locale = "fr" | "en";

type Meeting = {
  id: string;
  created_at?: string | null;
  answers_id: string;
  slot_id: string;
  status?: string | null;
};

type Slot = {
  id: string;
  starts_at?: string | null;
  ends_at?: string | null;
  timezone?: string | null;
  status?: string | null;
};

type Answers = {
  id: string;
  created_at?: string | null;
  locale?: string | null;
  role?: string | null;
  learning?: string | null;
  passion?: string | null;
  inspiration?: string | null;
  birthdate?: string | null;
  name?: string | null;
  email?: string | null;
};

function fmt(locale: Locale, iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default async function AdminDashboard({ locale }: { locale: Locale }) {
  if (!hasSupabaseAdminConfig()) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
        Supabase admin n’est pas configuré côté serveur.
      </div>
    );
  }

  const supabase = createSupabaseAdminClient();

  // 1) Meetings
  const { data: meetingsRaw, error: meetingsError } = await supabase
    .from("meetings")
    .select("id,created_at,answers_id,slot_id,status")
    .order("created_at", { ascending: false })
    .limit(200);

  if (meetingsError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
        Impossible de charger les réservations.
      </div>
    );
  }

  const meetings = (meetingsRaw ?? []) as Meeting[];
  const answersIds = Array.from(new Set(meetings.map((m) => m.answers_id).filter(Boolean)));
  const slotIds = Array.from(new Set(meetings.map((m) => m.slot_id).filter(Boolean)));

  // 2) Answers + slots in parallel
  const [{ data: answersRaw }, { data: slotsRaw }] = await Promise.all([
    answersIds.length
      ? supabase
          .from("spotbulle_answers")
          .select("id,created_at,locale,role,learning,passion,inspiration,birthdate,name,email")
          .in("id", answersIds)
      : Promise.resolve({ data: [] as unknown[] }),
    slotIds.length
      ? supabase
          .from("meeting_slots")
          .select("id,starts_at,ends_at,timezone,status")
          .in("id", slotIds)
      : Promise.resolve({ data: [] as unknown[] }),
  ]);

  const answersMap = new Map<string, Answers>(
    ((answersRaw ?? []) as Answers[]).map((a) => [a.id, a]),
  );
  const slotsMap = new Map<string, Slot>(((slotsRaw ?? []) as Slot[]).map((s) => [s.id, s]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-[#1c1b19]">
            {locale === "fr" ? "Réservations" : "Bookings"}
          </h1>
          <p className="mt-1 text-sm text-[#5f5a50]">
            {locale === "fr"
              ? "Dernières réservations et réponses SpotBulle associées."
              : "Latest bookings and associated SpotBulle answers."}
          </p>
        </div>

        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="rounded-md border border-[#111111]/15 bg-white px-4 py-2 text-sm font-semibold text-[#111111] transition hover:bg-black/5"
          >
            {locale === "fr" ? "Se déconnecter" : "Sign out"}
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#d5b162]/25 bg-white/70">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="bg-[#fffaf1] text-[#3a372f]">
              <tr>
                <th className="px-4 py-3 font-semibold">Créneau</th>
                <th className="px-4 py-3 font-semibold">Nom</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Rôle</th>
                <th className="px-4 py-3 font-semibold">Apprentissage</th>
                <th className="px-4 py-3 font-semibold">Passion</th>
                <th className="px-4 py-3 font-semibold">Inspiration</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5b162]/15">
              {meetings.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-[#5f5a50]" colSpan={8}>
                    {locale === "fr" ? "Aucune réservation pour le moment." : "No bookings yet."}
                  </td>
                </tr>
              ) : null}

              {meetings.map((m) => {
                const a = answersMap.get(m.answers_id);
                const s = slotsMap.get(m.slot_id);
                return (
                  <tr key={m.id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#1c1b19]">
                        {fmt(locale, s?.starts_at ?? null)}
                      </div>
                      <div className="text-xs text-[#5f5a50]">{s?.timezone ?? "—"}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#1c1b19]">
                      {a?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-[#3a372f]">{a?.email ?? "—"}</td>
                    <td className="px-4 py-3 text-[#3a372f]">{a?.role ?? "—"}</td>
                    <td className="px-4 py-3 text-[#3a372f]">{a?.learning ?? "—"}</td>
                    <td className="px-4 py-3 text-[#3a372f]">{a?.passion ?? "—"}</td>
                    <td className="px-4 py-3 text-[#3a372f]">{a?.inspiration ?? "—"}</td>
                    <td className="px-4 py-3 text-[#3a372f]">{m.status ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

