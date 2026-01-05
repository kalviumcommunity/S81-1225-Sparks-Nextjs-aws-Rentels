"use client";

import { ResponsiveHero, ResponsiveShowcase } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ResponsiveHero />
      <ResponsiveShowcase />
    </div>
  );
}
