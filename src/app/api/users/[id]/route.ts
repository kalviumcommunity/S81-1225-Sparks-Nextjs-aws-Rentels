import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import {
  formatZodError,
  userPatchSchema,
  userPutSchema,
} from "@/lib/schemas/userSchema";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

function parseId(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id < 1) return null;
  return id;
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
  ctx: { params: Promise<{ id: string }> },
  mode: "patch" | "put"
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

  try {
    const validated = (mode === "put" ? userPutSchema : userPatchSchema).parse(
      body
    );

    const updated = await prisma.user.update({
      where: { id },
      data: {
        name: validated.name,
        email: validated.email,
        role: validated.role,
        phone: validated.phone,
      },
    });

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
