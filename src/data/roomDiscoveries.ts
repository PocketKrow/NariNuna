// Four restrained cross-room objects deepen continuity without becoming navigation, collectibles, or invented personal lore.
export type RoomDiscoveryKind = "letter" | "bookmark" | "broadcast" | "memory";

export interface RoomDiscoveryRecord {
  id: string;
  from: string;
  href: string;
  label: string;
  note: string;
  kind: RoomDiscoveryKind;
}

export const roomDiscoveries = [
  { id: "journal-letter", from: "/meet-nari/", href: "/work-with-nari/", label: "A sealed note in the journal", note: "The writing desk has a place for careful correspondence.", kind: "letter" },
  { id: "workbench-bookmark", from: "/nail-studio/", href: "/resources/#nail-desk", label: "A bookmark for the nail desk shelf", note: "The nail desk shelf is still being curated.", kind: "bookmark" },
  { id: "shelf-broadcast-stub", from: "/resources/", href: "/streams/", label: "A broadcast stub between two books", note: "The louder room is only a doorway away.", kind: "broadcast" },
  { id: "charter-memory-scrap", from: "/haven/", href: "/stories/", label: "A saved clip pinned beside the charter", note: "The same stream clips, saved in Story Time.", kind: "memory" }
] as const satisfies readonly RoomDiscoveryRecord[];

export function roomDiscoveryById(id: string) {
  return roomDiscoveries.find((discovery) => discovery.id === id);
}
