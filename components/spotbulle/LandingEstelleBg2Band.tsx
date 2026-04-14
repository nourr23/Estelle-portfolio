import Image from "next/image";
import Link from "next/link";

export type LandingEstelleCard = {
  iconSrc: string;
  title: string;
  subtitle: string;
  body: string[];
};

export type LandingEstelleDict = {
  photoAlt: string;
  experienceTitle: string;
  experienceSub: string;
  firstName: string;
  lastName: string;
  tagline: string;
  body: string;
  cta: string;
  cards: LandingEstelleCard[];
};

export default function LandingEstelleBg2Band({
  dict,
  locale,
}: {
  dict: LandingEstelleDict;
  locale: "fr" | "en";
}) {
  const aboutHref = `/${locale}/a-propos`;

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 px-3 py-4 sm:px-5 sm:py-5 md:px-10 md:py-6 lg:px-14">
      <div className="flex min-h-0 flex-col gap-4 md:flex-row md:items-stretch md:gap-8">
        <div className="flex w-full shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md md:max-w-[min(320px,34vw)]">
          <div className="relative aspect-4/5 w-full min-h-[200px] sm:min-h-[240px] md:aspect-3/4 md:min-h-0">
            <Image
              src="/images/profile-picture.jpeg"
              alt={dict.photoAlt}
              fill
              className="object-cover object-top grayscale"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
          <div className="border-t border-[#0a3d40]/10 px-4 py-3 md:px-5 md:py-4">
            <p className="text-[24px] font-bold leading-snug text-[#022636]">
              {dict.experienceTitle}
            </p>
            <p className="mt-1 text-[16px] leading-snug text-[#022636]">
              {dict.experienceSub}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 w-full max-w-[min(420px,100%)] flex-1 flex-col justify-between gap-3 md:py-1">
          <div className="min-w-0 space-y-2 md:space-y-3">
            <p className="text-[32px] font-semibold leading-none text-white">
              {dict.firstName}
            </p>
            <p className="font-black leading-[0.92] tracking-tight text-white max-md:text-[44px] max-md:leading-none md:text-[72px] lg:text-[96px]">
              {dict.lastName}
            </p>
            <p className="pt-1 text-[24px] font-bold leading-snug text-[#022636]">
              {dict.tagline}
            </p>
            <p className="text-[16px] leading-relaxed text-[#022636]">
              {dict.body}
            </p>
          </div>

          <div className="flex justify-end pt-2 md:pt-0">
            <Link
              href={aboutHref}
              className="inline-flex items-center justify-center rounded-full bg-[#d4a017] px-5 py-2.5 text-center text-[13px] font-bold text-white shadow-md transition hover:bg-[#dfae20] md:px-7 md:py-3 md:text-[15px]"
            >
              {dict.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {dict.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-2xl border border-white/12 bg-[#0a3d40]/55 px-4 py-4 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            <div className="mb-3 flex justify-center">
              <div className="relative h-[150px] w-[170px]">
                <Image
                  src="/images/backgrounds/h2.png"
                  alt=""
                  fill
                  className="object-contain opacity-75"
                  sizes="170px"
                />
                <Image
                  src={card.iconSrc}
                  alt=""
                  fill
                  className="object-contain p-1 opacity-95"
                  sizes="170px"
                />
              </div>
            </div>
            <h3 className="text-center text-[22px] font-bold leading-tight text-[#B6F0EA]">
              {card.title}
            </h3>
            <p className="mt-1 text-center text-[14px] font-semibold text-white">
              {card.subtitle}
            </p>
            <div className="mt-8 space-y-1.5 text-[14px] leading-snug text-white/88">
              {card.body.map((line, i) => (
                <p key={`${card.title}-${i}`}>{line}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
