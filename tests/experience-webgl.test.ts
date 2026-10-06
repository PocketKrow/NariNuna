import { afterEach, describe, expect, it, vi } from "vitest";
import { getAtmosphereContext, hasShaderPrecision, releaseContext } from "../src/experiences/core/webgl";

function graphics() {
  const loseContext = vi.fn();
  const context = {
    VERTEX_SHADER: 35633, FRAGMENT_SHADER: 35632, HIGH_FLOAT: 36338,
    isContextLost: vi.fn(() => false),
    getShaderPrecisionFormat: vi.fn((): WebGLShaderPrecisionFormat | null => ({ precision: 23, rangeMin: 127, rangeMax: 127 })),
    getExtension: vi.fn(() => ({ loseContext })),
  };
  return { context, gl: context as unknown as WebGL2RenderingContext, loseContext };
}
function canvas(context: WebGL2RenderingContext | null) {
  const getContext = vi.fn(() => context);
  return { element: { getContext } as unknown as HTMLCanvasElement, getContext };
}
afterEach(() => vi.restoreAllMocks());

describe("optional WebGL shader support", () => {
  it("accepts usable vertex and fragment precision", () => {
    const { gl, context } = graphics();
    expect(hasShaderPrecision(gl)).toBe(true);
    expect(context.getShaderPrecisionFormat.mock.calls).toHaveLength(2);
  });
  for (const shader of [35633, 35632]) {
    it(`rejects null shader precision for ${shader}`, () => {
      const { gl, context } = graphics();
      context.getShaderPrecisionFormat.mockImplementation((type?: number) => type === shader ? null : { precision: 23, rangeMin: 127, rangeMax: 127 });
      expect(hasShaderPrecision(gl)).toBe(false);
    });
  }
  it("rejects zero precision and an already-lost context", () => {
    const { gl, context } = graphics();
    context.getShaderPrecisionFormat.mockReturnValue({ precision: 0, rangeMin: 0, rangeMax: 0 });
    expect(hasShaderPrecision(gl)).toBe(false);
    context.getShaderPrecisionFormat.mockClear();
    context.isContextLost.mockReturnValue(true);
    expect(hasShaderPrecision(gl)).toBe(false);
    expect(context.getShaderPrecisionFormat).not.toHaveBeenCalled();
  });
  it("rejects a context lost during its precision queries", () => {
    const { gl, context } = graphics();
    context.isContextLost.mockReturnValueOnce(false).mockReturnValueOnce(true);
    expect(hasShaderPrecision(gl)).toBe(false);
  });
  it("contains precision-query exceptions and releases the rejected context", () => {
    const { gl, context, loseContext } = graphics();
    context.getShaderPrecisionFormat.mockImplementation(() => { throw new Error("Graphics blocked"); });
    expect(getAtmosphereContext(canvas(gl).element)).toBeNull();
    expect(loseContext).toHaveBeenCalledOnce();
  });
  it("passes the exact validated context back to the renderer owner", () => {
    const { gl, loseContext } = graphics();
    expect(getAtmosphereContext(canvas(gl).element)).toBe(gl);
    expect(loseContext).not.toHaveBeenCalled();
  });
  it("contains context creation failure and unavailable WebGL2", () => {
    expect(getAtmosphereContext(canvas(null).element)).toBeNull();
    const blocked = canvas(null);
    blocked.getContext.mockImplementation(() => { throw new Error("Creation blocked"); });
    expect(getAtmosphereContext(blocked.element)).toBeNull();
  });
  it("releases safely when loss support is blocked or the context is already lost", () => {
    const { gl, context, loseContext } = graphics();
    context.isContextLost.mockReturnValue(true);
    releaseContext(gl);
    expect(loseContext).not.toHaveBeenCalled();
    context.isContextLost.mockReturnValue(false);
    context.getExtension.mockImplementation(() => { throw new Error("Extension blocked"); });
    expect(() => releaseContext(gl)).not.toThrow();
  });
});
