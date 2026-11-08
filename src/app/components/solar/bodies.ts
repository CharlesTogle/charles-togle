import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  Color,
  DoubleSide,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Points,
  PointsMaterial,
  RingGeometry,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  type Texture,
} from "three";
import type { Planet } from "../../data/planets";
import { createCampfire } from "./campfire";

export const SIGNAL = new Color("#3dff6e");
const ORBIT_GREY = new Color("#2e2e2e");
const TRAIL_LENGTH = 0.9; // radians of orbit lit up behind each planet
const TRAIL_POINTS = 48;

export function createSun(glow: Texture) {
  const sun = new Group();
  sun.add(new Mesh(new SphereGeometry(1.1, 48, 48), new MeshBasicMaterial({ color: "#ffffff" })));

  const corona = new Sprite(new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false }));
  corona.scale.setScalar(7);
  sun.add(corona);

  const haze = new Sprite(
    new SpriteMaterial({ map: glow, blending: AdditiveBlending, depthWrite: false, opacity: 0.22 }),
  );
  haze.scale.setScalar(16);
  sun.add(haze);
  return sun;
}

export function createStars(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Uniform points on a thick shell around the system
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const r = 60 + Math.random() * 60;
    const s = Math.sqrt(1 - u * u);
    positions.set([r * s * Math.cos(theta), r * u, r * s * Math.sin(theta)], i * 3);
    const level = 0.35 + Math.random() * 0.65;
    colors.set([level, level, level], i * 3);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return new Points(geometry, new PointsMaterial({ size: 0.22, vertexColors: true, sizeAttenuation: true }));
}

export function createOrbit(radius: number) {
  const points: number[] = [];
  for (let i = 0; i < 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    points.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
  return new LineLoop(geometry, new LineBasicMaterial({ color: ORBIT_GREY }));
}

// An arc of the orbit ending at angle 0 that fades from black to green.
// The scene rotates it to follow the planet, so the geometry never changes.
function createTrail(radius: number) {
  const positions: number[] = [];
  const colors: number[] = [];
  for (let i = 0; i <= TRAIL_POINTS; i++) {
    const t = i / TRAIL_POINTS;
    const a = -TRAIL_LENGTH * (1 - t);
    positions.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
    const c = new Color(0, 0, 0).lerp(SIGNAL, t * t);
    colors.push(c.r, c.g, c.b);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return new Line(geometry, new LineBasicMaterial({ vertexColors: true }));
}

export interface PlanetBody {
  planet: Planet;
  /** Moves along the orbit; everything attached to the planet hangs off this */
  anchor: Group;
  body: Mesh;
  /** Invisible, larger sphere so small planets are easy to hit */
  hitTarget: Mesh;
  halo: Sprite;
  trail: Line;
  /** Child objects that spin or orbit the planet (moon, satellite, shell) */
  companions: { object: Object3D; speed: number; distance: number }[];
  /** Per-frame effects such as the campfire flicker; `time` is real seconds */
  animators: ((time: number) => void)[];
}

// Paints each triangle of a flat-shaded icosphere with a colour between the
// planet's two tones, banded by latitude with a little per-face jitter, so the
// low-poly facets read as terrain instead of a flat fill.
function createPaintedSurface(planet: Planet) {
  const geometry = new IcosahedronGeometry(planet.radius, 2);
  const position = geometry.attributes.position;
  const [base, accent] = planet.palette.map((hex) => new Color(hex));
  const colors = new Float32Array(position.count * 3);
  const face = new Color();
  // A deterministic hash keeps the pattern identical on every load.
  const hash = (n: number) => {
    const x = Math.sin(n * 127.1 + planet.orbit * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let i = 0; i < position.count; i += 3) {
    const y = (position.getY(i) + position.getY(i + 1) + position.getY(i + 2)) / 3 / planet.radius;
    const band = 0.5 + 0.5 * Math.sin(y * 7 + planet.phase * 3);
    const t = Math.min(1, Math.max(0, band * 0.75 + hash(i) * 0.35 - 0.05));
    face.copy(base).lerp(accent, t);
    for (let v = 0; v < 3; v++) colors.set([face.r, face.g, face.b], (i + v) * 3);
  }
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return geometry;
}

export function createPlanet(planet: Planet, glow: Texture): PlanetBody {
  const anchor = new Group();

  const body = new Mesh(
    createPaintedSurface(planet),
    new MeshStandardMaterial({ vertexColors: true, roughness: planet.roughness, metalness: 0, flatShading: true }),
  );
  body.rotation.z = planet.tilt;
  anchor.add(body);

  const hitTarget = new Mesh(
    new SphereGeometry(Math.max(planet.radius * 1.8, 0.75), 12, 12),
    new MeshBasicMaterial({ visible: false }),
  );
  hitTarget.userData.planetId = planet.id;
  anchor.add(hitTarget);

  const halo = new Sprite(
    new SpriteMaterial({ map: glow, color: SIGNAL, blending: AdditiveBlending, depthWrite: false, opacity: 0 }),
  );
  halo.scale.setScalar(planet.radius * 6);
  anchor.add(halo);

  const companions: PlanetBody["companions"] = [];
  addFeature(planet, anchor, companions);

  const animators: PlanetBody["animators"] = [];
  if (planet.campfire) {
    // Parented to the body so the fire turns with the planet into the night side.
    const campfire = createCampfire(planet.radius, glow);
    body.add(campfire.group);
    animators.push(campfire.animate);
  }

  return { planet, anchor, body, hitTarget, halo, trail: createTrail(planet.orbit), companions, animators };
}

function addFeature(planet: Planet, anchor: Group, companions: PlanetBody["companions"]) {
  const r = planet.radius;
  switch (planet.feature) {
    case "ring": {
      const ring = new Mesh(
        new RingGeometry(r * 1.45, r * 2.2, 72),
        new MeshStandardMaterial({ color: planet.palette[1], side: DoubleSide, roughness: 1, transparent: true, opacity: 0.75 }),
      );
      ring.rotation.x = -Math.PI / 2 + 0.35;
      ring.rotation.y = 0.2;
      anchor.add(ring);
      break;
    }
    case "moon": {
      const moon = new Mesh(
        new IcosahedronGeometry(r * 0.26, 1),
        new MeshStandardMaterial({ color: "#8a8a8a", roughness: 1, flatShading: true }),
      );
      anchor.add(moon);
      companions.push({ object: moon, speed: 0.9, distance: r * 2.1 });
      break;
    }
    case "satellite": {
      // A tiny green-lit probe circling the planet: the sync engine
      const satellite = new Mesh(new BoxGeometry(0.09, 0.09, 0.09), new MeshBasicMaterial({ color: SIGNAL }));
      anchor.add(satellite);
      companions.push({ object: satellite, speed: 1.6, distance: r * 1.9 });
      break;
    }
    case "shell": {
      // A wireframe cage around the planet: the firewall
      const shell = new LineSegments(
        new EdgesGeometry(new IcosahedronGeometry(r * 1.7, 1)),
        new LineBasicMaterial({ color: "#5c5c5c" }),
      );
      anchor.add(shell);
      companions.push({ object: shell, speed: 0.25, distance: 0 });
      break;
    }
    case "none":
      break;
  }
}
