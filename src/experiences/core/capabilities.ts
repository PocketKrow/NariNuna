export interface ExperienceCapabilities {
  reducedMotion: boolean;
  saveData: boolean;
  coarsePointer: boolean;
  width: number;
  cores: number;
}
// Pure policy is tested independently from graphics support. No data is persisted or sent.
export function canAnimate(capabilities: ExperienceCapabilities): boolean {
  return !capabilities.reducedMotion && !capabilities.saveData;
}
export function experienceTier(capabilities: ExperienceCapabilities): "static" | "touch" | "depth" {
  if (!canAnimate(capabilities)) return "static";
  return capabilities.coarsePointer || capabilities.width < 1024 ? "touch" : "depth";
}
export function canRenderAtmosphere(capabilities: ExperienceCapabilities): boolean {
  return canAnimate(capabilities) && !capabilities.coarsePointer && capabilities.width >= 1024 && capabilities.cores >= 4;
}
export function readCapabilities(): ExperienceCapabilities {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return {
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: connection?.saveData ?? false,
    coarsePointer: matchMedia("(pointer: coarse)").matches,
    width: innerWidth,
    cores: navigator.hardwareConcurrency ?? 2,
  };
}
