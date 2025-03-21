import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"]; // Define routes that should be accessible to authenticated users
const authRoutes = ["/login"]; // Define routes that should be inaccessible to authenticated users

export function middleware(req: NextRequest) {
  const token = req.cookies.get("tokenData")?.value; // Retrieve the token from cookies

  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (token && authRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"], // Apply middleware to protected and auth routes
};
