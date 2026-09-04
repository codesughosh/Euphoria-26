export type TicketStatus = "pending" | "verified" | "rejected" | "checked_in";
export type EntryType = "stag" | "couple";
export type Year = "1st" | "2nd" | "3rd";
export type AccountStatus = "approved" | "pending" | "rejected";

export interface Profile {
  id: string;
  email: string;
  name: string;
  phone: string;
  usn: string;
  year: Year;
  accountStatus: AccountStatus;
  isAdmin: boolean;
  createdAt: number;
}

export interface Attendee {
  name: string;
  phone: string;
}

export interface Ticket {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  attendees: Attendee[];
  transactionId: string;
  entryType: EntryType;
  status: TicketStatus;
  createdAt: number;
  verifiedAt: number | null;
  checkedInAt: number | null;
}
