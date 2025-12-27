import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { formatZodError, userCreateSchema } from "@/lib/schemas/userSchema";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

function parsePagination(url: string) {
  const { searchParams } = new URL(url);

  const pageRaw = searchParams.get("page");
  const limitRaw = searchParams.get("limit");

  const page = pageRaw ? Number(pageRaw) : 1;
  const limit = limitRaw ? Number(limitRaw) : 10;

  if (!Number.isFinite(page) || page < 1) {
    return { error: "Invalid 'page' query param" as const };
  }

  if (!Number.isFinite(limit) || limit < 1 || limit > 100) {
    return { error: "Invalid 'limit' query param (1-100)" as const };
  }

  return { page, limit };
}

export async function GET(req: Request) {
  const pagination = parsePagination(req.url);
  if ("error" in pagination) {
    return sendError(pagination.error, ERROR_CODES.VALIDATION_ERROR, 400);
  }

  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  try {
    const [total, data] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        orderBy: { id: "asc" },
        skip,
        take: limit,
      }),
    ]);

    return sendSuccess(
      { page, limit, total, data },
      "Users fetched successfully",
      200
    );
  } catch {
    return sendError("Failed to fetch users", ERROR_CODES.INTERNAL_ERROR, 500);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const validated = userCreateSchema.parse(body);

    const created = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        role: validated.role,
        phone: validated.phone,
      },
    });

    return sendSuccess(created, "User created successfully", 201);
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return sendError(
          "A user with that email already exists",
          ERROR_CODES.CONFLICT,
          409
        );
      }
    }

    return sendError(
      "Failed to create user",
      ERROR_CODES.INTERNAL_ERROR,
      500,
      err
    );
  }
}
