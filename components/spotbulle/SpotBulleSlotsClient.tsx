"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Locale = "fr" | "en";

type Slot = {
  id: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  status: "available" | "booked" | "blocked";
};

function formatSlot(locale: Locale, iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function SpotBulleSlotsClient({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const answersId = params.get("a") || "";

  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const t = useMemo(() => {
    if (locale === "fr") {
      return {
        missing: "Pour réserver, complète d’abord le diagnostic SpotBulle sur la page d’accueil.",
        available: "Créneaux disponibles",
        loading: "Chargement des créneaux…",
        book: "Réserver ce créneau",
        booked: "Réservation confirmée.",
        failed: "Impossible de réserver ce créneau. Essaie-en un autre.",
      };
    }
    return {
      missing: "To book, complete the SpotBulle diagnosis on the home page first.",
      available: "Available slots",
      loading: "Loading slots…",
      book: "Book this slot",
      booked: "Booking confirmed.",
      failed: "Could not book this slot. Try another one.",
    };
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/spotbulle/slots?limit=60", { cache: "no-store" });
        if (!res.ok) throw new Error("fetch failed");
        const json = (await res.json()) as { slots: Slot[] };
        if (!cancelled) setSlots(json.slots ?? []);
      } catch {
        if (!cancelled) setError(t.failed);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [t.failed]);

  if (!answersId) {
    return (
      <div className="mt-8 max-w-2xl rounded-xl border border-[#d5b162]/25 bg-white/70 p-6 text-[#3a372f]">
        {t.missing}
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold tracking-[0.12em] text-[#1f1d18]">
        {t.available}
      </h2>

      {loading ? (
        <p className="mt-4 text-sm text-[#5f5a50]">{t.loading}</p>
      ) : null}

      {error ? (
        <p className="mt-4 text-sm text-red-700">{error}</p>
      ) : null}

      {success ? (
        <p className="mt-4 text-sm font-semibold text-[#0f6f70]">{success}</p>
      ) : null}

      <div className="mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={Boolean(booking)}
            onClick={async () => {
              setBooking(slot.id);
              setError(null);
              setSuccess(null);
              try {
                const res = await fetch("/api/spotbulle/book", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ answersId, slotId: slot.id }),
                });
                if (!res.ok) throw new Error("book failed");
                setSuccess(t.booked);
                // Remove booked slot from list
                setSlots((prev) => prev.filter((s) => s.id !== slot.id));
              } catch {
                setError(t.failed);
              } finally {
                setBooking(null);
              }
            }}
            className="rounded-md border border-[#43c6c8]/40 bg-white px-3 py-3 text-left text-sm text-[#0f6f70] transition hover:bg-[#43c6c8]/10 disabled:opacity-60"
          >
            <div className="font-semibold">{formatSlot(locale, slot.starts_at)}</div>
            <div className="text-xs text-[#5f5a50]">{slot.timezone}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

