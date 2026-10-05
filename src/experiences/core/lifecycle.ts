import { canAnimate, canRenderAtmosphere, readCapabilities } from "./capabilities";

// Load after the document's critical images, then idle. Async results cannot survive a page exit or preference change.
export function startExperience(): void {
  let disposeMotion: (() => void) | undefined;
  const atmosphereDisposers: (() => void)[] = [];
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
    atmosphereDisposers.splice(0).forEach((dispose) => dispose());
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
    const canvases = document.querySelectorAll<HTMLCanvasElement>("[data-atmosphere]");
    if (!canvases.length || !canRenderAtmosphere(capabilities) || !active || version !== generation) return;
    // Probe WebGL2 before downloading the graphics runtime. Release the probe immediately.
    const probe = document.createElement("canvas").getContext("webgl2");
    if (!probe) return;
    probe.getExtension("WEBGL_lose_context")?.loseContext();
    try {
      const { createAtmosphere } = await import("../home/atmosphere");
      if (!active || version !== generation) return;
      for (const canvas of canvases) atmosphereDisposers.push(createAtmosphere(canvas));
    } catch {
      // Renderer creation or chunk failure preserves the static composition.
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
