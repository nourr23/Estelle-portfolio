import LandingEstelleBg2Band, {
  type LandingEstelleDict,
} from "./LandingEstelleBg2Band";
import LandingGenerationHero, {
  type LandingHeroDict,
} from "./LandingGenerationHero";
import LandingBg4RdvSection from "./LandingBg4RdvSection";
import LandingRevealTitle from "./LandingRevealTitle";
import type { LandingRdvFormDict } from "./LandingBg4RdvBand";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";
import type { BookingModalDict } from "./SpotBulleBookingModal";

export type LandingHeaderDict = {
  headline: string;
  subline: string;
  ctaRdv: string;
};

export type SpotBulleHomeDict = {
  nav: Record<string, string>;
  footer: Record<string, string>;
  landingHeader: LandingHeaderDict;
  landingHero: LandingHeroDict;
  landingEstelle: LandingEstelleDict;
  landingRdvForm: LandingRdvFormDict;
  landingBg1Badge: {
    line1: string;
    line2: string;
    line3: string;
  };
  landingReveal: {
    line1: string;
    line2: string;
    line3: string;
  };
  booking?: BookingModalDict;
};

/**
 * Landing (step 1): new header only — rest of page cleared until design is rolled out section by section.
 */
export default function SpotBulleHome({
  dict,
  locale,
}: {
  dict: SpotBulleHomeDict;
  locale: "fr" | "en";
}) {
  return (
    <div className="bg-[#062a2c] font-sans text-[#f7f1e3]">
      <SpotBulleHeader dict={dict} locale={locale} />
      <section className="relative isolate">
        <div className="pointer-events-auto relative h-[1100px] w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: "url('/images/backgrounds/bg1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-1 bg-no-repeat"
            style={{
              backgroundImage: "url('/images/backgrounds/e0haut.png')",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              height: 437,
            }}
            aria-hidden
          />
          {/* <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[56%] opacity-5 bg-no-repeat opacity-85"
            style={{
              backgroundImage: "url('/images/backgrounds/animatedmoons.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "right center",
            }}
            aria-hidden
          /> */}
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
              <LandingEstelleBg2Band dict={dict.landingEstelle} locale={locale} />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto relative h-[664px] w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: "url('/images/backgrounds/bg2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-2 bg-no-repeat"
            style={{
              backgroundImage: "url('/images/backgrounds/e1haut.png')",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              height: 547,
            }}
            aria-hidden
          />
          <div className="flex w-full justify-start px-0 pt-10 sm:px-4 sm:pt-14 md:px-[140px] md:pt-[76px]">
            <LandingGenerationHero
              dict={dict.landingHero}
              locale={locale}
              bookingDict={dict.booking ?? {}}
            />
          </div>
          <div className="absolute right-0 bottom-3 rounded-tl-3xl rounded-bl-3xl bg-[#0a3d40]/65 pl-5 pr-14 py-3 text-white/90 backdrop-blur-[1px]">
            <span className="block text-[18px] font-bold leading-tight md:text-[24px]">
              {dict.landingBg1Badge.line1}
            </span>
            <span className="mt-1 block text-[18px] font-normal leading-tight md:text-[24px]">
              {dict.landingBg1Badge.line2}
              <br />
              {dict.landingBg1Badge.line3}
            </span>
          </div>
        </div>

        <div className="pointer-events-auto relative h-[614px] w-full overflow-hidden md:hidden">
          <div
            className="pointer-events-none absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: "url('/images/backgrounds/bg3.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div className="relative h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <LandingRevealTitle
                line1={dict.landingReveal.line1}
                line2={dict.landingReveal.line2}
                line3={dict.landingReveal.line3}
              />
            </div>
          </div>
        </div>

        <div className="pointer-events-auto relative hidden h-[680px] w-full overflow-hidden bg-[#062a2c] md:block">
          <div className="flex h-full w-full items-center justify-center">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/videos/section4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <LandingBg4RdvSection dict={dict.landingRdvForm} locale={locale} />
      </section>
      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
