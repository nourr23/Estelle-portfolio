import Link from "next/link";
import Image from "next/image";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";
import { SpotBulleDiagnosticModalTrigger } from "./SpotBulleDiagnosticModal";
import type { BookingModalDict } from "./SpotBulleBookingModal";

type HomeOffer = { title: string; bullets?: string[]; result?: string };

type SpotBulleHomeDict = {
  nav: Record<string, string>;
  footer: Record<string, string>;
  hero?: { tagline?: string };
  home?: {
    heroTitle?: string;
    heroSubtitle?: string;
    ctaParent?: string;
    ctaYoung?: string;
    problemTitle?: string;
    problemBullets?: string[];
    problemPunchline?: string;
    solutionTitle?: string;
    solutionBody?: string;
    solutionBullets?: string[];
    personaTitle?: string;
    personaParentTitle?: string;
    personaParentBody?: string;
    personaParentCta?: string;
    personaYoungTitle?: string;
    personaYoungBody?: string;
    personaYoungCta?: string;
    offersTitle?: string;
    offers?: HomeOffer[];
    proofTitle?: string;
    proofBody?: string;
    aboutTitle?: string;
    aboutBullets?: string[];
    aboutCta?: string;
    finalCtaTitle?: string;
    finalCtaPrimary?: string;
    finalCtaSecondary?: string;
    finalCtaTertiary?: string;
  };
  booking?: BookingModalDict;
  about?: { portrait?: string };
};

export default function SpotBulleHome({
  dict,
  locale,
}: {
  dict: SpotBulleHomeDict;
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;

  return (
    <div className="min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]">
      <SpotBulleHeader dict={dict} locale={locale} />

      <section className="relative overflow-hidden bg-[#111111] text-[#f7f1e3]">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f5efe4] to-transparent" />
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-[#d5b162]">
            {dict.hero?.tagline}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {dict.home?.heroTitle}
          </h1>
          <p className="mt-4 text-lg leading-8 text-[#f7f1e3]/85">
            {dict.home?.heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`${prefix}/parents`}
              className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {dict.home?.ctaParent}
            </Link>
            <Link
              href={`${prefix}/jeunes`}
              className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#9ee4e5] transition hover:bg-[#43c6c8]/10"
            >
              {dict.home?.ctaYoung}
            </Link>
            <SpotBulleDiagnosticModalTrigger
              locale={locale}
              bookingDict={dict.booking ?? {}}
              className="rounded-md bg-white/5 px-6 py-3 text-sm font-semibold text-[#f7f1e3] ring-1 ring-inset ring-white/15 transition hover:bg-white/10"
            >
              {dict.nav?.book}
            </SpotBulleDiagnosticModalTrigger>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.home?.problemTitle}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {dict.home?.problemBullets?.map((b: string) => (
            <li
              key={b}
              className="rounded-md border border-[#d5b162]/25 bg-white/70 px-4 py-3 text-sm text-[#3a372f]"
            >
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg font-semibold text-[#0f6f70]">{dict.home?.problemPunchline}</p>
      </section>

      <section className="border-y border-[#d5b162]/25 bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.home?.solutionTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#44423c]">{dict.home?.solutionBody}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {dict.home?.solutionBullets?.map((b: string) => (
              <li
                key={b}
                className="rounded-md border border-[#43c6c8]/25 bg-white px-4 py-3 text-sm text-[#3a372f]"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1b19]">
          {dict.home?.personaTitle}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-xl border-2 border-[#111111] bg-[#111111] px-8 py-10 shadow-lg">
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-[#d5b162]">
                {dict.home?.personaParentTitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#f7f1e3]/90">
                {dict.home?.personaParentBody}
              </p>
            </div>
            <Link
              href={`${prefix}/parents`}
              className="mt-8 inline-flex w-fit rounded-md bg-[#d5b162] px-5 py-2.5 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {dict.home?.personaParentCta}
            </Link>
          </article>
          <article className="flex flex-col justify-between rounded-xl border-2 border-[#43c6c8]/50 bg-[#111111] px-8 py-10 shadow-lg">
            <div>
              <h3 className="text-xl font-semibold tracking-wide text-[#43c6c8]">
                {dict.home?.personaYoungTitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#f7f1e3]/90">
                {dict.home?.personaYoungBody}
              </p>
            </div>
            <Link
              href={`${prefix}/jeunes`}
              className="mt-8 inline-flex w-fit rounded-md border border-[#43c6c8] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#9ee4e5] transition hover:bg-[#43c6c8]/15"
            >
              {dict.home?.personaYoungCta}
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1b19]">
          {dict.home?.offersTitle}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dict.home?.offers?.map((offer) => (
            <article
              key={offer.title}
              className="rounded-xl bg-[#111111] px-6 py-8 text-[#f7f1e3] shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[#d5b162]">{offer.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#f7f1e3]/85">
                {offer.bullets?.map((b: string) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-[#43c6c8]">
                {offer.result}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.home?.proofTitle}</h2>
        <p className="mt-4 text-[#44423c]">{dict.home?.proofBody}</p>
      </section>

      <section className="border-y border-[#d5b162]/25 bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-[180px_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <div className="overflow-hidden rounded-2xl border border-[#d5b162]/35 bg-white shadow-sm">
                <Image
                  src="/images/profile-picture.jpeg"
                  alt={dict.about?.portrait ?? "Portrait"}
                  width={360}
                  height={360}
                  className="h-[180px] w-[180px] object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.home?.aboutTitle}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {dict.home?.aboutBullets?.map((b: string) => (
                  <li
                    key={b}
                    className="rounded-md border border-[#d5b162]/25 bg-white px-4 py-3 text-sm text-[#3a372f]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`${prefix}/a-propos`}
                className="mt-8 inline-block rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-[#d5b162] hover:bg-[#2a2a2a]"
              >
                {dict.home?.aboutCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.home?.finalCtaTitle}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`${prefix}/contact`}
            className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {dict.home?.finalCtaPrimary}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#0f6f70] transition hover:bg-[#43c6c8]/10"
          >
            {dict.home?.finalCtaSecondary}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-[#d5b162] hover:bg-[#2a2a2a]"
          >
            {dict.home?.finalCtaTertiary}
          </Link>
        </div>
      </section>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
