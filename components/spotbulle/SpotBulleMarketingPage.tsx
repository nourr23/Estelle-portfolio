import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

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
}: {
  dict: { nav: Record<string, string>; footer: Record<string, string> };
  locale: "fr" | "en";
  content: MarketingPageContent;
}) {
  const prefix = `/${locale}`;

  const secondaryHref =
    content.secondaryCta?.href ??
    (content.secondaryCta?.hrefKey === "contact" ? `${prefix}/contact` : undefined);

  return (
    <div className="min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]">
      <SpotBulleHeader dict={dict} locale={locale} />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="text-sm text-[#5f5a50]">
          <Link className="text-[#0f6f70] hover:underline" href={prefix}>
            {dict.nav.home}
          </Link>
          {" / "}
          {content.breadcrumbLabel}
        </p>

        <h1 className="mt-6 text-3xl font-semibold text-[#1c1b19] md:text-4xl">{content.title}</h1>

        {content.lead ? (
          <p className="mt-4 text-lg leading-relaxed text-[#35332e]">{content.lead}</p>
        ) : null}

        {content.sections.map((section, idx) => {
          const paragraphs = section.paragraphs?.filter((p) => p.trim().length > 0) ?? [];
          const hasBody =
            Boolean(section.title) ||
            paragraphs.length > 0 ||
            (section.bullets && section.bullets.length > 0) ||
            Boolean(section.quote);

          if (!hasBody) return null;

          return (
            <section
              key={`${section.title ?? "section"}-${idx}`}
              className="mt-10 border-t border-[#d5b162]/20 pt-8 first-of-type:border-t-0 first-of-type:pt-0"
            >
              {section.title ? (
                <h2 className="text-xl font-semibold text-[#1f1d18] md:text-2xl">{section.title}</h2>
              ) : null}
              {paragraphs.map((p, pi) => (
                <p key={`${idx}-p-${pi}`} className="mt-3 leading-8 text-[#44423c]">
                  {p}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[#44423c]">
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {section.quote ? (
                <blockquote className="mt-6 border-l-4 border-[#43a9aa]/60 pl-4 text-lg italic text-[#35332e]">
                  {section.quote}
                </blockquote>
              ) : null}
            </section>
          );
        })}

        {(content.cta || (content.secondaryCta && secondaryHref)) && (
          <div className="mt-12 flex flex-col gap-4 rounded-xl border border-[#d5b162]/35 bg-white/70 p-6 shadow-sm">
            {content.cta ? (
              <>
                <Link
                  href={`${prefix}/contact`}
                  className="inline-flex w-fit items-center rounded-md bg-[#0f6f70] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d5a5b]"
                >
                  {content.cta.label}
                </Link>
                {content.cta.hint ? <p className="text-sm text-[#5f5a50]">{content.cta.hint}</p> : null}
              </>
            ) : null}
            {content.secondaryCta && secondaryHref ? (
              <>
                <Link
                  href={secondaryHref}
                  className="inline-flex w-fit items-center rounded-md border border-[#d5b162] bg-[#fffaf1] px-5 py-3 text-sm font-semibold text-[#1f1d18] transition hover:bg-white"
                >
                  {content.secondaryCta.label}
                </Link>
                {content.secondaryCta.hint ? (
                  <p className="text-sm text-[#5f5a50]">{content.secondaryCta.hint}</p>
                ) : null}
              </>
            ) : null}
          </div>
        )}
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
