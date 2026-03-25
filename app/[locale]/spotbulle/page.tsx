import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleSpotBullePage from "../../../components/spotbulle/SpotBulleSpotBullePage";

export default async function SpotBullePageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleSpotBullePage dict={dict} locale={resolvedLocale} />;
}

