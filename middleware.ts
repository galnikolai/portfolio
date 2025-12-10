import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Пропускаем статические файлы и API роуты
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Проверяем, есть ли уже локаль в пути
  const pathnameHasLocale = /^\/(ru|en)(\/|$)/.test(pathname);
  
  if (pathnameHasLocale) {
    // Сохраняем локаль в cookie
    const locale = pathname.match(/^\/(ru|en)/)?.[1];
    if (locale) {
      const response = NextResponse.next();
      response.cookies.set("NEXT_LOCALE", locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 год
      });
      return response;
    }
    return NextResponse.next();
  }

  // Определяем язык из cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = cookieLocale;

  // Если нет в cookie, определяем из заголовков браузера
  if (!locale || (locale !== "ru" && locale !== "en")) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    locale = "ru"; // По умолчанию русский

    // Проверяем предпочтения браузера
    const languages = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim().toLowerCase());
    
    if (languages.some((lang) => lang.startsWith("en"))) {
      locale = "en";
    } else if (languages.some((lang) => lang.startsWith("ru"))) {
      locale = "ru";
    }
  }

  // Редирект на URL с локалью
  const newPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  const newUrl = new URL(newPath, request.url);
  
  const response = NextResponse.redirect(newUrl);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 год
  });
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|locales).*)",
  ],
};

