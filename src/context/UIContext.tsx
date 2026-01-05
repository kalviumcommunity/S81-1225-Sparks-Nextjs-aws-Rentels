"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";

export interface UIContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    // Demo-only log for the lesson.
    // eslint-disable-next-line no-console
    console.log("Theme toggled");
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
    // Demo-only log for the lesson.
    // eslint-disable-next-line no-console
    console.log("Sidebar toggled");
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({ theme, toggleTheme, sidebarOpen, toggleSidebar }),
    [theme, toggleTheme, sidebarOpen, toggleSidebar],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
}
