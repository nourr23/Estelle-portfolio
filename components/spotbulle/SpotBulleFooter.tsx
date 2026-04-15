import Image from "next/image";
import Link from "next/link";

export default function SpotBulleFooter({
  dict,
  locale,
}: {
  dict: { nav: Record<string, string>; footer: Record<string, string> };
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;
  const linkClass = "text-sm text-white/90 hover:text-white";

  return (
    <footer className="border-t border-white/20 bg-[#0E5F65] bg-[url('/images/backgrounds/halo-2.png')] bg-cover bg-center bg-no-repeat">
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-8">
        <div className="flex items-end gap-4 sm:gap-8">
          <Link href={prefix} className="shrink-0" aria-label="GenUp">
            <Image
              src="/brand/Logo_GenUp_LQ_contours_blanc.png"
              alt="GenUp"
              width={160}
              height={52}
              className="h-[52px] w-auto sm:h-[60px]"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="h-px bg-white/30" />
            <div className="grid max-w-[460px] grid-cols-2 gap-x-10 pt-2.5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/95">
                  GENUP 2050
                </p>
                <div className="mt-1 flex flex-col leading-snug">
                  <Link className={linkClass} href={`${prefix}/parents`}>
                    {dict.nav.parents}
                  </Link>
                  <Link className={linkClass} href={`${prefix}/jeunes`}>
                    {dict.nav.young}
                  </Link>
                  <Link className={linkClass} href={`${prefix}/spotbulle`}>
                    SpotBulle Agent IA
                  </Link>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex flex-col leading-snug">
                  <Link className={linkClass} href={`${prefix}/a-propos`}>
                    {dict.nav.about}
                  </Link>
                  <Link className={linkClass} href={`${prefix}/contact`}>
                    {dict.nav.contact}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
