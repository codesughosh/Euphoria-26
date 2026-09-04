"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { TicketStatus, EntryType } from "@/lib/types";

const statusCopy: Record<TicketStatus, { title: string; sub: string; color: string }> = {
  pending: {
    title: "Verification Pending",
    sub: "We’re checking your payment. This usually takes a few hours.",
    color: "var(--warning)",
  },
  verified: {
    title: "You’re In",
    sub: "Show this QR at the venue entrance.",
    color: "var(--success)",
  },
  rejected: {
    title: "Payment Not Verified",
    sub: "We couldn’t confirm your transaction. Please book again with the correct ID.",
    color: "var(--danger)",
  },
  checked_in: {
    title: "Checked In",
    sub: "You’ve already entered the venue. Enjoy the night.",
    color: "var(--success)",
  },
};

export default function TicketReveal({
  status,
  qrDataUrl,
  transactionId,
  entryType,
}: {
  status: TicketStatus;
  qrDataUrl: string | null;
  transactionId: string;
  entryType: EntryType;
}) {
  const copy = statusCopy[status];

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, rotateX: -20, y: 20 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="chrome-border rounded-2xl w-full p-8 flex flex-col items-center gap-4"
        style={{ perspective: 800 }}
      >
        <motion.div
          animate={{ boxShadow: [`0 0 0px ${copy.color}`, `0 0 18px ${copy.color}`, `0 0 0px ${copy.color}`] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full"
          style={{ background: copy.color }}
        />

        <h2 className="chrome-text text-xl font-semibold">{copy.title}</h2>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] border border-[var(--border)] rounded-full px-3 py-1">
          {entryType} entry
        </span>
        <p className="text-xs text-[var(--muted)] max-w-xs">{copy.sub}</p>

        {status === "verified" && qrDataUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 bg-white rounded-xl p-3"
          >
            <Image src={qrDataUrl} alt="Your ticket QR code" width={260} height={260} />
          </motion.div>
        )}

        {status === "checked_in" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
            className="mt-4 w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(74, 222, 128, 0.12)", border: "1px solid var(--success)" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l5 5L20 6" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}

        <p className="text-[10px] text-[var(--muted)] mt-2 tracking-wide">
          TXN: {transactionId}
        </p>

        {status === "rejected" && (
          <a
            href="/book"
            className="chrome-btn rounded-xl px-8 py-2.5 text-xs uppercase tracking-wide mt-2"
          >
            Book Again
          </a>
        )}
      </motion.div>
    </div>
  );
}
