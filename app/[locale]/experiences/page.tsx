import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleExperiencesPage from "../../../components/spotbulle/SpotBulleExperiencesPage";

export default async function ExperiencesPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleExperiencesPage dict={dict} locale={resolvedLocale} />;
}

