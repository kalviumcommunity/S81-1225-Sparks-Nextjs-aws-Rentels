import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { Prisma } from "@prisma/client";

const ROLE_VALUES = ["CUSTOMER", "OWNER", "ADMIN"] as const;
type Role = (typeof ROLE_VALUES)[number];

function parseId(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) return null;
  return id;
}

function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" &&
    (ROLE_VALUES as readonly string[]).includes(value)
  );
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await ctx.params;
  const id = parseId(idParam);
  if (!id) {
    return sendError("Invalid user id", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return sendError("User not found", ERROR_CODES.NOT_FOUND, 404);
    }

    return sendSuccess(user, "User fetched successfully", 200);
  } catch {
    return sendError("Failed to fetch user", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}

async function updateUser(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
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

  if (typeof body !== "object" || body === null) {
    return sendError("Invalid request body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  const { name, email, role, phone } = body as Record<string, unknown>;

  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length === 0)
  ) {
    return sendError(
      "If provided, 'name' must be a non-empty string",
      ERROR_CODES.VALIDATION_ERROR,
      400
    );
  }

  if (
    email !== undefined &&
    (typeof email !== "string" || email.trim().length === 0)
  ) {
    return sendError(
      "If provided, 'email' must be a non-empty string",
      ERROR_CODES.VALIDATION_ERROR,
      400
    );
  }

  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return sendError(
      "'phone' must be a string",
      ERROR_CODES.VALIDATION_ERROR,
      400
    );
  }

  if (role !== undefined && role !== null && !isRole(role)) {
    return sendError(
      "'role' must be one of: CUSTOMER, OWNER, ADMIN",
      ERROR_CODES.VALIDATION_ERROR,
      400
    );
  }

  try {
    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: typeof name === "string" ? name.trim() : undefined,
        email:
          typeof email === "string" ? email.trim().toLowerCase() : undefined,
        role: (role ?? undefined) as Role | undefined,
        phone: (phone ?? undefined) as string | undefined,
      },
    });

    return sendSuccess(updated, "User updated successfully", 200);
  } catch (err) {
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

    return sendError(
      "Failed to update user",
      ERROR_CODES.INTERNAL_ERROR,
      500,
      err
    );
  }
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  return updateUser(req, ctx);
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  return updateUser(req, ctx);
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
    return sendSuccess({ id }, "User deleted successfully", 200);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return sendError("User not found", ERROR_CODES.NOT_FOUND, 404);
    }

    return sendError(
      "Failed to delete user",
      ERROR_CODES.INTERNAL_ERROR,
      500,
      err
    );
  }
}
