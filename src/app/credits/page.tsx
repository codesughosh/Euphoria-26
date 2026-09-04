import PageShell from "@/components/PageShell";

const credits = [
  { role: "Concept & Direction", name: "Your Name" },
  { role: "Web & Ticketing", name: "Your Name" },
  { role: "Design", name: "Your Name" },
  { role: "In collaboration with", name: "AARAMBH" },
];

export default function CreditsPage() {
  return (
    <PageShell className="items-center text-center">
      <h2 className="chrome-text text-2xl font-semibold mb-10">Credits</h2>
      <div className="w-full flex flex-col gap-5">
        {credits.map((c) => (
          <div key={c.role} className="chrome-border rounded-xl px-5 py-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
              {c.role}
            </p>
            <p className="text-sm mt-1 tracking-wide">{c.name}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs italic text-[var(--muted)]">
        The night you never forget.
      </p>
    </PageShell>
  );
}
