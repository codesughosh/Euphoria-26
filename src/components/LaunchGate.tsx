"use client";

import type { ReactNode } from "react";
import { useIsLaunched } from "@/lib/launch";
import Countdown from "@/components/Countdown";
import PageShell from "@/components/PageShell";

export default function LaunchGate({
  children,
  message = "Registration isn't open yet. Check back when the countdown ends.",
}: {
  children: ReactNode;
  message?: string;
}) {
  const launched = useIsLaunched();

  if (!launched) {
    return (
      <PageShell className="items-center justify-center text-center">
        <h2 className="chrome-text text-2xl font-semibold mb-2">Not Yet</h2>
        <p className="text-xs text-[var(--muted)] max-w-xs mb-8">{message}</p>
        <Countdown />
      </PageShell>
    );
  }

  return <>{children}</>;
}
