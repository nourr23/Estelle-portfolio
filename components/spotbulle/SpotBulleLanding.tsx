import React from "react";

export default function SpotBulleLanding({ dict }: { dict: any }) {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-foreground dark:bg-black">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <div className="text-lg font-semibold tracking-wide">
            {dict.nav?.home}
          </div>

          <nav className="hidden items-center gap-6 md:flex text-sm text-white/90">
            <a className="hover:text-white" href="#about">
              {dict.nav?.about}
            </a>
            <a className="hover:text-white" href="#journey">
              {dict.nav?.journey}
            </a>
            <a className="hover:text-white" href="#programs">
              {dict.nav?.programmes}
            </a>
            <a className="hover:text-white" href="#parents">
              {dict.nav?.parents}
            </a>
            <a className="hover:text-white" href="#contact">
              {dict.nav?.contact}
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm text-white/70">{dict.hero?.tagline}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight">
            {dict.hero?.title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="rounded-md bg-yellow-400 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-300"
            >
              {dict.hero?.cta}
            </a>
            <a
              href="#test"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
            >
              {dict.hero?.secondary}
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold">{dict.about?.title}</h2>
        <p className="mt-2 text-zinc-600">{dict.about?.estelleHeading}</p>
        <p className="mt-6 max-w-3xl text-zinc-600">
          Placeholder for the “À propos / Estelle Drion” text. We’ll plug in the full
          story from your provided content in the next iteration.
        </p>
      </section>

      <section id="journey" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Journey</h2>
          <p className="mt-2 text-zinc-600">
            Placeholder for your “Parcours SpotBulle” section.
          </p>
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold">{dict.programs?.title}</h2>
        <p className="mt-2 text-zinc-600">
          Placeholder for premium program blocks and bullet lists.
        </p>
      </section>

      <section id="parents" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">{dict.parents?.title}</h2>
          <p className="mt-2 text-zinc-600">
            Placeholder for parent benefits and offerings.
          </p>
        </div>
      </section>

      <section id="test" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Test des 4 éléments</h2>
        <p className="mt-2 text-zinc-600">
          Placeholder for Feu / Air / Eau / Terre cards.
        </p>
      </section>

      <section id="booking" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">{dict.booking?.title}</h2>
          <p className="mt-2 text-zinc-600">{dict.booking?.subtitle}</p>
          <p className="mt-6 text-zinc-600">
            Placeholder for booking form / slots grid.
          </p>
        </div>
      </section>

      <footer id="contact" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-600">
          {dict.footer?.contact} - Footer placeholder
        </div>
      </footer>
    </div>
  );
}

