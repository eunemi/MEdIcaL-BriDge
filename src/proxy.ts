import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Decode JWT without verifying signature (Edge runtime doesn't support jsonwebtoken)
    // The signature is verified securely in API routes and Server Components using jsonwebtoken
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      if (decodedPayload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  } catch (err) {
    console.error("Proxy Decode Error:", err);
    // Invalid token format
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
