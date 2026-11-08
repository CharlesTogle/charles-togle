import { projects } from "../data/portfolio";
import ProjectLinks from "./ProjectLinks";

export default function MoreBuilds() {
  const rest = projects.filter((project) => !project.caseFile);

  return (
    <section aria-labelledby="more-builds" className="shell pb-20">
      <h2 id="more-builds" className="display display-md">
        More builds
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
            <p className="max-w-[60ch] text-muted">{project.summary}</p>
            <ProjectLinks project={project} className="md:justify-end" />
          </li>
        ))}
      </ul>
    </section>
  );
}
