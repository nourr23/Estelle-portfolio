import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleAboutFull from "../../../components/spotbulle/SpotBulleAboutFull";

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleAboutFull dict={dict} locale={resolvedLocale} />;
}
