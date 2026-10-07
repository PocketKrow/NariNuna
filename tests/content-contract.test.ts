// Local record and source contracts protect route count, safe destinations and content boundaries; no external destination is fetched.
import { describe, expect, it } from "vitest";
import { havenRooms, havenRoomNotes } from "@/data/rooms";
import { featuredMoments } from "@/data/media";
import { footerNavigation, primaryNavigation } from "@/data/navigation";
import { resourceDemoEntries } from "@/data/resources";
import { discordUrl, nariLinks, socialLinks, throneUrl, twitchUrl } from "@/data/socials";

describe("content contracts", () => {
  it("keeps every public route unique and document-shaped", () => {
    const paths = [...primaryNavigation, ...footerNavigation].map((item) => item.href);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/");
    expect(paths.filter((path) => path !== "/").every((path) => path.endsWith("/"))).toBe(true);
    expect(paths).toEqual(["/", "/meet-nari/", "/streams/", "/nail-studio/", "/haven/", "/work-with-nari/", "/credits/"]);
  });

  it("provides a description for each ordinary navigation destination", () => {
    const paths = [...primaryNavigation, ...footerNavigation].map((item) => item.href);
    expect(new Set(havenRooms.map((room) => room.href))).toEqual(new Set(paths));
    expect(havenRooms.every((room) => havenRoomNotes[room.href] === room.note && room.note.length > 0)).toBe(true);
  });

  it("uses one secure source of truth for Nari's common public links", () => {
    const urls = nariLinks.map((link) => link.url);

    expect(nariLinks).toHaveLength(6);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => new URL(url).protocol === "https:")).toBe(true);
    expect(nariLinks.every((link) => /^\d{4}-\d{2}-\d{2}$/.test(link.verifiedAt))).toBe(true);
    expect(nariLinks.some((link) => link.label === "Linktree")).toBe(false);
    expect(nariLinks.map((link) => link.platform)).toEqual(["twitch", "youtube", "x", "tiktok", "instagram", "throne"]);
    expect(socialLinks).toHaveLength(5);
    expect(twitchUrl).toBe(nariLinks.find((link) => link.platform === "twitch")?.url);
    expect(throneUrl).toBe(nariLinks.find((link) => link.platform === "throne")?.url);
  });

  it("keeps community entry and support links secure", () => {
    expect([discordUrl, throneUrl, twitchUrl].every((url) => new URL(url).protocol === "https:")).toBe(true);
  });

  it("ships only explicit, traceable featured media", () => {
    const ids = featuredMoments.map((moment) => moment.id);

    expect(featuredMoments).toHaveLength(3);
    expect(new Set(ids).size).toBe(ids.length);
    expect(featuredMoments.every((moment) => moment.url.includes("youtube.com/shorts/"))).toBe(true);
    expect(featuredMoments.every((moment) => moment.thumbnailUrl?.startsWith("https://i.ytimg.com/"))).toBe(true);
    expect(featuredMoments.every((moment) => moment.contentRating === "general")).toBe(true);
  });

  it("keeps Resources demonstration content explicit, varied, and link-free", () => {
    const ids = resourceDemoEntries.map((entry) => entry.id);

    expect(resourceDemoEntries).toHaveLength(9);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(resourceDemoEntries.map((entry) => entry.category)).size).toBe(3);
    expect(resourceDemoEntries.some((entry) => entry.layout === "compact")).toBe(true);
    expect(resourceDemoEntries.some((entry) => entry.layout === "standard")).toBe(true);
    expect(resourceDemoEntries.some((entry) => entry.layout === "wide")).toBe(true);
    expect(JSON.stringify(resourceDemoEntries)).not.toContain("http");
  });
});
