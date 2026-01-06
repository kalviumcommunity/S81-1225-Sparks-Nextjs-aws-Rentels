import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { signupSchema } from "@/lib/schemas/authSchema";
import { formatZodError } from "@/lib/schemas/zodUtils";
import { normalizeEmail, sanitizePlainText } from "@/lib/sanitize";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const raw = body as Record<string, unknown>;
    const validated = signupSchema.parse({
      ...raw,
      name: sanitizePlainText(raw.name),
      email: normalizeEmail(raw.email),
      // Password is intentionally not modified; validation enforces requirements.
      password: raw.password,
    });

    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
      select: { id: true },
    });

    if (existing) {
      return sendError("User already exists", ERROR_CODES.CONFLICT, 409);
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const created = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return sendSuccess(created, "Signup successful", 201);
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return sendError("User already exists", ERROR_CODES.CONFLICT, 409);
      }
    }

    return handleError(err, "POST /api/auth/signup");
  }
}
