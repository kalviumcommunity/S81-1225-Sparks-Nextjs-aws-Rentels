import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError } from "@/lib/responseHandler";

function getJwtSecret() {
  return process.env.JWT_SECRET || "supersecretkey";
}

function getAccessJwtSecret() {
  return process.env.JWT_ACCESS_SECRET || getJwtSecret();
}

function getRefreshJwtSecret() {
  return process.env.JWT_REFRESH_SECRET || getJwtSecret();
}

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

export type AuthPayload = JwtPayload & {
  id: number;
  email: string;
  role?: string;
  tokenType?: "access" | "refresh";
};

export type RefreshPayload = JwtPayload & {
  id: number;
  tokenType: "refresh";
};

export function signAccessToken(
  payload: AuthPayload,
  expiresIn: SignOptions["expiresIn"] = "15m"
) {
  return jwt.sign({ ...payload, tokenType: "access" }, getAccessJwtSecret(), {
    expiresIn,
  });
}

export function signRefreshToken(
  payload: Omit<AuthPayload, "tokenType">,
  options: {
    expiresIn?: SignOptions["expiresIn"];
    jwtid: string;
  }
) {
  const { expiresIn = "7d", jwtid } = options;
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      tokenType: "refresh",
    },
    getRefreshJwtSecret(),
    {
      expiresIn,
      jwtid,
    }
  );
}

export function getBearerToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;

  return token;
}

export function verifyAccessToken(token: string) {
  const payload = jwt.verify(token, getAccessJwtSecret()) as AuthPayload;
  if (payload.tokenType && payload.tokenType !== "access") {
    throw new Error("Invalid token type");
  }
  return payload;
}

export function verifyRefreshToken(token: string) {
  const payload = jwt.verify(token, getRefreshJwtSecret()) as RefreshPayload;
  if (payload.tokenType !== "refresh") {
    throw new Error("Invalid token type");
  }
  return payload;
}

function getCookieFromHeader(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(`${encodeURIComponent(name)}=`));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

export function requireAuth(req: Request) {
  const token =
    getBearerToken(req) ||
    getCookieFromHeader(req.headers.get("cookie"), ACCESS_TOKEN_COOKIE) ||
    // Backwards compat for older lessons
    getCookieFromHeader(req.headers.get("cookie"), "token");

  if (!token) {
    return {
      ok: false as const,
      response: sendError("Token missing", ERROR_CODES.UNAUTHORIZED, 401),
    };
  }

  // Demo-friendly behavior: accept the mock token for local lessons.
  if (process.env.NODE_ENV !== "production" && token === "mock.jwt.token") {
    return {
      ok: true as const,
      payload: {
        id: 0,
        email: "demo@example.com",
        role: "CUSTOMER",
      },
    };
  }

  try {
    const payload = verifyAccessToken(token);
    return { ok: true as const, payload };
  } catch {
    return {
      ok: false as const,
      response: sendError(
        "Invalid or expired token",
        ERROR_CODES.UNAUTHORIZED,
        401
      ),
    };
  }
}
