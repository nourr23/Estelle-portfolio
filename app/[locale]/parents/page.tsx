import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleParentsPage from "../../../components/spotbulle/SpotBulleParentsPage";

export default async function ParentsPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleParentsPage dict={dict} locale={resolvedLocale} />;
}

