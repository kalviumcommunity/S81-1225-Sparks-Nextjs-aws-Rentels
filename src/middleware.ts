import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { can } from "@/lib/rbac";

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

async function verifyJwt(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return jwtVerify(token, secret);
}

function applySecurityHeaders(res: NextResponse) {
  // OWASP-inspired baseline security headers.
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("Cross-Origin-Resource-Policy", "same-site");

  if (process.env.NODE_ENV === "production") {
    res.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );

    // Keep CSP conservative to avoid breaking Next.js runtime.
    // For stricter CSP, add nonces/hashes and remove unsafe-*.
    res.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "base-uri 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "img-src 'self' data: blob: https:",
        "style-src 'self' 'unsafe-inline'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "connect-src 'self' https:",
      ].join("; ")
    );
  }

  return res;
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
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }

    // Demo-friendly behavior: allow a mock token string set on the login page.
    if (token !== "mock.jwt.token") {
      try {
        await verifyJwt(token);
      } catch {
        const loginUrl = new URL("/login", req.url);
        return applySecurityHeaders(NextResponse.redirect(loginUrl));
      }
    }

    return applySecurityHeaders(NextResponse.next());
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
    return applySecurityHeaders(
      NextResponse.json(
      { success: false, message: "Token missing" },
      { status: 401 }
      )
    );
  }

  // Demo-friendly behavior: allow the mock token string in non-production.
  if (process.env.NODE_ENV !== "production" && token === "mock.jwt.token") {
    return applySecurityHeaders(NextResponse.next());
  }

  try {
    const { payload } = await verifyJwt(token);

    if (pathname.startsWith("/api/admin") && !can(payload.role, "admin", "read")) {
      return applySecurityHeaders(
        NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
        )
      );
    }

    const requestHeaders = new Headers(req.headers);
    if (payload.email)
      requestHeaders.set("x-user-email", String(payload.email));
    if (payload.role) requestHeaders.set("x-user-role", String(payload.role));

    return applySecurityHeaders(
      NextResponse.next({ request: { headers: requestHeaders } })
    );
  } catch {
    return applySecurityHeaders(
      NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
      )
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
