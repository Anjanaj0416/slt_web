import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);

  if (
    url.pathname === "/api/auth/error" &&
    url.searchParams.get("error") === "AccessDenied"
  ) {
    const signInUrl = new URL(`/api/auth/signin/keycloak`, req.url);
    signInUrl.searchParams.set("callbackUrl", "/orders");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: "/api/auth/error",
};
