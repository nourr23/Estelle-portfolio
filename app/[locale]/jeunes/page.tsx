import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleJeunesPage from "../../../components/spotbulle/SpotBulleJeunesPage";

export default async function JeunesPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleJeunesPage dict={dict} locale={resolvedLocale} />;
}

