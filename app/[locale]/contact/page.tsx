import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleContactPage from "../../../components/spotbulle/SpotBulleContactPage";

export default async function ContactPageRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleContactPage dict={dict} locale={resolvedLocale} />;
}
