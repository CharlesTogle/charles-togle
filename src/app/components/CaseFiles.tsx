import Image from "next/image";
import { projects, type CaseFile, type Project } from "../data/portfolio";
import ProjectLinks from "./ProjectLinks";

const steps: { key: keyof CaseFile; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "built", label: "What I built" },
  { key: "result", label: "Result" },
];

function CaseFileArticle({ project, caseFile }: { project: Project; caseFile: CaseFile }) {
  return (
    <article id={`project-${project.slug}`} className="grid gap-8 border-t border-rule pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm text-muted">
            <span>{project.period}</span>
            {project.status ? <span className="text-signal">{project.status}</span> : null}
          </div>
          <h3 className="display display-md mt-3">{project.name}</h3>
          <p className="mt-2 text-muted">{project.role}</p>
        </div>

        {project.screenshot ? (
          <div className="relative aspect-16/10 overflow-hidden rounded-md border border-rule bg-panel">
            <Image
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={project.screenshotFit === "contain" ? "object-contain" : "object-cover object-top"}
            />
          </div>
        ) : null}

        <ProjectLinks project={project} />
      </div>

      <dl className="grid content-start gap-7">
        {steps.map((step) => (
          <div key={step.key} className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
            <dt className={`text-sm ${step.key === "result" ? "text-signal" : "text-muted"}`}>{step.label}</dt>
            <dd className={`max-w-[60ch] ${step.key === "result" ? "text-xl font-semibold leading-snug" : ""}`}>
              {caseFile[step.key]}
            </dd>
          </div>
        ))}
        <div className="grid gap-1.5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
          <dt className="text-sm text-muted">Stack</dt>
          <dd className="text-muted">{project.tech.join(", ")}</dd>
        </div>
      </dl>
    </article>
  );
}

export default function CaseFiles() {
  const withCaseFiles = projects.flatMap((project) => (project.caseFile ? [{ project, caseFile: project.caseFile }] : []));

  return (
    <section id="work" className="section">
      <div className="shell">
        <h2 className="display display-lg max-w-[16ch]">Selected work, and what it changed.</h2>
        <div className="mt-14 grid gap-16">
          {withCaseFiles.map(({ project, caseFile }) => (
            <CaseFileArticle key={project.slug} project={project} caseFile={caseFile} />
          ))}
        </div>
      </div>
    </section>
  );
}
