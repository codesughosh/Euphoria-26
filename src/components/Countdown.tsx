"use client";

import { useCountdown } from "@/lib/launch";

export default function Countdown({ label = "Registration Opens In" }: { label?: string }) {
  const remaining = useCountdown();
  if (remaining.diff <= 0) return null;

  const units = [
    { value: remaining.days, unit: "Days" },
    { value: remaining.hours, unit: "Hrs" },
    { value: remaining.minutes, unit: "Min" },
    { value: remaining.seconds, unit: "Sec" },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">{label}</p>
      <div className="flex items-center gap-2">
        {units.map((u) => (
          <div
            key={u.unit}
            className="chrome-border rounded-xl px-3 py-2 flex flex-col items-center min-w-[54px]"
          >
            <span className="chrome-text text-2xl font-bold tabular-nums">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] text-[var(--muted)] uppercase tracking-wide mt-0.5">
              {u.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
