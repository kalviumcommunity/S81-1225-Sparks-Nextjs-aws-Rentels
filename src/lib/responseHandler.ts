import { NextResponse } from "next/server";

import type { ErrorCode } from "@/lib/errorCodes";
import { ERROR_CODES } from "@/lib/errorCodes";

export type ApiError = {
  code: ErrorCode;
  details?: unknown;
};

export type ApiResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
      timestamp: string;
    }
  | {
      success: false;
      message: string;
      error: ApiError;
      timestamp: string;
    };

export function sendSuccess<T>(data: T, message = "Success", status = 200) {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, { status });
}

export function sendError(
  message = "Something went wrong",
  code: ErrorCode = ERROR_CODES.INTERNAL_ERROR,
  status = 500,
  details?: unknown
) {
  const payload: ApiResponse<never> = {
    success: false,
    message,
    error: {
      code,
      ...(details === undefined ? {} : { details }),
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(payload, { status });
}
