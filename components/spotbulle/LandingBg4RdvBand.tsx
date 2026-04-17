"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";

export type LandingRdvFormDict = {
  title: string;
  subtitle: string;
  intro: string;
  birthDate: string;
  email: string;
  passion: string;
  passionPlaceholder: string;
  inspiration: string;
  inspirationPlaceholder: string;
  confirm: string;
  slotsModalTitle: string;
  slotsModalIntro: string;
  noSlotsThisDay: string;
  pickSlotHint: string;
  bookedSuccess: string;
  bookedFail: string;
  answersFail: string;
  slotsFetchFail: string;
  loadingSlots: string;
  calendarWeekdays: string[];
  prevMonth: string;
  nextMonth: string;
};

type Slot = {
  id: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  status: "available" | "booked" | "blocked";
};

type DayRef = { y: number; m: number; d: number };

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function buildMonthGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const len = daysInMonth(year, month);
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= len; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);
  return cells;
}

function isSameLocalCalendarDay(iso: string, y: number, m: number, d: number): boolean {
  const t = new Date(iso);
  return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
}

function slotLocalDayRef(iso: string): DayRef {
  const t = new Date(iso);
  return { y: t.getFullYear(), m: t.getMonth(), d: t.getDate() };
}

function formatSlotSummary(locale: "fr" | "en", iso: string) {
  const d = new Date(iso);
  if (locale === "fr") {
    const s = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
    return s.replace(/^./, (c) => c.toUpperCase());
  }
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

function formatSlotTime(locale: "fr" | "en", iso: string) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function isValidEmail(value: string) {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** Used for `name` when the form has no separate full-name field (API requires non-empty name). */
function nameFromEmail(email: string, locale: "fr" | "en"): string {
  const local = email.trim().split("@")[0]?.trim() ?? "";
  if (local.length > 0) return local.slice(0, 200);
  return locale === "fr" ? "Visiteur" : "Guest";
}

function rdvLandingPayload(
  locale: "fr" | "en",
  name: string,
  email: string,
  birthdate: string | null,
  passion: string,
  inspiration: string,
) {
  return {
    locale,
    role: "aide" as const,
    learning: "ecouter" as const,
    passion: passion.trim(),
    inspiration: inspiration.trim(),
    name: name.trim(),
    email: email.trim() || null,
    birthdate: birthdate && birthdate.trim() ? birthdate.trim() : null,
  };
}

export default function LandingBg4RdvBand({
  dict,
  locale,
}: {
  dict: LandingRdvFormDict;
  locale: "fr" | "en";
}) {
  const initial = useMemo(() => {
    const n = new Date();
    return { y: n.getFullYear(), m: n.getMonth() };
  }, []);

  const [viewY, setViewY] = useState(initial.y);
  const [viewM, setViewM] = useState(initial.m);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsLoadError, setSlotsLoadError] = useState<string | null>(null);

  const [slotModalDay, setSlotModalDay] = useState<DayRef | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  /** No separate “nom” field — `POST /answers` gets `name` via `nameFromEmail(email)` below. */
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [passion, setPassion] = useState("");
  const [inspiration, setInspiration] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [doneSuccess, setDoneSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const grid = useMemo(() => buildMonthGrid(viewY, viewM), [viewY, viewM]);

  const monthTitle = useMemo(() => {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(viewY, viewM, 1));
  }, [locale, viewY, viewM]);

  const loadSlots = useCallback(async () => {
    setLoadingSlots(true);
    setSlotsLoadError(null);
    try {
      const res = await fetch("/api/spotbulle/slots?limit=120", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch");
      const json = (await res.json()) as { slots?: Slot[] };
      setSlots(json.slots ?? []);
    } catch {
      setSlotsLoadError(dict.slotsFetchFail);
      setSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, [dict.slotsFetchFail]);

  useEffect(() => {
    void loadSlots();
  }, [loadSlots]);

  const slotsForModal = useMemo(() => {
    if (!slotModalDay) return [];
    return slots.filter((s) =>
      isSameLocalCalendarDay(s.starts_at, slotModalDay.y, slotModalDay.m, slotModalDay.d),
    );
  }, [slots, slotModalDay]);

  const selectedDayRef = selectedSlot ? slotLocalDayRef(selectedSlot.starts_at) : null;

  const canSubmit =
    isValidEmail(email) &&
    passion.trim().length > 0 &&
    inspiration.trim().length > 0 &&
    selectedSlot != null &&
    !submitting &&
    !doneSuccess;

  const summaryLine =
    selectedSlot != null ? formatSlotSummary(locale, selectedSlot.starts_at) : dict.pickSlotHint;

  function shiftMonth(delta: number) {
    const d = new Date(viewY, viewM + delta, 1);
    setViewY(d.getFullYear());
    setViewM(d.getMonth());
  }

  function openDayModal(day: number) {
    setDoneSuccess(false);
    setErrorMsg(null);
    setSlotModalDay({ y: viewY, m: viewM, d: day });
  }

  function closeDayModal() {
    setSlotModalDay(null);
  }

  function pickSlotFromModal(slot: Slot) {
    setDoneSuccess(false);
    setErrorMsg(null);
    setSelectedSlot(slot);
    setViewY(slotLocalDayRef(slot.starts_at).y);
    setViewM(slotLocalDayRef(slot.starts_at).m);
    closeDayModal();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !selectedSlot) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const answersRes = await fetch("/api/spotbulle/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          rdvLandingPayload(
            locale,
            nameFromEmail(email, locale),
            email,
            birthDate.trim() || null,
            passion,
            inspiration,
          ),
        ),
      });
      if (!answersRes.ok) {
        setErrorMsg(dict.answersFail);
        return;
      }
      const answersJson = (await answersRes.json()) as { answersId?: string };
      const answersId = answersJson.answersId;
      if (!answersId) {
        setErrorMsg(dict.answersFail);
        return;
      }

      const bookRes = await fetch("/api/spotbulle/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answersId, slotId: selectedSlot.id }),
      });
      if (!bookRes.ok) {
        setErrorMsg(dict.bookedFail);
        return;
      }

      setDoneSuccess(true);
      setBirthDate("");
      setEmail("");
      setPassion("");
      setInspiration("");
      setSelectedSlot(null);
      await loadSlots();
    } catch {
      setErrorMsg(dict.bookedFail);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1 box-border h-[33px] min-h-[33px] max-h-[33px] w-full rounded-lg border border-[#43c6c8]/35 bg-[#e8fbfb]/90 px-2.5 py-0 text-xs leading-snug text-[#022636] shadow-inner outline-none ring-0 placeholder:text-[#0a3d40]/35 focus:border-[#d4a017]/80 focus:bg-white sm:rounded-xl sm:px-3 sm:text-sm";

  const labelClass =
    "text-[10px] font-semibold tracking-wide text-[#022636] sm:text-xs";

  return (
    <div
      id="landing-rdv"
      className="relative flex h-full min-h-0 flex-col justify-center py-4 md:py-10"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,rgba(255,248,220,0.18),transparent_55%),radial-gradient(ellipse_90%_60%_at_80%_100%,rgba(212,160,23,0.12),transparent_50%)] opacity-90"
        aria-hidden
      />

      <div className="flex w-full flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-evenly sm:gap-4 md:gap-8">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-[min(100%,260px)] shrink-0 space-y-3 rounded-xl border border-white/10 bg-[#0d3538]/45 px-3 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:max-w-[300px] sm:space-y-4 sm:rounded-[20px] sm:px-4 sm:py-5 md:max-w-[350px] md:px-7 md:py-8"
        >
          <div>
            <h2 className="text-[18px] font-bold leading-tight text-[#022636] sm:text-[22px] md:text-[26px]">
              {dict.title}
            </h2>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-[#0f6f70] sm:text-[15px]">
              {dict.subtitle}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#022636]/85 sm:mt-2 sm:text-sm">
              {dict.intro}
            </p>
          </div>

          <div className="space-y-2.5 pt-0.5 sm:space-y-3.5 sm:pt-1">
            <label className="block" htmlFor="landing-rdv-birthDate">
              <span className={labelClass}>{dict.birthDate}</span>
              <input
                id="landing-rdv-birthDate"
                className={inputClass}
                name="birthDate"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  setDoneSuccess(false);
                  setErrorMsg(null);
                }}
              />
            </label>
            <label className="block" htmlFor="landing-rdv-email">
              <span className={labelClass}>{dict.email}</span>
              <input
                id="landing-rdv-email"
                className={inputClass}
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setDoneSuccess(false);
                  setErrorMsg(null);
                }}
                autoComplete="email"
                required
              />
            </label>
            <label className="block" htmlFor="landing-rdv-passion">
              <span className={labelClass}>{dict.passion}</span>
              <textarea
                id="landing-rdv-passion"
                name="passion"
                rows={1}
                value={passion}
                placeholder={dict.passionPlaceholder}
                onChange={(e) => {
                  setPassion(e.target.value);
                  setDoneSuccess(false);
                  setErrorMsg(null);
                }}
                required
                className={`${inputClass} resize-none overflow-y-auto`}
              />
            </label>
            <label className="block" htmlFor="landing-rdv-inspiration">
              <span className={labelClass}>{dict.inspiration}</span>
              <textarea
                id="landing-rdv-inspiration"
                name="inspiration"
                rows={1}
                value={inspiration}
                placeholder={dict.inspirationPlaceholder}
                onChange={(e) => {
                  setInspiration(e.target.value);
                  setDoneSuccess(false);
                  setErrorMsg(null);
                }}
                required
                className={`${inputClass} resize-none overflow-y-auto`}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-1.5 w-full rounded-full bg-[#d4a017] py-2.5 text-center text-xs font-bold text-white shadow-md transition hover:bg-[#dfae20] enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 sm:mt-2 sm:py-3.5 sm:text-sm md:text-[15px]"
          >
            {submitting ? "…" : dict.confirm}
          </button>

          <p
            className="text-center text-[10px] font-medium leading-snug text-[#022636]/75 sm:text-xs md:text-sm"
            aria-live="polite"
          >
            {doneSuccess ? dict.bookedSuccess : errorMsg ?? summaryLine}
          </p>
        </form>

        <div className="w-full max-w-[min(100%,260px)] shrink-0 rounded-xl border-2 border-[#43c6c8]/70 bg-white/95 p-3 shadow-[0_16px_40px_rgba(0,0,0,0.2)] sm:max-w-[280px] sm:rounded-[20px] sm:p-4 md:max-w-[340px] md:p-5">
          {loadingSlots ? (
            <p className="py-5 text-center text-xs text-[#5f5a50] sm:py-8 sm:text-sm">{dict.loadingSlots}</p>
          ) : slotsLoadError ? (
            <p className="py-5 text-center text-xs text-red-700 sm:py-8 sm:text-sm">{slotsLoadError}</p>
          ) : (
            <>
              <div className="mb-2 flex items-center justify-between gap-1.5 sm:mb-3 sm:gap-2">
                <button
                  type="button"
                  className="rounded-md px-1.5 py-0.5 text-sm text-[#0f6f70] transition hover:bg-[#43c6c8]/15 sm:rounded-lg sm:px-2 sm:py-1"
                  aria-label={dict.prevMonth}
                  onClick={() => shiftMonth(-1)}
                >
                  ‹
                </button>
                <p className="text-center text-[11px] font-bold uppercase tracking-wide text-[#0f6f70] sm:text-sm sm:tracking-[0.14em]">
                  {locale === "fr" ? monthTitle : monthTitle.toUpperCase()}
                </p>
                <button
                  type="button"
                  className="rounded-md px-1.5 py-0.5 text-sm text-[#0f6f70] transition hover:bg-[#43c6c8]/15 sm:rounded-lg sm:px-2 sm:py-1"
                  aria-label={dict.nextMonth}
                  onClick={() => shiftMonth(1)}
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-y-0.5 text-center text-[9px] font-semibold text-[#0f6f70] sm:gap-y-1 sm:text-[11px] md:text-xs">
                {dict.calendarWeekdays.map((w, i) => (
                  <div key={`${w}-${i}`} className={i === 0 ? "text-red-500" : ""}>
                    {w}
                  </div>
                ))}
              </div>

              <div className="mt-1.5 grid grid-cols-7 gap-y-0.5 text-center text-[11px] sm:mt-2 sm:gap-y-1 sm:text-[13px] md:text-sm">
                {grid.map((cell, idx) => {
                  if (cell == null) {
                    return <div key={`e-${idx}`} className="aspect-square p-px sm:p-0.5" />;
                  }
                  const dow = new Date(viewY, viewM, cell).getDay();
                  const isSun = dow === 0;
                  const isSelectedDay =
                    selectedDayRef != null &&
                    selectedDayRef.y === viewY &&
                    selectedDayRef.m === viewM &&
                    selectedDayRef.d === cell;
                  return (
                    <div key={idx} className="aspect-square p-px sm:p-0.5">
                      <button
                        type="button"
                        onClick={() => openDayModal(cell)}
                        className={`flex h-full w-full items-center justify-center rounded-md text-[11px] font-medium transition sm:rounded-lg sm:text-[13px] md:text-sm ${
                          isSelectedDay
                            ? "bg-[#0f6f70] text-white shadow-inner"
                            : isSun
                              ? "text-red-500 hover:bg-red-50"
                              : "text-[#022636] hover:bg-[#43c6c8]/15"
                        }`}
                      >
                        {cell}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        open={slotModalDay != null}
        onClose={closeDayModal}
        title={dict.slotsModalTitle}
        closeLabel={locale === "fr" ? "Fermer" : "Close"}
        rootClassName="z-[120]"
      >
        <p className="text-sm text-[#44423c]">{dict.slotsModalIntro}</p>
        {slotsForModal.length === 0 ? (
          <p className="mt-4 text-sm text-[#5f5a50]">{dict.noSlotsThisDay}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {slotsForModal.map((slot) => (
              <li key={slot.id}>
                <button
                  type="button"
                  onClick={() => pickSlotFromModal(slot)}
                  className="w-full rounded-lg border border-[#43c6c8]/40 bg-white px-4 py-3 text-left text-sm font-semibold text-[#0f6f70] transition hover:bg-[#43c6c8]/10"
                >
                  {formatSlotTime(locale, slot.starts_at)}
                  <span className="mt-0.5 block text-xs font-normal text-[#5f5a50]">
                    {slot.timezone}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
}
