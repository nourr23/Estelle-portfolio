import {
  landingSplitBandHeightPx,
  landingSplitBandTopPx,
} from "@/lib/landingBandGeometry";
import LandingBackground from "./LandingBackground";
import LandingEstelleBg2Band, {
  type LandingEstelleDict,
} from "./LandingEstelleBg2Band";
import LandingGenerationHero, {
  type LandingHeroDict,
} from "./LandingGenerationHero";
import LandingBg4RdvBand, { type LandingRdvFormDict } from "./LandingBg4RdvBand";
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
      <section className="relative isolate min-h-[max(55svh,calc(660px+1024px+614px+840px))]">
        <LandingBackground />
        <div
          className="pointer-events-none absolute inset-x-0 z-11"
          style={{
            top: landingSplitBandTopPx(0),
            height: landingSplitBandHeightPx(0),
          }}
        >
          <div className="pointer-events-auto relative h-full w-full">
            <div className="flex w-full justify-start px-0 pt-10 sm:px-4 sm:pt-14 md:px-[140px] md:pt-[76px]">
              <LandingGenerationHero
                dict={dict.landingHero}
                locale={locale}
                bookingDict={dict.booking ?? {}}
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-end pr-8 sm:pr-12 md:flex md:pr-20 lg:pr-28">
              <div className="max-w-[340px] rounded-2xl bg-[#0a3d40]/65 px-5 py-3 text-white/90 backdrop-blur-[1px]">
                <span className="block text-[24px] font-bold leading-tight">
                  Un premier aperçu, puis
                </span>
                <span className="mt-1 block text-[24px] font-normal leading-tight">
                  un accompagnement
                  <br />
                  sur mesure
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 z-11"
          style={{
            top: landingSplitBandTopPx(1),
            height: landingSplitBandHeightPx(1),
          }}
        >
          <div className="pointer-events-auto relative h-full w-full">
            <div className="mx-auto h-full min-h-0 max-w-[1232px] overflow-x-hidden overflow-y-auto px-2 sm:px-4 md:px-6">
              <LandingEstelleBg2Band dict={dict.landingEstelle} locale={locale} />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 z-11 flex items-center justify-center"
          style={{
            top: landingSplitBandTopPx(2),
            height: landingSplitBandHeightPx(2),
          }}
        >
          <div className="relative h-full w-full">
            <div className="flex h-full w-full items-center justify-center">
              <p className="select-none text-center text-[72px] font-bold leading-[0.9] text-white/40 md:text-[120px]">
                <span className="block">révèle</span>
                <span className="block">ton</span>
                <span className="block">potentiel</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 z-11"
          style={{
            top: landingSplitBandTopPx(3),
            height: landingSplitBandHeightPx(3),
          }}
        >
          <div className="pointer-events-auto relative h-full w-full">
            <div className="mx-auto h-full min-h-0 max-w-[1232px] overflow-x-hidden overflow-y-auto px-2 sm:px-4 md:px-6">
              <LandingBg4RdvBand dict={dict.landingRdvForm} locale={locale} />
            </div>
          </div>
        </div>
      </section>
      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
