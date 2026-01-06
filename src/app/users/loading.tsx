export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <div className="h-8 w-32 rounded bg-zinc-200" />
        <div className="h-4 w-2/3 rounded bg-zinc-200" />
      </header>

      <div className="animate-pulse space-y-3">
        {["one", "two", "three", "four"].map((key) => (
          <div
            key={key}
            className="rounded border border-black/10 bg-white p-4"
          >
            <div className="space-y-2">
              <div className="h-5 w-1/3 rounded bg-zinc-200" />
              <div className="h-4 w-2/3 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded border border-black/10 bg-white p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-40 rounded bg-zinc-200" />
          <div className="h-4 w-full rounded bg-zinc-200" />
          <div className="h-4 w-2/3 rounded bg-zinc-200" />
          <div className="h-9 w-32 rounded bg-zinc-200" />
        </div>
      </div>
    </main>
  );
}
