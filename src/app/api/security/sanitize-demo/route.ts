import { ERROR_CODES } from "@/lib/errorCodes";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { sanitizePlainText } from "@/lib/sanitize";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  const commentRaw = (body as { comment?: unknown } | null)?.comment;
  const before = typeof commentRaw === "string" ? commentRaw : String(commentRaw ?? "");
  const after = sanitizePlainText(commentRaw);

  if (before.length > 5000) {
    return sendError("comment too long", ERROR_CODES.VALIDATION_ERROR, 400, {
      max: 5000,
    });
  }

  return sendSuccess(
    {
      before,
      after,
    },
    "Sanitization demo",
    200
  );
}
