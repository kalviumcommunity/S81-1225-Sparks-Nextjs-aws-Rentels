import Link from "next/link";

const demoUserIds = ["1", "2", "42"];

export default function UsersPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-zinc-600">
          This is a protected list page. Each user profile is a dynamic route.
        </p>
      </header>

      <ul className="flex flex-col gap-2">
        {demoUserIds.map((id) => (
          <li key={id}>
            <Link className="underline" href={`/users/${id}`}>
              View user {id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
