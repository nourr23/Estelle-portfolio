import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage, {
  type MarketingPageContent,
} from "../../../components/spotbulle/SpotBulleMarketingPage";

export default async function SpotBullePageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const spotbulle = dict.spotbullePage;

  const content: MarketingPageContent = {
    title: spotbulle?.title ?? "",
    breadcrumbLabel: spotbulle?.title ?? "",
    lead: spotbulle?.intro ?? "",
    sections:
      spotbulle?.sections?.map((section: { title?: string; body?: string; bullets?: string[] }) => ({
        title: section?.title,
        paragraphs: section?.body ? [section.body] : [],
        bullets: section?.bullets ?? [],
      })) ?? [],
    cta: {
      label: spotbulle?.ctaSecondary ?? "",
    },
    secondaryCta: {
      label: spotbulle?.ctaPrimary ?? "",
      href: "https://spotbulle.com",
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

