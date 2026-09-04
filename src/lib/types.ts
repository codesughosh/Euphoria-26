export type TicketStatus = "pending" | "verified" | "rejected" | "checked_in";
export type EntryType = "stag" | "couple";

export interface Profile {
  email: string;
  name: string;
  phone: string;
  isAdmin: boolean;
  createdAt: number;
}

export interface Ticket {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  transactionId: string;
  entryType: EntryType;
  status: TicketStatus;
  createdAt: number;
  verifiedAt: number | null;
  checkedInAt: number | null;
}
