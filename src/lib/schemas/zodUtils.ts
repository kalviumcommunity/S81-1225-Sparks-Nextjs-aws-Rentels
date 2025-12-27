import type { ZodError } from "zod";

export function formatZodError(error: ZodError) {
  return error.issues.map((e) => ({
    field: e.path.length > 0 ? String(e.path[0]) : "_",
    message: e.message,
  }));
}
