import bcrypt from "bcrypt";
import crypto from "crypto";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  signAccessToken,
  signRefreshToken,
} from "@/lib/auth";
import { loginSchema } from "@/lib/schemas/authSchema";
import { formatZodError } from "@/lib/schemas/zodUtils";

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const validated = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
    });

    const invalidCredentialsResponse = () =>
      sendError("Invalid credentials", ERROR_CODES.UNAUTHORIZED, 401);

    if (!user || !user.password) {
      return invalidCredentialsResponse();
    }

    const isValid = await bcrypt.compare(validated.password, user.password);
    if (!isValid) {
      return invalidCredentialsResponse();
    }

    const accessToken = signAccessToken(
      {
        id: user.id,
        email: user.email,
        role: String(user.role),
      },
      "15m"
    );

    const refreshJti = crypto.randomUUID();
    const refreshToken = signRefreshToken(
      {
        id: user.id,
        email: user.email,
        role: String(user.role),
      },
      { jwtid: refreshJti, expiresIn: "7d" }
    );

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        jti: refreshJti,
        tokenHash: sha256(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const { password: _password, ...publicUser } = user;
    void _password;

    const res = sendSuccess(
      {
        user: publicUser,
        accessTokenExpiresIn: "15m",
        refreshTokenExpiresIn: "7d",
      },
      "Login successful",
      200
    );

    const secure = process.env.NODE_ENV === "production";

    res.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    res.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    // Backwards-compat cleanup: remove old demo cookie.
    res.cookies.set("token", "", {
      httpOnly: false,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return res;
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    return handleError(err, "POST /api/auth/login");
  }
}
