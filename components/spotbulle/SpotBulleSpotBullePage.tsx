import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleSpotBullePage({
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
        <h1 className="text-3xl font-semibold text-[#1c1b19]">{dict.spotbullePage?.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#44423c]">{dict.spotbullePage?.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {dict.spotbullePage?.sections?.map((s: any) => (
            <section key={s.title} className="rounded-xl bg-[#111111] px-8 py-10 text-[#f7f1e3]">
              <h2 className="text-xl font-semibold text-[#d5b162]">{s.title}</h2>
              <p className="mt-4 leading-8 text-[#f7f1e3]/85">{s.body}</p>
              {s.bullets?.length ? (
                <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[#f7f1e3]/90">
                  {s.bullets.map((b: string) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={`${prefix}/contact`}
            className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {dict.spotbullePage?.ctaPrimary}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#0f6f70] transition hover:bg-[#43c6c8]/10"
          >
            {dict.spotbullePage?.ctaSecondary}
          </Link>
        </div>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}

