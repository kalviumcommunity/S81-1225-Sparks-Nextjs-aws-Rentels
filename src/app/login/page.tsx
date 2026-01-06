"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/lib/toast";
import FormInput from "@/components/ui/FormInput";
import { loginSchema, type LoginInput } from "@/lib/schemas/authSchema";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const toastId = toast.loading("Logging in...");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      toast.success("Login successful! Redirecting...", { id: toastId });
      router.push("/dashboard");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Login failed. Please try again.",
        { id: toastId }
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Login
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Sign in to access your dashboard and protected pages.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg bg-white p-8 shadow-lg"
          noValidate
        >
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
            placeholder="Your password"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
