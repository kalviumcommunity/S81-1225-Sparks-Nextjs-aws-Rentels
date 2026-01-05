"use client";

import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { ThemeToggle } from "../ThemeToggle";
import { useUI } from "@/hooks/useUI";

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { sidebarOpen } = useUI();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        {sidebarOpen ? <Sidebar /> : null}
        <main
          id="main"
          className="flex-1 bg-white p-6"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
