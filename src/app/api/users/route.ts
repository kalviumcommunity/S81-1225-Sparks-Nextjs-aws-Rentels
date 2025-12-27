import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ error: pagination.error }, { status: 400 });
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

    return NextResponse.json({ page, limit, total, data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, role, phone } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "'name' is required" }, { status: 400 });
  }

  if (typeof email !== "string" || email.trim().length === 0) {
    return NextResponse.json({ error: "'email' is required" }, { status: 400 });
  }

  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    return NextResponse.json(
      { error: "'phone' must be a string" },
      { status: 400 }
    );
  }

  if (role !== undefined && role !== null && !isRole(role)) {
    return NextResponse.json(
      { error: "'role' must be one of: CUSTOMER, OWNER, ADMIN" },
      { status: 400 }
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

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json(
          { error: "A user with that unique field already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
