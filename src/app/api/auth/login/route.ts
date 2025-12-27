import bcrypt from "bcrypt";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { signAccessToken } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas/authSchema";
import { formatZodError } from "@/lib/schemas/zodUtils";

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

    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: String(user.role),
    });

    const { password: _password, ...publicUser } = user;
    void _password;

    return sendSuccess(
      {
        token,
        user: publicUser,
        expiresIn: "1h",
      },
      "Login successful",
      200
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    return sendError("Login failed", ERROR_CODES.INTERNAL_ERROR, 500, err);
  }
}
