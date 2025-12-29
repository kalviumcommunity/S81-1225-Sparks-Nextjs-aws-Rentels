import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = getTokenFromHeader(req.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token missing" },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (pathname.startsWith("/api/admin") && !isAdminRole(payload.role)) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    const requestHeaders = new Headers(req.headers);
    if (payload.email) requestHeaders.set("x-user-email", String(payload.email));
    if (payload.role) requestHeaders.set("x-user-role", String(payload.role));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: ["/api/users/:path*", "/api/admin/:path*"],
};
