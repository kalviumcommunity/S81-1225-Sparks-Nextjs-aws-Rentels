import { requireAuth } from "@/lib/auth";
import { sendSuccess } from "@/lib/responseHandler";

export async function GET(req: Request) {
  const auth = requireAuth(req);
  if (!auth.ok) {
    return auth.response;
  }

  const { id, email, role } = auth.payload;

  return sendSuccess(
    {
      id,
      email,
      role: role ?? null,
    },
    "Session active",
    200
  );
}
