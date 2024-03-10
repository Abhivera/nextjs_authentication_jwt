import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authtoken = request.cookies.get("authentication") || '';
  const public_route = ["/register", "/login"]; 

  if (public_route.includes(pathname) && authtoken) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to home for authenticated users on public routes
  }

  if (!public_route.includes(pathname) && !authtoken) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login for non-authenticated users on protected routes
  }

  return NextResponse.next(); // Allow the request to continue
}

export const config = {
  matcher: ['/:path'], // Match all routes
};