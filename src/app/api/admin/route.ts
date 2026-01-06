import { requireAuth } from "@/lib/auth";
import { requirePermission } from "@/lib/rbac";
import { sendSuccess } from "@/lib/responseHandler";

export async function GET(req: Request) {
  const auth = requireAuth(req);
  if (!auth.ok) {
    return auth.response;
  }

  const rbac = requirePermission({
    payload: auth.payload,
    action: "read",
    resource: "admin",
  });
  if (!rbac.ok) {
    return rbac.response;
  }

  return sendSuccess(
    {
      message: "Welcome Admin! You have full access.",
    },
    "Admin access granted",
    200
  );
}
