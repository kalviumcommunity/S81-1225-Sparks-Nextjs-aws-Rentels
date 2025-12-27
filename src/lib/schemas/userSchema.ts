import { z, type ZodError } from "zod";

export const ROLE_VALUES = ["CUSTOMER", "OWNER", "ADMIN"] as const;

const trimmedString = z.string().trim();

const optionalNullableTrimmedString = z
  .union([trimmedString, z.null(), z.undefined()])
  .transform((value) =>
    value === null || value === undefined ? undefined : value
  );

export const userCreateSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .transform((value: string) => value.toLowerCase()),
  role: z
    .enum(ROLE_VALUES)
    .optional()
    .nullable()
    .transform((value) => (value === null ? undefined : value)),
  phone: optionalNullableTrimmedString,
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;

export const userPutSchema = userCreateSchema;
export type UserPutInput = z.infer<typeof userPutSchema>;

export const userPatchSchema = userCreateSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
  });

export type UserPatchInput = z.infer<typeof userPatchSchema>;

export function formatZodError(error: ZodError) {
  return error.issues.map((e) => ({
    field: e.path.length > 0 ? String(e.path[0]) : "_",
    message: e.message,
  }));
}
