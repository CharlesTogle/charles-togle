import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { projects, type Project } from "../data/portfolio";

function ProjectLink({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={primary ? "button-primary" : "button-secondary"}>
      {primary ? <ArrowUpRight size={16} /> : <GithubLogo size={16} />}
      {label}
    </a>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.links.live && !project.links.source && !project.links.source2) return null;

  return (
    <div className="mt-auto flex flex-wrap gap-3 border-t pt-5" style={{ borderColor: "var(--border)" }}>
      {project.links.live && <ProjectLink href={project.links.live} label="Live project" primary />}
      {project.links.source && <ProjectLink href={project.links.source} label="Source" />}
      {project.links.source2 && <ProjectLink href={project.links.source2} label="Source 2" />}
    </div>
  );
}

function ProjectTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.tech.map((tech) => (
        <span key={tech} className="pill-tag">
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const [featured, ...supportingProjects] = projects;

  return (
    <section id="projects" className="section-frame">
      <div className="section-shell space-y-12">
        <div className="max-w-3xl space-y-5">
          <h2 className="section-title max-w-[10ch] font-semibold">Projects with a job to do.</h2>
          <p className="section-copy text-base sm:text-lg">
            Production systems, useful experiments, and school projects built to solve a specific problem.
          </p>
        </div>

        <article className="card-surface overflow-hidden">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex min-h-[360px] flex-col justify-center gap-12 border-b p-6 sm:p-10 lg:border-b-0 lg:border-r" style={{ borderColor: "var(--border)", background: "var(--surface-strong)" }}>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
                  Featured work
                </p>
                <p className="text-sm" style={{ color: "var(--foreground-soft)" }}>
                  {featured.period}
                </p>
              </div>

              <div className="space-y-5">
                <p className="metric-value font-semibold">460K+</p>
                <div className="max-w-sm space-y-2">
                  <p className="text-xl font-semibold tracking-[-0.03em]">Records moved into a new CRM source of truth.</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                    Centervert intake, migration, and billing systems built for real operational load.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-7 p-6 sm:p-10">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
                  {featured.code}
                </p>
                <h3 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{featured.name}</h3>
                <p className="max-w-[58ch] text-justify text-sm leading-relaxed sm:text-base" style={{ color: "var(--foreground-soft)" }}>
                  {featured.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y py-5" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">5 FTE</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--foreground-soft)" }}>manual work automated</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-[-0.04em]">30-40/day</p>
                  <p className="mt-1 text-sm" style={{ color: "var(--foreground-soft)" }}>additional leads handled</p>
                </div>
              </div>

              <ProjectTags project={featured} />
              <ProjectLinks project={featured} />
            </div>
          </div>
        </article>

        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {supportingProjects.map((project, index) => (
            <article key={project.id} className="group flex h-full flex-col border-t px-6 pt-5 sm:px-0" style={{ borderColor: "var(--border)" }}>
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--surface-strong)" }}>
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-end p-6">
                    <p className="text-3xl font-semibold tracking-[-0.05em]">{project.code}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-5 pt-5">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-strong)" }}>
                      {String(index + 2).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{project.name}</h3>
                  </div>
                  {project.impact && <span className="pill-tag shrink-0">{project.impact}</span>}
                </div>

                <p className="max-w-[58ch] text-justify text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                  {project.description}
                </p>

                {project.highlights && (
                  <div className="grid grid-cols-3 gap-2 border-y py-3" style={{ borderColor: "var(--border)" }}>
                    {project.highlights.map((highlight) => (
                      <div key={highlight.label}>
                        <p className="text-base font-semibold tracking-[-0.03em]">{highlight.value}</p>
                        <p className="mt-1 text-[0.68rem] leading-tight" style={{ color: "var(--foreground-soft)" }}>
                          {highlight.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <ProjectTags project={project} />
                  <p className="text-sm" style={{ color: "var(--foreground-soft)" }}>
                    {project.period}
                  </p>
                </div>

                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
