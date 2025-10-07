import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/dashboard',
]

const publicRoutes = [
  '/login',
  '/',
]


export async function middleware(request: NextRequest, response: NextResponse) {

  const session = await getSession();

  // If the route is public and the user is logged in, redirect to the home page
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // If the route is protected and the user is not logged in, redirect to the login page
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/',
  ],
}

