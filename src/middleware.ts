import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = ["/login", "/signup", "/verifyemail"].includes(path);
  const cookie = request.cookies.get("token")?.value || "";
  if (isPublic && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublic && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/profile/[id]",
    "/verifyemail",
  ],
};
