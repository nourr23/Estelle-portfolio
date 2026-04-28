"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  children: ReactNode;
  panelClassName?: string;
  /** No cream chrome: only backdrop + panel + corner close (for embedded UIs like SpotBulle chat). */
  bare?: boolean;
  /** `aria-label` on the dialog (use when there is no visible `title`). */
  ariaLabel?: string;
  /** Extra classes on the fixed root (e.g. `z-[110]` when stacking modals). */
  rootClassName?: string;
};

export function Modal({
  open,
  onClose,
  title,
  closeLabel = "Close",
  children,
  panelClassName,
  bare = false,
  ariaLabel,
  rootClassName,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const modalRoot = typeof document !== "undefined" ? document.body : null;

  if (bare) {
    const content = (
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 ${rootClassName ?? ""}`}
        role="presentation"
      >
        <div
          className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel ?? title ?? "Dialog"}
          className={`relative z-10 w-full max-w-[min(96vw,520px)] max-h-[min(92vh,720px)] rounded-2xl shadow-2xl shadow-black/50 ${panelClassName ?? ""}`}
        >
          {children}
        </div>
      </div>
    );
    return modalRoot ? createPortal(content, modalRoot) : content;
  }

  const content = (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 ${rootClassName ?? ""}`}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`relative z-10 max-h-[min(90vh,840px)] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#d5b162]/30 bg-[#f5efe4] p-6 shadow-2xl ${panelClassName ?? ""}`}
      >
        <div className="flex items-start justify-between gap-4">
          {title ? (
            <h2 id="modal-title" className="pr-2 text-lg font-semibold tracking-wide text-[#1c1b19]">
              {title}
            </h2>
          ) : (
            <span className="sr-only">Dialog</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="-m-1 shrink-0 rounded-md p-2 text-xl leading-none text-[#5f5a50] transition hover:bg-black/5"
            aria-label={closeLabel}
          >
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
  return modalRoot ? createPortal(content, modalRoot) : content;
}
