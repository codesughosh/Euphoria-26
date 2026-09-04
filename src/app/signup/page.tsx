"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";
import PageShell from "@/components/PageShell";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import PasswordInput from "@/components/PasswordInput";
import ChromeButton from "@/components/ChromeButton";
import type { Year } from "@/lib/types";

const YEAR_OPTIONS = [
  { value: "1st", label: "1st Year" },
  { value: "2nd", label: "2nd Year" },
  { value: "3rd", label: "3rd Year" },
];

function friendlyError(code: string) {
  if (code.includes("email-already-in-use")) return "An account with this email already exists.";
  if (code.includes("weak-password")) return "Password must be at least 6 characters.";
  if (code.includes("invalid-email")) return "Enter a valid email address.";
  return "Something went wrong. Please try again.";
}

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const usn = String(formData.get("usn") || "").trim();
    const year = String(formData.get("year") || "") as Year;
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name || !phone || !usn || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (year !== "1st" && year !== "2nd" && year !== "3rd") {
      setError("Select your year.");
      return;
    }

    setPending(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "profiles", cred.user.uid), {
        email,
        name,
        phone,
        usn,
        year,
        accountStatus: year === "1st" ? "approved" : "pending",
        isAdmin: false,
        createdAt: serverTimestamp(),
      });
      router.push("/book");
    } catch (err) {
      const code = err && typeof err === "object" && "code" in err ? String(err.code) : "";
      setError(friendlyError(code));
      setPending(false);
    }
  }

  return (
    <PageShell>
      <h2 className="chrome-text text-2xl font-semibold text-center mb-8">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput id="name" name="name" label="Full Name" required autoComplete="name" />
        <FormInput id="phone" name="phone" label="Phone Number" required autoComplete="tel" />
        <FormInput id="usn" name="usn" label="USN" required autoComplete="off" />
        <FormSelect id="year" name="year" label="Year" required options={YEAR_OPTIONS} />
        <FormInput id="email" name="email" type="email" label="Email" required autoComplete="email" />
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          required
          minLength={6}
          autoComplete="new-password"
        />
        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
        <ChromeButton type="submit" loading={pending} className="mt-2">
          Sign Up
        </ChromeButton>
      </form>
      <p className="text-center text-xs text-[var(--muted)] mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-white underline">
          Log in
        </Link>
      </p>
    </PageShell>
  );
}
