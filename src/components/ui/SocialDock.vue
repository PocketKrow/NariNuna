<script setup lang="ts">
// Render the shared public-profile directory in its reviewed order. Inline platform glyphs are decorative; visible labels carry meaning.
import { nariLinks } from "@/data/socials";
</script>

<template>
  <!-- Glyph coordinates use the 24-unit viewBox; names come from the links, not the SVG paths. -->
  <nav class="social-dock" aria-label="Nari's public profiles">
    <a
      v-for="link in nariLinks"
      :key="link.platform"
      :href="link.url"
      :aria-label="`${link.label} (opens in a new tab)`"
      :title="link.label"
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg class="social-dock__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <g v-if="link.platform === 'twitch'">
          <path
            fill-rule="evenodd"
            d="M5.4 3 3.8 6.9v12.2h4.3V22h3l2.8-2.9h3.7l3-3V3H5.4Zm13.2 11.9-2.2 2.1h-4.1l-2.3 2.3V17H6.2V5.2h12.4v9.7Z"
          />
          <path d="M10.3 8.1h1.9v4.7h-1.9zm4.5 0h1.9v4.7h-1.9z" />
        </g>
        <path
          v-else-if="link.platform === 'youtube'"
          fill-rule="evenodd"
          d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29.4 29.4 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z"
        />
        <path
          v-else-if="link.platform === 'tiktok'"
          d="M16.5 3a5.6 5.6 0 0 0 4.2 4.1v3.1a8.5 8.5 0 0 1-4.2-1.3v6.4a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.1.1v3.3a3 3 0 0 0-1.1-.2 2.9 2.9 0 1 0 2.9 2.9V3h3.2Z"
        />
        <g
          v-else-if="link.platform === 'instagram'"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.9"
        >
          <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.25" cy="6.85" r="0.95" fill="currentColor" stroke="none" />
        </g>
        <path
          v-else-if="link.platform === 'x'"
          d="M18.2 2.8h3.1l-6.8 7.8 8 10.6h-6.3l-5-6.5-5.7 6.5H2.4l7.3-8.4L2 2.8h6.5l4.6 6 5.1-6Zm-1.1 16.5h1.7L7.6 4.6H5.8l11.3 14.7Z"
        />
        <g v-else fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">
          <path d="m3.5 8.1 4.4 3.1L12 5.6l4.1 5.6 4.4-3.1-1.5 9.2H5L3.5 8.1Z" />
          <path d="M6 19.8h12" />
          <circle cx="12" cy="13.4" r="1.1" fill="currentColor" stroke="none" />
        </g>
      </svg>
      <span class="social-dock__label">{{ link.label }}</span>
    </a>
  </nav>
</template>
