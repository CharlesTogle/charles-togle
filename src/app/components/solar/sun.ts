import {
  AdditiveBlending,
  Group,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  type Texture,
} from "three";

const SUN_RADIUS = 1.1;

// A swollen, ageing star near the end of its life. The surface churns with
// slow convection cells, darkens to deep red at the limb, and the whole star
// breathes on an uneven rhythm, as if it can't quite hold itself together.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPos;

  void main() {
    vPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Limb darkening: the edge of the disc is cooler and redder.
    float mu = clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
    float limb = pow(mu, 0.55);

    // Slow convection: big cells drifting over finer granulation.
    vec3 p = vPos * 2.2;
    float cells = fbm(p + vec3(0.0, uTime * 0.05, uTime * 0.03));
    float grain = noise(p * 4.0 - uTime * 0.12);
    float surface = cells * 0.75 + grain * 0.25;

    vec3 edge = vec3(0.42, 0.06, 0.01);
    vec3 body = vec3(0.95, 0.36, 0.08);
    vec3 core = vec3(1.0, 0.72, 0.38);

    vec3 color = mix(edge, body, smoothstep(0.0, 0.55, limb));
    color = mix(color, core, smoothstep(0.55, 1.0, limb) * 0.8);
    // Dark lanes between cells, hot spots inside them.
    color *= 0.72 + surface * 0.55;
    color *= uPulse;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function createSun(glow: Texture) {
  const group = new Group();

  const material = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPulse: { value: 1 } },
    vertexShader,
    fragmentShader,
  });
  const surface = new Mesh(new SphereGeometry(SUN_RADIUS, 64, 64), material);
  // A slight axial tilt so the spin doesn't look like a flat scroll.
  // Spin about the sun's own axis first, then tilt, so the pole doesn't wobble.
  surface.rotation.order = "ZYX";
  surface.rotation.z = 0.2;
  group.add(surface);

  const corona = new Sprite(new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false }));
  corona.scale.setScalar(7);
  group.add(corona);

  const haze = new Sprite(new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false, opacity: 0.3 }));
  haze.scale.setScalar(16);
  group.add(haze);

  return {
    group,
    /** time in seconds; hold it still (reduced motion) and the star holds still */
    update(time: number) {
      // Two out-of-step swells, so the rhythm never quite repeats.
      const swell = Math.sin(time * 0.7) * 0.6 + Math.sin(time * 1.9 + 1.3) * 0.4;
      material.uniforms.uTime.value = time;
      material.uniforms.uPulse.value = 1 + swell * 0.07;
      surface.scale.setScalar(1 + swell * 0.025);
      // A slow turn (about 80s per rotation) carries the surface cells across the disc.
      surface.rotation.y = time * 0.08;
      corona.scale.setScalar(7 + swell * 0.6);
      corona.material.opacity = 0.9 + swell * 0.1;
      haze.material.opacity = 0.3 + swell * 0.06;
    },
  };
}
