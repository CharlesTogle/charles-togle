/**
 * A spacetime grid drawn over the viewport that gets dragged into the black
 * hole as it feeds. Grid points are pulled toward the hole by an amount that
 * falls off with distance and never crosses the centre, so the lines read as
 * a well bending space around the hole.
 */

const SPACING = 64; // px between grid lines
const STEP = 24; // px between sampled points along a line
const STRENGTH = 420; // peak pull in px at p = 1
const FALLOFF = 260; // px; larger spreads the bend further out

export function drawWarpGrid(svg: SVGSVGElement, holeX: number, holeY: number, p: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  const pull = STRENGTH * p;

  const bend = (x: number, y: number) => {
    const dx = holeX - x;
    const dy = holeY - y;
    const d = Math.hypot(dx, dy) || 1;
    const m = Math.min((pull * FALLOFF) / (d + FALLOFF), d * 0.92);
    return `${(x + (dx / d) * m).toFixed(1)},${(y + (dy / d) * m).toFixed(1)}`;
  };

  const paths: string[] = [];
  // Rows
  for (let y = (h % SPACING) / 2; y <= h; y += SPACING) {
    const points: string[] = [];
    for (let x = 0; x <= w + STEP; x += STEP) points.push(bend(Math.min(x, w), y));
    paths.push(`M${points.join("L")}`);
  }
  // Columns
  for (let x = (w % SPACING) / 2; x <= w; x += SPACING) {
    const points: string[] = [];
    for (let y = 0; y <= h + STEP; y += STEP) points.push(bend(x, Math.min(y, h)));
    paths.push(`M${points.join("L")}`);
  }

  const path = svg.firstElementChild as SVGPathElement | null;
  path?.setAttribute("d", paths.join(""));
}
