import crypto from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/lib/auth";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

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
  if (!refreshToken) {
    return sendError("Refresh token missing", ERROR_CODES.UNAUTHORIZED, 401);
  }

  let payload: ReturnType<typeof verifyRefreshToken>;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return sendError(
      "Invalid or expired refresh token",
      ERROR_CODES.UNAUTHORIZED,
      401
    );
  }

  const jti = payload.jti;
  if (!jti) {
    return sendError("Invalid refresh token", ERROR_CODES.UNAUTHORIZED, 401);
  }

  const stored = await prisma.refreshToken.findUnique({ where: { jti } });
  if (!stored || stored.revokedAt) {
    return sendError("Refresh token revoked", ERROR_CODES.UNAUTHORIZED, 401);
  }

  if (stored.expiresAt.getTime() <= Date.now()) {
    return sendError("Refresh token expired", ERROR_CODES.UNAUTHORIZED, 401);
  }

  if (stored.tokenHash !== sha256(refreshToken)) {
    // Token mismatch (possible replay attempt) => revoke and deny.
    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return sendError("Refresh token mismatch", ERROR_CODES.UNAUTHORIZED, 401);
  }

  // Rotate refresh token
  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const newJti = crypto.randomUUID();
  const newRefreshToken = signRefreshToken(
    { id: payload.id, email: payload.email || "", role: payload.role },
    { jwtid: newJti, expiresIn: "7d" }
  );

  await prisma.refreshToken.create({
    data: {
      userId: payload.id,
      jti: newJti,
      tokenHash: sha256(newRefreshToken),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const newAccessToken = signAccessToken(
    {
      id: payload.id,
      email: payload.email || "",
      role: payload.role ? String(payload.role) : undefined,
    },
    "15m"
  );

  const res = sendSuccess(
    { accessTokenExpiresIn: "15m" },
    "Token refreshed",
    200
  ) as NextResponse;

  const secure = process.env.NODE_ENV === "production";

  res.cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  res.cookies.set(REFRESH_TOKEN_COOKIE, newRefreshToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return res;
}
