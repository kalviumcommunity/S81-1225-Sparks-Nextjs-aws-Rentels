"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/schemas/contactSchema";
import FormInput from "@/components/ui/FormInput";

/**
 * Contact Form Page
 * Demonstrates reusable FormInput component usage with:
 * - Schema-based validation
 * - Consistent error handling
 * - Accessible form structure
 * - Clean component composition
 */
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Message Sent Successfully! We'll get back to you soon.");

    // Reset form after successful submission
    reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-600">We&apos;d love to hear from you</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-8 space-y-5"
          noValidate
        >
          {/* Using Reusable FormInput Component */}
          <FormInput
            label="Your Name"
            name="name"
            register={register}
            error={errors.name?.message}
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
          />

          {/* Message Field - Custom textarea */}
          <div className="mb-3">
            <label
              htmlFor="message"
              className="block mb-1 font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              rows={5}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              placeholder="Tell us what's on your mind..."
            />
            {errors.message && (
              <p
                id="message-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Need immediate assistance?{" "}
            <a
              href="mailto:support@example.com"
              className="text-green-600 hover:underline font-medium"
            >
              Email us directly
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
