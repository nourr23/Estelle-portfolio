"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LanguageSwitch from "./LanguageSwitch";
import { SpotBulleDiagnosticModalTrigger } from "./SpotBulleDiagnosticModal";
import type { BookingModalDict } from "./SpotBulleBookingModal";

export type LandingPromoDict = {
  headline: string;
  subline: string;
  ctaRdv: string;
};

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v11h14V10" />
    </svg>
  );
}

export default function SpotBulleHeader({
  dict,
  locale,
  landingPromo,
  bookingDict,
}: {
  dict: { nav: Record<string, string> };
  locale: "fr" | "en";
  /** When set (home), show the new landing top bar with SpotBulle promo + RDV CTA. */
  landingPromo?: LandingPromoDict;
  bookingDict?: BookingModalDict;
}) {
  const prefix = `/${locale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLandingBar = Boolean(landingPromo && bookingDict !== undefined);

  const navLinks = [
    { href: prefix, label: dict.nav.home },
    { href: `${prefix}/parents`, label: dict.nav.parents },
    { href: `${prefix}/jeunes`, label: dict.nav.young },
    { href: `${prefix}/spotbulle`, label: dict.nav.spotbulle },
    { href: `${prefix}/experiences`, label: dict.nav.experiences },
    { href: `${prefix}/a-propos`, label: dict.nav.about },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  const linkClass = "hover:text-[#9ee4e5] transition-colors";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (isLandingBar && landingPromo) {
    return (
      <header className="sticky top-0 z-50 border-b border-white/10 bg-linear-to-r from-[#0a3d40] via-[#0d4f52] to-[#0a3d40] shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]">
        <div className="flex w-full items-center justify-between gap-3 px-2 py-3 md:gap-6 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#f7f1e3] transition hover:bg-white/10"
              aria-label={locale === "fr" ? "Menu" : "Menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((p) => !p)}
            >
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>

            <Link
              href={prefix}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-[#f7f1e3] transition hover:bg-white/10"
              aria-label={dict.nav.home}
            >
              <IconHome className="h-5 w-5" />
            </Link>

            <Link href={prefix} className="flex shrink-0 items-center" aria-label="GenUp">
              <Image
                src="/brand/Logo_GenUp_LQ_contours_blanc.png"
                alt="GenUp"
                width={160}
                height={48}
                priority
                className="h-9 w-auto sm:h-10 md:h-11"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 text-left md:block">
              <p className="text-sm font-bold capitalize text-[rgba(255,255,255,0.2)] md:text-base">
                {landingPromo.headline}
              </p>
              <p className="mt-0.5 max-w-[281px] text-[10px] leading-snug text-[rgba(255,255,255,0.2)]">
                {landingPromo.subline}
              </p>
            </div>
          </div>

          <SpotBulleDiagnosticModalTrigger
            locale={locale}
            bookingDict={bookingDict ?? {}}
            className="shrink-0 rounded-full bg-[#d5b162] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#e1c47e] md:px-5 md:text-sm"
          >
            {landingPromo.ctaRdv}
          </SpotBulleDiagnosticModalTrigger>
        </div>

        {isMobileMenuOpen ? (
          <div className="fixed inset-x-0 top-[57px] z-40 max-h-[calc(100vh-57px)] overflow-y-auto border-t border-white/10 bg-[#082f31] px-2 py-4 md:top-[61px] md:px-8">
            <nav className="flex flex-col gap-3 text-xs uppercase tracking-[0.12em] text-[#f7f1e3]/90">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  className={`${linkClass} py-2`}
                  href={item.href}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSwitch locale={locale} />
              </div>
            </nav>
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#d5b162]/25 bg-[#111111]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-2 py-4 text-[#f7f1e3] md:px-8">
        <Link href={prefix} className="flex items-center" aria-label="GenUp">
          <Image
            src="/brand/Logo_GenUp_LQ_contours_blanc.png"
            alt="GenUp"
            width={160}
            height={48}
            priority
            className="h-[68px] w-auto"
          />
        </Link>

        <nav className="hidden flex-wrap items-center justify-end gap-4 text-xs uppercase tracking-[0.14em] text-[#f7f1e3]/80 md:flex md:gap-6">
          {navLinks.map((item) => (
            <Link key={item.href} className={linkClass} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link
            href={`${prefix}/contact`}
            className="rounded-md bg-[#d5b162] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {dict.nav.book}
          </Link>
          <LanguageSwitch locale={locale} />
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-[#43c6c8]/60 px-3 py-2 text-[#9ee4e5] transition hover:bg-[#43c6c8]/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="text-lg leading-none">{isMobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-x-0 top-[101px] z-10 h-[calc(100vh-101px)] border-t border-[#d5b162]/20 bg-[#101010] px-2 py-4 md:hidden">
          <nav className="flex h-full flex-col gap-3 overflow-y-auto pb-8 text-xs uppercase tracking-[0.14em] text-[#f7f1e3]/85">
            {navLinks.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                className={`${linkClass} py-1`}
                href={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`${prefix}/contact`}
              className="mt-2 inline-block w-fit rounded-md bg-[#d5b162] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#101010] transition hover:bg-[#e1c47e]"
              onClick={closeMobileMenu}
            >
              {dict.nav.book}
            </Link>
            <div className="mt-2 w-fit">
              <LanguageSwitch locale={locale} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
