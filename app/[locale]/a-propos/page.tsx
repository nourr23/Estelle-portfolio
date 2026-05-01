import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage, {
  type MarketingPageContent,
} from "../../../components/spotbulle/SpotBulleMarketingPage";

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const about = dict.about;

  const content: MarketingPageContent = {
    title: about?.title ?? "",
    breadcrumbLabel: about?.title ?? "",
    lead: about?.intro ?? "",
    sections: [
      {
        title: resolvedLocale === "fr" ? "Diplôme" : "Diploma",
        imageSrc: "/images/diplome.jpeg",
        imageAlt: resolvedLocale === "fr" ? "Diplôme d'Estelle" : "Estelle diploma",
      },
      {
        title: about?.estelleHeading,
        paragraphs: [about?.role, about?.tone].filter(Boolean),
      },
      {
        title: about?.audiencesTitle,
        paragraphs: [about?.immediate, about?.pillars, about?.session, about?.stays].filter(Boolean),
        bullets: about?.audiences ?? [],
      },
      {
        title: about?.experienceTitle,
        paragraphs: [about?.experienceSubtitle, about?.experienceBody].filter(Boolean),
      },
      {
        title: about?.whyTitle,
        paragraphs: [about?.whyBody].filter(Boolean),
      },
      {
        title: about?.visionTitle,
        paragraphs: [about?.visionBody].filter(Boolean),
      },
      {
        title: about?.methodTitle,
        paragraphs: [about?.methodBody].filter(Boolean),
        bullets: about?.stats ?? [],
      },
      {
        title: about?.timelineTitle,
        bullets: about?.timeline ?? [],
      },
      {
        title: about?.guaranteeTitle,
        paragraphs: [about?.guaranteeBody].filter(Boolean),
      },
    ],
  };

  return (
    <SpotBulleMarketingPage
      dict={dict}
      locale={resolvedLocale}
      content={content}
      bg2FullWidthRepeat
      hideBg4BookingSection
    />
  );
}
