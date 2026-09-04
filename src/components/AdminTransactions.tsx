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
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { Ticket, TicketStatus } from "@/lib/types";

const STATUS_LABEL: Record<TicketStatus, string> = {
  pending: "Pending",
  verified: "Verified",
  rejected: "Rejected",
  checked_in: "Checked In",
};

const STATUS_COLOR: Record<TicketStatus, string> = {
  pending: "var(--warning)",
  verified: "var(--success)",
  rejected: "var(--danger)",
  checked_in: "var(--success)",
};

export default function AdminTransactions() {
  const [items, setItems] = useState<Ticket[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
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
    return <p className="text-center text-[var(--muted)] text-sm mt-16">No transactions yet.</p>;
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

            {t.status === "pending" ? (
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
            ) : (
              <span
                className="text-xs uppercase tracking-wide w-fit"
                style={{ color: STATUS_COLOR[t.status] }}
              >
                {STATUS_LABEL[t.status]}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
