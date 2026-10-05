// Context creation alone does not prove that Three's shader-capability queries can succeed.
export function hasShaderPrecision(context: WebGL2RenderingContext): boolean {
  try {
    if (context.isContextLost()) return false;
    return [context.VERTEX_SHADER, context.FRAGMENT_SHADER].every((shader) => {
      const format = context.getShaderPrecisionFormat(shader, context.HIGH_FLOAT);
      return format !== null && format.precision > 0;
    }) && !context.isContextLost();
  } catch {
    return false;
  }
}

export function releaseContext(context: WebGL2RenderingContext): void {
  try {
    if (!context.isContextLost()) context.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    // A blocked or already-lost optional context needs no further work.
  }
}

export function getAtmosphereContext(canvas: HTMLCanvasElement): WebGL2RenderingContext | null {
  let context: WebGL2RenderingContext | null = null;
  try {
    context = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "low-power" });
    if (context && hasShaderPrecision(context)) return context;
  } catch {
    // Browser privacy/graphics policies may reject context creation outright.
  }
  if (context) releaseContext(context);
  return null;
}

export function supportsAtmosphere(): boolean {
  const context = getAtmosphereContext(document.createElement("canvas"));
  if (!context) return false;
  releaseContext(context);
  return true;
}
