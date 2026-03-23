import React from "react";

export default function SpotBulleLanding({ dict }: { dict: any }) {
  return (
    <div className="min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]">
      <header className="sticky top-0 z-20 border-b border-[#d5b162]/25 bg-[#111111]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[#f7f1e3]">
          <div className="text-xl font-semibold tracking-[0.2em] text-[#d5b162]">
            {dict.nav?.home}
          </div>

          <nav className="hidden items-center gap-6 md:flex text-xs uppercase tracking-[0.16em] text-[#f7f1e3]/80">
            <a className="hover:text-[#43c6c8]" href="#about">
              {dict.nav?.about}
            </a>
            <a className="hover:text-[#43c6c8]" href="#journey">
              {dict.nav?.journey}
            </a>
            <a className="hover:text-[#43c6c8]" href="#programs">
              {dict.nav?.programmes}
            </a>
            <a className="hover:text-[#43c6c8]" href="#parents">
              {dict.nav?.parents}
            </a>
            <a className="hover:text-[#43c6c8]" href="#contact">
              {dict.nav?.contact}
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#111111] text-[#f7f1e3]">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f5efe4] to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs uppercase tracking-[0.22em] text-[#d5b162]">
            {dict.hero?.tagline}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {dict.hero?.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[#f7f1e3]/85">{dict.hero?.subtitle}</p>
          <p className="mt-2 text-sm text-[#f7f1e3]/70">{dict.hero?.meta}</p>
          <p className="mt-6 max-w-4xl text-[#f7f1e3]/85">{dict.hero?.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="rounded-md bg-[#d5b162] px-6 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {dict.hero?.cta}
            </a>
            <a
              href="#test"
              className="rounded-md border border-[#43c6c8]/60 px-6 py-3 text-sm font-semibold text-[#9ee4e5] transition hover:bg-[#43c6c8]/10"
            >
              {dict.hero?.secondary}
            </a>
          </div>
          <p className="mt-6 text-sm text-[#f7f1e3]/75">{dict.hero?.micro}</p>
          <p className="mt-1 text-sm text-[#9ee4e5]">{dict.hero?.guide}</p>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.about?.title}</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#43a9aa]">
          {dict.about?.estelleHeading}
        </p>
        <p className="mt-2 text-sm text-[#5f5a50]">{dict.about?.role}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.tone}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.portrait}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.immediate}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.pillars}</p>
        <p className="mt-4 text-sm font-semibold text-[#1f1d18]">{dict.about?.audiencesTitle}</p>
        <ul className="mt-2 list-disc pl-5 text-[#44423c]">
          {dict.about?.audiences?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-[#5f5a50]">{dict.about?.session}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.stays}</p>
        <p className="mt-6 max-w-3xl leading-8 text-[#44423c]">{dict.about?.intro}</p>
        <ul className="mt-8 grid gap-3 text-[#35332e] sm:grid-cols-2">
          {dict.about?.points?.map((point: string) => (
            <li
              key={point}
              className="rounded-md border border-[#d5b162]/30 bg-white/80 px-4 py-3 shadow-sm"
            >
              ✓ {point}
            </li>
          ))}
        </ul>
        <h3 className="mt-10 text-2xl font-semibold text-[#1c1b19]">{dict.about?.experienceTitle}</h3>
        <p className="mt-2 text-[#5f5a50]">{dict.about?.experienceSubtitle}</p>
        <p className="mt-4 leading-8 text-[#44423c]">{dict.about?.experienceBody}</p>
        <h4 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.about?.whyTitle}</h4>
        <p className="mt-2 leading-8 text-[#44423c]">{dict.about?.whyBody}</p>
        <h4 className="mt-6 text-xl font-semibold text-[#1f1d18]">{dict.about?.visionTitle}</h4>
        <p className="mt-2 leading-8 text-[#44423c]">{dict.about?.visionBody}</p>
        <h4 className="mt-6 text-xl font-semibold text-[#1f1d18]">{dict.about?.methodTitle}</h4>
        <p className="mt-2 leading-8 text-[#44423c]">{dict.about?.methodBody}</p>
        <ul className="mt-6 list-disc pl-5 text-[#44423c]">
          {dict.about?.stats?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.about?.timelineTitle}</h4>
        <ul className="mt-3 list-disc pl-5 text-[#44423c]">
          {dict.about?.timeline?.map((item: string) => (
            <li key={item} className="mt-1">
              {item}
            </li>
          ))}
        </ul>
        <h4 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.about?.docsTitle}</h4>
        <p className="mt-2 text-[#44423c]">{dict.about?.docsBody}</p>
        <ul className="mt-3 list-disc pl-5 text-[#44423c]">
          {dict.about?.docsLinks?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.about?.guaranteeTitle}</h4>
        <p className="mt-2 text-[#44423c]">{dict.about?.guaranteeBody}</p>
      </section>

      <section id="journey" className="bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.journey?.title}</h2>
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
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.programs?.title}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dict.programs?.items?.map((item: string) => (
            <li
              key={item}
              className="rounded-md border border-[#d5b162]/35 bg-[#fffdf8] px-4 py-3 text-sm text-[#3a372f]"
            >
              {item}
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.programs?.offerTitle}</h3>
        <p className="mt-2 text-[#44423c]">{dict.programs?.offerBody}</p>
        <p className="mt-4 font-medium text-[#1f1d18]">{dict.programs?.formatsTitle}</p>
        <ul className="mt-2 list-disc pl-5 text-[#44423c]">
          {dict.programs?.formats?.map((format: string) => (
            <li key={format}>{format}</li>
          ))}
        </ul>
      </section>

      <section id="parents" className="bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.parents?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.parents?.subtitle}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.parents?.cards?.map(
              (card: { title: string; items: string[] }) => (
                <article
                  key={card.title}
                  className="rounded-lg border border-[#d5b162]/35 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[#1f1d18]">{card.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#5f5a50]">
                    {card.items?.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section id="test" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.test?.title}</h2>
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

      <section className="bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.bridges?.title}</h2>
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.testimonials?.title}</h2>
        <p className="mt-2 text-[#5f5a50]">{dict.testimonials?.subtitle}</p>
        <p className="mt-4 text-[#44423c]">{dict.testimonials?.intro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {dict.testimonials?.items?.map(
            (item: { quote: string; name: string; role: string }, idx: number) => (
              <article key={`${item.name}-${idx}`} className="rounded-lg border border-[#d5b162]/35 bg-white p-5">
                <p className="text-sm leading-7 text-[#44423c]">“{item.quote}”</p>
                <p className="mt-4 font-medium text-[#1f1d18]">{item.name}</p>
                <p className="text-sm text-[#5f5a50]">{item.role}</p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.pricing?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.pricing?.subtitle}</p>
          <p className="mt-4 text-[#44423c]">{dict.pricing?.intro}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {dict.pricing?.offers?.map((offer: { title: string; text: string }) => (
              <article key={offer.title} className="rounded-lg border border-[#d5b162]/35 bg-white p-5">
                <h3 className="text-lg font-semibold text-[#1f1d18]">{offer.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5f5a50]">{offer.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 font-medium text-[#0f6f70]">{dict.pricing?.cta}</p>
        </div>
      </section>

      <section id="booking" className="bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.booking?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.booking?.subtitle}</p>
          <p className="mt-2 text-[#5f5a50]">{dict.booking?.intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {dict.booking?.tags?.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-[#d5b162]/50 bg-white px-3 py-1 text-sm text-[#3a372f]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold tracking-[0.12em] text-[#1f1d18]">
            {dict.booking?.slotsTitle}
          </p>
          <div className="mt-2 flex gap-3 text-sm text-[#5f5a50]">
            {dict.booking?.days?.map((day: string) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-6 grid max-w-md grid-cols-3 gap-2">
            {dict.booking?.slots?.map((slot: string) => (
              <button
                key={slot}
                type="button"
                className="rounded-md border border-[#43c6c8]/40 bg-white px-3 py-2 text-sm text-[#0f6f70] transition hover:bg-[#43c6c8]/10"
              >
                {slot}
              </button>
            ))}
          </div>
          <p className="mt-4 font-medium text-[#0f6f70]">{dict.booking?.cta}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.gallery?.title}</h2>
        <p className="mt-2 text-[#5f5a50]">{dict.gallery?.subtitle}</p>
        <p className="mt-4 text-[#44423c]">{dict.gallery?.intro}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dict.gallery?.items?.map((item: string, idx: number) => (
            <div
              key={`${item}-${idx}`}
              className="flex h-28 items-center justify-center rounded-md border border-[#d5b162]/35 bg-white text-sm text-[#5f5a50]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="border-t border-[#d5b162]/30 bg-[#101010]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#f7f1e3]/80">
          <p className="font-medium uppercase tracking-[0.15em] text-[#d5b162]">
            {dict.footer?.contact}
          </p>
          <p className="mt-2">{dict.footer?.line}</p>
          <p className="mt-1">{dict.footer?.phone}</p>
          <p className="mt-1">{dict.footer?.location}</p>
          <p className="mt-1">{dict.footer?.site}</p>
        </div>
      </footer>
    </div>
  );
}

