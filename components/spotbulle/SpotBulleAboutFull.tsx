import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleAboutFull({
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
          {dict.about?.title}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#1c1b19]">{dict.about?.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#43a9aa]">
          {dict.about?.estelleHeading}
        </p>
        <p className="mt-2 text-sm text-[#5f5a50]">{dict.about?.role}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.tone}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.portrait}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.immediate}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.pillars}</p>
        <p className="mt-4 text-sm font-semibold text-[#1f1d18]">{dict.about?.audiencesTitle}</p>
        <ul className="mt-2 list-disc pl-5 text-[#44423c]">
          {dict.about?.audiences?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-[#5f5a50]">{dict.about?.session}</p>
        <p className="mt-1 text-sm text-[#5f5a50]">{dict.about?.stays}</p>
        <p className="mt-6 max-w-3xl leading-8 text-[#44423c]">{dict.about?.intro}</p>
        <ul className="mt-8 grid gap-3 text-[#35332e] sm:grid-cols-2">
          {dict.about?.points?.map((point: string) => (
            <li
              key={point}
              className="rounded-md border border-[#d5b162]/30 bg-white/80 px-4 py-3 shadow-sm"
            >
              ✓ {point}
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-2xl font-semibold text-[#1c1b19]">
          {dict.about?.experienceTitle}
        </h2>
        <p className="mt-2 text-[#5f5a50]">{dict.about?.experienceSubtitle}</p>
        <p className="mt-4 leading-8 text-[#44423c]">{dict.about?.experienceBody}</p>
        <h3 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.about?.whyTitle}</h3>
        <p className="mt-2 leading-8 text-[#44423c]">{dict.about?.whyBody}</p>
        <h3 className="mt-6 text-xl font-semibold text-[#1f1d18]">{dict.about?.visionTitle}</h3>
        <p className="mt-2 leading-8 text-[#44423c]">{dict.about?.visionBody}</p>
        <h3 className="mt-6 text-xl font-semibold text-[#1f1d18]">{dict.about?.methodTitle}</h3>
        <p className="mt-2 leading-8 text-[#44423c]">{dict.about?.methodBody}</p>
        <ul className="mt-6 list-disc pl-5 text-[#44423c]">
          {dict.about?.stats?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="mt-8 text-xl font-semibold text-[#1f1d18]">{dict.about?.timelineTitle}</h3>
        <ul className="mt-3 list-disc pl-5 text-[#44423c]">
          {dict.about?.timeline?.map((item: string) => (
            <li key={item} className="mt-1">
              {item}
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-xl font-semibold text-[#1f1d18]" id="documents">
          {dict.about?.docsTitle}
        </h3>
        <p className="mt-2 text-[#44423c]">{dict.about?.docsBody}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {dict.about?.docButtons?.map(
            (btn: { label: string; href: string }) => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#d5b162]/50 bg-white px-4 py-2 text-sm font-semibold text-[#1f1d18] hover:bg-[#fffaf1]"
              >
                {btn.label}
              </a>
            )
          )}
        </div>
        <h3 className="mt-10 text-xl font-semibold text-[#1f1d18]">
          {dict.about?.guaranteeTitle}
        </h3>
        <p className="mt-2 text-[#44423c]">{dict.about?.guaranteeBody}</p>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
