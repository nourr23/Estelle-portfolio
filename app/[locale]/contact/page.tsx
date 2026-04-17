import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage, {
  type MarketingPageContent,
} from "../../../components/spotbulle/SpotBulleMarketingPage";

export default async function ContactPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const content: MarketingPageContent = {
    title: dict.contactPage?.title ?? "",
    breadcrumbLabel: dict.contactPage?.title ?? "",
    lead: dict.contactPage?.intro ?? "",
    sections: [
      {
        title: dict.contactPage?.title,
        bullets: [
          dict.footer?.line,
          dict.footer?.phone,
          dict.footer?.location,
          "spotbulle.com",
        ].filter(Boolean),
      },
    ],
    cta: {
      label: dict.contactPage?.ctaReservation ?? "",
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
