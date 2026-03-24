import Link from "next/link";

export default function SpotBulleFooter({
  dict,
  locale,
}: {
  dict: { footer: Record<string, string> };
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;

  return (
    <footer className="border-t border-[#d5b162]/30 bg-[#101010]">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-[#f7f1e3]/80">
        <p className="font-medium uppercase tracking-[0.15em] text-[#d5b162]">
          {dict.footer.contact}
        </p>
        <p className="mt-2">{dict.footer.line}</p>
        <p className="mt-1">{dict.footer.phone}</p>
        <p className="mt-1">{dict.footer.location}</p>
        <p className="mt-1">{dict.footer.site}</p>
        <p className="mt-6">
          <Link className="text-[#9ee4e5] underline hover:text-[#43c6c8]" href={`${prefix}/contact`}>
            {dict.footer.contactPageLink}
          </Link>
        </p>
      </div>
    </footer>
  );
}
