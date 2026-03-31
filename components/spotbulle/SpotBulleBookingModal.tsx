"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import { SpotBulleSlotsContent } from "./SpotBulleSlotsClient";

type Locale = "fr" | "en";

export type BookingModalDict = {
  title?: string;
  subtitle?: string;
  intro?: string;
  tags?: string[];
  reassurance?: string;
};

type SpotBulleBookingModalProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  booking: BookingModalDict;
  /** Answers id from SpotBulle diagnostic; empty shows “complete diagnosis first” in slots UI */
  answersId?: string | null;
  /** After successful slot booking (after delay); e.g. close booking + parent diagnostic modals. */
  onBookSuccess?: () => void;
};

export function SpotBulleBookingModal({
  open,
  onClose,
  locale,
  booking,
  answersId = "",
  onBookSuccess,
}: SpotBulleBookingModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={booking.title}
      closeLabel={locale === "fr" ? "Fermer" : "Close"}
      rootClassName="z-[110]"
    >
      {booking.subtitle ? (
        <p className="text-sm font-medium text-[#0f6f70]">{booking.subtitle}</p>
      ) : null}
      {booking.intro ? (
        <p className="mt-3 text-sm leading-relaxed text-[#44423c]">{booking.intro}</p>
      ) : null}

      {booking.tags && booking.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {booking.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d5b162]/50 bg-white px-3 py-1 text-xs text-[#3a372f]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {booking.reassurance ? (
        <p className="mt-5 rounded-lg border border-[#43c6c8]/40 bg-[#fffaf1] p-4 text-sm leading-relaxed text-[#1f1d18]">
          {booking.reassurance}
        </p>
      ) : null}

      <div className="mt-2">
        <SpotBulleSlotsContent
          locale={locale}
          answersId={answersId ?? ""}
          onBookSuccess={onBookSuccess}
        />
      </div>
    </Modal>
  );
}

type SpotBulleBookModalTriggerProps = {
  locale: Locale;
  booking: BookingModalDict;
  answersId?: string | null;
  className?: string;
  children: ReactNode;
};

/** Button that opens the booking modal (e.g. hero “Réserver un appel”). */
export function SpotBulleBookModalTrigger({
  locale,
  booking,
  answersId = null,
  className,
  children,
}: SpotBulleBookModalTriggerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <SpotBulleBookingModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        booking={booking}
        answersId={answersId ?? ""}
      />
    </>
  );
}
