"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  function handleLogin() {
    // Demo-only: set a mock token cookie (real apps should use an HttpOnly cookie).
    document.cookie =
      "token=mock.jwt.token; Path=/; Max-Age=3600; SameSite=Lax";
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-col items-center gap-4 px-6 py-16">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="max-w-xl text-center text-sm text-zinc-600">
        This lesson uses a mock login. Clicking “Login” stores a demo token in
        cookies and routes you to the protected dashboard.
      </p>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="button"
        onClick={() => {
          try {
            setError(null);
            handleLogin();
          } catch {
            setError("Login failed. Please try again.");
          }
        }}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Login
      </button>
    </main>
  );
}
