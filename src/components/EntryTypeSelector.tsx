"use client";

import { motion } from "framer-motion";
import type { EntryType } from "@/lib/types";

const options: { value: EntryType; label: string; price: string }[] = [
  { value: "stag", label: "Stag", price: "₹950" },
  { value: "couple", label: "Couple", price: "₹1800" },
];

export default function EntryTypeSelector({
  value,
  onChange,
}: {
  value: EntryType | null;
  onChange: (value: EntryType) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
        Entry Type
      </span>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => onChange(opt.value)}
              className={`relative rounded-xl py-3 px-4 text-left border transition-colors ${
                active
                  ? "border-transparent"
                  : "border-[var(--border)] hover:border-[var(--chrome-3)]"
              }`}
              style={
                active
                  ? {
                      background:
                        "linear-gradient(135deg, #3a3a3a, #e8e8e8 45%, #7a7a7a 55%, #ffffff)",
                    }
                  : undefined
              }
            >
              <span
                className={`block text-sm font-medium uppercase tracking-wide ${
                  active ? "text-black" : "text-white"
                }`}
              >
                {opt.label}
              </span>
              <span
                className={`block text-xs mt-0.5 ${
                  active ? "text-black/70" : "text-[var(--muted)]"
                }`}
              >
                {opt.price}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
