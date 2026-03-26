import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleParentsPage({
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

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h1 className="text-3xl font-semibold text-[#1c1b19]">{dict.parentsPage?.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#44423c]">{dict.parentsPage?.intro}</p>

        <section className="mt-12 rounded-xl bg-[#111111] px-8 py-10 text-[#f7f1e3]">
          <h2 className="text-xl font-semibold text-[#d5b162]">{dict.parentsPage?.solutionTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#f7f1e3]/85">{dict.parentsPage?.solutionBody}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {dict.parentsPage?.solutionBullets?.map((b: string) => (
              <li key={b} className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm">
                ✓ {b}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-[#1f1d18]">{dict.parentsPage?.offersTitle}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {dict.parentsPage?.offers?.map((o: any) => (
              <article key={o.title} className="rounded-xl bg-[#111111] px-6 py-8 text-[#f7f1e3] shadow-lg">
                <h3 className="text-lg font-semibold text-[#d5b162]">{o.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-[#f7f1e3]/85">
                  {o.bullets?.map((b: string) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm font-semibold text-[#43c6c8]">{o.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-[#d5b162]/35 bg-white p-8">
          <h2 className="text-xl font-semibold text-[#1c1b19]">{dict.parentsPage?.proofTitle}</h2>
          <p className="mt-4 text-[#44423c]">{dict.parentsPage?.proofBody}</p>
        </section>

        <section className="mt-12 border-t border-[#d5b162]/25 pt-12">
          <h2 className="text-xl font-semibold text-[#1c1b19]">{dict.parentsPage?.pricingTitle}</h2>
          <p className="mt-4 text-[#44423c]">{dict.parentsPage?.pricingBody}</p>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={`${prefix}/contact`}
            className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {dict.nav?.book}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#0f6f70] transition hover:bg-[#43c6c8]/10"
          >
            {dict.parentsPage?.ctaQuote}
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#5f5a50]">
          <Link className="text-[#0f6f70] underline" href={`${prefix}/a-propos#documents`}>
            {dict.parentsPage?.ctaProof}
          </Link>
        </p>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}

