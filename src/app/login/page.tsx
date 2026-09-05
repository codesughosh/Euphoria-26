"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import { isLaunched, useIsLaunched } from "@/lib/launch";
import PageShell from "@/components/PageShell";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";
import ChromeButton from "@/components/ChromeButton";
import Countdown from "@/components/Countdown";

function friendlyError(code: string) {
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
    return "Incorrect email or password.";
  }
  if (code.includes("invalid-email")) return "Enter a valid email address.";
  if (code.includes("too-many-requests")) return "Too many attempts. Try again later.";
  return "Something went wrong. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const launched = useIsLaunched();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setPending(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (!isLaunched()) {
        const snap = await getDoc(doc(db, "profiles", cred.user.uid));
        const isAdmin = snap.exists() && snap.data().isAdmin === true;
        if (!isAdmin) {
          await signOut(auth);
          setError("Login isn't open yet. Check back when the countdown ends.");
          setPending(false);
          return;
        }
      }

      router.push("/ticket");
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String(err.code) : "";
      setError(friendlyError(code));
      setPending(false);
    }
  }

  return (
    <PageShell>
      <h2 className="chrome-text text-2xl font-semibold text-center mb-8">
        Welcome Back
      </h2>

      {!launched && (
        <div className="chrome-border rounded-2xl p-5 mb-8">
          <Countdown label="Login Opens In" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput id="email" name="email" type="email" label="Email" required autoComplete="email" />
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          required
          autoComplete="current-password"
        />
        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
        <ChromeButton type="submit" loading={pending} className="mt-2">
          Log In
        </ChromeButton>
      </form>
      <p className="text-center text-xs text-[var(--muted)] mt-6">
        New here?{" "}
        <Link href="/signup" className="text-white underline">
          Create an account
        </Link>
      </p>
    </PageShell>
  );
}
