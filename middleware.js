import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/admin');                                                                                               

  if (isProtectedRoute) {
    console.log("--- Middleware Debugging ---");
    console.log("Request URL:", req.nextUrl.pathname);
    console.log("Token received:", token); // Check if token is present and its structure

    if (!token) {
      console.log("Reason for redirect: No token found (user not logged in or token expired/invalidated).");
      const signInUrl = new URL('/login', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Only allow admin email
    console.log("Token Email:", token.email);
    console.log("ADMIN_EMAIL env var:", process.env.ADMIN_EMAIL);

    if (token.email !== process.env.ADMIN_EMAIL) {
      console.log("Reason for redirect: Token email does NOT match ADMIN_EMAIL.");
      const signInUrl = new URL('/login', req.url);
      return NextResponse.redirect(signInUrl);
    }
    console.log("User is admin. Allowing access.");
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };


