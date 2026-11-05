import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, sitePassword, token } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const pw = sitePassword();
  if (!pw) return NextResponse.next();
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/login") || pathname.startsWith("/_next") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }
  const expected = await token(pw);
  if (req.cookies.get(COOKIE)?.value === expected) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
