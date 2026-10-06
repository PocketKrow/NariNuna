// New room composition keys. Masters/provenance stay offline; only delivery selection reaches the browser.
export const havenArtwork = {
  home: '/media/haven/environments/room-dusk-v2.webp',
  mobile: '/media/haven/environments/room-mobile-v2.webp',
  streams: '/media/haven/environments/broadcast-desk.webp',
  nails: '/media/haven/environments/nail-worktable.webp',
  meet: '/media/haven/environments/scrapbook.webp',
  haven: '/media/haven/environments/common-room.webp',
  work: '/media/haven/environments/correspondence.webp',
  resources: '/media/haven/environments/bookshelf.webp',
  stories: '/media/haven/environments/memory-corner.webp',
} as const;
export const roomObjects = [
  { id: 'monitor', href: '/streams/', label: 'Streams', note: 'The broadcast desk', artwork: '/media/haven/objects/monitor.webp', ghostie: '/media/haven/ghosties/sleepy.webp' },
  { id: 'polish', href: '/nail-studio/', label: 'Nail Studio', note: 'Color & a little chaos', artwork: '/media/haven/objects/polish.webp', ghostie: '/media/haven/ghosties/mischief.webp' },
  { id: 'album', href: '/meet-nari/', label: 'Meet Nari', note: 'The girl behind the door', artwork: '/media/haven/objects/album.webp', ghostie: null },
  { id: 'door', href: '/haven/', label: 'The Haven', note: 'Find the common room', artwork: '/media/haven/objects/door.webp', ghostie: '/media/haven/ghosties/welcome.webp' },
  { id: 'letter', href: '/work-with-nari/', label: 'Work With Nari', note: 'From the writing desk', artwork: '/media/haven/objects/letter.webp', ghostie: '/media/haven/ghosties/messenger.webp' },
] as const;
