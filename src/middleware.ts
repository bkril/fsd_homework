import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/pkg/locale";

// Edge-compatible session check — presence of session_token cookie is enough
// (actual session validation happens server-side in protected pages)
function getEdgeSession(req: NextRequest) {
  return (
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value ||
    null
  );
}

export default async function proxy(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/auth/")
  ) {
    return NextResponse.next();
  }

  const i18nRes = createMiddleware(routing)(req);

  const country =
    req.headers.get("cf-ipcountry") ||
    req.headers.get("cloudfront-viewer-country") ||
    req.headers.get("X-Country") ||
    req.cookies.get("country")?.value ||
    "N/A";

  i18nRes.headers.set("x-country", country);
  i18nRes.cookies.set("x-country", country);

  const pathname = req.nextUrl.pathname;

  // strip locale prefix (e.g. /en/dashboard → /dashboard)
  const localeRegex = new RegExp(`^\\/(${routing.locales.join("|")})`);
  const strippedPath = pathname.replace(localeRegex, "") || "/";

  const isSignIn = strippedPath === "/sign-in";
  const isSignUp = strippedPath === "/sign-up";
  const isProtectedRoute = strippedPath.startsWith("/dashboard");

  const user = getEdgeSession(req);

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if ((isSignIn || isSignUp) && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return i18nRes;
}

// config
export const config = {
  matcher: [
    "/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)",
  ],
};
