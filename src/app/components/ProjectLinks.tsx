import type { Project } from "../data/portfolio";

export default function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  const { company, live, source, source2 } = project.links;
  if (!company && !live && !source && !source2) return null;

  return (
    <div className={`flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium ${className}`}>
      {company ? (
        <a href={company} target="_blank" rel="noreferrer" className="text-link">
          Company website<span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      ) : null}
      {live ? (
        <a href={live} target="_blank" rel="noreferrer" className="text-link">
          Live site<span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      ) : null}
      {source ? (
        <a href={source} target="_blank" rel="noreferrer" className="text-link">
          {source2 ? "Source (app)" : "Source"}
          <span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      ) : null}
      {source2 ? (
        <a href={source2} target="_blank" rel="noreferrer" className="text-link">
          Source (infra)<span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}
