"use client";

import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

import AddUser, { USERS_KEY, type UsersListPayload } from "./AddUser";
import { fetcher } from "@/lib/fetcher";

export default function UsersPage() {
  const { cache } = useSWRConfig();
  const { data, error, isLoading } = useSWR<UsersListPayload>(
    USERS_KEY,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    // Demo-only: helps visualize cache keys in DevTools.
    if (process.env.NODE_ENV !== "production") {
      console.log("SWR cache keys:", Array.from(cache.keys()));
    }
  }, [cache, data]);

  if (error) {
    throw error;
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-zinc-600">
          Client-side fetching via SWR with caching and revalidation.
        </p>
      </header>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {["one", "two", "three"].map((key) => (
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
      ) : null}

      {data ? (
        <ul className="flex flex-col gap-3">
          {data.data.map((user) => (
            <li
              key={user.id}
              className="rounded border border-black/10 bg-white p-4"
            >
              <div className="flex flex-col gap-1">
                <Link className="underline" href={`/users/${user.id}`}>
                  {user.name}
                </Link>
                <p className="text-sm text-zinc-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <AddUser />
    </main>
  );
}
