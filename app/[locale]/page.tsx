import { getDictionary, type Locale } from "../../dictionaries";
import SpotBulleHome from "../../components/spotbulle/SpotBulleHome";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleHome dict={dict} locale={resolvedLocale} />;
}

