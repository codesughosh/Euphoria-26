import PageShell from "@/components/PageShell";
import { CONTACT_NAME, CONTACT_PHONE } from "@/lib/contact";

export default function HelpPage() {
  return (
    <PageShell className="items-center justify-center text-center">
      <h2 className="chrome-text text-2xl font-semibold mb-3">Need Help?</h2>
      <p className="text-xs text-[var(--muted)] max-w-xs mb-6">
        Questions about your ticket, payment, or the event? Call {CONTACT_NAME}.
      </p>
      <a
        href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
        className="chrome-btn rounded-xl px-8 py-3 text-sm uppercase tracking-wide"
      >
        {CONTACT_PHONE}
      </a>
    </PageShell>
  );
}
