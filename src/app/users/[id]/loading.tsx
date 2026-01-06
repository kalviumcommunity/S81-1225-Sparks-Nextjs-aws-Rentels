export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <div className="h-4 w-1/2 rounded bg-zinc-200" />

      <header className="flex flex-col gap-2">
        <div className="h-8 w-48 rounded bg-zinc-200" />
        <div className="h-4 w-2/3 rounded bg-zinc-200" />
      </header>

      <section className="animate-pulse space-y-3">
        <div className="h-4 w-1/3 rounded bg-zinc-200" />
        <div className="h-4 w-1/2 rounded bg-zinc-200" />
      </section>
    </main>
  );
}
