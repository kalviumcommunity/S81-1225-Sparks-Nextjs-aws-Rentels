export type RbacAction = "create" | "read" | "update" | "delete";

export type RbacResource = "users" | "admin" | "files";

export type AppRole = "ADMIN" | "OWNER" | "CUSTOMER";

// Central RBAC policy map.
// Keep role names aligned with the Prisma enum Role.
export const ROLE_PERMISSIONS: Record<
  AppRole,
  Record<RbacResource, readonly RbacAction[]>
> = {
  ADMIN: {
    users: ["create", "read", "update", "delete"],
    admin: ["create", "read", "update", "delete"],
    files: ["create", "read", "update", "delete"],
  },
  OWNER: {
    users: ["create", "read", "update"],
    admin: [],
    files: ["create", "read"],
  },
  CUSTOMER: {
    users: ["read"],
    admin: [],
    files: ["create", "read"],
  },
} as const;

export function normalizeRole(role: unknown): AppRole | null {
  if (!role) return null;
  const value = String(role).toUpperCase();
  if (value === "ADMIN" || value === "OWNER" || value === "CUSTOMER") {
    return value;
  }
  return null;
}
