<script setup lang="ts">
// Own mobile-directory state, native More disclosure and keyboard focus. Keep the 56rem layout listener aligned with the CSS breakpoint.
import { ChevronDown, Menu, Radio, Sparkles, X } from "@lucide/vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import GhostieArt from "@/components/art/GhostieArt.vue";
import { havenRoomNotes } from "@/data/rooms";
import { footerNavigation, primaryNavigation } from "@/data/navigation";
import { twitchUrl } from "@/data/socials";

const props = defineProps<{ currentPath: string }>();
const menuOpen = ref(false);
const moreMenu = ref<HTMLDetailsElement | null>(null);
const menuToggle = ref<HTMLButtonElement | null>(null);
const menuPanel = ref<HTMLElement | null>(null);
const moreToggle = ref<HTMLElement | null>(null);
// Astro passes the canonical route, so current-page labels are correct before hydration.
const principalLinks = primaryNavigation.filter((item) =>
  ["/meet-nari/", "/streams/", "/haven/", "/work-with-nari/"].includes(item.href)
);
const moreLinks = [
  ...primaryNavigation.filter((item) => ["/resources/", "/nail-studio/"].includes(item.href)),
  ...footerNavigation
];
const mobileLinks = [...principalLinks, ...moreLinks];

/** Compare normalized document destinations; labels are free to change independently. */
function isCurrent(href: string): boolean {
  return props.currentPath === href || (href === "/" && props.currentPath === "");
}

/** Share room descriptions, with a harmless fallback for a newly registered room. */
function roomNoteFor(href: string): string {
  return havenRoomNotes[href] ?? "Another corner of the Haven.";
}

/** Close both navigation presentations before a document change or Escape focus return. */
function closeMenu(): void {
  menuOpen.value = false;
  if (moreMenu.value) moreMenu.value.open = false;
}

/** Escape returns to the opener; Tab wraps only through visible mobile controls. */
function handleNavigationKeys(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    const returnTo = menuOpen.value ? menuToggle.value : moreMenu.value?.open ? moreToggle.value : null;
    closeMenu();
    returnTo?.focus();
    return;
  }

  if (event.key !== "Tab" || !menuOpen.value || !menuPanel.value || !menuToggle.value) return;

  const panelLinks = [...menuPanel.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary')].filter(
    (element) => element.getClientRects().length > 0
  );
  const focusable = [menuToggle.value, ...panelLinks];
  const first = focusable[0];
  const last = focusable.at(-1);
  const active = document.activeElement;

  if (!focusable.includes(active as HTMLElement)) {
    event.preventDefault();
    first?.focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first?.focus();
  }
}

// Clear mobile-only state when the desktop navigation takes over.
let desktopNavigation: MediaQueryList | undefined;
function handleNavigationLayout(): void {
  if (!desktopNavigation?.matches || !menuOpen.value) return;
  const active = document.activeElement;
  const focusWasInMenu = active === menuToggle.value || (active instanceof Node && menuPanel.value?.contains(active));
  closeMenu();
  if (focusWasInMenu) menuPanel.value?.querySelector<HTMLElement>(".site-header__main-nav a")?.focus();
}
onMounted(() => {
  desktopNavigation = window.matchMedia("(min-width: 56rem)");
  desktopNavigation.addEventListener("change", handleNavigationLayout);
  window.addEventListener("keydown", handleNavigationKeys);
});

// Body scroll lock follows local state and is removed on teardown, even mid-navigation.
watch(menuOpen, (open) => {
  document.body.classList.toggle("nav-is-open", open);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleNavigationKeys);
  desktopNavigation?.removeEventListener("change", handleNavigationLayout);
  document.body.classList.remove("nav-is-open");
});
</script>

<template>
  <!-- Home branding and menu controls share one landmark; mobile and desktop link groups retain distinct accessible names. -->
  <header class="site-header">
    <div class="site-header__inner page-width">
      <a class="brand-mark" href="/" aria-label="Nari Nuna's Haven, home">
        <span class="brand-mark__emblem"><GhostieArt variant="wave" sizes="48px" loading="eager" /></span>
        <span>
          <strong>Nari <i>Nuna</i></strong>
          <small>The little world next door</small>
        </span>
      </a>

      <button
        ref="menuToggle"
        class="nav-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
        @click="menuOpen = !menuOpen"
      >
        <X v-if="menuOpen" :size="22" aria-hidden="true" />
        <Menu v-else :size="22" aria-hidden="true" />
      </button>

      <div id="primary-navigation" ref="menuPanel" class="site-header__panel" :class="{ 'is-open': menuOpen }">
        <p class="site-header__mobile-context"><Sparkles :size="14" aria-hidden="true" /> Make yourself at home</p>
        <!-- Separate link groups let CSS switch layouts without rebuilding open-menu focus state. -->
        <nav class="site-header__mobile-nav" aria-label="Haven rooms">
          <a
            v-for="item in mobileLinks"
            :key="item.href"
            :href="item.href"
            :aria-current="isCurrent(item.href) ? 'page' : undefined"
            @click="closeMenu"
          >
            <span>
              <strong>{{ item.shortLabel ?? item.label }}</strong>
              <small>{{ roomNoteFor(item.href) }}</small>
            </span>
          </a>
        </nav>

        <nav class="site-header__main-nav" aria-label="Primary navigation">
          <a
            v-for="item in principalLinks"
            :key="item.href"
            :href="item.href"
            :aria-current="isCurrent(item.href) ? 'page' : undefined"
            @click="closeMenu"
          >
            {{ item.shortLabel ?? item.label }}
          </a>
        </nav>

        <!-- Native details supplies disclosure semantics; the shared key handler adds Escape return. -->
        <details ref="moreMenu" class="site-header__more">
          <summary ref="moreToggle">More <ChevronDown :size="15" aria-hidden="true" /></summary>
          <nav aria-label="Additional Haven rooms">
            <a
              v-for="item in moreLinks"
              :key="item.href"
              :href="item.href"
              :aria-current="isCurrent(item.href) ? 'page' : undefined"
              @click="closeMenu"
            >
              <span>{{ item.shortLabel ?? item.label }}</span>
              <small>{{ item.href === "/resources/" ? "Useful things" : item.href === "/nail-studio/" ? "Color and craft" : item.href === "/stories/" ? "Saved moments" : item.href === "/credits/" ? "Meet the makers" : "Support Nari" }}</small>
            </a>
          </nav>
        </details>

        <a class="site-header__live-link" :href="twitchUrl" target="_blank" rel="noreferrer noopener">
          <Radio :size="16" aria-hidden="true" />
          On Twitch
          <span class="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Header-only disclosure, brand and mobile directory. The desktop breakpoint must match the media-query listener above. */
.brand-mark__emblem {
  display: grid;
  width: 3.15rem;
  height: 3.15rem;
  flex: 0 0 auto;
  place-items: center;
  overflow: visible;
  background: radial-gradient(circle at 50% 55%, color-mix(in srgb, var(--story-accent) 22%, transparent), transparent 70%);
  border: 0;
  border-radius: 50%;
  box-shadow: none;
}
.brand-mark__emblem :deep(.ghostie-art) { --ghostie-size: 3.15rem; }
.site-header__more { position: relative; }
.site-header__mobile-context { display: none; }
.site-header__mobile-nav { display: none; }
.site-header__more > summary {
  display: flex;
  min-height: 2.7rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.55rem;
  padding: 0.65rem 0.75rem;
  color: var(--text-muted);
  border: 1px solid var(--story-line);
  border-radius: 0.45rem;
  font-size: 0.76rem;
  font-weight: 760;
  list-style: none;
  cursor: pointer;
}
.site-header__more > summary::-webkit-details-marker { display: none; }
.site-header__more > summary svg { transition: transform 180ms ease; }
.site-header__more[open] > summary { color: var(--text); background: color-mix(in srgb, var(--story-surface) 75%, transparent); }
.site-header__more[open] > summary svg { transform: rotate(180deg); }
.site-header__more > nav {
  display: grid;
  gap: 0.45rem;
  padding: 0.55rem;
  margin-block-start: 0.5rem;
  background: var(--story-surface-deep);
  border: 1px solid var(--story-line);
  border-radius: 0.6rem;
  box-shadow: 0 1rem 2.5rem rgb(12 7 11 / 22%);
}
.site-header__more > nav > a {
  display: grid;
  gap: 0.1rem;
  padding: 0.75rem 0.8rem;
  color: var(--story-copy);
  background: color-mix(in srgb, var(--story-surface) 78%, transparent);
  border: 1px solid transparent;
  border-radius: 0.45rem;
  text-decoration: none;
}
.site-header__more > nav > a:hover,
.site-header__more > nav > a[aria-current="page"] { border-color: var(--story-line); background: var(--story-surface-soft); }
.site-header__more > nav > a small { color: var(--story-muted); font-size: 0.58rem; font-weight: 650; letter-spacing: 0.04em; }
@media (min-width: 56rem) {
  .site-header__more > summary { min-height: auto; padding: 0.65rem 0.7rem; border-color: transparent; border-radius: var(--radius-sm); }
  .site-header__more > nav {
    position: absolute;
    z-index: 30;
    top: calc(100% + 0.65rem);
    right: 0;
    width: 22rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
    padding: 0.7rem;
    margin: 0;
  }
  .site-header__more > nav > a { min-height: 4.5rem; align-content: center; padding: 0.85rem 0.9rem; }
}
@media (max-width: 55.99rem) {
  .site-header__main-nav,
  .site-header__more { display: none; }
  .site-header__panel {
    min-height: calc(100dvh - var(--header-height));
    max-height: calc(100dvh - var(--header-height));
    overscroll-behavior: contain;
    padding-block-end: max(1.5rem, env(safe-area-inset-bottom));
    align-content: start;
  }
  .site-header__mobile-nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
  }
  .site-header__mobile-context {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    color: var(--storybook-gold);
    font-family: var(--font-detail);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .site-header__mobile-nav > a {
    display: flex;
    min-height: 4.5rem;
    align-items: center;
    padding: 0.8rem 0.9rem;
    color: var(--story-copy);
    background: color-mix(in srgb, var(--story-surface) 76%, transparent);
    border: 1px solid var(--story-line);
    border-radius: 0.55rem;
    text-decoration: none;
    white-space: normal;
  }
  .site-header__mobile-nav > a > span {
    display: grid;
    gap: 0.18rem;
  }
  .site-header__mobile-nav > a strong {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.1;
  }
  .site-header__mobile-nav > a small {
    color: var(--story-muted);
    font-size: 0.75rem;
    font-weight: 650;
    line-height: 1.3;
  }
  .site-header__mobile-nav > a:hover {
    background: var(--story-surface-soft);
    border-color: var(--storybook-gold);
  }
  .site-header__mobile-nav > a[aria-current="page"]::after { display: none; }
  .site-header__mobile-nav > a[aria-current="page"] {
    background: color-mix(in srgb, var(--story-surface-soft) 88%, transparent);
    border-color: color-mix(in srgb, var(--storybook-gold) 62%, var(--story-line));
    box-shadow: inset 0.2rem 0 var(--storybook-gold);
  }
}
@media (max-width: 30rem) {
  .brand-mark { gap: 0.5rem; }
  .brand-mark__emblem {
    width: 2.75rem;
    height: 2.75rem;
  }
  .brand-mark__emblem :deep(.ghostie-art) { --ghostie-size: 2.75rem; }
  .brand-mark strong { display: grid; line-height: 0.9; }
  .brand-mark strong i { padding-inline-start: 0.55rem; }
}
@media (max-width: 24rem) {
  .site-header__mobile-nav { grid-template-columns: 1fr; }
  .site-header__mobile-nav > a { min-height: 4.25rem; }
}
.site-header__main-nav > a,
.site-header__live-link,
.site-header__more > summary,
.site-header__more > nav > a { font-size: 0.875rem; }
.site-header__more > nav > a small { font-size: 0.75rem; }
</style>
