import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LayoutWrapper } from "@/components";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { toastConfig } from "@/lib/toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sparks Rentals - Your Trusted Rental Platform",
  description: "Discover seamless rental experiences with Sparks Rentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <UIProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </UIProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster
          position={toastConfig.position}
          toastOptions={{
            duration: toastConfig.duration,
            style: toastConfig.style,
            success: toastConfig.success,
            error: toastConfig.error,
            loading: toastConfig.loading,
          }}
        />
      </body>
    </html>
  );
}
