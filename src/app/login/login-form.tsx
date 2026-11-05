"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <input
        name="password"
        type="password"
        autoFocus
        placeholder="Team password"
        className="w-full bg-ink-2 border border-line-2 rounded px-4 py-3 text-paper focus:outline-none focus:border-gold"
      />
      {state?.error && <p className="text-sm text-high">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-gold text-ink font-medium py-3 hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}
