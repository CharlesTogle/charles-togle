import {
  AmbientLight,
  Group,
  MathUtils,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Object3D,
} from "three";
import type { Planet } from "../../data/planets";
import { createOrbit, createPlanet, createStars, createSun, type PlanetBody } from "./bodies";
import { createNewbornHole, NEWBORN_ID } from "./newbornHole";
import { createPetrovaLine } from "./petrova";
import { createGlowTexture } from "./textures";

export interface SolarSceneOptions {
  planets: Planet[];
  reducedMotion: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  /** Clicking the newborn black hole */
  onBlackHole: () => void;
}

export interface SolarSceneController {
  select: (id: string | null) => void;
  highlight: (id: string | null) => void;
  setVisited: (ids: string[]) => void;
  dispose: () => void;
}

interface Drag {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  moved: boolean;
}

interface Flight {
  fromPos: Vector3;
  fromLook: Vector3;
  toPos: Vector3;
  toLook: Vector3;
  start: number;
  duration: number;
}

const UP = new Vector3(0, 1, 0);
const DRAG_RADIANS_PER_PX = 0.012;
const DRAG_THRESHOLD_PX = 4;
const SPIN_DAMPING = 2.2; // how quickly a flung planet slows down
const VERTICAL_FOV = 40;
const CAMERA_PITCH = 0.42; // radians above the orbital plane
const INTRO_MS = 2600;
const BIRTH_DELAY_MS = 2800; // the star collapses once the intro glide has settled
const BIRTH_MS = 4800;
const FLIGHT_MS = 1300;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Builds the solar system on the given canvas and runs its render loop.
 * Returns null when WebGL is unavailable so the caller can fall back to HTML.
 */
export function createSolarScene(canvas: HTMLCanvasElement, options: SolarSceneOptions): SolarSceneController | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 1);

  const { reducedMotion } = options;
  const scene = new Scene();
  const camera = new PerspectiveCamera(VERTICAL_FOV, 1, 0.1, 400);
  const glow = createGlowTexture("255, 255, 255");

  const system = new Group();
  scene.add(system);
  scene.add(createStars(1800));
  scene.add(new AmbientLight(0xffffff, 0.07));
  system.add(createSun(glow));
  system.add(new PointLight(0xffffff, 3.2, 0, 0));

  const bodies: PlanetBody[] = options.planets.map((planet) => createPlanet(planet, glow));
  for (const b of bodies) {
    system.add(createOrbit(b.planet.orbit), b.trail, b.anchor);
  }
  // A black hole being born out past the outer orbit, up and behind the sun.
  const newborn = createNewbornHole(glow);
  newborn.group.position.set(-9, 1.4, -8);
  system.add(newborn.group);
  const bornAt = performance.now() + (reducedMotion ? -BIRTH_MS : BIRTH_DELAY_MS);

  const hitTargets = [...bodies.map((b) => b.hitTarget), newborn.hitTarget];

  // The Petrova line rests on the second planet out, as it runs to Venus in
  // the book, and swings to whichever planet the visitor is looking at.
  const petrova = createPetrovaLine(glow);
  system.add(petrova.group);
  const restingTarget = bodies[Math.min(1, bodies.length - 1)];
  const petrovaTarget = new Vector3();
  let petrovaPlaced = false;

  // --- State ---------------------------------------------------------------
  const timer = new Timer();
  let orbitTime = 0;
  let realTime = 0;
  let selectedId: string | null = null;
  let hoveredId: string | null = null;
  let highlightedId: string | null = null;
  let visited = new Set<string>();
  const pointer = new Vector2(0, 0);
  const parallax = new Vector2(0, 0);
  let wide = true;

  const homePos = new Vector3();
  const homeLook = new Vector3();
  const camPos = new Vector3();
  const camLook = new Vector3();
  let flight: Flight | null = null;

  // Rolling: drag a planet to turn it; on release it keeps its angular
  // velocity (world space, rad/s) and slows down.
  let drag: Drag | null = null;
  let suppressClick = false;
  const spin = new Map<string, Vector3>();
  const camRight = new Vector3();
  const camUp = new Vector3();

  // --- Layout ----------------------------------------------------------------
  function computeHome() {
    const aspect = camera.aspect;
    wide = aspect > 1.1;
    // On wide screens the system sits right of centre, leaving room for the headline.
    system.position.set(wide ? 3.4 : 0, 0, 0);
    const halfHorizontal = Math.atan(Math.tan(MathUtils.degToRad(VERTICAL_FOV / 2)) * aspect);
    const fit = (10.6 / Math.tan(halfHorizontal)) * 0.9;
    const distance = MathUtils.clamp(fit, 15, 26);
    homePos.set(0, distance * Math.sin(CAMERA_PITCH), distance * Math.cos(CAMERA_PITCH));
    homeLook.set(0, wide ? -0.4 : 1.2, 0);
  }

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const { clientWidth: w, clientHeight: h } = parent;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    computeHome();
    if (!selectedId && !flight) {
      camPos.copy(homePos);
      camLook.copy(homeLook);
    }
  }

  // --- Camera flights --------------------------------------------------------
  function startFlight(toPos: Vector3, toLook: Vector3, duration: number) {
    flight = {
      fromPos: camPos.clone(),
      fromLook: camLook.clone(),
      toPos: toPos.clone(),
      toLook: toLook.clone(),
      start: performance.now(),
      duration: reducedMotion ? 0 : duration,
    };
  }

  function viewOfPlanet(body: PlanetBody) {
    const r = body.planet.radius;
    const planetPos = body.anchor.getWorldPosition(new Vector3());
    const sunPos = system.getWorldPosition(new Vector3());
    const outward = planetPos.clone().sub(sunPos).setY(0).normalize();
    const along = new Vector3().crossVectors(UP, outward);
    // Approach from the sunward side, off to one flank, so the planet is seen
    // three-quarter lit with its terminator showing rather than as a silhouette.
    const approach = outward.clone().multiplyScalar(-0.55).addScaledVector(along, 0.85).normalize();
    const pos = planetPos
      .clone()
      .addScaledVector(approach, r * 6 + 1.6)
      .addScaledVector(UP, r * 1.4 + 0.4);
    // Nudge the look target so the planet clears the info panel:
    // the panel is on the right on wide screens and at the bottom on phones.
    const towardPlanet = planetPos.clone().sub(pos).normalize();
    const screenRight = new Vector3().crossVectors(towardPlanet, UP).normalize();
    const look = wide
      ? planetPos.clone().addScaledVector(screenRight, r * 2.2 + 0.4)
      : planetPos.clone().addScaledVector(UP, -r * 0.25);
    return { pos, look };
  }

  // --- Picking -----------------------------------------------------------------
  const raycaster = new Raycaster();
  const ndc = new Vector2();

  function pick(clientX: number, clientY: number): string | null {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(hitTargets, false)[0];
    return (hit?.object.userData.planetId as string | undefined) ?? null;
  }

  function roll(id: string, dx: number, dy: number) {
    const body = bodies.find((b) => b.planet.id === id);
    if (!body) return null;
    camRight.setFromMatrixColumn(camera.matrixWorld, 0);
    camUp.setFromMatrixColumn(camera.matrixWorld, 1);
    // Horizontal drag turns around the camera's up axis, vertical around its
    // right axis, so the surface follows the cursor.
    const rotation = camUp.multiplyScalar(dx * DRAG_RADIANS_PER_PX).addScaledVector(camRight, dy * DRAG_RADIANS_PER_PX);
    const angle = rotation.length();
    if (angle > 0) body.body.rotateOnWorldAxis(rotation.clone().normalize(), angle);
    return rotation;
  }

  function onPointerDown(event: PointerEvent) {
    suppressClick = false;
    // On touch screens a swipe should scroll the page until a planet is landed on.
    if (event.pointerType === "touch" && !selectedId) return;
    const hit = pick(event.clientX, event.clientY);
    const target = (hit === NEWBORN_ID ? null : hit) ?? selectedId;
    if (!target) return;
    drag = {
      id: target,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
      moved: false,
    };
    spin.set(target, new Vector3());
  }

  function onPointerUp(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (drag.moved) {
      suppressClick = true;
      if (reducedMotion) spin.set(drag.id, new Vector3());
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    }
    drag = null;
    canvas.style.cursor = hoveredId ? "pointer" : "";
  }

  function onPointerMove(event: PointerEvent) {
    if (drag && event.pointerId === drag.pointerId) {
      const now = performance.now();
      if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > DRAG_THRESHOLD_PX) {
        drag.moved = true;
        canvas.setPointerCapture(event.pointerId);
        canvas.style.cursor = "grabbing";
      }
      if (drag.moved) {
        const rotation = roll(drag.id, event.clientX - drag.lastX, event.clientY - drag.lastY);
        const elapsed = Math.max((now - drag.lastTime) / 1000, 1 / 120);
        if (rotation) spin.set(drag.id, rotation.divideScalar(elapsed));
      }
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      if (drag.moved) return;
    }

    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    if (event.pointerType !== "mouse") return;
    const hit = pick(event.clientX, event.clientY);
    const id = hit === NEWBORN_ID ? null : hit;
    canvas.style.cursor = hit ? "pointer" : "";
    if (id !== hoveredId) {
      hoveredId = id;
      options.onHover(id);
    }
  }

  function onPointerLeave() {
    pointer.set(0, 0);
    if (hoveredId) {
      hoveredId = null;
      canvas.style.cursor = "";
      options.onHover(null);
    }
  }

  function onClick(event: MouseEvent) {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    const id = pick(event.clientX, event.clientY);
    if (id === NEWBORN_ID) options.onBlackHole();
    else if (id) options.onSelect(id);
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerUp);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("click", onClick);

  // --- Frame -------------------------------------------------------------------
  function updateBodies(dt: number) {
    for (const b of bodies) {
      const angle = b.planet.phase + b.planet.speed * orbitTime;
      b.anchor.position.set(Math.cos(angle) * b.planet.orbit, 0, Math.sin(angle) * b.planet.orbit);
      b.trail.rotation.y = -angle;
      if (!reducedMotion) b.body.rotateOnAxis(UP, dt * 0.18);
      const velocity = spin.get(b.planet.id);
      if (velocity && drag?.id !== b.planet.id) {
        const angle = velocity.length() * dt;
        if (angle > 1e-5) b.body.rotateOnWorldAxis(velocity.clone().normalize(), angle);
        velocity.multiplyScalar(Math.exp(-SPIN_DAMPING * dt));
      }

      for (const c of b.companions) {
        const a = realTime * c.speed;
        if (c.distance === 0) {
          c.object.rotation.set(a * 0.6, a, 0);
        } else {
          c.object.position.set(Math.cos(a) * c.distance, Math.sin(a) * c.distance * 0.25, Math.sin(a) * c.distance);
        }
      }

      for (const animate of b.animators) animate(realTime);

      const id = b.planet.id;
      const lit = id === selectedId || id === hoveredId || id === highlightedId;
      const target = lit ? 0.95 : visited.has(id) ? 0.35 : 0;
      b.halo.material.opacity = MathUtils.damp(b.halo.material.opacity, target, 8, dt);
    }
  }

  function updatePetrova(dt: number) {
    const focusId = selectedId ?? hoveredId ?? highlightedId;
    const focus = bodies.find((b) => b.planet.id === focusId) ?? restingTarget;
    if (!focus) return;
    if (!petrovaPlaced || reducedMotion) {
      petrovaTarget.copy(focus.anchor.position);
      petrovaPlaced = true;
    } else {
      const k = 1 - Math.exp(-4 * dt);
      petrovaTarget.lerp(focus.anchor.position, k);
    }
    petrova.update(petrovaTarget, realTime);
  }

  function updateCamera(now: number, dt: number) {
    if (flight) {
      const t = flight.duration === 0 ? 1 : Math.min((now - flight.start) / flight.duration, 1);
      const e = easeInOutCubic(t);
      camPos.lerpVectors(flight.fromPos, flight.toPos, e);
      camLook.lerpVectors(flight.fromLook, flight.toLook, e);
      if (t >= 1) flight = null;
    } else if (!selectedId) {
      // Drift gently with the cursor while idle at home
      if (!reducedMotion && !drag?.moved) {
        parallax.x = MathUtils.damp(parallax.x, pointer.x, 2.5, dt);
        parallax.y = MathUtils.damp(parallax.y, pointer.y, 2.5, dt);
      }
      camPos.copy(homePos).add(new Vector3(parallax.x * 1.1, -parallax.y * 0.7, 0));
      camLook.copy(homeLook);
    }
    camera.position.copy(camPos);
    camera.lookAt(camLook);
  }

  let frame = 0;
  let running = false;

  function tick() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const now = performance.now();
    if (!reducedMotion) {
      realTime += dt;
      if (!selectedId) orbitTime += dt;
    }
    updateBodies(dt);
    updatePetrova(dt);
    newborn.update(realTime, MathUtils.clamp((now - bornAt) / BIRTH_MS, 0, 1));
    updateCamera(now, dt);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  }

  function setRunning(next: boolean) {
    if (next === running) return;
    running = next;
    if (running) {
      // Skip the time spent paused so nothing jumps on resume.
      timer.reset();
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
    }
  }

  // Only render while the hero is on screen and the tab is visible.
  let onScreen = true;
  const syncRunning = () => setRunning(onScreen && document.visibilityState === "visible");
  const intersection = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    syncRunning();
  });
  intersection.observe(canvas);
  document.addEventListener("visibilitychange", syncRunning);

  const resizeObserver = new ResizeObserver(resize);
  if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
  resize();

  // The one orchestrated moment: glide in from deep space on load.
  updateBodies(0);
  updatePetrova(0);
  newborn.update(0, reducedMotion ? 1 : 0);
  if (!reducedMotion) {
    camPos.copy(homePos).multiplyScalar(2.6).add(new Vector3(-6, 10, 0));
    camLook.copy(homeLook);
    startFlight(homePos, homeLook, INTRO_MS);
  }
  syncRunning();

  return {
    select(id) {
      if (id === selectedId) return;
      selectedId = id;
      const body = bodies.find((b) => b.planet.id === id);
      if (body) {
        const view = viewOfPlanet(body);
        startFlight(view.pos, view.look, FLIGHT_MS);
      } else {
        selectedId = null;
        startFlight(homePos, homeLook, FLIGHT_MS);
      }
    },
    highlight(id) {
      highlightedId = id;
    },
    setVisited(ids) {
      visited = new Set(ids);
    },
    dispose() {
      setRunning(false);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", syncRunning);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
      scene.traverse((object: Object3D) => {
        const disposable = object as Object3D & {
          geometry?: { dispose: () => void };
          material?: { dispose: () => void } | { dispose: () => void }[];
        };
        disposable.geometry?.dispose();
        const material = disposable.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else material?.dispose();
      });
      timer.dispose();
      newborn.dispose();
      glow.dispose();
      renderer.dispose();
    },
  };
}
