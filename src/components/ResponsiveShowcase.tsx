"use client";

import { useTheme } from "@/context/ThemeProvider";

export function ResponsiveShowcase() {
  const { theme } = useTheme();

  const features = [
    {
      icon: (
        <span role="img" aria-label="house">
          🏠
        </span>
      ),
      title: "Property Rentals",
      description: "Find your perfect home or office space",
    },
    {
      icon: (
        <span role="img" aria-label="car">
          🚗
        </span>
      ),
      title: "Vehicle Rentals",
      description: "Cars, bikes, and more for your journey",
    },
    {
      icon: (
        <span role="img" aria-label="wrench">
          🔧
        </span>
      ),
      title: "Equipment Rentals",
      description: "Professional tools and equipment on demand",
    },
    {
      icon: (
        <span role="img" aria-label="party popper">
          🎉
        </span>
      ),
      title: "Event Rentals",
      description: "Everything you need for memorable events",
    },
  ];

  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Explore Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base md:mt-4 md:text-lg">
            Responsive design that adapts beautifully across all devices, with
            seamless theme switching
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 md:mt-12 lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card transform p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {feature.description}
              </p>
              <button className="mt-4 text-sm font-medium text-brand transition-colors hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:text-base">
                Learn more →
              </button>
            </div>
          ))}
        </div>

        {/* Theme Demonstration Section */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8 md:mt-16 lg:p-12">
          <h3 className="text-xl font-bold text-card-foreground sm:text-2xl md:text-3xl">
            Theme-Aware Design
          </h3>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base md:mt-4">
            Currently viewing in{" "}
            <span className="font-semibold text-brand">
              {theme === "light" ? "Light" : "Dark"}
            </span>{" "}
            mode. Toggle the theme to see smooth transitions and carefully
            crafted color palettes.
          </p>

          {/* Color Palette Display */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-8 md:gap-4 lg:grid-cols-6">
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-brand shadow-sm sm:h-20" />
              <p className="text-xs text-muted-foreground">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-secondary shadow-sm sm:h-20" />
              <p className="text-xs text-muted-foreground">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-accent shadow-sm sm:h-20" />
              <p className="text-xs text-muted-foreground">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-success shadow-sm sm:h-20" />
              <p className="text-xs text-muted-foreground">Success</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-warning shadow-sm sm:h-20" />
              <p className="text-xs text-muted-foreground">Warning</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-error shadow-sm sm:h-20" />
              <p className="text-xs text-muted-foreground">Error</p>
            </div>
          </div>

          {/* Responsive Breakpoint Indicator */}
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-muted p-4 md:mt-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              <span className="sm:hidden">XS</span>
              <span className="hidden sm:inline md:hidden">SM</span>
              <span className="hidden md:inline lg:hidden">MD</span>
              <span className="hidden lg:inline xl:hidden">LG</span>
              <span className="hidden xl:inline 2xl:hidden">XL</span>
              <span className="hidden 2xl:inline">2XL</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="sm:hidden">
                Extra Small (&lt;640px) - Mobile
              </span>
              <span className="hidden sm:inline md:hidden">
                Small (≥640px) - Large Mobile
              </span>
              <span className="hidden md:inline lg:hidden">
                Medium (≥768px) - Tablet
              </span>
              <span className="hidden lg:inline xl:hidden">
                Large (≥1024px) - Desktop
              </span>
              <span className="hidden xl:inline 2xl:hidden">
                Extra Large (≥1280px) - Large Desktop
              </span>
              <span className="hidden 2xl:inline">
                2X Large (≥1536px) - Ultra Wide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
