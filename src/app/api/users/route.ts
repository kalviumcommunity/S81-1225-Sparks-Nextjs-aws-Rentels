import { prisma } from "@/lib/prisma";
import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { Prisma } from "@prisma/client";

const ROLE_VALUES = ["CUSTOMER", "OWNER", "ADMIN"] as const;
type Role = (typeof ROLE_VALUES)[number];

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

function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" &&
    (ROLE_VALUES as readonly string[]).includes(value)
  );
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

  if (typeof body !== "object" || body === null) {
    return sendError("Invalid request body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  const { name, email, role, phone } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return sendError(
      "Missing required field: name",
      ERROR_CODES.VALIDATION_ERROR,
      400
    );
  }

  if (typeof email !== "string" || email.trim().length === 0) {
    return sendError(
      "Missing required field: email",
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
    const created = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: (role ?? undefined) as Role | undefined,
        phone: (phone ?? undefined) as string | undefined,
      },
    });

    return sendSuccess(created, "User created successfully", 201);
  } catch (err) {
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
