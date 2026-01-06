import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { REFRESH_TOKEN_COOKIE } from "@/lib/auth";
import { verifyRefreshToken } from "@/lib/auth";

function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getCookie(req: Request, name: string) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(`${encodeURIComponent(name)}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return sendError("Forbidden", ERROR_CODES.FORBIDDEN, 403);
  }

  const refreshToken = getCookie(req, REFRESH_TOKEN_COOKIE);
  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      if (payload.jti) {
        await prisma.refreshToken.updateMany({
          where: { jti: payload.jti, revokedAt: null },
          data: { revokedAt: new Date() },
        });
      }
    } catch {
      // Ignore invalid token on logout.
    }
  }

  const res = sendSuccess({}, "Logged out", 200) as NextResponse;
  const secure = process.env.NODE_ENV === "production";

  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // Backwards-compat cleanup
  res.cookies.set("token", "", {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}
