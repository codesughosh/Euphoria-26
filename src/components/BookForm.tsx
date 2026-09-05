"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "@/lib/firebase/AuthProvider";
import PageShell from "@/components/PageShell";
import FormInput from "@/components/FormInput";
import ChromeButton from "@/components/ChromeButton";
import EntryTypeSelector from "@/components/EntryTypeSelector";
import AttendeeFields from "@/components/AttendeeFields";
import TermsModal from "@/components/TermsModal";
import type { EntryType } from "@/lib/types";

const ACTIVE_STATUSES = ["pending", "verified", "checked_in"];

export default function BookForm() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const [entryType, setEntryType] = useState<EntryType | null>(null);
  const [attendee1Name, setAttendee1Name] = useState(profile?.name ?? "");
  const [attendee1Phone, setAttendee1Phone] = useState(profile?.phone ?? "");
  const [attendee2Name, setAttendee2Name] = useState("");
  const [attendee2Phone, setAttendee2Phone] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const q = query(
        collection(db, "tickets"),
        where("userId", "==", user.uid),
        where("status", "in", ACTIVE_STATUSES)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        router.replace("/ticket");
        return;
      }
      setChecking(false);
    })();
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!user || !profile) return;

    const formData = new FormData(e.currentTarget);
    const transactionId = String(formData.get("transaction_id") || "").trim();

    if (!entryType) {
      setError("Select an entry type.");
      return;
    }
    if (!attendee1Name.trim() || !attendee1Phone.trim()) {
      setError("Enter the attendee's name and phone number.");
      return;
    }
    if (entryType === "couple" && (!attendee2Name.trim() || !attendee2Phone.trim())) {
      setError("Enter Person 2's name and phone number.");
      return;
    }
    if (!transactionId) {
      setError("Enter your transaction ID.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    const attendees =
      entryType === "couple"
        ? [
            { name: attendee1Name.trim(), phone: attendee1Phone.trim() },
            { name: attendee2Name.trim(), phone: attendee2Phone.trim() },
          ]
        : [{ name: attendee1Name.trim(), phone: attendee1Phone.trim() }];

    setPending(true);
    try {
      await addDoc(collection(db, "tickets"), {
        userId: user.uid,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        attendees,
        transactionId,
        entryType,
        status: "pending",
        createdAt: serverTimestamp(),
        verifiedAt: null,
        checkedInAt: null,
      });
      router.push("/ticket");
    } catch {
      setError("Could not submit your ticket. Please try again.");
      setPending(false);
    }
  }

  if (checking) {
    return (
      <PageShell className="items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--chrome-3)] border-t-white animate-spin" />
      </PageShell>
    );
  }

  if (profile?.accountStatus === "pending") {
    return (
      <PageShell className="items-center justify-center text-center">
        <div className="chrome-border rounded-2xl p-8">
          <h2 className="chrome-text text-xl font-semibold mb-2">Account Pending Approval</h2>
          <p className="text-xs text-[var(--muted)] max-w-xs">
            2nd/3rd year accounts need admin approval before booking. We&rsquo;ll notify you once
            it&rsquo;s reviewed.
          </p>
        </div>
      </PageShell>
    );
  }

  if (profile?.accountStatus === "rejected") {
    return (
      <PageShell className="items-center justify-center text-center">
        <div className="chrome-border rounded-2xl p-8">
          <h2 className="chrome-text text-xl font-semibold mb-2">Registration Not Approved</h2>
          <p className="text-xs text-[var(--muted)] max-w-xs">
            Your account request wasn&rsquo;t approved. Contact the organizers if you think this
            is a mistake.
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <h2 className="chrome-text text-2xl font-semibold text-center mb-2">
        Book Your Ticket
      </h2>
      <p className="text-center text-xs text-[var(--muted)] mb-8">
        Scan to pay, then submit your transaction ID for verification.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="chrome-border rounded-2xl p-4 flex flex-col items-center gap-3 mb-8"
      >
        <Image
          src="/payment-qr.jpeg"
          alt="Payment QR code"
          width={260}
          height={260}
          className="rounded-lg w-full max-w-[260px] h-auto"
        />
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <EntryTypeSelector value={entryType} onChange={setEntryType} />

        <AttendeeFields
          entryType={entryType}
          attendee1Name={attendee1Name}
          attendee1Phone={attendee1Phone}
          attendee2Name={attendee2Name}
          attendee2Phone={attendee2Phone}
          onAttendee1NameChange={setAttendee1Name}
          onAttendee1PhoneChange={setAttendee1Phone}
          onAttendee2NameChange={setAttendee2Name}
          onAttendee2PhoneChange={setAttendee2Phone}
        />

        <FormInput
          id="transaction_id"
          name="transaction_id"
          label="Transaction / UTR ID"
          required
          autoComplete="off"
        />
        <label className="flex items-start gap-2.5 text-xs text-[var(--muted)]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-white"
          />
          <span>
            I agree to the{" "}
            <button
              type="button"
              onClick={() => setTermsOpen(true)}
              className="text-white underline underline-offset-2"
            >
              Terms &amp; Conditions
            </button>
          </span>
        </label>

        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
        <ChromeButton type="submit" loading={pending} disabled={!agreed}>
          Submit for Verification
        </ChromeButton>
      </form>

      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </PageShell>
  );
}
