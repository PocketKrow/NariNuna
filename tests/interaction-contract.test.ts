// Source-level navigation, focus and room-content invariants. Literal matches are regression clues, not proof of keyboard behavior or pixel parity.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function sourceAt(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("client-feedback interaction contracts", () => {
  it("keeps the Discord invitation behind exactly three accessible Haven knocks", () => {
    const doorway = sourceAt("src/components/haven/HavenDoor.vue");

    const behavior = sourceAt("src/composables/useHavenDoor.ts");
    expect(behavior).toContain("const knocksRequired = 3");
    expect(behavior).toContain("Math.min(step.value + 1, knocksRequired)");
    expect(doorway).toContain('name: "First knock"');
    expect(doorway).toContain('name: "Second knock"');
    expect(doorway).toContain('name: "Third knock"');
    expect(doorway).toContain('aria-label="Your three knocks at the Haven door"');
    expect(doorway).toContain(':aria-current="!isOpen && step === index - 1 ? \'step\' : undefined"');
    expect(doorway).toContain("environmentArtwork.havenDoorInterior");
    expect(doorway).toContain('v-if="loadInterior" class="haven-threshold__gathering"');
    expect(doorway).toContain(':aria-hidden="!isOpen ? \'true\' : undefined"');
    expect(doorway).toContain('v-if="step > 0" :key="step" class="haven-threshold__knock-response"');
    expect(doorway).toContain('<Transition name="haven-story" mode="out-in">');
    expect(doorway).toContain('ref="storyAction"');
    expect(doorway).toContain('ref="discordAction"');
    expect(doorway).toContain('document.activeElement === storyAction.value');
    expect(doorway).toContain("discordAction.value?.focus()");
    expect(doorway).toContain("storyAction.value?.focus()");
    expect(doorway).toContain("@keyframes haven-knock-ring");
    expect(doorway).toContain("@media (prefers-reduced-motion: reduce)");
    expect(doorway).toContain("object-fit: cover");
    expect(doorway).not.toContain("backdrop-filter: blur");

    const lockedState = doorway.slice(doorway.indexOf('<template v-if="!isOpen">'), doorway.indexOf("<template v-else>"));
    const openState = doorway.slice(doorway.indexOf("<template v-else>"));

    expect(lockedState).not.toContain(':href="discordUrl"');
    expect(openState).toContain(':href="discordUrl"');
    expect(openState).toContain('@click="closeFromStory"');

    const transitionedCopy = doorway.slice(doorway.indexOf('<Transition name="haven-story"'), doorway.indexOf("</Transition>") + 13);
    expect(transitionedCopy).not.toContain("haven-threshold__action");
  });

  it("routes the visibly labelled door directly into the Haven", () => {
    const home = sourceAt("src/pages/index.astro");
    const haven = sourceAt("src/pages/haven/index.astro");

    expect(home).toContain("roomObjects.map");
    expect(sourceAt("src/data/havenArtwork.ts")).toContain("href: '/haven/'");
    expect(home).not.toContain('import { twitchUrl } from "@/data/socials"');
    expect(haven).toContain('id="haven-door" class="haven-entry page-width section-pad"');
  });

  it("keeps the Home arrival clean and sends Nail Studio to its exact resource shelf", () => {
    const home = sourceAt("src/pages/index.astro");
    const nails = sourceAt("src/pages/nail-studio/index.astro");

    expect(home).not.toContain("haven-landing__rooms");
    expect(home).not.toContain('number: "01"');
    expect(nails).toContain('href="/resources/#nail-desk"');
  });

  it("reduces the loose floorboard to one optional Easter-egg reveal", () => {
    const floorboard = sourceAt("src/components/haven/LooseFloorboard.vue");

    expect(floorboard).toContain("const isOpen = ref(false)");
    expect(floorboard).toContain(':aria-expanded="isOpen"');
    expect(floorboard).toContain('href="/the-prinny-cult/"');
    expect(floorboard).toContain("prinnyEasterEggArtwork");
    expect(floorboard).not.toContain("knocksRequired");
    expect(floorboard).not.toContain("answerPassword");
    expect(floorboard).not.toContain("DOOD");
    expect(floorboard).not.toContain("suppliedPrinnyArtwork");
  });

  it("keeps secondary mobile actions readable and touch-sized", () => {
    const floorboard = sourceAt("src/components/haven/LooseFloorboard.vue");
    const doorway = sourceAt("src/components/haven/HavenDoor.vue");
    const cult = sourceAt("src/pages/the-prinny-cult/index.astro");
    const arrival = sourceAt("src/styles/objects/arrival.scss");

    expect(floorboard).toContain("font-size: 0.875rem");
    expect(floorboard).toContain("min-height: 2.75rem");
    expect(doorway).toContain(".haven-threshold__count");
    expect(doorway).toContain("font-size: 0.8rem");
    expect(doorway).toContain("font-size: 0.8125rem");
    expect(cult).toContain("font-size: 0.875rem");
    expect(cult).toContain("min-height: 2.75rem");
    expect(arrival).toContain("min-height: 2.75rem");
    expect(arrival).toContain("font-size: 0.75rem");
  });

  it("keeps the hidden Prinny route tiny instead of restoring a cult system", () => {
    const cult = sourceAt("src/pages/the-prinny-cult/index.astro");

    expect(cult).toContain("prinnyEasterEggArtwork");
    expect(cult).toContain("A suspicious little dood.");
    expect(cult.match(/href="\/haven\/#haven-door"/g)).toHaveLength(2);
    expect(cult).not.toContain("suppliedPrinnyArtwork");
    expect(cult).not.toContain("prinnyCultAssets");
    expect(cult).not.toContain("ritualStage");
    expect(cult).not.toContain("offerings");
    expect(cult).not.toContain("v-for");
  });

  it("keeps Work With Nari's directory native and Linktree-free", () => {
    const work = sourceAt("src/pages/work-with-nari/index.astro");
    const links = sourceAt("src/data/socials.ts");

    expect(work).toContain('id="nari-links"');
    expect(work).toContain('nariLinks.map((link, index)');
    expect(work).toContain('aria-label="Nari\'s public links"');
    expect(work).toContain('href="#nari-links"');
    expect(work).toContain('artwork={storybookPostcards.work}');
    expect(work).not.toContain("work-contact-vignette.svg");
    expect(work).toContain("Read the collaboration note");
    expect(work).not.toContain("Linktree");
    expect(links).toContain("export const nariLinks");
    expect(links).not.toContain("linktr.ee");
  });

  it("keeps Story Time clip chrome free of repeated numbering and branding", () => {
    const stories = sourceAt("src/pages/stories/index.astro");

    expect(stories).not.toContain("memory-album__folio");
    expect(stories).not.toContain("Lead memory");
    expect(stories).not.toContain("Moment 0");
  });

  it("uses the shared registry for recognizable, accessible homepage social icons", () => {
    const dock = sourceAt("src/components/ui/SocialDock.vue");
    const links = sourceAt("src/data/socials.ts");

    expect(dock).toContain('v-for="link in nariLinks"');
    expect(dock).toContain('viewBox="0 0 24 24"');
    expect(dock).toContain(':aria-label="`${link.label} (opens in a new tab)`"');
    expect(dock).toContain(':title="link.label"');
    expect(dock).toContain('fill="currentColor"');
    expect(dock).toContain('class="social-dock__label"');
    expect(sourceAt("src/styles/_polish.scss")).toContain(".social-dock__label");
    expect(sourceAt("src/styles/rooms/home.scss")).toContain(".home-room__aftercare .social-dock__label");

    for (const platform of ["twitch", "youtube", "tiktok", "instagram", "x", "throne"]) {
      expect(links).toContain(`platform: "${platform}"`);
    }
  });

  it("keeps Resources recommendations free of client preview samples", () => {
    const page = sourceAt("src/pages/resources/index.astro");
    expect(page).not.toContain("resourceDemoEntries");
    expect(page).not.toContain("resource-samples");
    expect(page).toContain("shelf-policy");
    expect(page).not.toContain('aria-label="Resource categories"');
  });

  it("keeps icon buttons uniform and disables new motion when reduced motion is requested", () => {
    const polish = sourceAt("src/styles/_polish.scss");
    const socials = polish.slice(polish.indexOf("/* Recognizable, icon-only socials"), polish.indexOf("/* Home starts"));

    expect(socials).toContain("grid-template-columns: repeat(6, minmax(0, 1fr))");
    expect(socials).toContain("color: var(--story-copy)");
    expect(socials).toContain("border-radius: 50%");
    expect(socials).toContain("color: inherit");
    expect(sourceAt("src/components/ui/MediaCard.vue")).toContain("@media (prefers-reduced-motion: reduce)");
    expect(sourceAt("src/components/ui/MediaCard.vue")).toContain("transform: none");
  });

  it("closes both navigation layers and contains mobile keyboard focus", () => {
    const header = sourceAt("src/components/layout/SiteHeader.vue");

    expect(header).toContain('const moreMenu = ref<HTMLDetailsElement | null>(null)');
    expect(header).toContain('const menuPanel = ref<HTMLElement | null>(null)');
    expect(header).toContain("if (moreMenu.value) moreMenu.value.open = false");
    expect(header).toContain('if (event.key === "Escape")');
    expect(header).toContain('event.key !== "Tab"');
    expect(header).toContain("event.preventDefault()");
    expect(header).toContain("focusable.includes(active as HTMLElement)");
    expect(header).toContain("returnTo?.focus()");
    expect(header).toContain('<details ref="moreMenu" class="site-header__more">');
    expect(header).toContain('class="site-header__mobile-nav"');
    expect(header).toContain('v-for="item in mobileLinks"');
    expect(header).not.toContain("index + 1");
    expect(header.match(/@click="closeMenu"/g)).toHaveLength(3);
  });

  it("keeps natural navigation without the retired tour", () => {
    const shell = sourceAt("src/layouts/SiteLayout.astro");
    const base = sourceAt("src/styles/_base.scss");
    expect(shell).not.toContain("RoomPassage");
    expect(shell).toContain("<SiteFooter");
    expect(base).not.toContain("navigation: auto");
    expect(shell).not.toContain("ClientRouter");
  });
});
