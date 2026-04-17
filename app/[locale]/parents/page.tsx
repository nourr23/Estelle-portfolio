import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage, {
  type MarketingPageContent,
} from "../../../components/spotbulle/SpotBulleMarketingPage";

export default async function ParentsPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const parents = dict.parentsPage;

  const offersSections =
    parents?.offers?.map((offer: { title?: string; bullets?: string[]; result?: string }) => ({
      title: offer?.title,
      bullets: offer?.bullets ?? [],
      paragraphs: offer?.result ? [offer.result] : [],
    })) ?? [];

  const content: MarketingPageContent = {
    title: parents?.title ?? "",
    breadcrumbLabel: parents?.title ?? "",
    lead: parents?.intro ?? "",
    sections: [
      {
        title: parents?.solutionTitle,
        paragraphs: [parents?.solutionBody].filter(Boolean),
        bullets: parents?.solutionBullets ?? [],
      },
      {
        title: parents?.offersTitle,
      },
      ...offersSections,
      {
        title: parents?.proofTitle,
        paragraphs: [parents?.proofBody].filter(Boolean),
      },
      {
        title: parents?.pricingTitle,
        paragraphs: [parents?.pricingBody].filter(Boolean),
      },
    ],
    cta: {
      label: dict.nav?.book ?? "",
    },
    secondaryCta: {
      label: parents?.ctaQuote ?? "",
      hrefKey: "contact",
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

