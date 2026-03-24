import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleOffresPage from "../../../components/spotbulle/SpotBulleOffresPage";

export default async function OffresPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleOffresPage dict={dict} locale={resolvedLocale} />;
}
