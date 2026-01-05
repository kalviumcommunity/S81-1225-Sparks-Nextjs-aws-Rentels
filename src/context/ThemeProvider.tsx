"use client";

import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // Apply theme to document root
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Add transitioning class to prevent flash
    root.classList.add("theme-transitioning");

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Remove transitioning class after a brief delay
    setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 100);
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const initialTheme = storedTheme || systemTheme;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Prevent hydration mismatch by not rendering untill mounted
  // However, we MUST provide the context even during SSR/initial render
  // otherwise components calling useTheme will throw "useTheme must be used within a ThemeProvider"

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
