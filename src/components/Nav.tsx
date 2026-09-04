"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useAuth } from "@/lib/firebase/AuthProvider";
import ConfirmModal from "@/components/ConfirmModal";

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Nav() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [confirmingLogout, setConfirmingLogout] = useState(false);

  async function handleLogout() {
    setConfirmingLogout(false);
    await signOut(auth);
    router.push("/");
  }

  return (
    <header className="w-full border-b border-[var(--border)]">
      <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {pathname !== "/" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => router.back()}
              aria-label="Go back"
              className="text-[var(--muted)] hover:text-white transition-colors"
            >
              <BackIcon />
            </motion.button>
          )}
          <Link href="/" className="chrome-text font-semibold text-lg tracking-wide">
            EUPHORIA
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-xs uppercase tracking-wide text-[var(--muted)]">
          <Link href="/help" className="hover:text-white">Help</Link>
          {!user && (
            <>
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/signup" className="hover:text-white">Sign up</Link>
            </>
          )}
          {user && (
            <>
              <Link href="/ticket" className="hover:text-white">My Tickets</Link>
              {profile?.isAdmin && <Link href="/admin" className="hover:text-white">Admin</Link>}
              <button onClick={() => setConfirmingLogout(true)} className="hover:text-white">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      <ConfirmModal
        open={confirmingLogout}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmLabel="Log Out"
        onConfirm={handleLogout}
        onCancel={() => setConfirmingLogout(false)}
      />
    </header>
  );
}
