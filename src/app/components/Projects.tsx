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

        <article className="overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden border-b p-6 sm:p-10 lg:border-b-0 lg:border-r" style={{ borderColor: "var(--border)", background: "var(--accent)" }}>
              <div className="relative z-[1] flex items-center justify-between gap-4 text-sm font-medium" style={{ color: "var(--surface)" }}>
                <span>Featured work</span>
                <span>{featured.period}</span>
              </div>

              <div className="relative z-[1] space-y-5">
                <p className="text-[clamp(4.5rem,10vw,8rem)] font-semibold leading-[0.82] tracking-[-0.1em]" style={{ color: "var(--surface)" }}>
                  460K+
                </p>
                <p className="max-w-[16ch] text-lg font-medium leading-snug" style={{ color: "var(--surface)" }}>
                  records moved into a new CRM source of truth.
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full border-[28px] opacity-25" style={{ borderColor: "var(--surface)" }} />
            </div>

            <div className="flex flex-col gap-8 p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: "var(--border)" }}>
                  <p className="font-mono text-xs tracking-[0.08em]" style={{ color: "var(--accent-strong)" }}>
                    {featured.code}
                  </p>
                  <p className="text-sm" style={{ color: "var(--foreground-soft)" }}>
                    {featured.role}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="max-w-[11ch] text-4xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-6xl">{featured.name}</h3>
                  <p className="max-w-[58ch] text-sm leading-relaxed sm:text-base" style={{ color: "var(--foreground-soft)" }}>
                    {featured.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-y py-5" style={{ borderColor: "var(--border)" }}>
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
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ background: "var(--surface-strong)" }}
              >
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
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
                  <div className="flex flex-wrap justify-end gap-2">
                    {project.status && (
                      <span
                        className="pill-tag shrink-0"
                        style={{ borderColor: "var(--accent)", color: "var(--accent-strong)" }}
                      >
                        [{project.status}]
                      </span>
                    )}
                    {project.impact && <span className="pill-tag shrink-0">{project.impact}</span>}
                  </div>
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
