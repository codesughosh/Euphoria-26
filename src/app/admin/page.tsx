import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import AdminQueue from "@/components/AdminQueue";

export default function AdminPage() {
  return (
    <AuthGuard adminOnly>
      <main className="flex-1 w-full max-w-lg mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="chrome-text text-2xl font-semibold">Verify Queue</h1>
          <Link href="/admin/scan" className="text-xs uppercase tracking-wide text-[var(--muted)] hover:text-white">
            Scan &rarr;
          </Link>
        </div>
        <AdminQueue />
      </main>
    </AuthGuard>
  );
}
