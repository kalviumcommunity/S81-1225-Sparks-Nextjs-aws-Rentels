"use client";

import { useState } from "react";
import { mutate } from "swr";

import { Button } from "@/components";

const USERS_KEY = "/api/users?page=1&limit=10";

type UsersListPayload = {
  page: number;
  limit: number;
  total: number;
  data: Array<{
    id: number;
    name: string;
    email: string;
    role: string | null;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
};

function makeTempEmail(name: string) {
  const normalized = name.trim().toLowerCase().replaceAll(/\s+/g, ".");
  return `${normalized}.${Date.now()}@temp.user`;
}

export default function AddUser() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addUser() {
    const trimmed = name.trim();
    if (trimmed.length < 2) return;

    setIsSubmitting(true);
    setError(null);

    const optimisticUser = {
      id: Date.now(),
      name: trimmed,
      email: makeTempEmail(trimmed),
      role: null,
      phone: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistic update (no revalidation yet)
    mutate(
      USERS_KEY,
      (current: UsersListPayload | undefined) => {
        if (!current) {
          return {
            page: 1,
            limit: 10,
            total: 1,
            data: [optimisticUser],
          } satisfies UsersListPayload;
        }

        return {
          ...current,
          total: current.total + 1,
          data: [optimisticUser, ...current.data],
        } satisfies UsersListPayload;
      },
      false
    );

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // NOTE: auth header is attached by middleware from the cookie token.
          // For consistency with GET fetcher, we rely on cookie + middleware.
        },
        body: JSON.stringify({ name: trimmed, email: optimisticUser.email }),
      });

      if (!res.ok) {
        throw new Error("Failed to add user");
      }

      // Revalidate after update
      await mutate(USERS_KEY);
      setName("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add user");
      // Roll back to server truth
      await mutate(USERS_KEY);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-6 rounded border border-black/10 bg-zinc-50 p-4">
      <h2 className="text-sm font-semibold">Add user (optimistic)</h2>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="w-full rounded border border-black/10 bg-white px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          aria-label="User name"
        />

        <Button
          label={isSubmitting ? "Adding…" : "Add User"}
          onClick={addUser}
          disabled={isSubmitting || name.trim().length < 2}
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

export { USERS_KEY };
export type { UsersListPayload };
