"use client";

import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUI } from "@/hooks/useUI";

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { sidebarOpen } = useUI();

  return (
    <div className="flex min-h-dvh flex-col">
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
