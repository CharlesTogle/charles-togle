import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { projects } from "../data/portfolio";

function ProjectLink({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={primary ? "button-primary" : "button-secondary"}
    >
      {primary ? <ArrowUpRight size={16} /> : <GithubLogo size={16} />}
      {label}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-frame">
      <div className="section-shell space-y-10">
        <div className="grid gap-6 border-b pb-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end" style={{ borderColor: "var(--border)" }}>
          <div className="space-y-4">
            <p className="text-sm" style={{ color: "var(--accent-strong)" }}>
              Selected projects
            </p>
            <h2 className="section-title max-w-[8ch] font-semibold">Work that shipped and changed outcomes.</h2>
          </div>
          <p className="section-copy max-w-none text-base sm:text-lg">
            Every project below stays visible. The goal is clarity over theatrics: what was built, what role I played, what stack I used, and what kind of impact it had.
          </p>
        </div>

        <div className="grid gap-5">
          {projects.map((project, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <article key={project.id} className="card-surface overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
                  <div
                    className={`relative min-h-[240px] border-b lg:min-h-[320px] lg:border-b-0 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                    style={{ borderColor: "var(--border)", background: "var(--surface-strong)" }}
                  >
                    {project.screenshot ? (
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full items-end p-6 sm:p-8">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--foreground-soft)" }}>
                            No screenshot provided
                          </p>
                          <p className="mt-3 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{project.code}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-col gap-6 p-6 sm:p-8 ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
                          {project.code}
                        </p>
                        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em] sm:text-[2rem]">{project.name}</h3>
                      </div>
                      {project.impact && <span className="pill-tag">Impact: {project.impact}</span>}
                    </div>

                    <p className="max-w-[62ch] text-sm leading-relaxed sm:text-base" style={{ color: "var(--foreground-soft)" }}>
                      {project.description}
                    </p>

                    <div className="grid gap-4 border-t pt-5 sm:grid-cols-2" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--foreground-soft)" }}>
                          Role
                        </p>
                        <p className="mt-2 text-sm font-medium">{project.role}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--foreground-soft)" }}>
                          Period
                        </p>
                        <p className="mt-2 text-sm font-medium">{project.period}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="pill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 border-t pt-5" style={{ borderColor: "var(--border)" }}>
                      {project.links.live && <ProjectLink href={project.links.live} label="Live project" primary />}
                      {project.links.source && <ProjectLink href={project.links.source} label="Source" />}
                      {project.links.source2 && <ProjectLink href={project.links.source2} label="Source 2" />}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
