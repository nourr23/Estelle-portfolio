import LandingBackground from "./LandingBackground";
import LandingGenerationHero, {
  type LandingHeroDict,
} from "./LandingGenerationHero";
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
      <SpotBulleHeader
        dict={dict}
        locale={locale}
        landingPromo={dict.landingHeader}
        bookingDict={dict.booking ?? {}}
      />
      <section className="relative isolate min-h-[max(55svh,calc(660px+630px+614px+840px))]">
        <LandingBackground />
        <div className="relative z-10 flex w-full justify-start px-0 pt-10 sm:px-4 sm:pt-14 md:px-[140px] md:pt-[76px]">
          <LandingGenerationHero
            dict={dict.landingHero}
            locale={locale}
            bookingDict={dict.booking ?? {}}
          />
        </div>
      </section>
    </div>
  );
}
