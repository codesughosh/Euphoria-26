"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/AuthProvider";
import { CONTACT_PHONE } from "@/lib/contact";
import ImageSlideshow from "@/components/ImageSlideshow";

const VENUE_MAP_URL = "https://maps.app.goo.gl/sTkLdmbgoZvm7eWZ8";

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 9l1-5h14l1 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9v10h14V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="3.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 3h3l1.5 4.5-2.2 1.8a11 11 0 0 0 5.9 5.9l1.8-2.2L21 14.5v3a2 2 0 0 1-2.2 2C10.4 18.9 5.1 13.6 4.5 5.2A2 2 0 0 1 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EventDetails() {
  const { user } = useAuth();
  const router = useRouter();
  const [showPhone, setShowPhone] = useState(false);
  const ctaHref = user ? "/book" : "/signup";

  return (
    <main className="flex-1 w-full max-w-lg mx-auto px-6 py-8 pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="chrome-border rounded-2xl h-52 relative overflow-hidden"
      >
        <ImageSlideshow />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 pointer-events-none" />

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => router.back()}
          aria-label="Go back"
          className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white"
        >
          <BackIcon />
        </motion.button>

        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1">
          <span className="chrome-text font-bold text-3xl tracking-wide">EUPHORIA</span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/80">
            North Avenue &middot; Mysuru
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex gap-2 mt-4"
      >
        <span className="text-[10px] uppercase tracking-wide bg-[var(--surface-2)] border border-[var(--border)] rounded-full px-3 py-1.5">
          Freshers&rsquo; Party
        </span>
        <span className="text-[10px] uppercase tracking-wide bg-[var(--surface-2)] border border-[var(--border)] rounded-full px-3 py-1.5">
          2020 Batch
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="chrome-text text-2xl font-semibold mt-4"
      >
        Euphoria&rsquo;26 &mdash; Freshers&rsquo; Night
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col gap-3 mt-6 text-sm"
      >
        <div className="flex items-center gap-3 text-[var(--muted)]">
          <CalendarIcon />
          <span className="text-white">25th September</span>
        </div>
        <div className="flex items-center gap-3 text-[var(--muted)]">
          <ClockIcon />
          <span className="text-white">7:00 PM onwards</span>
        </div>
        <a
          href={VENUE_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-[var(--muted)] hover:text-white transition-colors w-fit"
        >
          <PinIcon />
          <span className="text-white underline underline-offset-2">North Avenue, Mysore</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
          About The Event
        </h2>
        <p className="text-sm text-white/90 leading-relaxed">
          Euphoria&rsquo;26 is the Freshers&rsquo; Night, built for this year&rsquo;s incoming
          batch. Sophomores and seniors are welcome to join too, subject to admin approval
          during registration.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
          What&rsquo;s There
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="chrome-border rounded-xl p-4 flex flex-col items-center gap-2 text-center">
            <StoreIcon />
            <span className="text-xs">PebbleCo Store</span>
          </div>
          <div className="chrome-border rounded-xl p-4 flex flex-col items-center gap-2 text-center">
            <CameraIcon />
            <span className="text-xs">Photobooth</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowPhone((v) => !v)}
          className="text-xs uppercase tracking-wide text-[var(--muted)] hover:text-white transition-colors border border-[var(--border)] rounded-full px-4 py-2 flex items-center gap-2"
        >
          <PhoneIcon />
          Help? Contact Us
        </motion.button>
        {showPhone && (
          <motion.a
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="text-sm text-white underline underline-offset-2"
          >
            {CONTACT_PHONE}
          </motion.a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur border-t border-[var(--border)] px-6 py-4"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
              Stag / Couple
            </p>
            <p className="text-sm font-medium">₹XXX onwards</p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={ctaHref}
              className="chrome-btn inline-block rounded-xl px-8 py-3 text-sm uppercase tracking-wide"
            >
              Register Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
