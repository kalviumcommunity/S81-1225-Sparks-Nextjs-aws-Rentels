import { z } from "zod";

/**
 * Validation schema for contact form
 * Ensures proper message submission with required fields
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

/**
 * TypeScript type inferred from the contact schema
 * Provides type safety for contact form data
 */
export type ContactFormData = z.infer<typeof contactSchema>;
