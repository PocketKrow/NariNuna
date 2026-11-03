import { canAnimate, readCapabilities } from "./capabilities";

// Choreography waits for critical images and is cleaned up on page exit or preference change.
export function startExperience(): void {
  let disposeMotion: (() => void) | undefined;
  let generation = 0;
  let scheduled = 0;
  let idle = 0;
  let active = true;
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const layoutPreference = matchMedia("(min-width: 1024px) and (pointer: fine)");
  const clear = () => {
    generation++;
    clearTimeout(scheduled);
    if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
    idle = 0;
    disposeMotion?.();
    disposeMotion = undefined;
  };
  const begin = async () => {
    const version = generation;
    const capabilities = readCapabilities();
    if (!active || !canAnimate(capabilities) || capabilities.coarsePointer || capabilities.width < 1024) return;
    try {
      const { choreograph } = await import("./motion");
      if (!active || version !== generation) return;
      disposeMotion = choreograph();
    } catch {
      // Static artwork and content are complete even if an optional chunk is unavailable.
    }

  };
  const schedule = () => {
    clear();
    if (!active) return;
    const version = generation;
    scheduled = window.setTimeout(() => {
      if (version !== generation || !active) return;
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => { if (version === generation) void begin(); }, { timeout: 1500 });
      else void begin();
    }, 120);
  };
  const leave = () => { active = false; clear(); };
  const restore = (event: PageTransitionEvent) => { if (event.persisted) { active = true; schedule(); } };
  motionPreference.addEventListener("change", schedule);
  layoutPreference.addEventListener("change", schedule);
  window.addEventListener("pagehide", leave);
  window.addEventListener("pageshow", restore);
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}
