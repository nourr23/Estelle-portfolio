import { getDictionary, type Locale } from "../../dictionaries";
import SpotBulleLanding from "../../components/spotbulle/SpotBulleLanding";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleLanding dict={dict} locale={resolvedLocale} />;
}

