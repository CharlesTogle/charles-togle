import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-frame">
      <div className="section-shell space-y-10">
        <div className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "var(--accent-strong)" }}>
              Skills
            </p>
            <h2 className="section-title max-w-[9ch] font-semibold">Tools I ship with.</h2>
          </div>
          <div className="space-y-4 lg:max-w-[62ch] lg:justify-self-end">
            <p className="section-copy max-w-none text-base">
              Resume-backed tools and technologies used across production builds, school projects, and client-facing systems.
            </p>
            <p className="text-sm" style={{ color: "var(--foreground-soft)" }}>
              Grouped by actual working areas instead of inflated self-ratings.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article key={group.label} className="card-surface p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 border-b pb-5" style={{ borderColor: "var(--border)" }}>
                <h3 className="text-sm uppercase tracking-[0.16em]" style={{ color: "var(--foreground-soft)" }}>
                  {group.label}
                </h3>
                <span
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: "var(--accent-strong)", fontFamily: "var(--font-jetbrains-mono), monospace" }}
                >
                  {String(group.skills.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span key={skill.name} className="pill-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
