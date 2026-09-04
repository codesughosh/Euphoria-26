"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TERMS_CONTENT } from "@/lib/termsContent";

const noopSubscribe = () => () => {};

export default function TermsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 px-4 pb-4 sm:pb-0"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="chrome-border rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto p-6 bg-[var(--surface)]"
          >
            <h3 className="chrome-text text-lg font-semibold mb-4">
              Terms &amp; Conditions
            </h3>
            <div className="space-y-3 text-xs text-[var(--muted)] leading-relaxed">
              {TERMS_CONTENT.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <button
              onClick={onClose}
              className="chrome-btn w-full rounded-xl py-2.5 text-xs uppercase tracking-wide mt-6"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
