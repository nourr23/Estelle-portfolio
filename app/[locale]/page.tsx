import { getDictionary, type Locale } from "../../dictionaries";
import SpotBulleLanding from "../../components/spotbulle/SpotBulleLanding";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const dict = await getDictionary((locale as Locale) ?? "fr");

  return <SpotBulleLanding dict={dict} />;
}

