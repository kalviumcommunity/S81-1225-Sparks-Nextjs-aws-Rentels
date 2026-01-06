import { getAwsSecrets } from "@/lib/awsSecrets";
import { requireAuth } from "@/lib/auth";
import { requirePermission } from "@/lib/rbac";
import { sendSuccess } from "@/lib/responseHandler";

export async function GET(req: Request) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;

  const rbac = requirePermission({
    payload: auth.payload,
    resource: "admin",
    action: "read",
  });
  if (!rbac.ok) return rbac.response;

  const secrets = await getAwsSecrets();
  const keys = Object.keys(secrets).sort();

  // Never return values; only list keys for verification.
  return sendSuccess(
    {
      keys,
      count: keys.length,
    },
    "Secrets retrieved (keys only)",
    200
  );
}
