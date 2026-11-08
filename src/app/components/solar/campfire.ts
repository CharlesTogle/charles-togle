import {
  AdditiveBlending,
  BoxGeometry,
  BufferGeometry,
  ConeGeometry,
  BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  MeshStandardMaterial,
  PointLight,
  Points,
  PointsMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
  type Texture,
} from "three";

const UP = new Vector3(0, 1, 0);
const SPARK_COUNT = 14;
const SMOKE_PUFFS = 9;

export interface Campfire {
  group: Group;
  /** Advances flicker and sparks; `time` is seconds of real time */
  animate: (time: number) => void;
}

/**
 * A small campfire standing on a planet's surface: crossed logs, layered
 * flame cones, a warm glow, a little orange light on the ground and sparks
 * that drift up and reset. Sized relative to the planet radius.
 */
export function createCampfire(planetRadius: number, glow: Texture): Campfire {
  const size = planetRadius * 0.22;
  const group = new Group();

  // Stand on the surface, upright along the surface normal.
  const normal = new Vector3(0.45, 0.8, 0.4).normalize();
  group.position.copy(normal).multiplyScalar(planetRadius * 0.93);
  group.quaternion.setFromUnitVectors(UP, normal);

  const logMaterial = new MeshStandardMaterial({ color: "#4a2c17", roughness: 1, flatShading: true });
  for (const angle of [0, Math.PI / 3, -Math.PI / 3]) {
    const log = new Mesh(new BoxGeometry(size * 1.5, size * 0.22, size * 0.22), logMaterial);
    log.rotation.y = angle;
    log.position.y = size * 0.1;
    group.add(log);
  }

  const flames = [
    { color: "#ff5a1f", height: 1.6, width: 0.55 },
    { color: "#ffa62b", height: 1.15, width: 0.4 },
    { color: "#ffe39a", height: 0.7, width: 0.24 },
  ].map(({ color, height, width }) => {
    const flame = new Mesh(
      new ConeGeometry(size * width, size * height, 7),
      new MeshBasicMaterial({ color, transparent: true, opacity: 0.92, blending: AdditiveBlending, depthWrite: false }),
    );
    flame.position.y = size * (0.2 + height / 2);
    group.add(flame);
    return { flame, baseY: flame.position.y, height };
  });

  const warmth = new Sprite(
    new SpriteMaterial({ map: glow, color: "#ff8a3d", blending: AdditiveBlending, depthWrite: false, opacity: 0.9 }),
  );
  warmth.position.y = size * 0.8;
  warmth.scale.setScalar(size * 9);
  group.add(warmth);

  const light = new PointLight("#ff8a3d", 1.4, planetRadius * 2.4, 2);
  light.position.y = size * 1.2;
  group.add(light);

  const sparkPositions = new Float32Array(SPARK_COUNT * 3);
  const sparkSeeds = Array.from({ length: SPARK_COUNT }, () => ({
    phase: Math.random(),
    speed: 0.35 + Math.random() * 0.4,
    drift: (Math.random() - 0.5) * 2,
    angle: Math.random() * Math.PI * 2,
  }));
  const sparkGeometry = new BufferGeometry();
  sparkGeometry.setAttribute("position", new BufferAttribute(sparkPositions, 3));
  const sparks = new Points(
    sparkGeometry,
    new PointsMaterial({ color: "#ffc46b", size: size * 0.18, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }),
  );
  group.add(sparks);

  // Smoke: soft grey puffs that rise above the flames, swell, drift with a
  // slow curl and fade out, staggered so the column never empties.
  const smoke = Array.from({ length: SMOKE_PUFFS }, (_, i) => {
    const puff = new Sprite(
      new SpriteMaterial({ map: glow, color: "#b5b5b5", blending: NormalBlending, transparent: true, depthWrite: false, opacity: 0 }),
    );
    group.add(puff);
    return { puff, offset: i / SMOKE_PUFFS, swirl: Math.random() * Math.PI * 2 };
  });

  function animate(time: number) {
    // Layered sines read as flicker without per-frame randomness.
    flames.forEach(({ flame, baseY, height }, i) => {
      const f = 1 + Math.sin(time * (9 + i * 3.1)) * 0.12 + Math.sin(time * (23 + i * 5.7)) * 0.06;
      flame.scale.set(1 / Math.sqrt(f), f, 1 / Math.sqrt(f));
      flame.position.y = baseY + (f - 1) * size * height * 0.5;
      flame.rotation.y = time * (0.8 + i * 0.4);
    });
    const pulse = 1 + Math.sin(time * 11) * 0.08 + Math.sin(time * 27) * 0.05;
    light.intensity = 1.4 * pulse;
    warmth.material.opacity = 0.75 + (pulse - 1) * 1.5;

    sparkSeeds.forEach((seed, i) => {
      const life = (seed.phase + time * seed.speed) % 1;
      const rise = life * size * 4;
      const sway = Math.sin(time * 2 + seed.angle) * size * 0.3 * life;
      sparkPositions[i * 3] = Math.cos(seed.angle) * (size * 0.2 + sway) + seed.drift * size * 0.4 * life;
      sparkPositions[i * 3 + 1] = size * 0.5 + rise;
      sparkPositions[i * 3 + 2] = Math.sin(seed.angle) * (size * 0.2 + sway);
    });
    sparkGeometry.attributes.position.needsUpdate = true;

    for (const { puff, offset, swirl } of smoke) {
      const life = (offset + time * 0.16) % 1;
      const fadeIn = Math.min(life / 0.15, 1);
      puff.material.opacity = 0.5 * fadeIn * (1 - life) ** 1.5;
      puff.position.set(
        Math.sin(time * 0.7 + swirl) * size * 0.6 * life + size * 1.4 * life * life,
        size * 1.6 + life * size * 9,
        Math.cos(time * 0.5 + swirl) * size * 0.6 * life,
      );
      puff.scale.setScalar(size * (1.4 + life * 5.5));
      puff.material.rotation = swirl + time * 0.2;
    }
  }

  animate(0);
  return { group, animate };
}
