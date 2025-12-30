import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { formatZodError, userCreateSchema } from "@/lib/schemas/userSchema";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import redis, { invalidateCache } from "@/lib/redis";

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
  const auth = requireAuth(req);
  if (!auth.ok) {
    return auth.response;
  }

  const pagination = parsePagination(req.url);
  if ("error" in pagination) {
    return sendError(pagination.error, ERROR_CODES.VALIDATION_ERROR, 400);
  }

  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  // 1. Try fetching from Redis
  const cacheKey = `users:list:${page}:${limit}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`Cache HIT for ${cacheKey}`);
      return sendSuccess(
        JSON.parse(cachedData),
        "Users fetched successfully (from cache)",
        200
      );
    }
  } catch (err) {
    console.warn("Redis error:", err);
    // Fallback to DB if Redis fails
  }

  console.log(`Cache MISS for ${cacheKey}`);

  try {
    const [total, data] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        orderBy: { id: "asc" },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    const responsePayload = { page, limit, total, data };

    // 2. Store in Redis (TTL: 60 seconds)
    try {
      await redis.set(cacheKey, JSON.stringify(responsePayload), "EX", 60);
    } catch (err) {
      console.warn("Redis set error:", err);
    }

    return sendSuccess(responsePayload, "Users fetched successfully", 200);
  } catch (err) {
    return handleError(err, "GET /api/users");
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

    // Invalidate list cache
    await invalidateCache("users:list:*");

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

    return handleError(err, "POST /api/users");
  }
}
