import { NextResponse } from "next/server";

const locales = ["fr", "en"];

function getLocale() {
  // Default to French for now; can be improved later
  return "fr";
}

export function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Don't redirect static assets (e.g. /images/*, /favicon.ico, or any path with an extension)
  matcher: ["/((?!_next|images|.*\\..*).*)"],
};

