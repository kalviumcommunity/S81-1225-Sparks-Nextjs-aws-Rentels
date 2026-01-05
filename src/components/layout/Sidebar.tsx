"use client";

import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/users", label: "Users" },
];

export default function Sidebar() {
  return (
    <aside
      id="sidebar"
      aria-label="Sidebar"
      className="w-64 shrink-0 border-r border-black/10 bg-zinc-50 px-4 py-6"
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-black/70">
        Navigation
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded px-2 py-1 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
