// Soft, depth-scaled motes are original procedural decoration. No artwork textures or external assets enter the renderer.
export const dustVertex = `
uniform float time;
uniform float response;
attribute float phase;
varying float warmth;
varying float glimmer;
void main() {
  vec3 p = position;
  p.y = mod(position.y + time * (0.015 + phase * 0.008) + 1.0, 2.0) - 1.0;
  p.x += sin(time * 0.18 + phase * 12.0) * 0.025;
  warmth = phase;
  glimmer = 0.65 + 0.35 * sin(time * 0.35 + phase * 18.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (2.0 + phase * phase * 9.0) * (1.0 + response * 0.22);
}`;
export const dustFragment = `
uniform float response;
varying float warmth;
varying float glimmer;
void main() {
  float radius = length(gl_PointCoord - vec2(0.5));
  float alpha = (1.0 - smoothstep(0.04, 0.5, radius)) * (0.16 + warmth * 0.20) * glimmer;
  vec3 cream = vec3(0.95, 0.77, 0.55);
  vec3 lavender = vec3(0.76, 0.65, 0.85);
  vec3 spectral = vec3(0.31, 0.77, 0.62);
  vec3 color = mix(cream, lavender, warmth * 0.55);
  color = mix(color, spectral, response * step(0.94, warmth));
  gl_FragColor = vec4(color, alpha);
}`;
