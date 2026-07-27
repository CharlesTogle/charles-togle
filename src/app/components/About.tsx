import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { aboutHighlights, awardEntries, contactItems, educationEntries } from "../data/about";

export default function About() {
  return (
    <section id="about" className="section-frame">
      <div className="section-shell space-y-8">
        <div className="grid gap-8 border-b pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "var(--accent-strong)" }}>
              About
            </p>
            <h2 className="section-title max-w-[10ch] font-semibold">Built for real work, not just demos.</h2>
          </div>

          <div className="space-y-6">
            <p className="section-copy max-w-none text-lg">
              Seeking a junior software engineering role to further develop technical and systems-level skills, with a long-term goal of becoming a Forward Deployed Engineer. Strong interest in building real-world software, high-pressure delivery, and practical systems that help people operate better. Works well in teams, communicates effectively, and stays teachable.
            </p>

            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {aboutHighlights.map((highlight) => (
                <div key={highlight} className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_340px] xl:items-start">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">Education</h3>
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
                        <h4 className="text-xl font-semibold tracking-[-0.03em]">{entry.degree}</h4>
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

            <div className="space-y-5 pt-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">Awards</h3>
                <span className="text-sm" style={{ color: "var(--foreground-soft)" }}>
                  Competition and hackathon recognition
                </span>
              </div>

              <div className="grid gap-5">
                {awardEntries.map((entry) => (
                  <article key={`${entry.title}-${entry.period}`} className="card-surface p-6 sm:p-7">
                    <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
                      <p className="text-sm font-medium" style={{ color: "var(--accent-strong)" }}>
                        {entry.period}
                      </p>
                      <div className="space-y-2 border-t pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={{ borderColor: "var(--border)" }}>
                        <h4 className="text-xl font-semibold tracking-[-0.03em]">{entry.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                          {entry.summary}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <article className="card-surface p-6 sm:p-8 xl:sticky xl:top-28">
            <h3 className="text-2xl font-semibold tracking-[-0.04em]">Contact</h3>
            <div className="mt-6 grid gap-5">
              {contactItems.map((item) => (
                <div key={item.label} className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                  <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--foreground-soft)" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-medium">
                      {item.val}
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-medium">{item.val}</p>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
