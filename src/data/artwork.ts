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
  welcome: "/media/vnext/ghosties/ghostie-welcome.webp",
  doorway: "/media/vnext/ghosties/ghostie-doorway.webp",
  sleeping: "/media/ghosties/community/ghostie-sleeping.webp",
  chaotic: "/media/ghosties/community/ghostie-chaotic.webp",
  protective: "/media/ghosties/community/ghostie-protective.webp",
  nailTech: "/media/ghosties/community/ghostie-nail-tech.webp",
  gaming: "/media/ghosties/community/ghostie-gaming.webp",
  cozy: "/media/ghosties/community/ghostie-cozy.webp",
  study: "/media/ghosties/community/ghostie-study.webp",
  peek: "/media/ghosties/community/ghostie-peek.webp",
  heart: "/media/ghosties/community/ghostie-heart.webp",
  bonked: "/media/ghosties/community/ghostie-bonked.webp",
  shy: "/media/ghosties/community/ghostie-shy.webp",
  sign: "/media/ghosties/community/ghostie-sign.webp",
  blushing: "/media/ghosties/community/ghostie-shy.webp",
  pointLeft: "/media/ghosties/community/ghostie-sign.webp",
  wave: "/media/vnext/ghosties/ghostie-welcome.webp",
  floating: "/media/ghosties/community/ghostie-chaotic.webp",
  blanket: "/media/ghosties/community/ghostie-sleeping.webp",
  support: "/media/ghosties/community/ghostie-heart.webp",
  panicked: "/media/ghosties/community/ghostie-bonked.webp"
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
  homeSunset: "/media/vnext/scenes/haven-room.webp",
  homeNight: "/media/storybook/scenes/haven-midnight.webp",
  homeDaylight: "/media/storybook/scenes/haven-daybreak.webp",
  meetNari: "/media/storybook/scenes/meet-nari.webp",
  commonRoom: "/media/storybook/scenes/haven-community.webp",
  havenGathering: "/media/storybook/scenes/haven-doorway-gathering.webp",
  havenDoorInterior: "/media/storybook/scenes/haven-doorway-interior.webp",
  streams: "/media/storybook/scenes/streams-atelier.webp",
  nails: "/media/storybook/scenes/nails-atelier.webp",
  resources: "/media/storybook/scenes/resources-library.webp",
  work: "/media/storybook/scenes/work-correspondence.webp",
  stories: "/media/storybook/scenes/stories-lantern.webp"
} as const;

export const storybookPostcards = {
  home: "/media/storybook/postcards/haven-sunset.webp",
  meetNari: "/media/storybook/postcards/meet-nari.webp",
  haven: "/media/storybook/postcards/haven-community.webp",
  streams: "/media/storybook/postcards/streams-atelier.webp",
  nails: "/media/storybook/postcards/nails-atelier.webp",
  resources: "/media/storybook/postcards/resources-library.webp",
  work: "/media/storybook/postcards/work-correspondence.webp",
  stories: "/media/storybook/postcards/stories-lantern.webp"
} as const;

export const detailArtwork = {
  lavender: "/media/motifs/lavender-sprig.webp",
  leaves: "/media/motifs/autumn-leaves.webp",
  sparkles: "/media/motifs/heart-sparkles.webp",
  ribbon: "/media/motifs/lavender-ribbon.webp"
} as const;
