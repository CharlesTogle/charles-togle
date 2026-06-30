import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-frame">
      <div className="section-shell space-y-10">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "var(--accent-strong)" }}>
              Skills
            </p>
            <h2 className="section-title max-w-[8ch] font-semibold">Current working range.</h2>
          </div>
          <p className="section-copy text-base">
            The percentages stay visible because they help communicate current confidence, not fixed ceilings.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.label} className="card-surface p-6 sm:p-8">
              <h3 className="text-sm uppercase tracking-[0.16em]" style={{ color: "var(--foreground-soft)" }}>
                {group.label}
              </h3>
              <div className="mt-6 grid gap-5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-end justify-between gap-3">
                      <span className="text-sm sm:text-base">{skill.name}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--accent-strong)", fontFamily: "var(--font-jetbrains-mono), monospace" }}>
                        {skill.pct}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden" style={{ background: "var(--surface-muted)" }}>
                      <div className="h-full" style={{ width: `${skill.pct}%`, background: "var(--accent)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-sm italic" style={{ color: "var(--foreground-soft)" }}>
          &quot;Nothing is truly 100% Learnable in this world...&quot;
        </p>
      </div>
    </section>
  );
}
