import { z } from "zod";

/**
 * Validation schema for signup form
 * Ensures data integrity for user registration
 */
export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

/**
 * TypeScript type inferred from the signup schema
 * Provides type safety for form data
 */
export type SignupFormData = z.infer<typeof signupSchema>;
