"use client";

import { usePathname } from "next/navigation";

export default function LanguageSwitch({ locale }: { locale: "fr" | "en" }) {
  const pathname = usePathname() ?? "";
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1).join("/");
  const targetLocale = locale === "fr" ? "en" : "fr";
  const href = rest ? `/${targetLocale}/${rest}` : `/${targetLocale}`;
  const label = locale === "fr" ? "EN" : "FR";

  return (
    <a
      className="rounded-md border border-[#43c6c8]/60 px-3 py-1 text-[#9ee4e5] transition hover:bg-[#43c6c8]/10"
      href={href}
      aria-label="Switch language"
    >
      {label}
    </a>
  );
}
