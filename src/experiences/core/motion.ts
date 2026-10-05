import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function choreograph(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
    const context = gsap.context(() => {
      for (const arrival of document.querySelectorAll<HTMLElement>("[data-experience]")) {
        const painting = arrival.querySelector(".room-arrival__painting");
        if (painting) gsap.to(painting, {
          y: 18, ease: "none",
          scrollTrigger: { trigger: arrival, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      }
      for (const material of document.querySelectorAll<HTMLElement>("[data-material-reveal]")) {
        // Never hide text or make it dependent on a reveal. Only the material shifts a few pixels.
        gsap.from(material, { y: 12, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: material, start: "top 92%", once: true } });
      }
    });
    return () => context.revert();
  });
  return () => media.revert();
}
