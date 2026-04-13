"use client";

import Image from "next/image";
import { SpotBulleDiagnosticModalTrigger } from "./SpotBulleDiagnosticModal";
import type { BookingModalDict } from "./SpotBulleBookingModal";

export type LandingHeroDict = {
  title: string;
  subtitle: string;
  bodyBefore: string;
  bodyEmphasis: string;
  bodyAfter: string;
  cta: string;
  brandLabel: string;
};

export default function LandingGenerationHero({
  dict,
  locale,
  bookingDict,
}: {
  dict: LandingHeroDict;
  locale: "fr" | "en";
  bookingDict: BookingModalDict;
}) {
  return (
    <article className="pointer-events-auto relative w-full overflow-hidden rounded-[22px] border border-white/12 bg-[#0d3538]/50 px-7 pb-9 pt-9 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:max-w-[600px] md:px-10 md:pb-10 md:pt-10">
      <div
        className="pointer-events-none absolute -left-28 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,248,220,0.22)_0%,rgba(120,200,190,0.08)_45%,transparent_70%)] opacity-90"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white/5 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_62%)] opacity-70" aria-hidden />

      <div className="relative">
        <h1 className="text-[28px] font-bold leading-none tracking-tight text-[#B6F0EA] md:text-[40px]">
          {dict.title}
        </h1>
        <p className="mt-3 text-[16px] font-medium leading-snug text-[#B6F0EA] md:text-[20px]">
          {dict.subtitle}
        </p>
        <p className="mt-4 max-w-[48ch] text-[14px] leading-relaxed text-white/78 md:text-[16px]">
          {dict.bodyBefore}
          <strong className="font-semibold text-white/95">{dict.bodyEmphasis}</strong>
          {dict.bodyAfter}
        </p>

        <div className="mt-8 flex items-start justify-between gap-4 border-t border-white/10 pt-6">
          <SpotBulleDiagnosticModalTrigger
            locale={locale}
            bookingDict={bookingDict}
            className="inline-flex min-w-0 max-w-[min(100%,18rem)] items-center justify-center rounded-full bg-[#d4a017] px-5 py-3.5 text-center text-[14px] font-bold leading-tight text-white shadow-md transition hover:bg-[#dfae20] sm:max-w-none sm:px-6 md:px-8 md:text-[16px]"
          >
            {dict.cta}
          </SpotBulleDiagnosticModalTrigger>
          <Image
            src="/images/spotbulleLogos.png"
            alt={dict.brandLabel}
            width={177}
            height={103}
            className="h-auto max-h-[72px] w-auto shrink-0 object-contain"
          />
        </div>
      </div>
    </article>
  );
}
