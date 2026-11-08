import type { Planet } from "../../data/planets";

// Scene units to SVG pixels, and how flat the orbits look (matches the 3D
// camera's pitch so both modes read as the same system).
const SCALE = 52;
const TILT = 0.41;
const SUN_RADIUS = 57;

interface StaticSystemProps {
  planets: Planet[];
  selectedId: string | null;
  hoveredId: string | null;
  visited: string[];
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onBlackHole: () => void;
}

function place(planet: Planet) {
  const orbit = planet.orbit * SCALE;
  return {
    x: Math.cos(planet.phase) * orbit,
    y: Math.sin(planet.phase) * orbit * TILT,
    r: planet.radius * SCALE * 1.15,
  };
}

/**
 * A still, SVG drawing of the solar system for low power mode and for
 * devices without WebGL. Planets keep their colours and features, and stay
 * clickable; the HTML planet buttons remain the accessible way in.
 */
// Where the newborn black hole sits, matching its place in the 3D scene.
const NEWBORN = { x: -400, y: -215 };

export default function StaticSystem({
  planets,
  selectedId,
  hoveredId,
  visited,
  onSelect,
  onHover,
  onBlackHole,
}: StaticSystemProps) {
  const placed = planets.map((planet) => ({ planet, ...place(planet) }));
  // Planets above the sun on screen are behind it.
  const behind = placed.filter((p) => p.y < 0);
  const front = placed.filter((p) => p.y >= 0);
  const focus = placed.find((p) => p.planet.id === (selectedId ?? hoveredId)) ?? placed[Math.min(1, placed.length - 1)];

  const renderPlanet = ({ planet, x, y, r }: (typeof placed)[number]) => {
    const lit = planet.id === selectedId || planet.id === hoveredId;
    const seen = visited.includes(planet.id);
    // Light the side facing the sun.
    const length = Math.hypot(x, y) || 1;
    const fx = 0.5 - (x / length) * 0.3;
    const fy = 0.5 - (y / length) * 0.3;
    const gradientId = `planet-${planet.id}`;

    return (
      <g
        key={planet.id}
        transform={`translate(${x} ${y})`}
        onClick={() => onSelect(planet.id)}
        onMouseEnter={() => onHover(planet.id)}
        onMouseLeave={() => onHover(null)}
        className="cursor-pointer"
      >
        <defs>
          <radialGradient id={gradientId} cx="0.5" cy="0.5" r="0.75" fx={fx} fy={fy}>
            <stop offset="0" stopColor={planet.palette[1]} />
            <stop offset="0.5" stopColor={planet.palette[0]} />
            <stop offset="1" stopColor="#0d0d0d" />
          </radialGradient>
        </defs>
        {lit || seen ? (
          <circle r={r + 10} fill="none" stroke="var(--signal)" strokeWidth={lit ? 2 : 1} opacity={lit ? 0.9 : 0.4} />
        ) : null}
        {planet.feature === "ring" ? (
          <ellipse rx={r * 2.1} ry={r * 0.55} fill="none" stroke={planet.palette[1]} strokeWidth={r * 0.45} opacity={0.55} transform="rotate(-14)" />
        ) : null}
        <circle r={r} fill={`url(#${gradientId})`} />
        {planet.feature === "ring" ? (
          // Front half of the ring passes over the planet
          <path
            d={`M ${-r * 2.1} 0 A ${r * 2.1} ${r * 0.55} 0 0 0 ${r * 2.1} 0`}
            fill="none"
            stroke={planet.palette[1]}
            strokeWidth={r * 0.45}
            opacity={0.7}
            transform="rotate(-14)"
          />
        ) : null}
        {planet.feature === "shell" ? (
          <circle r={r * 1.7} fill="none" stroke="#5c5c5c" strokeDasharray="6 5" />
        ) : null}
        {planet.feature === "moon" ? <circle cx={r * 1.9} cy={-r * 0.7} r={r * 0.24} fill="#8a8a8a" /> : null}
        {planet.feature === "satellite" ? <rect x={-r * 1.9} y={-r * 0.9} width={6} height={6} fill="var(--signal)" /> : null}
        {planet.campfire ? (
          <g transform={`translate(${r * 0.35} ${-r * 0.88})`}>
            <circle r={r * 0.55} fill="#ff8a3d" opacity={0.25} />
            <circle r={r * 0.16} fill="#ffc46b" />
          </g>
        ) : null}
        {/* Generous invisible hit area so small planets are easy to click */}
        <circle r={Math.max(r * 1.6, 30)} fill="transparent" />
      </g>
    );
  };

  // The Petrova line: sun to the focused planet, arcing slightly upward.
  const distance = Math.hypot(focus.x, focus.y) || 1;
  const startX = (focus.x / distance) * SUN_RADIUS;
  const startY = (focus.y / distance) * SUN_RADIUS;
  const controlX = focus.x / 2;
  const controlY = focus.y / 2 - distance * 0.12;

  return (
    <svg viewBox="-560 -290 1120 580" className="block size-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="sun-glow">
          <stop offset="0" stopColor="#ff6020" stopOpacity="0.6" />
          <stop offset="0.35" stopColor="#ff6020" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ff6020" stopOpacity="0" />
        </radialGradient>
        {/* Limb darkening: hot core cooling to deep red at the edge */}
        <radialGradient id="sun-surface" cx="0.45" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#ffb860" />
          <stop offset="0.55" stopColor="#f25c14" />
          <stop offset="0.9" stopColor="#a3260a" />
          <stop offset="1" stopColor="#6b1003" />
        </radialGradient>
      </defs>

      <g transform={`translate(${NEWBORN.x} ${NEWBORN.y})`} onClick={onBlackHole} className="cursor-pointer">
        <defs>
          <linearGradient id="newborn-disk" x1="0" x2="1">
            <stop offset="0" stopColor="#ff5a36" stopOpacity="0" />
            <stop offset="0.3" stopColor="#ff7a4f" />
            <stop offset="0.5" stopColor="#fff1ea" />
            <stop offset="0.7" stopColor="#ff7a4f" />
            <stop offset="1" stopColor="#ff5a36" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse rx={62} ry={11} fill="url(#newborn-disk)" opacity={0.85} transform="rotate(-8)" />
        <circle r={17} fill="#000" stroke="#ffe2d6" strokeWidth={1.5} />
        <path d="M -60 4 A 62 11 0 0 0 60 -13" fill="none" stroke="url(#newborn-disk)" strokeWidth={6} opacity={0.9} transform="rotate(-8)" />
        <circle r={40} fill="transparent" />
      </g>

      {placed.map(({ planet }) => (
        <ellipse key={planet.id} rx={planet.orbit * SCALE} ry={planet.orbit * SCALE * TILT} fill="none" stroke="#2e2e2e" />
      ))}

      {behind.map(renderPlanet)}

      <circle r={SUN_RADIUS * 3.6} fill="url(#sun-glow)" />
      <circle r={SUN_RADIUS} fill="url(#sun-surface)" />

      <path
        d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${focus.x} ${focus.y}`}
        fill="none"
        stroke="var(--petrova)"
        strokeWidth={2}
        strokeDasharray="3 7"
        strokeLinecap="round"
        opacity={0.85}
      />

      {front.map(renderPlanet)}
    </svg>
  );
}
