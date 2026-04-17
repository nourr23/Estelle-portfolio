import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage, {
  type MarketingPageContent,
} from "../../../components/spotbulle/SpotBulleMarketingPage";

export default async function JeunesPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const jeunes = dict.jeunesPage;

  const content: MarketingPageContent = {
    title: jeunes?.title ?? "",
    breadcrumbLabel: jeunes?.title ?? "",
    lead: jeunes?.intro ?? "",
    sections: [
      {
        title: jeunes?.benefitsTitle,
        paragraphs: [jeunes?.tagline].filter(Boolean),
        bullets: jeunes?.benefits ?? [],
      },
      {
        title: jeunes?.experiencesTitle,
        paragraphs: [jeunes?.experiencesIntro].filter(Boolean),
        bullets: jeunes?.experiencesBullets ?? [],
      },
      {
        title: jeunes?.spotbulleTitle,
        paragraphs: [jeunes?.spotbulleBody].filter(Boolean),
      },
    ],
    cta: {
      label: dict.nav?.book ?? "",
    },
    secondaryCta: {
      label: jeunes?.ctaExperiences ?? "",
      href: `/${resolvedLocale}/experiences`,
    },
  };

  return (
    <SpotBulleMarketingPage
      dict={dict}
      locale={resolvedLocale}
      content={content}
      bg2FullWidthRepeat
    />
  );
}

