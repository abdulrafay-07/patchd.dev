import { NextRequest, NextResponse } from "next/server";

// import { getSessionCookie } from "better-auth/cookies";

const isProtectedRoute = "/dashboard";

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("patch-dev.session_token");
  // const sessionCookie = getSessionCookie(request, {
  //   cookiePrefix: "patch-dev",
  //   cookieName: "session_token",
  // });
  // console.log(sessionCookie, request.cookies)
  const isDashboard = request.nextUrl.pathname.startsWith(isProtectedRoute);

  if (!sessionCookie && isDashboard) {
    // Not logged in, trying to access /dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent redirect loop: allow unauthenticated users to access "/"
  if (!sessionCookie && request.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (sessionCookie && !isDashboard) {
    // Logged in, trying to access a page other than /dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/",
    "/auth",
  ],
};
