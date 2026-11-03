<script setup lang="ts">
// Contextual access resolves a stable registry ID; artist names and statuses remain owned by the Credits data.
import { BadgeInfo } from "@lucide/vue";
import { computed } from "vue";
import { artCreditRegistry } from "@/data/artCredits";

const props = withDefaults(defineProps<{
  creditId: string;
  label?: string;
  pageOnly?: boolean;
}>(), {
  label: "Artwork & credits"
});

const credit = computed(() => artCreditRegistry.credits.find((entry) => entry.id === props.creditId && entry.creditStatus !== "blocked"));
if (!credit.value) throw new Error(`Unknown artwork credit: ${props.creditId}`);
const linksToPage = computed(() => props.pageOnly || !credit.value?.pageVisible);
</script>

<template>
  <a
    class="artwork-credit-link"
    :href="linksToPage ? '/credits/' : `/credits/#${creditId}`"
    :data-credit-id="creditId"
    :aria-label="linksToPage ? label : `${label}: ${credit?.displayName}`"
  >
    <BadgeInfo :size="15" aria-hidden="true" />
    <span>{{ label }}</span>
  </a>
</template>

<style scoped>
.artwork-credit-link {
  display: inline-flex;
  width: fit-content;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.7rem;
  color: var(--text-muted);
  background: color-mix(in srgb, var(--story-surface) 82%, transparent);
  border: 1px solid var(--story-line);
  border-radius: 999px;
  font-family: var(--font-detail);
  font-size: 0.75rem;
  font-weight: 760;
  letter-spacing: 0.025em;
  text-decoration: none;
}
.artwork-credit-link:hover { color: var(--text); border-color: var(--storybook-gold); }
.artwork-credit-link:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
</style>
