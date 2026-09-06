export interface TermsSection {
  heading: string;
  body: string[];
}

export const TERMS_TITLE = "Euphoria '26 — Terms & Conditions";

export const TERMS_INTRO =
  "By purchasing a ticket/pass for Euphoria '26, you acknowledge and agree to the following terms:";

export const TERMS_SECTIONS: TermsSection[] = [
  {
    heading: "1. Tickets & Payment",
    body: [
      "All ticket/pass amounts are strictly non-refundable under any circumstances, including but not limited to change of mind, inability to attend, weather, or any other personal or unforeseen reason.",
      "Tickets are non-transferable unless explicitly permitted by the organizers in writing.",
      "Entry is permitted only against a valid ticket/pass and, where applicable, a valid government-issued photo ID.",
      "The organizers reserve the right to verify the identity of the ticket holder at entry.",
    ],
  },
  {
    heading: "2. Event Nature & Organizer Status",
    body: [
      "Euphoria '26 is an independently organized private event, hosted by students in collaboration with Aarambh. It is not an official event of, and is not affiliated with, endorsed by, or conducted under the authority of any college, university, or educational institution.",
      "Participation is entirely voluntary. The event is not a mandatory or institution-sanctioned activity.",
      "The organizers act in their individual/independent capacity and not as representatives of any institution.",
    ],
  },
  {
    heading: "3. Alcohol & Prohibited Substances",
    body: [
      "Consumption, sale, or possession of alcohol, liquor, or any intoxicating substance is strictly not permitted inside the venue.",
      "Any attendee found in violation of this policy will be denied entry or removed from the venue without refund, and may be handed over to venue security or local authorities as necessary.",
    ],
  },
  {
    heading: "4. Conduct & Entry",
    body: [
      "The organizers reserve the right to refuse entry or remove any attendee whose behavior is deemed disruptive, unsafe, or inappropriate, without refund.",
      "Attendees are expected to conduct themselves respectfully. Harassment, misconduct, or unsafe behavior towards other attendees, staff, vendors, or performers will not be tolerated and may result in immediate removal from the venue.",
      "The event is intended for attendees who consent to participate in on-ground activities and games; participation in any interactive segment is voluntary, and attendees may opt out at any time.",
    ],
  },
  {
    heading: "5. Limitation of Liability",
    body: [
      "Entry to and participation in Euphoria '26 is at the attendee's own risk. The organizers, Aarambh, and any associated vendors or sponsors shall not be held liable for any loss, injury, theft, damage, or inconvenience experienced before, during, or after the event, except where caused by proven gross negligence on the part of the organizers.",
      "The event's schedule, lineup, activities, performers, and vendors are subject to change without prior notice, due to logistical, weather-related, or other unforeseen circumstances. Such changes do not entitle attendees to a refund or compensation.",
      "Attendee satisfaction with the content, format, or quality of entertainment is subjective and does not constitute grounds for a refund, compensation, or legal claim against the organizers.",
    ],
  },
  {
    heading: "6. Photography & Content",
    body: [
      "The event may be photographed and filmed by the organizers' official content team for promotional purposes. By attending, you consent to being captured in such photos/videos, which may be used on Euphoria's social media and promotional channels.",
    ],
  },
  {
    heading: "7. Safety & Compliance",
    body: [
      "The event will be conducted with private security personnel and applicable local permissions in place. Attendees must cooperate with security and organizing staff at all times.",
      "In case of any emergency, attendees must follow the instructions of on-ground staff and security personnel.",
    ],
  },
  {
    heading: "8. Acceptance",
    body: [
      "By purchasing a ticket and/or entering the venue, the attendee confirms they have read, understood, and agreed to these Terms & Conditions in full.",
    ],
  },
];
