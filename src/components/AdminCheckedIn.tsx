"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Ticket } from "@/lib/types";

function toMillis(value: unknown): number {
  if (value && typeof value === "object" && "toMillis" in value) {
    return (value as { toMillis: () => number }).toMillis();
  }
  return typeof value === "number" ? value : 0;
}

function formatTime(value: unknown): string {
  const ms = toMillis(value);
  if (!ms) return "";
  return new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AdminCheckedIn() {
  const [items, setItems] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "tickets"), where("status", "==", "checked_in"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Ticket);
      docs.sort((a, b) => toMillis(b.checkedInAt) - toMillis(a.checkedInAt));
      setItems(docs);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--chrome-3)] border-t-white animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-center text-[var(--muted)] text-sm mt-16">No one has checked in yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-[var(--muted)]">
        {items.length} checked in
      </p>
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="chrome-border rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{t.name}</p>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] border border-[var(--border)] rounded-full px-2.5 py-1">
                {t.entryType}
              </span>
            </div>
            {t.attendees?.length > 0 && (
              <div className="text-xs space-y-0.5">
                {t.attendees.map((a, i) => (
                  <p key={i}>
                    <span className="text-[var(--muted)]">
                      {t.attendees.length > 1 ? `Person ${i + 1}: ` : "Attendee: "}
                    </span>
                    <span className="text-white">{a.name}</span>{" "}
                    <span className="text-[var(--muted)]">({a.phone})</span>
                  </p>
                ))}
              </div>
            )}
            {formatTime(t.checkedInAt) && (
              <p className="text-[10px] uppercase tracking-wide text-[var(--success)]">
                Checked in at {formatTime(t.checkedInAt)}
              </p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
