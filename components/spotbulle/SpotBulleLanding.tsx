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
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.about?.title}</h2>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#43a9aa]">
          {dict.about?.estelleHeading}
        </p>
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

      <section id="booking" className="bg-[#fffaf1]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold text-[#1c1b19]">{dict.booking?.title}</h2>
          <p className="mt-2 text-[#5f5a50]">{dict.booking?.subtitle}</p>
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
        </div>
      </section>

      <footer id="contact" className="border-t border-[#d5b162]/30 bg-[#101010]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#f7f1e3]/80">
          <p className="font-medium uppercase tracking-[0.15em] text-[#d5b162]">
            {dict.footer?.contact}
          </p>
          <p className="mt-2">{dict.footer?.line}</p>
          <p className="mt-1">{dict.footer?.phone}</p>
        </div>
      </footer>
    </div>
  );
}

