import crypto from "crypto";

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

export function getUploadConfig() {
  const maxBytesRaw = process.env.UPLOAD_MAX_BYTES;
  const presignTtlRaw = process.env.UPLOAD_PRESIGN_TTL_SECONDS;
  const keyPrefix = process.env.UPLOAD_KEY_PREFIX || "uploads";

  const maxBytes = maxBytesRaw ? Number(maxBytesRaw) : 5 * 1024 * 1024;
  const presignTtlSeconds = presignTtlRaw ? Number(presignTtlRaw) : 60;

  return {
    maxBytes:
      Number.isFinite(maxBytes) && maxBytes > 0 ? maxBytes : 5 * 1024 * 1024,
    presignTtlSeconds:
      Number.isFinite(presignTtlSeconds) && presignTtlSeconds > 0
        ? presignTtlSeconds
        : 60,
    keyPrefix,
  };
}

export function isAllowedMimeType(mimeType: string) {
  return Object.prototype.hasOwnProperty.call(MIME_TO_EXTENSION, mimeType);
}

export function extensionForMimeType(mimeType: string) {
  return MIME_TO_EXTENSION[mimeType] ?? null;
}

export function sanitizeFileName(fileName: string) {
  const trimmed = fileName.trim();
  const noPath = trimmed.replace(/\\/g, "/").split("/").pop() || "file";
  // Keep it conservative: letters, numbers, dot, dash, underscore.
  const safe = noPath.replace(/[^a-zA-Z0-9._-]/g, "_");
  return safe.slice(0, 200) || "file";
}

export function buildUploadKey({
  userId,
  mimeType,
  originalFileName,
  prefix,
}: {
  userId: number;
  mimeType: string;
  originalFileName: string;
  prefix: string;
}) {
  const safeName = sanitizeFileName(originalFileName);
  const ext = extensionForMimeType(mimeType);
  const id = crypto.randomUUID();

  // Prefer mime-derived extension to avoid trusting user-provided extensions.
  const finalExt = ext ? `.${ext}` : "";

  // Keep some human-friendly context in the key while ensuring uniqueness.
  const baseName = safeName.replace(/\.[^.]+$/, "");
  const shortBase = baseName.slice(0, 60);

  return `${prefix}/${userId}/${shortBase}-${id}${finalExt}`;
}
