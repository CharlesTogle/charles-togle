import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  Vector3,
  type Texture,
} from "three";

// The infrared tone shared with the page-wide line in globals.css (--petrova).
export const PETROVA = new Color("#ff5a36");

const PARTICLES = 90;
const LINE_SEGMENTS = 40;

export interface PetrovaLine {
  group: Group;
  /** `to` is the target in the same space as the group; `time` is real seconds */
  update: (to: Vector3, time: number) => void;
}

/**
 * A faint stream of infrared particles flowing from the sun (the group's
 * origin) to a target planet, along a curve that arcs gently above the
 * orbital plane. A dim guide line traces the same curve.
 */
export function createPetrovaLine(glow: Texture): PetrovaLine {
  const group = new Group();
  const curve = new QuadraticBezierCurve3(new Vector3(), new Vector3(), new Vector3());

  const guidePositions = new Float32Array((LINE_SEGMENTS + 1) * 3);
  // BufferAttribute keeps a reference to the array (Float32BufferAttribute
  // would copy it), so writing into these arrays each frame updates the GPU data.
  const guideGeometry = new BufferGeometry();
  guideGeometry.setAttribute("position", new BufferAttribute(guidePositions, 3));
  const guide = new Line(
    guideGeometry,
    new LineBasicMaterial({ color: PETROVA, transparent: true, opacity: 0.6, blending: AdditiveBlending, depthWrite: false }),
  );
  group.add(guide);

  const positions = new Float32Array(PARTICLES * 3);
  const colors = new Float32Array(PARTICLES * 3);
  const seeds = Array.from({ length: PARTICLES }, () => ({
    offset: Math.random(),
    speed: 0.12 + Math.random() * 0.1,
    spread: (Math.random() - 0.5) * 2,
    lift: (Math.random() - 0.5) * 2,
  }));
  const particleGeometry = new BufferGeometry();
  particleGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new BufferAttribute(colors, 3));
  const particles = new Points(
    particleGeometry,
    new PointsMaterial({
      map: glow,
      size: 0.38,
      vertexColors: true,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(particles);

  const point = new Vector3();
  const tangent = new Vector3();
  const side = new Vector3();
  const up = new Vector3(0, 1, 0);
  const shade = new Color();

  function update(to: Vector3, time: number) {
    // Start at the sun's surface and arc up a little, scaled to the distance.
    const length = to.length();
    curve.v0.copy(to).setLength(1.15);
    curve.v2.copy(to);
    curve.v1.copy(to).multiplyScalar(0.5).setY(length * 0.12);

    for (let i = 0; i <= LINE_SEGMENTS; i++) {
      curve.getPoint(i / LINE_SEGMENTS, point);
      guidePositions.set([point.x, point.y, point.z], i * 3);
    }
    guideGeometry.attributes.position.needsUpdate = true;

    seeds.forEach((seed, i) => {
      const t = (seed.offset + time * seed.speed) % 1;
      curve.getPoint(t, point);
      curve.getTangent(t, tangent);
      side.crossVectors(tangent, up).normalize();
      // The stream is widest mid-flight and pinches at both ends.
      const width = Math.sin(t * Math.PI) * 0.12;
      point.addScaledVector(side, seed.spread * width).addScaledVector(up, seed.lift * width * 0.6);
      positions.set([point.x, point.y, point.z], i * 3);
      // Fade in leaving the sun, fade out arriving at the planet.
      shade.copy(PETROVA).multiplyScalar(Math.min(t * 6, 1) * Math.min((1 - t) * 4, 1));
      colors.set([shade.r, shade.g, shade.b], i * 3);
    });
    particleGeometry.attributes.position.needsUpdate = true;
    particleGeometry.attributes.color.needsUpdate = true;
  }

  return { group, update };
}
