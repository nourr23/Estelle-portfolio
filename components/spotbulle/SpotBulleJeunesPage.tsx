import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleJeunesPage({
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
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-[#43c6c8]">{dict.jeunesPage?.kicker}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {dict.jeunesPage?.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#f7f1e3]/85">
            {dict.jeunesPage?.intro}
          </p>
          <p className="mt-6 text-lg font-semibold text-[#d5b162]">{dict.jeunesPage?.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`${prefix}/contact`}
              className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {dict.nav?.book}
            </Link>
            <Link
              href={`${prefix}/experiences`}
              className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#9ee4e5] transition hover:bg-[#43c6c8]/10"
            >
              {dict.jeunesPage?.ctaExperiences}
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <section>
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.jeunesPage?.benefitsTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {dict.jeunesPage?.benefits?.map((b: string) => (
              <li key={b} className="rounded-md border border-[#d5b162]/25 bg-white/70 px-4 py-3 text-sm">
                {b}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-xl bg-[#111111] px-8 py-10 text-[#f7f1e3]">
          <h2 className="text-2xl font-semibold text-[#43c6c8]">{dict.jeunesPage?.experiencesTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#f7f1e3]/85">{dict.jeunesPage?.experiencesIntro}</p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-7 text-[#f7f1e3]/90">
            {dict.jeunesPage?.experiencesBullets?.map((line: string) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Link
            href={`${prefix}/experiences`}
            className="mt-8 inline-block rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#9ee4e5] hover:bg-[#43c6c8]/10"
          >
            {dict.jeunesPage?.ctaExperiences}
          </Link>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.jeunesPage?.spotbulleTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#44423c]">{dict.jeunesPage?.spotbulleBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`${prefix}/spotbulle`}
              className="rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-[#d5b162] hover:bg-[#2a2a2a]"
            >
              {dict.jeunesPage?.ctaSpotbulle}
            </Link>
            <Link
              href={`${prefix}/contact`}
              className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {dict.nav?.book}
            </Link>
          </div>
        </section>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}

