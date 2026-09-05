import { useSyncExternalStore } from "react";

export const LAUNCH_AT = new Date("2026-09-07T19:00:00+05:30").getTime();

export interface Remaining {
  diff: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// useSyncExternalStore requires getSnapshot to return a stable reference
// when nothing has actually changed, or it throws "getSnapshot should be
// cached" — so cache by the current second rather than building a fresh
// object on every call.
let cached: Remaining | null = null;
let cachedSecond = -1;

function computeRemaining(): Remaining {
  const diff = Math.max(0, LAUNCH_AT - Date.now());
  const second = Math.floor(diff / 1000);
  if (cached && cachedSecond === second) return cached;

  cachedSecond = second;
  cached = {
    diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
  return cached;
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

// Before the client has confirmed the real time, always assume "not launched"
// so the gate never briefly flashes unlocked content.
const SERVER_REMAINING: Remaining = { diff: 1, days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useCountdown(): Remaining {
  return useSyncExternalStore(subscribe, computeRemaining, () => SERVER_REMAINING);
}

export function useIsLaunched(): boolean {
  return useCountdown().diff <= 0;
}
