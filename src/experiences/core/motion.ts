import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scene-owned planes move relative to a static copy lane. No character redraw, pinning or hidden text.
function animateDepth(scene: HTMLElement): () => void {
  const stage = scene.querySelector<HTMLElement>(".room-arrival__stage");
  if (!stage) return () => {};
  const planes = [...stage.querySelectorAll<HTMLElement>("[data-depth]")];
  const move = planes.map((plane) => ({
    depth: Math.min(1, Math.max(0, Number(plane.dataset.depth) || 0)),
    x: gsap.quickTo(plane, "x", { duration: 0.9, ease: "power2.out" }),
  }));
  const light = stage.querySelector<HTMLElement>(".room-arrival__illumination");
  const lightX = light ? gsap.quickTo(light, "x", { duration: 1.2, ease: "power2.out" }) : undefined;
  let visible = false;
  const reset = () => { move.forEach((plane) => plane.x(0)); lightX?.(0); };
  const pointer = (event: PointerEvent) => {
    if (!visible || document.hidden || event.pointerType === "touch") return;
    const bounds = stage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    move.forEach((plane) => plane.x(x * plane.depth * 12));
    lightX?.(x * 9);
  };
  planes.forEach((plane, index) => gsap.to(plane, {
    y: move[index].depth * 34, ease: "none",
    scrollTrigger: { trigger: scene, start: "top top", end: "bottom top", scrub: 0.8 },
  }));
  const visibility = () => { if (document.hidden) reset(); };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    scene.dataset.depthActive = String(visible);
    if (!visible) reset();
  });
  observer.observe(scene);
  scene.addEventListener("pointermove", pointer);
  scene.addEventListener("pointerleave", reset);
  document.addEventListener("visibilitychange", visibility);
  return () => {
    observer.disconnect();
    scene.removeEventListener("pointermove", pointer);
    scene.removeEventListener("pointerleave", reset);
    document.removeEventListener("visibilitychange", visibility);
    delete scene.dataset.depthActive;
  };
}

export function choreograph(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const cleanups: (() => void)[] = [];
  const context = gsap.context(() => {
    document.querySelectorAll<HTMLElement>(".room-arrival[data-experience]").forEach((scene) => cleanups.push(animateDepth(scene)));
    document.querySelectorAll<HTMLElement>("[data-material-reveal]").forEach((material) => {
      gsap.from(material, { y: 10, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: material, start: "top 92%", once: true } });
    });
  });
  return () => { cleanups.splice(0).forEach((cleanup) => cleanup()); context.revert(); };
}
