// Scene metadata is server-only. Depth coefficients are unitless; the motion controller applies bounded pixel travel.
import { communityGhostieArtwork } from "./artwork";
export const depthArtwork = {
  character: "/media/vnext/characters/nari-window-seat.webp",
  hearth: "/media/vnext/layers/hearth-still-life.webp",
  curtain: "/media/vnext/layers/lavender-curtain.webp",
  welcome: "/media/vnext/ghosties/ghostie-welcome.webp",
  doorway: "/media/vnext/ghosties/ghostie-doorway.webp",
} as const;
export interface RoomDepth {
  light: "window" | "monitor" | "desk" | "lantern";
  resident: string;
  foreground: "hearth" | "curtain";
  painting: number;
  residentDepth: number;
  foregroundDepth: number;
}
// Each room has a deliberate resident and a light direction already supported by its painting.
export const roomDepth = {
  home: { light: "window", resident: depthArtwork.welcome, foreground: "hearth", painting: 0.12, residentDepth: 0.48, foregroundDepth: 0.9 },
  meet: { light: "desk", resident: communityGhostieArtwork.study, foreground: "curtain", painting: 0.1, residentDepth: 0.42, foregroundDepth: 0.7 },
  streams: { light: "monitor", resident: communityGhostieArtwork.gaming, foreground: "curtain", painting: 0.1, residentDepth: 0.38, foregroundDepth: 0.72 },
  nails: { light: "desk", resident: communityGhostieArtwork.nailTech, foreground: "curtain", painting: 0.08, residentDepth: 0.44, foregroundDepth: 0.65 },
  haven: { light: "window", resident: depthArtwork.doorway, foreground: "hearth", painting: 0.12, residentDepth: 0.46, foregroundDepth: 0.84 },
  resources: { light: "desk", resident: communityGhostieArtwork.study, foreground: "hearth", painting: 0.1, residentDepth: 0.32, foregroundDepth: 0.8 },
  work: { light: "desk", resident: communityGhostieArtwork.shy, foreground: "curtain", painting: 0.08, residentDepth: 0.35, foregroundDepth: 0.65 },
  stories: { light: "lantern", resident: communityGhostieArtwork.sleeping, foreground: "hearth", painting: 0.08, residentDepth: 0.3, foregroundDepth: 0.82 },
  support: { light: "window", resident: communityGhostieArtwork.heart, foreground: "curtain", painting: 0.1, residentDepth: 0.4, foregroundDepth: 0.7 },
} as const satisfies Record<string, RoomDepth>;
