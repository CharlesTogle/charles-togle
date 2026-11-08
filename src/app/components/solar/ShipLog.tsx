import { planets } from "../../data/planets";
import { projects } from "../../data/portfolio";

// Finds the technology shared by the most visited planets, so the log
// surfaces how the projects connect as the visitor explores.
function findConnection(visitedIds: string[]) {
  const counts = new Map<string, string[]>();
  for (const id of visitedIds) {
    const planet = planets.find((p) => p.id === id);
    const project = projects.find((p) => p.slug === planet?.projectSlug);
    if (!planet || !project) continue;
    for (const tech of project.tech) {
      counts.set(tech, [...(counts.get(tech) ?? []), planet.name]);
    }
  }
  let best: { tech: string; names: string[] } | null = null;
  for (const [tech, names] of counts) {
    if (names.length >= 2 && (!best || names.length > best.names.length)) best = { tech, names };
  }
  return best;
}

export default function ShipLog({ visited }: { visited: string[] }) {
  const connection = findConnection(visited);

  return (
    <section aria-labelledby="ship-log-title" className="w-full max-w-xs rounded-md border border-rule bg-ink/70 p-4 text-sm backdrop-blur-md">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="ship-log-title" className="font-semibold">
          Ship log
        </h2>
        <p className="text-muted">
          {visited.length} of {planets.length} visited
        </p>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {planets.map((planet) => (
          <span
            key={planet.id}
            className={`h-1 flex-1 rounded-full ${visited.includes(planet.id) ? "bg-signal" : "bg-rule-strong"}`}
          />
        ))}
      </div>
      <p className="mt-3 text-muted">
        {visited.length === 0
          ? "Land on a planet to start the log."
          : connection
            ? `Connection found: ${connection.tech} runs under ${connection.names.join(", ")}.`
            : visited.length === planets.length
              ? "Every planet charted."
              : "Keep exploring. Connections show up after two landings."}
      </p>
    </section>
  );
}
