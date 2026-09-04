"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useAuth } from "@/lib/firebase/AuthProvider";

export default function Nav() {
  const { user, profile } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <header className="w-full border-b border-[var(--border)]">
      <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="chrome-text font-semibold text-lg tracking-wide">
          EUPHORIA
        </Link>
        <nav className="flex items-center gap-4 text-xs uppercase tracking-wide text-[var(--muted)]">
          <Link href="/credits" className="hover:text-white">Credits</Link>
          {!user && (
            <>
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/signup" className="hover:text-white">Sign up</Link>
            </>
          )}
          {user && (
            <>
              <Link href="/ticket" className="hover:text-white">Ticket</Link>
              {profile?.isAdmin && <Link href="/admin" className="hover:text-white">Admin</Link>}
              <button onClick={handleLogout} className="hover:text-white">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
