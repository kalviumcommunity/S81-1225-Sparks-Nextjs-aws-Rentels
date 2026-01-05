import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <Sidebar />
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
