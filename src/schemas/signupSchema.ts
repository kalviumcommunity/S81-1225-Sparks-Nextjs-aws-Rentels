import { z } from "zod";

/**
 * Validation schema for user signup form
 * Enforces minimum length requirements and proper email format
 */
export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

/**
 * TypeScript type inferred from the Zod schema
 * Ensures type safety throughout the application
 */
export type SignupFormData = z.infer<typeof signupSchema>;
