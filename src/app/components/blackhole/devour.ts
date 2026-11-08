/**
 * Pulls page blocks into the black hole. Pure DOM transforms: nothing is
 * removed or reordered, so resetting restores the page exactly.
 */

export interface Morsel {
  element: HTMLElement;
  /** From the element's centre to the hole's centre, in px */
  dx: number;
  dy: number;
  /** When this element starts falling, as a fraction of total progress */
  start: number;
}

const FALL_SPAN = 0.5; // how much of the total progress one element takes to fall in
const SPIN_DEGREES = 540;
const CURL = 0.5; // how far a falling piece swings sideways, relative to its distance
const WARP = 0.16; // how far everything leans toward the hole before its own fall
const STRETCH = 2.6; // spaghettification: extra length along the pull at the end

/**
 * Collects the content blocks of every section on screen or just above it,
 * ordered so the ones closest to the hole fall in first.
 */
export function collectMorsels(hole: DOMRect): Morsel[] {
  const holeX = hole.left + hole.width / 2;
  const holeY = hole.top + hole.height / 2;
  const reach = window.innerHeight * 1.5;

  const candidates = Array.from(document.querySelectorAll<HTMLElement>("main .section > .shell > *")).filter((el) => {
    const rect = el.getBoundingClientRect();
    return rect.height > 0 && rect.bottom > -reach && rect.top < window.innerHeight;
  });

  const measured = candidates
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const dx = holeX - (rect.left + rect.width / 2);
      const dy = holeY - (rect.top + rect.height / 2);
      return { element, dx, dy, distance: Math.hypot(dx, dy) };
    })
    .sort((a, b) => a.distance - b.distance);

  const span = Math.max(measured.length - 1, 1);
  return measured.map(({ element, dx, dy }, i) => ({ element, dx, dy, start: (i / span) * (1 - FALL_SPAN) }));
}

/** Positions every morsel for overall progress `p` in [0, 1]. */
export function applyDevour(morsels: Morsel[], p: number) {
  if (p === 0) {
    morsels.forEach(({ element }) => clearMorsel(element));
    return;
  }
  // Everything leans in as soon as the hole starts feeding.
  const lean = WARP * Math.min(p * 3, 1);

  for (const { element, dx, dy, start } of morsels) {
    const local = Math.min(Math.max((p - start) / FALL_SPAN, 0), 1);
    // Accelerates as it falls, like something crossing into a steeper well.
    const e = local * local * (3 - 2 * local) * local;
    const pull = lean + (1 - lean) * e;

    // Swing out sideways mid-fall so the path curls into a spiral.
    const distance = Math.hypot(dx, dy) || 1;
    const curl = Math.sin(e * Math.PI) * distance * CURL;
    const x = dx * pull + (-dy / distance) * curl;
    const y = dy * pull + (dx / distance) * curl;

    // Stretch along the line to the hole and squeeze across it, then spin.
    const toward = (Math.atan2(dy, dx) * 180) / Math.PI;
    const along = 1 + lean * 0.5 + STRETCH * e;
    const across = Math.max(1 - 0.97 * e - lean * 0.15, 0.02);
    const shrink = 1 - 0.6 * e;

    element.style.transform =
      `translate(${x}px, ${y}px) rotate(${toward}deg) scale(${along * shrink}, ${across * shrink}) ` +
      `rotate(${-toward}deg) rotate(${e * SPIN_DEGREES}deg)`;
    element.style.opacity = String(1 - Math.pow(e, 1.3));
    element.style.filter = e > 0 ? `blur(${e * 5}px)` : "";
    element.style.pointerEvents = e > 0.3 ? "none" : "";
    element.style.willChange = "transform, opacity";
  }
}

export function clearMorsel(element: HTMLElement) {
  element.style.transform = "";
  element.style.opacity = "";
  element.style.filter = "";
  element.style.pointerEvents = "";
  element.style.willChange = "";
}

export function releaseAll(morsels: Morsel[]) {
  morsels.forEach(({ element }) => clearMorsel(element));
}
