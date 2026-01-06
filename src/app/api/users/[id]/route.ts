import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import {
  formatZodError,
  userPatchSchema,
  userPutSchema,
} from "@/lib/schemas/userSchema";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { invalidateCache } from "@/lib/redis";
import { normalizeEmail, sanitizePlainText } from "@/lib/sanitize";

function parseId(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) return null;
  return id;
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const auth = requireAuth(req);
  if (!auth.ok) {
    return auth.response;
  }

  const { id: idParam } = await ctx.params;
  const id = parseId(idParam);
  if (!id) {
    return sendError("Invalid user id", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
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
    if (!user) {
      return sendError("User not found", ERROR_CODES.NOT_FOUND, 404);
    }

    return sendSuccess(user, "User fetched successfully", 200);
  } catch (err) {
    return handleError(err, "GET /api/users/:id");
  }
}

async function updateUser(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
  mode: "patch" | "put"
) {
  const method = mode === "put" ? "PUT" : "PATCH";

  const { id: idParam } = await ctx.params;
  const id = parseId(idParam);
  if (!id) {
    return sendError("Invalid user id", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const raw = body as Record<string, unknown>;
    const validated = (mode === "put" ? userPutSchema : userPatchSchema).parse({
      ...raw,
      ...(raw.name === undefined ? {} : { name: sanitizePlainText(raw.name) }),
      ...(raw.email === undefined ? {} : { email: normalizeEmail(raw.email) }),
      ...(raw.phone === undefined
        ? {}
        : {
            phone:
              raw.phone === null || raw.phone === undefined
                ? raw.phone
                : sanitizePlainText(raw.phone),
          }),
    });

    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: validated.name,
        email: validated.email,
        role: validated.role,
        phone: validated.phone,
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

    // Invalidate specific user and list cache
    await Promise.all([
      invalidateCache(`users:${id}`), // If we decide to cache individual users later
      invalidateCache("users:list:*"),
    ]);

    return sendSuccess(updated, "User updated successfully", 200);
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return sendError("User not found", ERROR_CODES.NOT_FOUND, 404);
      }

      if (err.code === "P2002") {
        return sendError(
          "A user with that email already exists",
          ERROR_CODES.CONFLICT,
          409
        );
      }
    }

    return handleError(err, `${method} /api/users/:id`);
  }
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  return updateUser(req, ctx, "patch");
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  return updateUser(req, ctx, "put");
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await ctx.params;
  const id = parseId(idParam);
  if (!id) {
    return sendError("Invalid user id", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    await prisma.user.delete({ where: { id } });

    // Invalidate specific user and list cache
    await Promise.all([
      invalidateCache(`users:${id}`),
      invalidateCache("users:list:*"),
    ]);

    return sendSuccess({ id }, "User deleted successfully", 200);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return sendError("User not found", ERROR_CODES.NOT_FOUND, 404);
    }

    return handleError(err, "DELETE /api/users/:id");
  }
}
