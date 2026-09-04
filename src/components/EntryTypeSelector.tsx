"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { EntryType } from "@/lib/types";

const options: { value: EntryType; label: string; price: string }[] = [
  { value: "stag", label: "Stag", price: "₹XXX" },
  { value: "couple", label: "Couple", price: "₹XXX" },
];

export default function EntryTypeSelector({
  name = "entry_type",
  defaultValue = "stag",
}: {
  name?: string;
  defaultValue?: EntryType;
}) {
  const [selected, setSelected] = useState<EntryType>(defaultValue);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-widest text-[var(--muted)]">
        Entry Type
      </span>
      <input type="hidden" name={name} value={selected} />
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const active = selected === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(opt.value)}
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
