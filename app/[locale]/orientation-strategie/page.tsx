import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage from "../../../components/spotbulle/SpotBulleMarketingPage";
import LandingRevealTitle from "../../../components/spotbulle/LandingRevealTitle";

export default async function OrientationStrategiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const content = dict.marketingPages.orientationStrategie;

  return (
    <SpotBulleMarketingPage
      dict={dict}
      locale={resolvedLocale}
      content={content}
      bg2FullWidthRepeat
      preBookingVideoSrc="/videos/section4.mp4"
      preBookingMobileSection={
        <div className="pointer-events-auto relative h-[614px] w-full overflow-hidden">
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
      }
    />
  );
}
