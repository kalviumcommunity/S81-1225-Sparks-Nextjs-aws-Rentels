import { ERROR_CODES, type ErrorCode } from "@/lib/errorCodes";
import { logger } from "@/lib/logger";
import { sendError } from "@/lib/responseHandler";

export type HandleErrorOptions = {
  status?: number;
  code?: ErrorCode;
  publicMessage?: string;
};

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message || "Unknown error",
      stack: error.stack,
      name: error.name,
    };
  }

  return {
    message: typeof error === "string" ? error : "Unknown error",
    stack: undefined as string | undefined,
    name: "UnknownError",
  };
}

export function handleError(
  error: unknown,
  context: string,
  options: HandleErrorOptions = {}
) {
  const isProd = process.env.NODE_ENV === "production";
  const normalized = normalizeError(error);

  const status = options.status ?? 500;
  const code = options.code ?? ERROR_CODES.INTERNAL_ERROR;

  const message = isProd
    ? (options.publicMessage ?? "Something went wrong. Please try again later.")
    : normalized.message;

  logger.error(`Error in ${context}`, {
    name: normalized.name,
    message: normalized.message,
    stack: isProd ? "REDACTED" : normalized.stack,
    status,
    code,
  });

  const details = isProd
    ? undefined
    : {
        context,
        name: normalized.name,
        stack: normalized.stack,
      };

  return sendError(message, code, status, details);
}
