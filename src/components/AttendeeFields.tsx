"use client";

import { motion, AnimatePresence } from "framer-motion";
import FormInput from "@/components/FormInput";
import type { EntryType } from "@/lib/types";

interface AttendeeFieldsProps {
  entryType: EntryType | null;
  attendee1Name: string;
  attendee1Phone: string;
  attendee2Name: string;
  attendee2Phone: string;
  onAttendee1NameChange: (v: string) => void;
  onAttendee1PhoneChange: (v: string) => void;
  onAttendee2NameChange: (v: string) => void;
  onAttendee2PhoneChange: (v: string) => void;
}

export default function AttendeeFields({
  entryType,
  attendee1Name,
  attendee1Phone,
  attendee2Name,
  attendee2Phone,
  onAttendee1NameChange,
  onAttendee1PhoneChange,
  onAttendee2NameChange,
  onAttendee2PhoneChange,
}: AttendeeFieldsProps) {
  return (
    <AnimatePresence mode="wait">
      {entryType && (
        <motion.div
          key={entryType}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className="flex flex-col gap-4 pt-1">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                {entryType === "couple" ? "Person 1" : "Attendee"}
              </p>
              <div className="flex flex-col gap-3">
                <FormInput
                  id="attendee1_name"
                  label="Name"
                  value={attendee1Name}
                  onChange={(e) => onAttendee1NameChange(e.target.value)}
                  required
                />
                <FormInput
                  id="attendee1_phone"
                  label="Phone Number"
                  value={attendee1Phone}
                  onChange={(e) => onAttendee1PhoneChange(e.target.value)}
                  required
                />
              </div>
            </div>

            {entryType === "couple" && (
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                  Person 2
                </p>
                <div className="flex flex-col gap-3">
                  <FormInput
                    id="attendee2_name"
                    label="Name"
                    value={attendee2Name}
                    onChange={(e) => onAttendee2NameChange(e.target.value)}
                    required
                  />
                  <FormInput
                    id="attendee2_phone"
                    label="Phone Number"
                    value={attendee2Phone}
                    onChange={(e) => onAttendee2PhoneChange(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
