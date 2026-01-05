"use client";

export function ResponsiveHero() {

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-secondary px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-8 lg:py-32">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] bg-repeat" />
            </div>

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            Sparks Rentals
                        </h1>
                        <p className="mt-4 text-base text-blue-100 sm:text-lg md:mt-6 md:text-xl lg:text-2xl">
                            Your trusted platform for seamless rental experiences
                        </p>
                        <p className="mt-3 text-sm text-blue-200 sm:text-base md:mt-4 lg:max-w-xl">
                            Discover a wide range of rental options tailored to your needs.
                            From equipment to properties, we've got you covered with
                            competitive pricing and exceptional service.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-8 lg:justify-start">
                            <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand transition-all hover:bg-blue-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand sm:px-8 sm:text-base">
                                Browse Rentals
                            </button>
                            <button className="rounded-lg border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand sm:px-8 sm:text-base">
                                Learn More
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/20 pt-6 sm:grid-cols-3 sm:gap-4 md:mt-10 md:pt-8">
                            <div className="text-center lg:text-left">
                                <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                    500+
                                </div>
                                <div className="mt-1 text-xs text-blue-200 sm:text-sm">
                                    Listings
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                    1000+
                                </div>
                                <div className="mt-1 text-xs text-blue-200 sm:text-sm">
                                    Happy Clients
                                </div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                    24/7
                                </div>
                                <div className="mt-1 text-xs text-blue-200 sm:text-sm">
                                    Support
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image/Visual Element */}
                    <div className="relative hidden lg:block">
                        <div className="aspect-square rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
                            <div className="flex h-full items-center justify-center">
                                <svg
                                    className="h-full w-full text-white opacity-80"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
