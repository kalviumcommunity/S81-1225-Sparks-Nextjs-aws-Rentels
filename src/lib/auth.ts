import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError } from "@/lib/responseHandler";

function getJwtSecret() {
  return process.env.JWT_SECRET || "supersecretkey";
}

export type AuthPayload = JwtPayload & {
  id: number;
  email: string;
  role?: string;
};

export function signAccessToken(
  payload: AuthPayload,
  expiresIn: SignOptions["expiresIn"] = "1h"
) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function getBearerToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;

  return token;
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as AuthPayload;
}

export function requireAuth(req: Request) {
  const token = getBearerToken(req);

  if (!token) {
    return {
      ok: false as const,
      response: sendError("Token missing", ERROR_CODES.UNAUTHORIZED, 401),
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
        ERROR_CODES.FORBIDDEN,
        403
      ),
    };
  }
}
