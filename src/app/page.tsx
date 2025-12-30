import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Welcome to the App</h1>
      <p className="text-zinc-600">
        Routing is powered by the Next.js App Router. Use the navigation links
        above, or jump straight to the login page.
      </p>

      <div className="flex gap-4">
        <Link className="underline" href="/login">
          Go to /login
        </Link>
        <Link className="underline" href="/dashboard">
          Go to /dashboard
        </Link>
      </div>
    </main>
  );
}
