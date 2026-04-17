import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader, { type LandingPromoDict } from "./SpotBulleHeader";
import type { BookingModalDict } from "./SpotBulleBookingModal";
import LandingBg4RdvSection, { type LandingRdvFormDict } from "./LandingBg4RdvSection";

export type MarketingSection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
};

export type MarketingPageContent = {
  title: string;
  breadcrumbLabel: string;
  lead?: string;
  sections: MarketingSection[];
  cta?: { label: string; hint?: string };
  secondaryCta?: { label: string; hint?: string; href?: string; hrefKey?: string };
};

export default function SpotBulleMarketingPage({
  dict,
  locale,
  content,
  bg2FullWidthRepeat,
}: {
  dict: {
    nav: Record<string, string>;
    footer: Record<string, string>;
    landingHeader: LandingPromoDict;
    booking?: BookingModalDict;
    landingRdvForm: LandingRdvFormDict;
  };
  locale: "fr" | "en";
  content: MarketingPageContent;
  /** Home-like `bg2` band: cover background, hero title + frosted section cards. */
  bg2FullWidthRepeat?: boolean;
}) {
  const prefix = `/${locale}`;

  const secondaryHref =
    content.secondaryCta?.href ??
    (content.secondaryCta?.hrefKey === "contact" ? `${prefix}/contact` : undefined);

  const mainClassName = "mx-auto max-w-3xl px-6 py-16 md:py-20";

  const t = bg2FullWidthRepeat
    ? null
    : {
        breadcrumb: "text-sm text-[#5f5a50]",
        link: "text-[#0f6f70] hover:underline",
        h1: "mt-6 text-3xl font-semibold text-[#1c1b19] md:text-4xl",
        lead: "mt-4 text-lg leading-relaxed text-[#35332e]",
        section: "mt-10 border-t border-[#d5b162]/20 pt-8 first-of-type:border-t-0 first-of-type:pt-0",
        h2: "text-xl font-semibold text-[#1f1d18] md:text-2xl",
        body: "mt-3 leading-8 text-[#44423c]",
        list: "mt-3 list-disc space-y-2 pl-5 text-[#44423c]",
        quote: "mt-6 border-l-4 border-[#43a9aa]/60 pl-4 text-lg italic text-[#35332e]",
        ctaBox: "mt-12 flex flex-col gap-4 rounded-xl border border-[#d5b162]/35 bg-white/70 p-6 shadow-sm",
        ctaHint: "text-sm text-[#5f5a50]",
        ctaPrimary:
          "inline-flex w-fit items-center rounded-md bg-[#0f6f70] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d5a5b]",
        ctaSecondary:
          "inline-flex w-fit items-center rounded-md border border-[#d5b162] bg-[#fffaf1] px-5 py-3 text-sm font-semibold text-[#1f1d18] transition hover:bg-white",
      };

  const creamMainInner = t ? (
    <>
      <p className={t.breadcrumb}>
        <Link className={t.link} href={prefix}>
          {dict.nav.home}
        </Link>
        {" / "}
        {content.breadcrumbLabel}
      </p>

      <h1 className={t.h1}>{content.title}</h1>

      {content.lead ? <p className={t.lead}>{content.lead}</p> : null}

      {content.sections.map((section, idx) => {
        const paragraphs = section.paragraphs?.filter((p) => p.trim().length > 0) ?? [];
        const hasBody =
          Boolean(section.title) ||
          paragraphs.length > 0 ||
          (section.bullets && section.bullets.length > 0) ||
          Boolean(section.quote);

        if (!hasBody) return null;

        return (
          <section key={`${section.title ?? "section"}-${idx}`} className={t.section}>
            {section.title ? <h2 className={t.h2}>{section.title}</h2> : null}
            {paragraphs.map((p, pi) => (
              <p key={`${idx}-p-${pi}`} className={t.body}>
                {p}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className={t.list}>
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
            {section.quote ? <blockquote className={t.quote}>{section.quote}</blockquote> : null}
          </section>
        );
      })}

      {(content.cta || (content.secondaryCta && secondaryHref)) && (
        <div className={t.ctaBox}>
          {content.cta ? (
            <>
              <Link href={`${prefix}/contact`} className={t.ctaPrimary}>
                {content.cta.label}
              </Link>
              {content.cta.hint ? <p className={t.ctaHint}>{content.cta.hint}</p> : null}
            </>
          ) : null}
          {content.secondaryCta && secondaryHref ? (
            <>
              <Link href={secondaryHref} className={t.ctaSecondary}>
                {content.secondaryCta.label}
              </Link>
              {content.secondaryCta.hint ? (
                <p className={t.ctaHint}>{content.secondaryCta.hint}</p>
              ) : null}
            </>
          ) : null}
        </div>
      )}
    </>
  ) : null;

  const bg2MainInner = (
    <div className="relative z-10 mx-auto flex max-w-[1232px] flex-col gap-6 px-3 py-6 sm:px-5 sm:py-8 md:gap-8 md:px-10 md:py-10 lg:px-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
        <Link className="text-[#B6F0EA] transition hover:text-white" href={prefix}>
          {dict.nav.home}
        </Link>
        <span className="text-white/40"> / </span>
        <span className="text-white/80">{content.breadcrumbLabel}</span>
      </p>

      <div className="min-w-0 space-y-2 md:space-y-3">
        <h1 className="font-black leading-[0.92] tracking-tight text-white max-md:text-[40px] max-md:leading-none md:text-[56px] lg:text-[72px]">
          {content.title}
        </h1>
        {content.lead ? (
          <p className="pt-1 text-[17px] font-bold leading-snug text-[#022636] md:text-[22px]">
            {content.lead}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 md:gap-5">
        {content.sections.map((section, idx) => {
          const paragraphs = section.paragraphs?.filter((p) => p.trim().length > 0) ?? [];
          const hasBody =
            Boolean(section.title) ||
            paragraphs.length > 0 ||
            (section.bullets && section.bullets.length > 0) ||
            Boolean(section.quote);

          if (!hasBody) return null;

          return (
            <article
              key={`${section.title ?? "section"}-${idx}`}
              className="rounded-2xl border border-white/12 bg-[#0a3d40]/55 px-4 py-4 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:px-6 md:py-5"
            >
              {section.title ? (
                <h2 className="text-[17px] font-bold leading-tight text-[#B6F0EA] md:text-[22px]">
                  {section.title}
                </h2>
              ) : null}
              {paragraphs.map((p, pi) => (
                <p
                  key={`${idx}-p-${pi}`}
                  className="mt-3 text-[13px] leading-relaxed text-white/88 md:text-[15px]"
                >
                  {p}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-snug text-white/88 marker:text-[#B6F0EA] md:text-[15px]">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {section.quote ? (
                <blockquote className="mt-4 border-l-4 border-[#B6F0EA]/70 pl-4 text-[14px] italic leading-relaxed text-white/92 md:text-[15px]">
                  {section.quote}
                </blockquote>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={
        bg2FullWidthRepeat
          ? "min-h-screen bg-[#062a2c] font-sans text-[#f7f1e3]"
          : "min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]"
      }
    >
      <SpotBulleHeader dict={dict} locale={locale} />

      {bg2FullWidthRepeat ? (
        <>
          <div className="relative isolate w-full pb-16">
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/backgrounds/bg2.png')] bg-cover bg-center bg-no-repeat"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 z-1 bg-no-repeat"
              style={{
                backgroundImage: "url('/images/backgrounds/e0haut.png')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                height: 437,
              }}
              aria-hidden
            />
            <main className="relative z-10 w-full">{bg2MainInner}</main>
          </div>
          <LandingBg4RdvSection dict={dict.landingRdvForm} locale={locale} />
        </>
      ) : (
        <main className={mainClassName}>{creamMainInner}</main>
      )}

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
