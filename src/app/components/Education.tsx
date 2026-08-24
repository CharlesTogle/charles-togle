import { educationEntries } from "../data/about";

export default function Education() {
  return (
    <section id="education" className="section-frame">
      <div className="section-shell space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-[-0.04em]">Education</h2>
          <span className="text-sm" style={{ color: "var(--foreground-soft)" }}>
            Ongoing academic track
          </span>
        </div>

        <div className="grid gap-5">
          {educationEntries.map((entry) => (
            <article key={`${entry.degree}-${entry.period}`} className="card-surface p-6 sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
                <div className="space-y-3">
                  <p className="text-sm font-medium" style={{ color: "var(--accent-strong)" }}>
                    {entry.period}
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{entry.degree}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                      {entry.school}
                    </p>
                  </div>
                </div>

                {entry.bullets.length > 0 ? (
                  <ul className="grid gap-2 border-t pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={{ borderColor: "var(--border)" }}>
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
