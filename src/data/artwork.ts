import { havenArtwork } from "./havenArtwork";
// Scene, postcard and community Ghostie values are stable responsive lookup keys,
// not original-image URLs. Render through ResponsiveArtwork or heroStyle/heroSources.
// Supplied identity/emote/Prinny assets retain their direct public URLs.
export const nariArtwork = {
  fullbody: "/media/storybook/characters/nari-painted-welcome.webp",
  portrait: "/media/storybook/characters/nari-painted-portrait.webp",
  avatar: "/media/storybook/characters/nari-painted-avatar.webp",
  suppliedModel: "/media/nari/nari-model-fullbody.webp",
  suppliedPortrait: "/media/nari/nari-model-portrait.webp",
  cozy: "/media/nari/nari-comfy-original.webp",
  wordmark: "/media/identity/nari-wordmark.webp",
  icon: "/media/identity/nari-icon.webp"
} as const;

export const ghostieArtwork = {
  shy: "/media/ghosties/community/ghostie-shy.webp",
  floating: "/media/ghosties/community/ghostie-chaotic.webp",
  waving: "/media/ghosties/community/ghostie-heart.webp",
  chaotic: "/media/ghosties/community/ghostie-chaotic.webp",
  peeking: "/media/ghosties/community/ghostie-peek.webp",
  cozy: "/media/ghosties/community/ghostie-cozy.webp",
  heart: "/media/ghosties/community/ghostie-heart.webp",
  protective: "/media/ghosties/community/ghostie-protective.webp",
  nails: "/media/ghosties/community/ghostie-nail-tech.webp",
  derpy: "/media/ghosties/community/ghostie-bonked.webp",
  friendly: "/media/ghosties/community/ghostie-heart.webp",
  peekingLeft: "/media/ghosties/community/ghostie-peek.webp",
  peekingRight: "/media/ghosties/community/ghostie-peek.webp"
} as const;

// Aliases deliberately share candidate sets; a pose label does not imply a separate source file.
export const communityGhostieArtwork = {
  sleeping: "/media/haven/ghosties/sleepy.webp",
  chaotic: "/media/haven/ghosties/mischief.webp",
  protective: "/media/haven/ghosties/welcome.webp",
  nailTech: "/media/haven/ghosties/mischief.webp",
  gaming: "/media/haven/ghosties/sleepy.webp",
  cozy: "/media/haven/ghosties/sleepy.webp",
  study: "/media/haven/ghosties/messenger.webp",
  peek: "/media/haven/ghosties/welcome.webp",
  heart: "/media/haven/ghosties/welcome.webp",
  bonked: "/media/haven/ghosties/mischief.webp",
  shy: "/media/haven/ghosties/messenger.webp",
  sign: "/media/haven/ghosties/messenger.webp",
  blushing: "/media/haven/ghosties/messenger.webp",
  pointLeft: "/media/haven/ghosties/messenger.webp",
  wave: "/media/haven/ghosties/welcome.webp",
  floating: "/media/haven/ghosties/welcome.webp",
  blanket: "/media/haven/ghosties/sleepy.webp",
  support: "/media/haven/ghosties/welcome.webp",
  panicked: "/media/haven/ghosties/mischief.webp"
} as const;

export const officialEmotes = {
  blush: "/media/emotes/nari-shy.webp",
  bonk: "/media/emotes/nari-bonk.webp",
  comfy: "/media/emotes/nari-comfy.webp",
  copium: "/media/emotes/nari-copium.webp",
  cry: "/media/emotes/nari-cry.webp",
  fire: "/media/emotes/nari-fire.webp",
  loading: "/media/emotes/nari-loading.webp",
  noseBleed: "/media/emotes/nari-nose-bleed.webp",
  panic: "/media/emotes/nari-panic.webp",
  shy: "/media/emotes/nari-shy.webp",
  uwu: "/media/emotes/nari-uwu.webp"
} as const;

// Alternate atmospheres and the old gathering remain retained keys with no active runtime candidates.
// Only active keys may be passed to the delivery helpers.
export const environmentArtwork = {
  homeSunset: havenArtwork.home,
  homeNight: "/media/storybook/scenes/haven-midnight.webp",
  homeDaylight: "/media/storybook/scenes/haven-daybreak.webp",
  meetNari: havenArtwork.meet,
  commonRoom: havenArtwork.haven,
  havenGathering: "/media/storybook/scenes/haven-doorway-gathering.webp",
  havenDoorInterior: havenArtwork.haven,
  streams: havenArtwork.streams,
  nails: havenArtwork.nails,
  resources: havenArtwork.resources,
  work: havenArtwork.work,
  stories: havenArtwork.stories
} as const;

export const storybookPostcards = {
  home: "/media/haven/postcards/room-dusk.webp",
  meetNari: "/media/haven/postcards/scrapbook.webp",
  haven: "/media/haven/postcards/common-room.webp",
  streams: "/media/haven/postcards/broadcast-desk.webp",
  nails: "/media/haven/postcards/nail-worktable.webp",
  resources: "/media/haven/postcards/bookshelf.webp",
  work: "/media/haven/postcards/correspondence.webp",
  stories: "/media/haven/postcards/memory-corner.webp"
} as const;

export const detailArtwork = {
  lavender: "/media/motifs/lavender-sprig.webp",
  leaves: "/media/motifs/autumn-leaves.webp",
  sparkles: "/media/motifs/heart-sparkles.webp",
  ribbon: "/media/motifs/lavender-ribbon.webp"
} as const;
