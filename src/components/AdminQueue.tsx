"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Ticket } from "@/lib/types";

export default function AdminQueue() {
  const [items, setItems] = useState<Ticket[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "tickets"),
      where("status", "==", "pending"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Ticket));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function verify(id: string) {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "tickets", id), {
        status: "verified",
        verifiedAt: serverTimestamp(),
      });
    } finally {
      setBusyId(null);
    }
  }

  async function reject(id: string) {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "tickets", id), { status: "rejected" });
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--chrome-3)] border-t-white animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-center text-[var(--muted)] text-sm mt-16">No pending tickets. 🎉</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="chrome-border rounded-xl p-4 flex flex-col gap-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{t.name}</p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] border border-[var(--border)] rounded-full px-2.5 py-1">
                  {t.entryType}
                </span>
              </div>
              <p className="text-xs text-[var(--muted)]">{t.email}</p>
              <p className="text-xs text-[var(--muted)]">{t.phone}</p>
              <p className="text-xs mt-2 tracking-wide">
                TXN: <span className="text-white">{t.transactionId}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => verify(t.id)}
                disabled={busyId === t.id}
                className="flex-1 rounded-lg py-2 text-xs uppercase tracking-wide chrome-btn disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => reject(t.id)}
                disabled={busyId === t.id}
                className="flex-1 rounded-lg py-2 text-xs uppercase tracking-wide border border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)]/10 disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
