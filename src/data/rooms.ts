import { primaryNavigation, footerNavigation } from "./navigation";
export interface HavenRoom { label: string; href: string; note: string }
const notes: Record<string, string> = {
  "/": "Your chaotic big sister.",
  "/meet-nari/": "The warmth, the chaos, and the craft.",
  "/nail-studio/": "Color, games, and creative curiosity.",
  "/links/": "Streams, updates, and good company.",
  "/work-with-nari/": "Good ideas start with a conversation.",
  "/credits/": "The names behind the work."
};
export const havenRooms: readonly HavenRoom[] = [...primaryNavigation, ...footerNavigation].map(({ label, href }) => ({ label, href, note: notes[href] }));
export const havenRoomNotes = notes;
