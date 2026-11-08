import { planets } from "../../data/planets";
import { projects } from "../../data/portfolio";

type Link = { tech: string; names: string[] };

// Finds technologies shared by two or more visited planets, strongest first,
// so the log surfaces how the projects connect as the visitor explores.
function findLinks(visitedIds: string[]): Link[] {
  const counts = new Map<string, string[]>();
  for (const id of visitedIds) {
    const planet = planets.find((p) => p.id === id);
    const project = projects.find((p) => p.slug === planet?.projectSlug);
    if (!planet || !project) continue;
    for (const tech of project.tech) {
      counts.set(tech, [...(counts.get(tech) ?? []), planet.name]);
    }
  }
  return [...counts]
    .filter(([, names]) => names.length >= 2)
    .map(([tech, names]) => ({ tech, names }))
    .sort((a, b) => b.names.length - a.names.length);
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ShipLog({ visited }: { visited: string[] }) {
  const links = findLinks(visited);
  const [primary, ...others] = links;
  const complete = visited.length === planets.length;
  // Latest landings first; the log reads like a flight recorder.
  const entries = visited
    .map((id, i) => ({ planet: planets.find((p) => p.id === id), index: i + 1 }))
    .filter((e) => e.planet)
    .reverse()
    .slice(0, 3);

  return (
    <section
      aria-labelledby="ship-log-title"
      className="hud-frame relative w-full max-w-sm rounded-md border border-rule bg-ink/75 text-sm backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md" aria-hidden="true">
        <div className="hud-scan" />
      </div>

      <header className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5">
        <h2 id="ship-log-title" className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          <span className={complete ? "live-dot" : "inline-block size-[0.55rem] rounded-full bg-signal/70"} aria-hidden="true" />
          Ship log
        </h2>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">
          <span className="sr-only">
            {visited.length} of {planets.length} planets visited
          </span>
          <span aria-hidden="true">
            <span className="text-base font-semibold tracking-normal text-paper">{pad(visited.length)}</span>
            <span className="mx-1 text-rule-strong">/</span>
            {pad(planets.length)}
          </span>
        </p>
      </header>

      {/* Flight path: one node per planet in its own colour, joined once charted */}
      <div className="px-4 pt-4" aria-hidden="true">
        <div className="flex items-center">
          {planets.map((planet, i) => {
            const on = visited.includes(planet.id);
            // A segment lights once both planets it joins have been charted.
            const linked = on && i > 0 && visited.includes(planets[i - 1].id);
            return (
              <span key={planet.id} className={`flex items-center ${i > 0 ? "flex-1" : ""}`}>
                {i > 0 ? (
                  <span
                    className={`h-px flex-1 transition-colors duration-500 ${
                      linked
                        ? "bg-signal shadow-[0_0_6px_var(--signal)]"
                        : "bg-[repeating-linear-gradient(90deg,var(--rule-strong)_0_4px,transparent_4px_8px)]"
                    }`}
                  />
                ) : null}
                <span
                  className={`size-3 shrink-0 rounded-full border transition-all duration-500 ${
                    on ? "scale-110 border-transparent" : "border-dashed border-rule-strong bg-ink"
                  }`}
                  style={
                    on
                      ? {
                          background: `radial-gradient(circle at 35% 35%, ${planet.palette[1]}, ${planet.palette[0]})`,
                          boxShadow: `0 0 0 2px var(--ink), 0 0 10px ${planet.palette[0]}`,
                        }
                      : undefined
                  }
                />
              </span>
            );
          })}
        </div>
      </div>

      {/* Landing entries */}
      <ol className="mt-4 space-y-1 px-4 font-mono text-xs" aria-label="Recent landings">
        {entries.length === 0 ? (
          <li className="text-muted">
            <span className="text-rule-strong">--</span> Awaiting first landing<span className="hud-caret">_</span>
          </li>
        ) : (
          entries.map(({ planet, index }, i) => (
            <li key={planet!.id} className={`flex items-center gap-2 ${i === 0 ? "log-enter text-paper" : "text-muted"}`}>
              <span className="text-rule-strong">{pad(index)}</span>
              <span className="size-1.5 shrink-0 rounded-full" style={{ background: planet!.palette[0] }} aria-hidden="true" />
              <span className="truncate">{planet!.name}</span>
              <span className={`ml-auto shrink-0 text-[0.65rem] uppercase tracking-widest ${i === 0 ? "text-signal" : "text-rule-strong"}`}>
                Landed
              </span>
            </li>
          ))
        )}
      </ol>

      {/* Connection readout */}
      <div className="mt-4 border-t border-rule px-4 py-3">
        {primary ? (
          <div key={primary.tech} className="log-enter">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">Link detected</p>
            <p className="mt-1.5 leading-snug text-muted">
              <span className="mr-1.5 inline-block rounded-sm border border-signal/40 bg-signal/10 px-1.5 py-px font-mono text-xs text-signal">
                {primary.tech}
              </span>
              runs under {primary.names.join(", ")}.
            </p>
            {others.length > 0 ? (
              <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Other shared technologies">
                {others.slice(0, 4).map((link) => (
                  <li key={link.tech} className="rounded-sm border border-rule px-1.5 py-px font-mono text-[0.65rem] text-muted">
                    {link.tech} <span className="text-rule-strong">×{link.names.length}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <p className="leading-snug text-muted">
            {visited.length === 0
              ? "Land on a planet to start the log."
              : complete
                ? "Every planet charted."
                : "Scanning. Links show up after two landings."}
          </p>
        )}
      </div>
    </section>
  );
}
