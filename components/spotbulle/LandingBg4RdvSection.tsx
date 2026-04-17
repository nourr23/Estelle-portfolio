import LandingBg4RdvBand, { type LandingRdvFormDict } from "./LandingBg4RdvBand";

export type { LandingRdvFormDict };

/**
 * Home “band 4”: full-width bg4 + bottom e1haut + decorative h1 + reservation form.
 * Reused on Qui suis-je and anywhere else the same block is needed.
 */
export default function LandingBg4RdvSection({
  dict,
  locale,
}: {
  dict: LandingRdvFormDict;
  locale: "fr" | "en";
}) {
  return (
    <div className="pointer-events-auto relative h-[840px] w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: "url('/images/backgrounds/bg4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-1 bg-no-repeat"
        style={{
          backgroundImage: "url('/images/backgrounds/e1haut.png')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          height: 547,
        }}
        aria-hidden
      />
      <img
        src="/images/backgrounds/h1.png"
        alt=""
        decoding="async"
        draggable={false}
        className="pointer-events-none absolute bottom-[60px] left-[-50px] z-2 h-auto w-[224px] select-none object-contain object-left"
        aria-hidden
      />
      <div className="relative h-full w-full">
        <div className="mx-auto h-full min-h-0 max-w-[1232px] overflow-x-hidden overflow-y-auto px-2 sm:px-4 md:px-6">
          <LandingBg4RdvBand dict={dict} locale={locale} />
        </div>
      </div>
    </div>
  );
}
