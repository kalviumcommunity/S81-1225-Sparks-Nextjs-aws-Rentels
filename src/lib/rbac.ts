import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError } from "@/lib/responseHandler";
import type { AuthPayload } from "@/lib/auth";
import {
  ROLE_PERMISSIONS,
  normalizeRole,
  type AppRole,
  type RbacAction,
  type RbacResource,
} from "@/config/roles";

export function can(role: unknown, resource: RbacResource, action: RbacAction): boolean {
  const normalized = normalizeRole(role);
  if (!normalized) return false;
  return ROLE_PERMISSIONS[normalized][resource].includes(action);
}

export function logDecision(params: {
  role: unknown;
  action: RbacAction;
  resource: RbacResource;
  allowed: boolean;
}) {
  const roleLabel = normalizeRole(params.role) ?? "UNKNOWN";
  // Demo-friendly audit log (server-side).
  // eslint-disable-next-line no-console
  console.log(
    `[RBAC] role=${roleLabel} action=${params.action} resource=${params.resource} decision=${
      params.allowed ? "ALLOWED" : "DENIED"
    }`
  );
}

export function requirePermission(opts: {
  payload: Pick<AuthPayload, "role">;
  action: RbacAction;
  resource: RbacResource;
}) {
  const allowed = can(opts.payload.role, opts.resource, opts.action);
  logDecision({
    role: opts.payload.role,
    action: opts.action,
    resource: opts.resource,
    allowed,
  });

  if (!allowed) {
    return {
      ok: false as const,
      response: sendError(
        "Access denied: insufficient permissions.",
        ERROR_CODES.FORBIDDEN,
        403
      ),
    };
  }

  return { ok: true as const };
}

export function roleLabel(role: unknown): AppRole | "UNKNOWN" {
  return normalizeRole(role) ?? "UNKNOWN";
}
