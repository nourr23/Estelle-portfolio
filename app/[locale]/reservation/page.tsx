import { getDictionary, type Locale } from "../../../dictionaries";
import SpotBulleReservationFull from "../../../components/spotbulle/SpotBulleReservationFull";

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) ?? "fr";
  const dict = await getDictionary(resolvedLocale);

  return <SpotBulleReservationFull dict={dict} locale={resolvedLocale} />;
}
