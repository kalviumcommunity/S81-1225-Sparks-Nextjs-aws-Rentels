export default function NotFound() {
  return (
    <main className="flex flex-col items-center gap-2 px-6 py-16">
      <h1 className="text-2xl font-bold text-red-600">404 — Page Not Found</h1>
      <p className="text-sm text-zinc-600">Oops! This route doesn’t exist.</p>
    </main>
  );
}
