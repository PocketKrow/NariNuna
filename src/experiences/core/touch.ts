// Finite, low-cost material settling on touch/small screens. No continuous frame, GSAP or graphics download.
export function settleMaterials(): () => void {
  const animations = new Set<Animation>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      const animation = entry.target.animate([{ transform: "translateY(6px)" }, { transform: "translateY(0)" }], { duration: 420, easing: "cubic-bezier(.2,.7,.3,1)" });
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    }
  }, { threshold: 0.12 });
  document.querySelectorAll<HTMLElement>("[data-material-reveal]").forEach((element) => observer.observe(element));
  const stop = () => animations.forEach((animation) => animation.cancel());
  const visibility = () => { if (document.hidden) stop(); };
  document.addEventListener("visibilitychange", visibility);
  return () => { observer.disconnect(); stop(); document.removeEventListener("visibilitychange", visibility); };
}
