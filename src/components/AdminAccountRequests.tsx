"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type { AccountStatus, Profile } from "@/lib/types";

const STATUS_LABEL: Record<AccountStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const STATUS_COLOR: Record<AccountStatus, string> = {
  pending: "var(--warning)",
  approved: "var(--success)",
  rejected: "var(--danger)",
};

export default function AdminAccountRequests() {
  const [items, setItems] = useState<Profile[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Profile);
      setItems(all.filter((p) => p.year && p.year !== "1st"));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function approve(id: string) {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "profiles", id), { accountStatus: "approved" });
    } finally {
      setBusyId(null);
    }
  }

  async function reject(id: string) {
    setBusyId(id);
    try {
      await updateDoc(doc(db, "profiles", id), { accountStatus: "rejected" });
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
    return <p className="text-center text-[var(--muted)] text-sm mt-16">No account requests yet.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {items.map((p) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="chrome-border rounded-xl p-4 flex flex-col gap-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{p.name}</p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--muted)] border border-[var(--border)] rounded-full px-2.5 py-1">
                  {p.year} year
                </span>
              </div>
              <p className="text-xs text-[var(--muted)]">{p.email}</p>
              <p className="text-xs text-[var(--muted)]">{p.phone}</p>
              <p className="text-xs mt-2 tracking-wide">
                USN: <span className="text-white">{p.usn}</span>
              </p>
            </div>

            {p.accountStatus === "pending" ? (
              <div className="flex gap-3">
                <button
                  onClick={() => approve(p.id)}
                  disabled={busyId === p.id}
                  className="flex-1 rounded-lg py-2 text-xs uppercase tracking-wide chrome-btn disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => reject(p.id)}
                  disabled={busyId === p.id}
                  className="flex-1 rounded-lg py-2 text-xs uppercase tracking-wide border border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)]/10 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            ) : (
              <span
                className="text-xs uppercase tracking-wide w-fit"
                style={{ color: STATUS_COLOR[p.accountStatus] }}
              >
                {STATUS_LABEL[p.accountStatus]}
              </span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
