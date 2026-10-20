import { canAnimate, canRenderAtmosphere, readCapabilities } from "./capabilities";
import { supportsAtmosphere } from "./webgl";

// Choreography waits for critical images and idle time. Graphics also wait for proximity;
// no observer, import or renderer may survive a page exit or preference change.
export function startExperience(): void {
  document.querySelectorAll<HTMLCanvasElement>("[data-atmosphere]").forEach((canvas) => { canvas.dataset.atmosphereState = "static"; });
  let disposeMotion: (() => void) | undefined;
  let atmosphereObserver: IntersectionObserver | undefined;
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
    atmosphereObserver?.disconnect();
    atmosphereObserver = undefined;
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
    if (!canvases.length || !canRenderAtmosphere(readCapabilities()) || !active || version !== generation) return;
    // Without proximity observation, retain the complete static composition.
    if (!("IntersectionObserver" in window)) return;
    let supported: boolean | undefined;
    let atmosphereModule: Promise<typeof import("../home/atmosphere")> | undefined;
    const enhance = async (canvas: HTMLCanvasElement) => {
      if (!active || version !== generation || !canRenderAtmosphere(readCapabilities())) return;
      try {
        // Probe shader support only near the artwork, before downloading Three.
        supported ??= supportsAtmosphere();
        if (!supported) return;
        atmosphereModule ??= import("../home/atmosphere");
        const { createAtmosphere } = await atmosphereModule;
        if (!active || version !== generation) return;
        atmosphereDisposers.push(createAtmosphere(canvas));
      } catch {
        // Renderer creation or chunk failure preserves the static composition.
      }
    };
    const observer = new IntersectionObserver((entries) => {
      if (!active || version !== generation) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        void enhance(entry.target as HTMLCanvasElement);
      }
    }, { rootMargin: "300px 0px" });
    atmosphereObserver = observer;
    canvases.forEach((canvas) => observer.observe(canvas));
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
