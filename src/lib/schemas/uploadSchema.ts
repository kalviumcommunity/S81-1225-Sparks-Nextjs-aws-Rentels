import { z } from "zod";

export { formatZodError } from "@/lib/schemas/zodUtils";

export const DEFAULT_ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
] as const;

export const uploadPresignSchema = z.object({
  fileName: z.string().trim().min(1, "fileName is required"),
  fileType: z.string().trim().min(1, "fileType is required"),
  fileSize: z.number().int().positive("fileSize must be a positive integer"),
});

export type UploadPresignInput = z.infer<typeof uploadPresignSchema>;

export const fileCreateSchema = z.object({
  key: z.string().trim().min(1, "key is required"),
  originalName: z.string().trim().min(1, "originalName is required"),
  mimeType: z.string().trim().min(1, "mimeType is required"),
  size: z.number().int().positive("size must be a positive integer"),
});

export type FileCreateInput = z.infer<typeof fileCreateSchema>;
