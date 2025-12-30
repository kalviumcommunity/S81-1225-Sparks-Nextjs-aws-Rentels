import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { getS3Config, getS3ObjectUrl } from "@/lib/s3";
import { fileCreateSchema, formatZodError } from "@/lib/schemas/uploadSchema";
import { getUploadConfig, isAllowedMimeType } from "@/lib/upload";
import { ZodError } from "zod";

export async function POST(req: Request) {
  const auth = requireAuth(req);
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return sendError("Invalid JSON body", ERROR_CODES.VALIDATION_ERROR, 400);
  }

  try {
    const input = fileCreateSchema.parse(body);

    const { maxBytes, keyPrefix } = getUploadConfig();

    if (!isAllowedMimeType(input.mimeType)) {
      return sendError(
        "Unsupported file type",
        ERROR_CODES.VALIDATION_ERROR,
        400
      );
    }

    if (input.size > maxBytes) {
      return sendError("File too large", ERROR_CODES.VALIDATION_ERROR, 400, {
        maxBytes,
      });
    }

    const expectedPrefix = `${keyPrefix}/${auth.payload.id}/`;
    if (!input.key.startsWith(expectedPrefix)) {
      return sendError(
        "Invalid key",
        ERROR_CODES.FORBIDDEN,
        403,
        { expectedPrefix }
      );
    }

    const { bucket, region } = getS3Config();
    const url = getS3ObjectUrl({ bucket, region, key: input.key });

    const created = await prisma.file.create({
      data: {
        userId: auth.payload.id,
        originalName: input.originalName,
        key: input.key,
        url,
        mimeType: input.mimeType,
        size: input.size,
      },
    });

    return sendSuccess(created, "File saved successfully", 201);
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    return handleError(err, "POST /api/files");
  }
}
