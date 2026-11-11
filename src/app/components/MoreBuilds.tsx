import Image from "next/image";
import { experiences, projects } from "../data/portfolio";
import ProjectLinks from "./ProjectLinks";

export default function MoreBuilds() {
  // Projects tied to a role already appear under Experience.
  const fromRoles = new Set(experiences.map((role) => role.projectSlug));
  const rest = projects.filter((project) => !fromRoles.has(project.slug));

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="shell">
        <h2 id="projects-heading" className="display display-lg">
          Projects
        </h2>
        <ul className="mt-8 border-b border-rule">
          {rest.map((project) => (
            <li
              key={project.slug}
              id={`project-${project.slug}`}
              className="grid gap-3 border-t border-rule py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,3fr)] md:gap-8"
            >
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-sm text-muted">
                  {project.role}, {project.period}
                </p>
              </div>
              <div className="grid gap-4">
                <p className="max-w-[60ch] text-muted">{project.summary}</p>
                {project.screenshot ? (
                  <div className="relative aspect-16/10 max-w-xl overflow-hidden rounded-md border border-rule bg-panel">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className={project.screenshotFit === "contain" ? "object-contain" : "object-cover object-top"}
                    />
                  </div>
                ) : null}
              </div>
              <ProjectLinks project={project} className="md:justify-end" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
