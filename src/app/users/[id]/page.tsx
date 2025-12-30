import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function UserProfilePage({ params }: Props) {
  const { id } = params;

  // Basic validation to demonstrate 404 behavior for invalid params.
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const user = { id, name: `User ${id}` };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <nav className="text-sm text-zinc-600" aria-label="Breadcrumb">
        <Link className="underline" href="/">
          Home
        </Link>
        <span> / </span>
        <Link className="underline" href="/users">
          Users
        </Link>
        <span> / </span>
        <span className="text-zinc-900">{id}</span>
      </nav>

      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <p className="text-sm text-zinc-600">
          Dynamic route: <span className="font-mono">/users/{id}</span>
        </p>
      </header>

      <section className="flex flex-col gap-1">
        <p>
          <span className="font-medium">ID:</span> {user.id}
        </p>
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
      </section>
    </main>
  );
}
