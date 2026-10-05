export interface HavenRoom {
  label: string;
  href: string;
  note: string;
}

// Public room descriptions serve the header and footer; this is not a prescribed path or progress system.
export const havenRooms: readonly HavenRoom[] = [
  { label: "Home", href: "/", note: "The little world next door." },
  { label: "Meet Nari", href: "/meet-nari/", note: "The warmth, the chaos, and the craft." },
  { label: "Streams", href: "/streams/", note: "There's always one more good bit." },
  { label: "Nail Studio", href: "/nail-studio/", note: "A little glitter gets everywhere." },
  { label: "The Haven", href: "/haven/", note: "Leave the room a little kinder." },
  { label: "Resources", href: "/resources/", note: "A few good things, chosen with care." },
  { label: "Work With Nari", href: "/work-with-nari/", note: "Good ideas start with a conversation." },
  { label: "Story Time", href: "/stories/", note: "Keep the moments. Make some more." },
  { label: "Support", href: "/support/", note: "Thank you for being part of the room." },
  { label: "Credits", href: "/credits/", note: "Leave every maker's name beside their work." }
];

export const havenRoomNotes = Object.fromEntries(
  havenRooms.map(({ href, note }) => [href, note])
) as Record<string, string>;
