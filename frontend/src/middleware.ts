import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  const { pathname } = req.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // 1️⃣ Root path → redirect based on token & role
  if (pathname === '/') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    }
    if (role === 'user') {
      return NextResponse.redirect(new URL('/dashboard/user', req.url));
    }
  }

  // 2️⃣ No token → allow login, block others
  if (!token) {
    if (pathname === '/login') return NextResponse.next();
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3️⃣ Token exists → prevent going back to login
  if (pathname === '/login') {
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', req.url));
    }
    if (role === 'user') {
      return NextResponse.redirect(new URL('/dashboard/user', req.url));
    }
  }

  // 4️⃣ Role-based dashboard access
  if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/user', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
