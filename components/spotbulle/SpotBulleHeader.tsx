import Link from "next/link";
import Image from "next/image";
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
          className="flex items-center"
          aria-label="GenUp"
        >
          <Image
            src="/brand/Logo_GenUp_LQ_contours_blanc.png"
            alt="GenUp"
            width={160}
            height={48}
            priority
            className="h-[68px] w-auto"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-xs uppercase tracking-[0.14em] text-[#f7f1e3]/80 md:gap-6">
          <Link className={linkClass} href={prefix}>
            {dict.nav.home}
          </Link>
          <Link className={linkClass} href={`${prefix}/parents`}>
            {dict.nav.parents}
          </Link>
          <Link className={linkClass} href={`${prefix}/jeunes`}>
            {dict.nav.young}
          </Link>
          <Link className={linkClass} href={`${prefix}/spotbulle`}>
            {dict.nav.spotbulle}
          </Link>
          <Link className={linkClass} href={`${prefix}/experiences`}>
            {dict.nav.experiences}
          </Link>
          <Link className={linkClass} href={`${prefix}/a-propos`}>
            {dict.nav.about}
          </Link>
          <Link className={linkClass} href={`${prefix}/contact`}>
            {dict.nav.contact}
          </Link>
          <Link
            href={`${prefix}/contact`}
            className="rounded-md bg-[#d5b162] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {dict.nav.book}
          </Link>
          <LanguageSwitch locale={locale} />
        </nav>
      </div>
    </header>
  );
}
