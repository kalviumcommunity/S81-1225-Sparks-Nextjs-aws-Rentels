"use client";

import Link from "next/link";

import { Button } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { useUI } from "@/hooks/useUI";

export default function Home() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();

  const themeClasses =
    theme === "dark"
      ? "bg-zinc-900 text-white border-white/10"
      : "bg-white text-zinc-900 border-black/10";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Context & Hooks Demo</h1>
        <p className="text-sm text-black/70">
          Global state is provided via React Context and accessed through custom
          hooks.
        </p>
      </header>

      <section className={`rounded border p-6 ${themeClasses}`}>
        <h2 className="mb-4 text-lg font-semibold">Auth State</h2>
        {isAuthenticated ? (
          <div className="flex flex-col gap-3">
            <p>
              Logged in as: <span className="font-semibold">{user}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button label="Logout" onClick={logout} variant="secondary" />
              <Link className="underline" href="/dashboard">
                Go to /dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p>You are not logged in.</p>
            <div className="flex flex-wrap gap-3">
              <Button label="Login" onClick={() => login("KalviumUser")} />
              <Link className="underline" href="/login">
                Go to /login
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="rounded border border-black/10 bg-zinc-50 p-6">
        <h2 className="mb-4 text-lg font-semibold">UI State</h2>
        <div className="space-y-2 text-sm">
          <p>
            Theme: <span className="font-semibold">{theme}</span>
          </p>
          <p>
            Sidebar:{" "}
            <span className="font-semibold">
              {sidebarOpen ? "open" : "closed"}
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            label="Toggle Theme"
            onClick={toggleTheme}
            variant="secondary"
          />
          <Button
            label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            onClick={toggleSidebar}
            variant="secondary"
          />
          <Link className="underline" href="/users">
            Go to /users
          </Link>
        </div>
      </section>
    </div>
  );
}
