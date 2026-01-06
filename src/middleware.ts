import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "supersecretkey";

function getTokenFromCookie(req: NextRequest) {
  return (
    req.cookies.get("accessToken")?.value ??
    // Backwards compat for older lessons
    req.cookies.get("token")?.value ??
    null
  );
}

function getTokenFromHeader(authHeader: string | null) {
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;

  return token;
}

function isAdminRole(role: unknown) {
  if (!role) return false;
  const normalized = String(role).toLowerCase();
  return normalized === "admin" || normalized === "role.admin";
}

async function verifyJwt(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return jwtVerify(token, secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ---------------------------------------------------------------------------
  // Page routing auth (App Router pages)
  // Public: /, /login
  // Protected: /dashboard/*, /users/*
  // Uses cookie "token" (demo uses a mock token string).
  // ---------------------------------------------------------------------------
  if (!pathname.startsWith("/api")) {
    const token = getTokenFromCookie(req);
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Demo-friendly behavior: allow a mock token string set on the login page.
    if (token !== "mock.jwt.token") {
      try {
        await verifyJwt(token);
      } catch {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  }

  // ---------------------------------------------------------------------------
  // API auth (existing behavior)
  // Protected: /api/users/*, /api/admin/*
  // Uses Authorization: Bearer <token>
  // ---------------------------------------------------------------------------
  const token =
    getTokenFromHeader(req.headers.get("authorization")) ||
    req.cookies.get("accessToken")?.value ||
    // Backwards compat for older lessons
    req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token missing" },
      { status: 401 }
    );
  }

  // Demo-friendly behavior: allow the mock token string in non-production.
  if (process.env.NODE_ENV !== "production" && token === "mock.jwt.token") {
    return NextResponse.next();
  }

  try {
    const { payload } = await verifyJwt(token);

    if (pathname.startsWith("/api/admin") && !isAdminRole(payload.role)) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    const requestHeaders = new Headers(req.headers);
    if (payload.email)
      requestHeaders.set("x-user-email", String(payload.email));
    if (payload.role) requestHeaders.set("x-user-role", String(payload.role));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/admin/:path*",
    "/dashboard/:path*",
    "/users/:path*",
  ],
};
