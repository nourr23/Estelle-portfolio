import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleMarketingPage from "../../../components/spotbulle/SpotBulleMarketingPage";

export default async function QuiSuisJePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);
  const content = dict.marketingPages.quiSuisJe;

  return <SpotBulleMarketingPage dict={dict} locale={resolvedLocale} content={content} />;
}
