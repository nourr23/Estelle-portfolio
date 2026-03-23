import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpotBulle",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
