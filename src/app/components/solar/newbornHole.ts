import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  RingGeometry,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  type Texture,
} from "three";
import { PETROVA } from "./petrova";
import { createDiskTexture, createRingTexture } from "./textures";

const HORIZON = 0.42;
const DISK_TILT = -Math.PI / 2 + 0.38;
const INFALL = 150;
const WHITE_HOT = new Color("#fff1ea");

/** Marks the hit target so the scene can tell it apart from planets. */
export const NEWBORN_ID = "__newborn-black-hole__";

export interface NewbornHole {
  group: Group;
  hitTarget: Mesh;
  /** `time` is real seconds; `birth` runs 0 → 1 through the collapse */
  update: (time: number, birth: number) => void;
  dispose: () => void;
}

const smooth = (edge0: number, edge1: number, x: number) => {
  const t = MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * A star that brightens, collapses in a flash and leaves a black hole behind:
 * horizon, photon ring, an accretion disk that builds up, and matter
 * spiralling in to feed it.
 */
export function createNewbornHole(glow: Texture): NewbornHole {
  const group = new Group();
  const ringTexture = createRingTexture();
  const diskTexture = createDiskTexture();

  const star = new Sprite(new SpriteMaterial({ map: glow, color: "#ffd2b0", blending: AdditiveBlending, depthWrite: false }));
  group.add(star);

  const flash = new Sprite(new SpriteMaterial({ map: glow, color: "#ffffff", blending: AdditiveBlending, depthWrite: false, opacity: 0 }));
  group.add(flash);

  const horizon = new Mesh(new SphereGeometry(HORIZON, 32, 32), new MeshBasicMaterial({ color: "#000000" }));
  group.add(horizon);

  const photonRing = new Sprite(
    new SpriteMaterial({ map: ringTexture, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }),
  );
  group.add(photonRing);

  const disk = new Mesh(
    new RingGeometry(HORIZON * 1.3, HORIZON * 4.2, 96, 1),
    new MeshBasicMaterial({
      map: diskTexture,
      transparent: true,
      opacity: 0,
      side: DoubleSide,
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  disk.rotation.x = DISK_TILT;
  group.add(disk);

  // Infalling matter lives in the disk's plane.
  const infallPlane = new Group();
  infallPlane.rotation.x = DISK_TILT + Math.PI / 2;
  group.add(infallPlane);
  const positions = new Float32Array(INFALL * 3);
  const colors = new Float32Array(INFALL * 3);
  const seeds = Array.from({ length: INFALL }, () => ({
    offset: Math.random(),
    speed: 0.08 + Math.random() * 0.08,
    angle: Math.random() * Math.PI * 2,
    lift: (Math.random() - 0.5) * 0.08,
  }));
  const infallGeometry = new BufferGeometry();
  infallGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  infallGeometry.setAttribute("color", new BufferAttribute(colors, 3));
  const infallMaterial = new PointsMaterial({
    map: glow,
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  infallPlane.add(new Points(infallGeometry, infallMaterial));

  const hitTarget = new Mesh(new SphereGeometry(HORIZON * 3.2, 12, 12), new MeshBasicMaterial({ visible: false }));
  hitTarget.userData.planetId = NEWBORN_ID;
  group.add(hitTarget);

  const shade = new Color();

  function update(time: number, birth: number) {
    // 1. The progenitor star swells and flickers, then collapses.
    const swell = smooth(0, 0.42, birth);
    const collapse = smooth(0.42, 0.52, birth);
    const flicker = 1 + Math.sin(time * 23) * 0.06 * (1 - collapse);
    star.scale.setScalar((0.6 + swell * 1.6) * (1 - collapse) * flicker + 0.001);
    star.material.opacity = 1 - collapse;

    // 2. A flash at the moment of collapse.
    const burst = smooth(0.46, 0.58, birth) * (1 - smooth(0.58, 0.8, birth));
    flash.scale.setScalar(0.5 + smooth(0.46, 0.7, birth) * 9);
    flash.material.opacity = burst;

    // 3. The black hole forms and its disk builds up.
    const form = smooth(0.5, 0.75, birth);
    const feed = smooth(0.6, 1, birth);
    horizon.scale.setScalar(form + 0.001);
    photonRing.scale.setScalar(HORIZON * 3.3 * (0.6 + form * 0.4));
    photonRing.material.opacity = form;
    disk.scale.setScalar(0.3 + feed * 0.7);
    (disk.material as MeshBasicMaterial).opacity = feed * 0.95;
    disk.rotation.z = -time * 0.5;
    infallMaterial.opacity = feed;

    seeds.forEach((seed, i) => {
      const t = (seed.offset + time * seed.speed) % 1;
      const r = HORIZON * 1.15 + HORIZON * 6 * Math.pow(1 - t, 1.4);
      // Orbits faster as it gets closer
      const a = seed.angle + t * Math.PI * 5;
      positions.set([Math.cos(a) * r, seed.lift * (1 - t), Math.sin(a) * r], i * 3);
      const fade = Math.min(t * 5, 1) * Math.min((1 - t) * 8, 1);
      shade.copy(PETROVA).lerp(WHITE_HOT, t * t).multiplyScalar(fade);
      colors.set([shade.r, shade.g, shade.b], i * 3);
    });
    infallGeometry.attributes.position.needsUpdate = true;
    infallGeometry.attributes.color.needsUpdate = true;
  }

  return {
    group,
    hitTarget,
    update,
    dispose() {
      ringTexture.dispose();
      diskTexture.dispose();
    },
  };
}
