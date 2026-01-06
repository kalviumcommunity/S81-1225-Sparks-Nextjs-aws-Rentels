"use client";

import { Button } from "@/components";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900">
        Couldnt load this profile
      </h1>
      <p className="text-sm text-zinc-600">
        Something went wrong while rendering this page.
      </p>
      <p className="rounded border border-black/10 bg-white p-3 text-sm text-zinc-700">
        {error.message}
      </p>

      <div>
        <Button label="Try Again" onClick={() => reset()} />
      </div>
    </main>
  );
}
