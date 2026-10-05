<script setup lang="ts">
// One outbound link owns each clip. Thumbnail failure swaps to local art while title, destination and reading order remain usable.
import ResponsiveArtwork from "@/components/art/ResponsiveArtwork.vue";

import { ArrowUpRight, Play } from "@lucide/vue";
import { computed, onMounted, ref } from "vue";
import { storybookPostcards } from "@/data/artwork";
import type { MediaMoment } from "@/types/content";

const props = withDefaults(defineProps<{ moment: MediaMoment; presentation?: "broadcast" | "album"; featured?: boolean }>(), { presentation: "broadcast", featured: false });
const imageFailed = ref(false);
const thumbnail = ref<HTMLImageElement | null>(null);
// SSR thumbnails may finish failing before hydration attaches @error. Recover that already-completed failure on mount.
onMounted(() => {
  if (thumbnail.value?.complete && thumbnail.value.naturalWidth === 0) imageFailed.value = true;
});
const fallbackSizes = computed(() => {
  if (props.presentation === "album") return "(min-width: 64rem) 42vw, (min-width: 48rem) 40vw, calc(100vw - 48px)";
  if (props.featured) return "(min-width: 72rem) 52vw, (min-width: 48rem) 58vw, calc(100vw - 48px)";
  return "(min-width: 72rem) 24vw, (min-width: 48rem) 34vw, calc(100vw - 48px)";
});
</script>

<template>
  <!-- Image and copy share one link; a failed thumbnail must not hide the destination. -->
  <article class="media-card" :class="[`media-card--${presentation}`, { 'media-card--featured': featured }]">
    <a :href="moment.url" target="_blank" rel="noreferrer noopener">
      <div class="media-card__image">
        <img
          ref="thumbnail"
          v-if="moment.thumbnailUrl && !imageFailed"
          :src="moment.thumbnailUrl"
          width="480"
          height="360"
          :alt="moment.alt ?? ''"
          loading="lazy"
          referrerpolicy="no-referrer"
          @error="imageFailed = true"
        />
        <ResponsiveArtwork
          v-else
          :artwork="storybookPostcards.streams" :sizes="fallbackSizes"
          width="960"
          height="540"
          alt="Painted view of Nari's stream room"
          loading="lazy"
        />
        <span class="media-card__play" aria-hidden="true"><Play :size="20" fill="currentColor" /></span>
      </div>
      <div class="media-card__body">
        <p class="eyebrow">{{ moment.platform }} moment</p>
        <h3>{{ moment.title }}</h3>
        <p>{{ moment.description }}</p>
        <span class="text-link">Watch the moment <ArrowUpRight :size="16" aria-hidden="true" /></span>
      </div>
      <span class="sr-only"> (opens in a new tab)</span>
    </a>
  </article>
</template>

<style scoped lang="scss">
/* Broadcast and album presentations share link semantics. Contain thumbnails; decorative hover scaling is disabled for reduced motion. */
/* The same accessible link and failure state serve two deliberately different rooms. */
.media-card {
  min-width: 0;
  color: var(--text);
  background: transparent;
  border: 0;
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
}
.media-card > a { display: block; text-decoration: none; }
.media-card__image { position: relative; aspect-ratio: 4 / 3; overflow: hidden; border: 1px solid var(--story-line); border-radius: 0.2rem; }
.media-card__play { position: absolute; right: 1rem; bottom: 1rem; display: grid; width: 2.8rem; height: 2.8rem; place-items: center; color: var(--ink); background: var(--cream); border-radius: 50%; }
.media-card__image > img { width: 100%; height: 100%; object-fit: contain; background: var(--story-surface-deep); transition: transform 240ms ease; }
.media-card__body { padding: 1.2rem 0 0; }
.media-card__body .eyebrow { font-size: 0.75rem; color: var(--storybook-gold); }
.media-card__body h3 { color: var(--text); font-size: clamp(1.5rem, 2.4vw, 2rem); line-height: 1.18; }
.media-card__body > p:not(.eyebrow) { font-size: 1rem; color: var(--text-muted); }
.media-card:hover, .media-card:focus-within { transform: none; box-shadow: none; }
.media-card > a:hover h3 { color: var(--lavender); }
.media-card > a:hover .media-card__image > img { transform: scale(1.025); }
.media-card--featured .media-card__body h3 { font-size: clamp(1.9rem, 3.2vw, 2.8rem); }
.media-card--broadcast.media-card--featured > a {
  display: grid;
  grid-template-columns: minmax(15rem, 0.9fr) minmax(0, 1fr);
  gap: clamp(1.4rem, 4vw, 3.5rem);
  align-items: center;
}
.media-card--broadcast.media-card--featured .media-card__body { padding: 0; }
.media-card--broadcast .media-card__image { width: min(100%, 30rem); }
.media-card--broadcast:not(.media-card--featured) > a { max-width: 30rem; margin-inline: auto; }
.media-card--broadcast.media-card--featured .media-card__image { box-shadow: 0 1rem 2rem rgb(12 7 10 / 22%); }
.media-card--album > a { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); align-items: center; }
.media-card--album .media-card__image { padding: 0.5rem; border: 1px solid color-mix(in srgb, var(--ink-muted) 42%, transparent); background: var(--cream); box-shadow: 0 0.65rem 1.3rem rgb(56 31 40 / 13%); }
.media-card--album .media-card__body { padding: 0; }
.media-card--album .media-card__body h3 { color: var(--ink); }
.media-card--album .media-card__body > p:not(.eyebrow) { color: var(--ink-muted); }
.media-card--album .media-card__body .eyebrow { color: var(--ink-muted); }
.media-card--album .text-link { color: var(--emerald-ink); }
@media (max-width: 47.99rem) {
  .media-card--broadcast.media-card--featured > a,
  .media-card--album > a { grid-template-columns: 1fr; gap: 1.25rem; }
  .media-card--broadcast.media-card--featured .media-card__body { padding-top: 0; }
}
@media (prefers-reduced-motion: reduce) { .media-card__image > img { transition: none; } .media-card > a:hover .media-card__image > img { transform: none; } }
</style>
