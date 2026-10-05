import { BufferAttribute, BufferGeometry, OrthographicCamera, Points, Scene, ShaderMaterial, WebGLRenderer } from "three";
import { dustFragment, dustVertex } from "@/shaders/dust";

export function createAtmosphere(canvas: HTMLCanvasElement): () => void {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 2;
  const geometry = new BufferGeometry();
  const positions = new Float32Array(48 * 3);
  const phases = new Float32Array(48);
  for (let i = 0; i < 48; i++) {
    positions[i * 3] = ((i * 0.6180339887) % 1) * 2 - 1;
    positions[i * 3 + 1] = ((i * 0.4142135623) % 1) * 2 - 1;
    phases[i] = (i + 1) / 48;
  }
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("phase", new BufferAttribute(phases, 1));
  const material = new ShaderMaterial({
    uniforms: { time: { value: 0 }, response: { value: 0 } },
    vertexShader: dustVertex, fragmentShader: dustFragment,
    transparent: true, depthWrite: false,
  });
  scene.add(new Points(geometry, material));
  const host = canvas.closest<HTMLElement>("[data-experience]") ?? canvas.parentElement;
  const control = host?.querySelector<HTMLButtonElement>("[data-atmosphere-control]");
  let visible = false;
  let paused = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(Math.min(rect.width, 1600), Math.min(rect.height, 900), false);
  };
  const tick = (now: number) => {
    frame = 0;
    if (disposed || paused || !visible || document.hidden) { last = 0; return; }
    if (now - last >= 33) {
      elapsed += last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      material.uniforms.time.value = elapsed;
      const door = host?.querySelector<HTMLElement>(".haven-threshold__scene");
      const step = door?.className.match(/is-step-(\d)/)?.[1];
      material.uniforms.response.value = Number(step ?? 0) / 3;
      renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (!disposed && !paused && visible && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const toggle = () => {
    paused = !paused;
    canvas.dataset.atmosphereState = paused ? "paused" : "active";
    if (control) { control.textContent = paused ? "Resume atmosphere" : "Pause atmosphere"; control.setAttribute("aria-pressed", String(paused)); }
    sync();
  };
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  intersection.observe(canvas);
  const size = new ResizeObserver(resize);
  size.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  control?.addEventListener("click", toggle);
  if (control) control.hidden = false;
  const contextLost = (event: Event) => { event.preventDefault(); dispose(); };
  canvas.addEventListener("webglcontextlost", contextLost);
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    intersection.disconnect(); size.disconnect();
    document.removeEventListener("visibilitychange", sync);
    canvas.removeEventListener("webglcontextlost", contextLost);
    control?.removeEventListener("click", toggle);
    if (control) control.hidden = true;
    geometry.dispose(); material.dispose(); renderer.dispose();
    renderer.forceContextLoss();
    canvas.dataset.atmosphereState = "static";
  }
  resize();
  canvas.dataset.atmosphereState = "active";
  return dispose;
}
