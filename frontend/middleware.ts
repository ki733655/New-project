// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes (login page, static files, API routes)
  if (pathname.startsWith("/login") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // No token → go to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

    // If visiting /, send to correct dashboard
    if (pathname === "/") {
      if (payload.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    // Protect admin pages
    if (pathname.startsWith("/dashboard/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    // Protect user pages
    if (pathname.startsWith("/dashboard/user") && payload.role !== "user") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    // Invalid token → login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"], // match protected routes
};
