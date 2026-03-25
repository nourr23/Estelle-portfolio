import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleExperiencesPage({
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
        <h1 className="text-3xl font-semibold text-[#1c1b19]">{dict.experiencesPage?.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#44423c]">{dict.experiencesPage?.intro}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dict.experiencesPage?.cards?.map((c: any) => (
            <article key={c.title} className="rounded-xl bg-[#111111] px-6 py-8 text-[#f7f1e3] shadow-lg">
              <h2 className="text-lg font-semibold text-[#d5b162]">{c.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#f7f1e3]/85">{c.body}</p>
              {c.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-[#f7f1e3]/85">
                  {c.bullets.map((b: string) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              ) : null}
              <Link
                href={`${prefix}/contact`}
                className="mt-6 inline-block rounded-md border border-[#43c6c8]/60 px-5 py-2 text-sm font-semibold text-[#9ee4e5] hover:bg-[#43c6c8]/10"
              >
                {dict.experiencesPage?.cta}
              </Link>
            </article>
          ))}
        </div>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}

