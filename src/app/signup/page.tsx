"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/schemas/signupSchema";

/**
 * Signup Form Page
 * Demonstrates React Hook Form + Zod integration with:
 * - Schema-based validation
 * - Real-time error feedback
 * - Accessible form structure
 * - Loading states
 */
export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`Welcome, ${data.name}! Your account has been created successfully.`);

    // Reset form after successful submission
    reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-8 space-y-4"
          noValidate
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Minimum 6 characters"
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                Submitting...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
