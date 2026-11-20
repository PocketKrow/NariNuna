<script setup lang="ts">
// A discovery is either one understandable document link or nothing; it never fakes an inert collectible.
import { ArrowRight, BookMarked, Mail, Radio, ScrollText } from "@lucide/vue";
import { computed } from "vue";
import { roomDiscoveryById, type RoomDiscoveryKind } from "@/data/roomDiscoveries";

const props = defineProps<{ discoveryId: string }>();
const discovery = computed(() => roomDiscoveryById(props.discoveryId));
if (!discovery.value) throw new Error(`Unknown room discovery: ${props.discoveryId}`);

const icons: Record<RoomDiscoveryKind, typeof Mail> = {
  letter: Mail,
  bookmark: BookMarked,
  broadcast: Radio,
  memory: ScrollText
};
</script>

<template>
  <aside v-if="discovery" class="room-discovery" :class="`room-discovery--${discovery.kind}`">
    <component :is="icons[discovery.kind]" :size="19" aria-hidden="true" />
    <p><strong>{{ discovery.label }}</strong><span>{{ discovery.note }}</span></p>
    <a :href="discovery.href" :aria-label="`${discovery.label}: ${discovery.note}`"><span>Follow it</span><ArrowRight :size="16" aria-hidden="true" /></a>
  </aside>
</template>

<style scoped>
.room-discovery { display: grid; width: 100%; grid-template-columns: auto minmax(0, 1fr); align-items: start; gap: 0.65rem 0.8rem; padding: 0.9rem 1rem; margin-block: 1.25rem 0.75rem; color: var(--story-copy); background: color-mix(in srgb, var(--story-surface) 78%, transparent); border: 1px dashed var(--story-line); border-radius: 0.4rem;  }
.room-discovery > svg { margin-block-start: 0.1rem; color: var(--storybook-gold); }
.room-discovery p { display: grid; gap: 0.18rem; margin: 0; }
.room-discovery p strong { font-family: var(--font-display); font-size: 1rem; font-weight: 650; }
.room-discovery p span { color: var(--story-muted); font-size: 0.8125rem; line-height: 1.45; }
.room-discovery a { display: inline-flex; width: fit-content; min-height: 2.75rem; grid-column: 2; align-items: center; gap: 0.35rem; color: var(--story-copy); font-size: 0.8125rem; font-weight: 780; }
.room-discovery a:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.room-discovery--bookmark { border-inline-start: 0.22rem solid var(--story-accent); }
.room-discovery--broadcast { transform: none; border-style: solid; }
/* A single shortcut follows the room on the same reading spine. */
@media (min-width: 48rem) {
  .room-discovery { grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; }
  .room-discovery a { grid-column: 3; }
}
@media (prefers-reduced-motion: reduce) { .room-discovery { transform: none; } }
</style>
