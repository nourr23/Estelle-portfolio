"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/ui/Modal";
import SpotBulleAgentChat from "./SpotBulleAgentChat";
import type { BookingModalDict } from "./SpotBulleBookingModal";

type Locale = "fr" | "en";

type SpotBulleDiagnosticModalProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  bookingDict: BookingModalDict;
  /** Bump to remount chat (fresh session). */
  sessionKey: number;
};

export function SpotBulleDiagnosticModal({
  open,
  onClose,
  locale,
  bookingDict,
  sessionKey,
}: SpotBulleDiagnosticModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      bare
      closeLabel={locale === "fr" ? "Fermer" : "Close"}
      ariaLabel={locale === "fr" ? "Diagnostic SpotBulle" : "SpotBulle diagnosis"}
    >
      <SpotBulleAgentChat
        key={sessionKey}
        locale={locale}
        bookingDict={bookingDict}
        onDismiss={onClose}
      />
    </Modal>
  );
}

type SpotBulleDiagnosticModalTriggerProps = {
  locale: Locale;
  bookingDict: BookingModalDict;
  className?: string;
  children: ReactNode;
};

/** Opens the SpotBulle diagnostic chat in a modal (e.g. hero « Réserver un appel »). */
export function SpotBulleDiagnosticModalTrigger({
  locale,
  bookingDict,
  className,
  children,
}: SpotBulleDiagnosticModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setSessionKey((k) => k + 1);
          setOpen(true);
        }}
      >
        {children}
      </button>
      <SpotBulleDiagnosticModal
        open={open}
        onClose={() => setOpen(false)}
        locale={locale}
        bookingDict={bookingDict}
        sessionKey={sessionKey}
      />
    </>
  );
}
