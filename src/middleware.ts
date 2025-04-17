import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //const url = new URL(req.url);

  // Check if the path is "/api/auth/error" and the error param is "AccessDenied"
  // if (
  //   url.pathname === "/api/auth/error" &&
  //   url.searchParams.get("error") === "AccessDenied"
  // ) {
    
  //   return NextResponse.redirect(new URL("/403", req.url));
  // }

  return NextResponse.next(); 
}

// Apply middleware to specific routes
export const config = {
  matcher: "/api/auth/error",
};
