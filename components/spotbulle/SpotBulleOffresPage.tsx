import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleOffresPage({
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
        <p className="text-sm text-[#5f5a50]">
          <Link className="text-[#0f6f70] hover:underline" href={prefix}>
            {dict.nav?.home}
          </Link>
          {" / "}
          {dict.offresPage?.title}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#1c1b19]">{dict.offresPage?.title}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#44423c]">{dict.offresPage?.intro}</p>

        <div className="mt-12 space-y-12">
          {dict.offresPage?.buckets?.map(
            (bucket: { title: string; items: string[] }) => (
              <section key={bucket.title}>
                <h2 className="text-xl font-semibold text-[#1f1d18]">{bucket.title}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {bucket.items?.map((item: string) => (
                    <li
                      key={item}
                      className="rounded-md border border-[#d5b162]/35 bg-white px-4 py-2 text-sm text-[#3a372f]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )
          )}
        </div>

        <section
          id="jeunes"
          className="mt-16 scroll-mt-24 rounded-xl border-2 border-[#43c6c8]/35 bg-[#111111] px-6 py-10 text-[#f7f1e3] md:px-10"
        >
          <h2 className="text-2xl font-semibold text-[#43c6c8]">
            {dict.offresPage?.jeunes?.title}
          </h2>
          <p className="mt-2 text-lg font-medium text-[#d5b162]">
            {dict.offresPage?.jeunes?.tagline}
          </p>
          <p className="mt-4 max-w-3xl leading-8 text-[#f7f1e3]/85">
            {dict.offresPage?.jeunes?.intro}
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-7 text-[#f7f1e3]/90">
            {dict.offresPage?.jeunes?.bullets?.map((line: string) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Link
            href={`${prefix}/reservation`}
            className="mt-8 inline-block rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {dict.offresPage?.jeunes?.ctaReservation}
          </Link>
        </section>

        <section className="mt-16 border-t border-[#d5b162]/25 pt-16">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.journey?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.journey?.subtitle}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.journey?.steps?.map(
              (step: { title: string; text: string }, index: number) => (
                <article
                  key={step.title}
                  className="rounded-lg border border-[#d5b162]/35 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold tracking-[0.15em] text-[#43a9aa]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-[#1f1d18]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5f5a50]">{step.text}</p>
                </article>
              )
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.programs?.title}</h2>
          <h3 className="mt-6 text-lg font-semibold text-[#1f1d18]">{dict.programs?.offerTitle}</h3>
          <p className="mt-2 text-[#44423c]">{dict.programs?.offerBody}</p>
          <p className="mt-4 font-medium text-[#1f1d18]">{dict.programs?.formatsTitle}</p>
          <ul className="mt-2 list-disc pl-5 text-[#44423c]">
            {dict.programs?.formats?.map((format: string) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </section>

        <section
          id="parents"
          className="mt-16 scroll-mt-24 bg-[#fffaf1] px-4 py-10 md:px-8"
        >
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.parents?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.parents?.subtitle}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dict.parents?.cards?.map((card: { title: string; items: string[] }) => (
              <article
                key={card.title}
                className="rounded-lg border border-[#d5b162]/35 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#1f1d18]">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#5f5a50]">
                  {card.items?.map((item: string) => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="test" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.test?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.test?.subtitle}</p>
          <p className="mt-2 text-[#5f5a50]">{dict.test?.body}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.test?.elements?.map((element: { name: string; text: string }) => (
              <article
                key={element.name}
                className="rounded-lg border border-[#43c6c8]/30 bg-white p-4"
              >
                <h3 className="text-lg font-semibold text-[#0f6f70]">{element.name}</h3>
                <p className="mt-2 text-sm text-[#5f5a50]">{element.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.bridges?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.bridges?.subtitle}</p>
          <p className="mt-4 leading-8 text-[#44423c]">{dict.bridges?.intro}</p>
          <ul className="mt-4 list-disc pl-5 text-[#44423c]">
            {dict.bridges?.points?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.bridges?.opennessTitle}</h3>
          <p className="mt-2 leading-8 text-[#44423c]">{dict.bridges?.opennessBody1}</p>
          <p className="mt-2 leading-8 text-[#44423c]">{dict.bridges?.opennessBody2}</p>
        </section>

        <section className="mt-16 rounded-lg border border-[#d5b162]/35 bg-white p-8">
          <h2 className="text-xl font-semibold text-[#1c1b19]">{dict.testimonials?.title}</h2>
          <p className="mt-4 text-[#44423c]">{dict.testimonials?.comingSoon}</p>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-[#1c1b19]">{dict.pricing?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.pricing?.subtitle}</p>
          <p className="mt-4 text-[#44423c]">{dict.pricing?.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.pricing?.offers?.map((offer: { title: string; text: string }) => (
              <article
                key={offer.title}
                className="rounded-lg border border-[#d5b162]/35 bg-[#fffaf1] p-5"
              >
                <h3 className="text-lg font-semibold text-[#1f1d18]">{offer.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5f5a50]">{offer.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 font-medium text-[#0f6f70]">{dict.pricing?.cta}</p>
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-[#1c1b19]">{dict.gallery?.title}</h2>
          <p className="mt-4 text-[#5f5a50]">{dict.gallery?.comingSoon}</p>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href={`${prefix}/reservation`}
            className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010]"
          >
            {dict.hero?.cta}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#0f6f70]"
          >
            {dict.nav?.contact}
          </Link>
        </div>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
