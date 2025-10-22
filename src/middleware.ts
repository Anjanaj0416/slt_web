import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Exclude API, Next.js internals, and static files
  if (
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/favicon.ico") ||
    req.nextUrl.pathname.match(/\..*$/)
  ) {
    return NextResponse.next();
  }

  // Check if user has a NextAuth session
  const token = await getToken({
    req,
    secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    const loginUrl = req.nextUrl.origin+ "/login?callbackUrl=" + req.nextUrl.href;
    console.log(req.nextUrl);
    
    console.log(loginUrl);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Configuration for defining the routes where this middleware should be applied.
 * These routes represent the public pages in the application.
 */
export const config = {
  matcher: [
    "/orders",
    "/orders/:path*",
    "/profile",
    "/profile/:path*",
    "/cart",
    "/cart/:path*",
    "/wish-list",
    "/wish-list/:path*",
    "/favorite-stores",
    "/favorite-stores/:path*",
    "/my-reviews",
    "/my-reviews/:path*",
  ],
};
