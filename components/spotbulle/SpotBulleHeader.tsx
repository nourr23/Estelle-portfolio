import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";

export default function SpotBulleHeader({
  dict,
  locale,
}: {
  dict: { nav: Record<string, string> };
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;

  const linkClass =
    "hover:text-[#43c6c8] transition-colors";

  return (
    <header className="sticky top-0 z-20 border-b border-[#d5b162]/25 bg-[#111111]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-[#f7f1e3]">
        <Link
          href={prefix}
          className="text-xl font-semibold tracking-[0.2em] text-[#d5b162]"
        >
          ESTELLE DRION
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-xs uppercase tracking-[0.14em] text-[#f7f1e3]/80 md:gap-6">
          <Link className={linkClass} href={prefix}>
            {dict.nav.home}
          </Link>
          <Link className={linkClass} href={`${prefix}/offres`}>
            {dict.nav.offres}
          </Link>
          <Link className={linkClass} href={`${prefix}/a-propos`}>
            {dict.nav.about}
          </Link>
          <Link className={linkClass} href={`${prefix}/reservation`}>
            {dict.nav.reservation}
          </Link>
          <Link className={linkClass} href={`${prefix}/contact`}>
            {dict.nav.contact}
          </Link>
          <LanguageSwitch locale={locale} />
        </nav>
      </div>
    </header>
  );
}
