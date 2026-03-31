import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GenUp",
  description: "Accompagnement éducatif personnalisé",
};

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedLocale =
    (params ? (await params).locale : undefined) ?? "fr";

  return (
    <html lang={resolvedLocale}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
