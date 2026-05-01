 "use client";

import { useEffect, useRef, useState } from "react";
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
  sideBadge: string;
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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || isPhotoVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsPhotoVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isPhotoVisible]);

  return (
    <div
      ref={rootRef}
      className="flex h-full min-h-0 flex-col gap-5 px-3 py-4 sm:px-5 sm:py-5 md:px-10 md:py-6 lg:px-14"
    >
      <div className="flex min-h-0 flex-col gap-4 md:flex-row md:items-stretch md:gap-8">
        <div
          className={`estelle-photo-in flex w-[200px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md md:w-[250px] ${
            isPhotoVisible ? "estelle-photo-in-visible" : ""
          }`}
        >
          <div className="relative aspect-4/5 w-full min-h-[200px] sm:min-h-[240px] md:aspect-3/4 md:min-h-0">
            <Image
              src="/images/photoEstelle.png"
              alt={dict.photoAlt}
              fill
              className="object-cover object-top grayscale"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
          <div className="border-t border-[#0a3d40]/10 px-4 py-3 md:px-5 md:py-4">
            <p className="text-[18px] font-bold leading-snug text-[#022636] md:text-[24px]">
              {dict.experienceTitle}
            </p>
            <p className="mt-1 text-[14px] leading-snug text-[#022636] md:text-[16px]">
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
            <p className="pt-1 text-[18px] font-bold leading-snug text-[#022636] md:text-[24px]">
              {dict.tagline}
            </p>
            <p className="text-[12px] font-semibold leading-relaxed text-[#022636] md:text-[16px]">
              {locale === "fr"
                ? "Coach et professeure de français spécialisée pour les élèves du réseau AEFE / OSUI au Maroc."
                : "French teacher and coach specialized for students in the AEFE / OSUI network in Morocco."}
            </p>
            <p className="text-[12px] leading-relaxed text-[#022636] md:text-[16px]">
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

      <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 sm:-mx-5 sm:px-5 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0">
        {dict.cards.map((card) => (
          <article
            key={card.title}
            className="w-[min(86vw,320px)] shrink-0 snap-start rounded-2xl border border-white/12 bg-[#0a3d40]/55 px-2 py-2 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:w-auto md:shrink md:snap-none md:px-4 md:py-4"
          >
            <div className="mb-3 flex justify-center">
              <div className="relative h-[85px] w-[100px] md:h-[150px] md:w-[170px]">
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
            <h3 className="text-center text-[16px] font-bold leading-tight text-[#B6F0EA] md:text-[22px]">
              {card.title}
            </h3>
            <p className="mt-1 text-center text-[12px] font-semibold text-white md:text-[14px]">
              {card.subtitle}
            </p>
            <div className="mt-8 space-y-1.5 text-[12px] leading-snug text-white/88 md:text-[14px]">
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
