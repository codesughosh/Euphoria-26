"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuth } from "@/lib/firebase/AuthProvider";
import PageShell from "@/components/PageShell";
import TicketReveal from "@/components/TicketReveal";
import type { Ticket } from "@/lib/types";

export default function TicketView() {
  const { user } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null | undefined>(undefined);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "tickets"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) {
        setTicket(null);
        return;
      }
      const docSnap = snap.docs[0];
      setTicket({ id: docSnap.id, ...docSnap.data() } as Ticket);
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (ticket?.status !== "verified") return;
    QRCode.toDataURL(ticket.id, {
      width: 400,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [ticket]);

  if (ticket === undefined) {
    return (
      <PageShell className="items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[var(--chrome-3)] border-t-white animate-spin" />
      </PageShell>
    );
  }

  if (!ticket) {
    return (
      <PageShell className="items-center justify-center text-center">
        <p className="text-[var(--muted)] mb-6">You don&rsquo;t have a ticket yet.</p>
        <Link href="/event" className="chrome-btn rounded-xl px-8 py-3 text-sm uppercase tracking-wide">
          Book Now
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell className="items-center justify-center text-center">
      <TicketReveal
        status={ticket.status}
        qrDataUrl={qrDataUrl}
        transactionId={ticket.transactionId}
        entryType={ticket.entryType}
      />
    </PageShell>
  );
}
