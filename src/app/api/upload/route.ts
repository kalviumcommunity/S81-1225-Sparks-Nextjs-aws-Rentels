import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { requireAuth } from "@/lib/auth";
import { ERROR_CODES } from "@/lib/errorCodes";
import { handleError } from "@/lib/errorHandler";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { getS3Client, getS3Config, getS3ObjectUrl } from "@/lib/s3";
import { uploadPresignSchema, formatZodError } from "@/lib/schemas/uploadSchema";
import {
  buildUploadKey,
  getUploadConfig,
  isAllowedMimeType,
} from "@/lib/upload";
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
    const input = uploadPresignSchema.parse(body);

    const { maxBytes, presignTtlSeconds, keyPrefix } = getUploadConfig();

    if (!isAllowedMimeType(input.fileType)) {
      return sendError(
        "Unsupported file type",
        ERROR_CODES.VALIDATION_ERROR,
        400,
        {
          allowed: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf",
          ],
        }
      );
    }

    if (input.fileSize > maxBytes) {
      return sendError(
        "File too large",
        ERROR_CODES.VALIDATION_ERROR,
        400,
        { maxBytes }
      );
    }

    const { bucket, region } = getS3Config();

    const key = buildUploadKey({
      userId: auth.payload.id,
      mimeType: input.fileType,
      originalFileName: input.fileName,
      prefix: keyPrefix,
    });

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: input.fileType,
      // Do NOT set ACL here; rely on bucket policy (private by default).
    });

    const s3 = getS3Client();
    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: presignTtlSeconds,
    });

    const objectUrl = getS3ObjectUrl({ bucket, region, key });

    return sendSuccess(
      {
        uploadUrl,
        key,
        objectUrl,
        expiresInSeconds: presignTtlSeconds,
        requiredHeaders: {
          "Content-Type": input.fileType,
        },
      },
      "Presigned upload URL generated",
      200
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
        errors: formatZodError(err),
      });
    }

    return handleError(err, "POST /api/upload");
  }
}
