import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleHome({
  dict,
  locale,
}: {
  dict: any;
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;

  return (
    <div className="min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]">
      <SpotBulleHeader dict={dict} locale={locale} />

      <section className="relative overflow-hidden bg-[#111111] text-[#f7f1e3]">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f5efe4] to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-[#d5b162]">
            {dict.hero?.tagline}
          </p>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-[#f7f1e3] md:text-xl">
            {dict.home?.positioning}
          </p>
          <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            {dict.hero?.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d5b162]">
            {dict.home?.parentLine}
          </p>
          <p className="mt-4 max-w-3xl text-[#f7f1e3]/85">{dict.hero?.subtitle}</p>
          <p className="mt-2 text-sm text-[#f7f1e3]/70">{dict.hero?.meta}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`${prefix}/reservation`}
              className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {dict.hero?.cta}
            </Link>
            <Link
              href={`${prefix}/offres#test`}
              className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#9ee4e5] transition hover:bg-[#43c6c8]/10"
            >
              {dict.hero?.secondary}
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#f7f1e3]/75">{dict.hero?.micro}</p>
          <p className="mt-1 text-sm text-[#9ee4e5]">{dict.hero?.guide}</p>
        </div>
      </section>

      <section className="border-b border-[#d5b162]/20 bg-[#f5efe4]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1b19]">
            {dict.personas?.sectionTitle}
          </h2>
          <p className="mt-2 text-center text-sm text-[#5f5a50]">
            {dict.personas?.sectionSubtitle}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="flex flex-col justify-between rounded-xl border-2 border-[#111111] bg-[#111111] px-8 py-10 shadow-lg">
              <div>
                <h3 className="text-xl font-semibold tracking-wide text-[#d5b162]">
                  {dict.personas?.parent?.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#f7f1e3]/90">
                  {dict.personas?.parent?.body}
                </p>
              </div>
              <Link
                href={`${prefix}/offres#${dict.personas?.parent?.anchor ?? "parents"}`}
                className="mt-8 inline-flex w-fit rounded-md bg-[#d5b162] px-5 py-2.5 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
              >
                {dict.personas?.parent?.cta}
              </Link>
            </article>
            <article className="flex flex-col justify-between rounded-xl border-2 border-[#43c6c8]/50 bg-[#111111] px-8 py-10 shadow-lg">
              <div>
                <h3 className="text-xl font-semibold tracking-wide text-[#43c6c8]">
                  {dict.personas?.student?.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#f7f1e3]/90">
                  {dict.personas?.student?.body}
                </p>
              </div>
              <Link
                href={`${prefix}/offres#${dict.personas?.student?.anchor ?? "jeunes"}`}
                className="mt-8 inline-flex w-fit rounded-md border border-[#43c6c8] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#9ee4e5] transition hover:bg-[#43c6c8]/15"
              >
                {dict.personas?.student?.cta}
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1b19]">
          {dict.home?.offersSectionTitle}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {dict.home?.offers?.map((offer: { title: string; text: string }) => (
              <article
                key={offer.title}
                className="flex min-h-[200px] flex-col justify-between rounded-lg bg-[#111111] px-6 py-8 text-center shadow-lg"
              >
                <h3 className="text-lg font-semibold tracking-wide text-[#d5b162]">
                  {offer.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#f7f1e3]/85">
                  {offer.text}
                </p>
                <Link
                  href={`${prefix}/offres`}
                  className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#43c6c8] hover:text-[#9ee4e5]"
                >
                  {dict.home?.offersDetailCta}
                </Link>
              </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d5b162]/25 bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">
            {dict.home?.journeyTeaserTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-[#5f5a50]">
            {dict.home?.journeyTeaserSubtitle}
          </p>
          <Link
            href={`${prefix}/offres`}
            className="mt-6 inline-block rounded-md border border-[#d5b162]/50 bg-white px-5 py-2 text-sm font-semibold text-[#1f1d18] hover:bg-[#f5efe4]"
          >
            {dict.home?.journeyTeaserCta}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.about?.title}</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#43a9aa]">
          {dict.about?.estelleHeading}
        </p>
        <p className="mt-6 max-w-3xl leading-8 text-[#44423c]">{dict.home?.aboutTeaser}</p>
        <Link
          href={`${prefix}/a-propos`}
          className="mt-8 inline-block rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-[#d5b162] hover:bg-[#2a2a2a]"
        >
          {dict.home?.readAboutCta}
        </Link>
      </section>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
