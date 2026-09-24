import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;
 if (pathname === "/") return NextResponse.redirect(new URL("/id", request.url));
 if (!pathname.startsWith("/id") && !pathname.startsWith("/en") && !pathname.startsWith("/_next")) return NextResponse.redirect(new URL(`/id${pathname}`, request.url));
 return NextResponse.next();
}
export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)"] };
