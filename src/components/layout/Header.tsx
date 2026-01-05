"use client";

import Link from "next/link";
import { useUI } from "@/hooks/useUI";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/login", label: "Login" },
];

export default function Header() {
  const { sidebarOpen, toggleSidebar } = useUI();

  return (
    <header className="w-full border-b border-black/10 bg-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
        >
          Sparks Rentals
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-expanded={sidebarOpen}
            aria-controls="sidebar"
            className="rounded bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
          >
            {sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          </button>

          <nav aria-label="Primary" className="flex flex-wrap gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
