<script setup lang="ts">
// Map named Ghostie poses through the responsive registry. Decorative art is hidden; meaningful instances require a contextual label.
import ResponsiveArtwork from "@/components/art/ResponsiveArtwork.vue";

import { communityGhostieArtwork } from "@/data/artwork";

export type GhostieArtVariant = keyof typeof communityGhostieArtwork;

withDefaults(
  defineProps<{
    variant: GhostieArtVariant;
    decorative?: boolean;
    label?: string;
    mirror?: boolean;
    sizes?: string;
    loading?: "eager" | "lazy";
  }>(),
  {
    decorative: true,
    label: "A Nari Nuna community Ghostie",
    mirror: false,
    sizes: "192px",
    loading: "lazy"
  }
);
</script>

<template>
  <!-- The figure controls decorative semantics; responsive delivery keeps the original silhouette and alpha. -->
  <figure
    class="ghostie-art"
    :class="{ 'ghostie-art--mirrored': mirror }"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    <ResponsiveArtwork
      class="ghostie-art__image"
      :artwork="communityGhostieArtwork[variant]"
      :sizes="sizes"
      :alt="decorative ? '' : label"
      :loading="loading"
      decoding="async"
    />
  </figure>
</template>

<style scoped>
/* Contain the full transparent silhouette; mirror through a custom property, not a second asset. Parent slots control size. */
.ghostie-art {
  --ghostie-mirror: 1;
  position: relative;
  display: grid;
  width: 100%;
  height: auto;
  align-self: center;
  min-height: 0;
  place-items: center;
  margin: 0;
  overflow: visible;
  background: transparent;
  border-radius: 0;
  isolation: isolate;
}

.ghostie-art::before,
.ghostie-art::after {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  content: "";
}

.ghostie-art::before {
  inset: 12% 9% 5%;
  background: radial-gradient(
    ellipse at 50% 58%,
    color-mix(in srgb, var(--story-accent) 18%, transparent) 0%,
    color-mix(in srgb, var(--story-accent) 7%, transparent) 48%,
    transparent 74%
  );
  filter: blur(0.42rem);
  opacity: 0.9;
}

.ghostie-art::after {
  width: 38%;
  aspect-ratio: 1;
  top: 8%;
  right: 8%;
  background: radial-gradient(circle, rgb(236 183 119 / 15%), transparent 70%);
  filter: blur(0.55rem);
}

.ghostie-art__image {
  position: relative;
  z-index: 1;
  display: block;
  width: min(88%, var(--ghostie-size, 12rem));
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  filter: drop-shadow(0 0.65rem 0.9rem rgb(32 17 28 / 16%));
  transform: scaleX(var(--ghostie-mirror));
  transform-origin: center;
}

.ghostie-art--mirrored {
  --ghostie-mirror: -1;
}

.ghostie-art.haven-threshold__ghostie {
  overflow: visible;
  border: 0;
  box-shadow: none;
}

.ghostie-art.haven-threshold__ghostie::before,
.ghostie-art.haven-threshold__ghostie::after {
  display: none;
}
</style>
