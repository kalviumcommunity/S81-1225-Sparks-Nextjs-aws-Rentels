import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function updateUser(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await ctx.params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

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

  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length === 0)
  ) {
    return NextResponse.json(
      { error: "If provided, 'name' must be a non-empty string" },
      { status: 400 }
    );
  }

  if (
    email !== undefined &&
    (typeof email !== "string" || email.trim().length === 0)
  ) {
    return NextResponse.json(
      { error: "If provided, 'email' must be a non-empty string" },
      { status: 400 }
    );
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

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

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
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
