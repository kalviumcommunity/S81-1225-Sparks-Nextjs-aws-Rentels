"use client";

import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  label: string;
  variant?: ButtonVariant;
}

export default function Button({
  label,
  variant = "primary",
  type = "button",
  ...rest
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "rounded bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700 disabled:opacity-60"
      : "rounded bg-zinc-100 px-4 py-2 text-zinc-900 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700 disabled:opacity-60";

  return (
    <button type={type} className={styles} {...rest}>
      {label}
    </button>
  );
}
