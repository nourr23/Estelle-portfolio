import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleReservationFull({
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
          {dict.booking?.title}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#1c1b19]">{dict.booking?.title}</h1>
        <p className="mt-2 text-[#5f5a50]">{dict.booking?.subtitle}</p>
        <p className="mt-4 leading-8 text-[#44423c]">{dict.booking?.intro}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {dict.booking?.tags?.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-[#d5b162]/50 bg-white px-3 py-1 text-sm text-[#3a372f]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-3xl rounded-lg border border-[#43c6c8]/40 bg-[#fffaf1] p-5 text-[#1f1d18] leading-8">
          {dict.booking?.reassurance}
        </p>

        <p className="mt-10 text-sm font-semibold tracking-[0.12em] text-[#1f1d18]">
          {dict.booking?.slotsTitle}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#5f5a50]">
          {dict.booking?.days?.map((day: string) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-6 grid max-w-md grid-cols-3 gap-2">
          {dict.booking?.slots?.map((slot: string) => (
            <button
              key={slot}
              type="button"
              className="rounded-md border border-[#43c6c8]/40 bg-white px-3 py-2 text-sm text-[#0f6f70] transition hover:bg-[#43c6c8]/10"
            >
              {slot}
            </button>
          ))}
        </div>
        <p className="mt-6 font-medium text-[#0f6f70]">{dict.booking?.cta}</p>

        <p className="mt-10 text-sm text-[#5f5a50]">
          <a
            className="font-semibold text-[#0f6f70] underline"
            href={`https://wa.me/33628353450`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {" — "}
          {dict.footer?.phone}
        </p>
      </main>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
