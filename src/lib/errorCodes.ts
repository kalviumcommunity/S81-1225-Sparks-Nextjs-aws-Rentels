export const ERROR_CODES = {
  VALIDATION_ERROR: "E001",
  NOT_FOUND: "E002",
  DATABASE_FAILURE: "E003",
  CONFLICT: "E004",
  UNAUTHORIZED: "E005",
  FORBIDDEN: "E006",
  INTERNAL_ERROR: "E500",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
