import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleContactPage({
  dict,
  locale,
}: {
  dict: any;
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;

  return (
    <div className="min-h-screen bg-[#f5efe4] font-sans text-[#1a1a1a]">
      <SpotBulleHeader dict={dict} locale={locale} />

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="text-sm text-[#5f5a50]">
          <Link className="text-[#0f6f70] hover:underline" href={prefix}>
            {dict.nav?.home}
          </Link>
          {" / "}
          {dict.contactPage?.title}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#1c1b19]">{dict.contactPage?.title}</h1>
        <p className="mt-6 max-w-2xl leading-8 text-[#44423c]">{dict.contactPage?.intro}</p>

        <ul className="mt-10 space-y-3 text-[#44423c]">
          <li>{dict.footer?.line}</li>
          <li>
            <a
              className="text-[#0f6f70] underline"
              href={`https://wa.me/33628353450`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.footer?.phone}
            </a>
          </li>
          <li>{dict.footer?.location}</li>
          <li>
            <a className="text-[#0f6f70] underline" href="https://spotbulle.com" target="_blank" rel="noopener noreferrer">
              spotbulle.com
            </a>
          </li>
        </ul>

        <p className="mt-10">
          <Link
            href={`${prefix}/reservation`}
            className="inline-block rounded-md bg-[#111111] px-6 py-3 text-sm font-semibold text-[#d5b162]"
          >
            {dict.contactPage?.ctaReservation}
          </Link>
        </p>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
