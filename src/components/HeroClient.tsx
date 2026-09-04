"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/firebase/AuthProvider";
import { greetingFor } from "@/lib/greeting";

export default function HeroClient() {
  const { user, profile } = useAuth();
  const loggedIn = !!user;

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      {profile && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-6"
        >
          {greetingFor(profile.name)}
        </motion.p>
      )}

      <motion.h1
        initial={{ opacity: 0, letterSpacing: "0.05em", y: 20 }}
        animate={{ opacity: 1, letterSpacing: "0.02em", y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="chrome-text font-bold text-6xl sm:text-8xl tracking-wide"
      >
        EUPHORIA
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 space-y-1"
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
          In collaboration with
        </p>
        <p className="chrome-text text-xl sm:text-2xl font-semibold tracking-wide">
          AARAMBH
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 space-y-2"
      >
        <p className="text-sm sm:text-base tracking-[0.25em] uppercase text-white">
          Freshers&rsquo; Night &middot; 25<sup>th</sup> September
        </p>
        <div className="mx-auto mt-4 h-px w-16 bg-[var(--chrome-2)]" />
        <p className="mt-4 italic text-[var(--muted)] text-sm">
          Not everyone is invited. That&rsquo;s the point.
        </p>
        <p className="italic text-[var(--muted)] text-sm">
          The night you never forget.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-14"
      >
        <Link
          href={loggedIn ? "/ticket" : "/event"}
          className="chrome-btn inline-block rounded-xl px-10 py-3 text-sm uppercase tracking-wide"
        >
          {loggedIn ? "My Tickets" : "Register Now!"}
        </Link>
      </motion.div>

      <motion.a
        href="https://www.instagram.com/euphoria.2o26"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mt-10 text-xs tracking-[0.2em] text-[var(--muted)] hover:text-white transition-colors"
      >
        @euphoria.2o26
      </motion.a>
    </main>
  );
}
