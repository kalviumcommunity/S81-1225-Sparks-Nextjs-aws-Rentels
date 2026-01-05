"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/schemas/signupSchema";
import FormInput from "@/components/ui/FormInput";

/**
 * Signup Form Page
 *
 * Demonstrates React Hook Form + Zod validation with:
 * - Real-time validation
 * - Type-safe form data
 * - Accessible form structure
 * - Reusable input components
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

    const onSubmit = (data: SignupFormData) => {
        console.log("Form Submitted:", data);
        alert(`Welcome, ${data.name}! Your account has been created.`);
        reset(); // Reset form after successful submission
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
                    Create Account
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Sign up to get started with Sparks Rentals
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded-lg shadow-lg"
                    noValidate
                >
                    <FormInput
                        label="Full Name"
                        name="name"
                        register={register}
                        error={errors.name?.message}
                        placeholder="Enter your full name"
                    />

                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email?.message}
                        placeholder="you@example.com"
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        register={register}
                        error={errors.password?.message}
                        placeholder="At least 6 characters"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-medium mt-4"
                    >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </main>
    );
}
