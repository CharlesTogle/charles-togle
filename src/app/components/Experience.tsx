import { experiences } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="section-frame">
      <div className="section-shell grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "var(--accent-strong)" }}>
            Experience
          </p>
          <h2 className="section-title max-w-[8ch] font-semibold">Work that changed operations.</h2>
          <p className="section-copy text-base">
            The emphasis here is concrete delivery: systems built, scale handled, and manual effort removed.
          </p>
        </div>

        <div className="grid gap-6">
          {experiences.map((item) => (
            <article key={`${item.company}-${item.period}`} className="card-surface p-6 sm:p-8">
              <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
                <div className="space-y-3">
                  <p className="text-sm font-medium" style={{ color: "var(--accent-strong)" }}>
                    {item.period}
                  </p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                    <p className="mt-2 text-sm" style={{ color: "var(--foreground-soft)" }}>
                      {item.company} · {item.location}
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3 border-t pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0" style={{ borderColor: "var(--border)" }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm leading-relaxed sm:text-base" style={{ color: "var(--foreground-soft)" }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
