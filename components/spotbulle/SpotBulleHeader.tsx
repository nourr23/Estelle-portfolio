"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LanguageSwitch from "./LanguageSwitch";
import type { BookingModalDict } from "./SpotBulleBookingModal";

/** Same surface as home: brand teal + `haloheader.png`. */
const headerSurfaceClass =
  "bg-[#0E5F65] bg-[url('/images/backgrounds/haloheader.png')] bg-cover bg-center bg-no-repeat";

export type LandingPromoDict = {
  headline: string;
  subline: string;
  ctaRdv: string;
};

export type SpotBulleHeaderDict = {
  nav: Record<string, string>;
  landingHeader: LandingPromoDict;
  booking?: BookingModalDict;
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

/** Same bar as the home page on every route: menu, home, logo, promo copy, RDV modal. */
export default function SpotBulleHeader({
  dict,
  locale,
}: {
  dict: SpotBulleHeaderDict;
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const landingPromo = dict.landingHeader;

  const navLinks = [
    { href: prefix, label: dict.nav.home },
    { href: `${prefix}/qui-suis-je`, label: dict.nav.quiSuisJe },
    { href: `${prefix}/excellence-examens`, label: dict.nav.excellenceExamens },
    { href: `${prefix}/besoins-particuliers`, label: dict.nav.besoinsParticuliers },
    { href: `${prefix}/orientation-strategie`, label: dict.nav.orientationStrategie },
    { href: `${prefix}/sejours-immersion`, label: dict.nav.sejoursImmersion },
  ];

  const linkClass = "hover:text-[#9ee4e5] transition-colors";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)] ${headerSurfaceClass}`}
    >
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
            <p className="text-sm font-bold capitalize text-[#f7f1e3] md:text-base">
              {landingPromo.headline}
            </p>
            {landingPromo.subline ? (
              <p className="mt-0.5 max-w-[281px] text-[10px] leading-snug text-[#f7f1e3]/85">
                {landingPromo.subline}
              </p>
            ) : null}
          </div>
        </div>

        <Link
          href={`${prefix}/offres`}
          className="shrink-0 rounded-full bg-[#d5b162] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#e1c47e] md:px-5 md:text-sm"
        >
          {locale === "fr" ? "Tarifs et Formules" : "Pricing & Plans"}
        </Link>
      </div>

      {isMobileMenuOpen ? (
        <div
          className={`fixed inset-x-0 top-[57px] z-40 max-h-[calc(100vh-57px)] overflow-y-auto border-t border-white/10 px-2 py-4 md:top-[61px] md:px-8 ${headerSurfaceClass}`}
        >
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
