"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function SpotBulleHeader({
  dict,
  locale,
}: {
  dict: { nav: Record<string, string> };
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: prefix, label: dict.nav.home },
    { href: `${prefix}/parents`, label: dict.nav.parents },
    { href: `${prefix}/jeunes`, label: dict.nav.young },
    { href: `${prefix}/spotbulle`, label: dict.nav.spotbulle },
    { href: `${prefix}/experiences`, label: dict.nav.experiences },
    { href: `${prefix}/a-propos`, label: dict.nav.about },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  const linkClass = "hover:text-[#43c6c8] transition-colors";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[#d5b162]/25 bg-[#111111]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-[#f7f1e3]">
        <Link
          href={prefix}
          className="flex items-center"
          aria-label="GenUp"
        >
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
        <div className="fixed inset-x-0 top-[101px] z-10 h-[calc(100vh-101px)] border-t border-[#d5b162]/20 bg-[#101010] px-6 py-4 md:hidden">
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
