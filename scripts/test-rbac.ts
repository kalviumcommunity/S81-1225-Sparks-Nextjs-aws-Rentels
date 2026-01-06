/* eslint-disable no-console */

import {
  ROLE_PERMISSIONS,
  normalizeRole,
  type AppRole,
  type RbacAction,
  type RbacResource,
} from "../src/config/roles";

function can(role: unknown, resource: RbacResource, action: RbacAction): boolean {
  const normalized = normalizeRole(role);
  if (!normalized) return false;
  return ROLE_PERMISSIONS[normalized][resource].includes(action);
}

function logDecision(params: {
  role: unknown;
  action: RbacAction;
  resource: RbacResource;
  allowed: boolean;
}) {
  const roleLabel = normalizeRole(params.role) ?? "UNKNOWN";
  console.log(
    `[RBAC] role=${roleLabel} action=${params.action} resource=${params.resource} decision=${
      params.allowed ? "ALLOWED" : "DENIED"
    }`
  );
}

function assertEqual(name: string, actual: boolean, expected: boolean) {
  if (actual !== expected) {
    throw new Error(`${name}: expected ${expected ? "ALLOWED" : "DENIED"}, got ${actual ? "ALLOWED" : "DENIED"}`);
  }
}

type Case = {
  role: AppRole | "UNKNOWN";
  resource: RbacResource;
  action: RbacAction;
  expected: boolean;
};

const cases: Case[] = [
  { role: "ADMIN", resource: "admin", action: "read", expected: true },
  { role: "OWNER", resource: "admin", action: "read", expected: false },
  { role: "CUSTOMER", resource: "users", action: "read", expected: true },
  { role: "CUSTOMER", resource: "users", action: "create", expected: false },
  { role: "OWNER", resource: "users", action: "create", expected: true },
  { role: "OWNER", resource: "users", action: "delete", expected: false },
  { role: "CUSTOMER", resource: "files", action: "create", expected: true },
  { role: "UNKNOWN", resource: "users", action: "read", expected: false },
];

function main() {
  console.log("RBAC allow/deny evidence (scripts/test-rbac.ts)\n");

  for (const testCase of cases) {
    const allowed = can(testCase.role, testCase.resource, testCase.action);
    logDecision({
      role: testCase.role,
      resource: testCase.resource,
      action: testCase.action,
      allowed,
    });

    assertEqual(
      `${testCase.role} ${testCase.resource}:${testCase.action}`,
      allowed,
      testCase.expected
    );
  }

  console.log("\nAll RBAC assertions passed.");
}

main();
