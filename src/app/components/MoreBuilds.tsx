import { experiences, projects, type Project } from "../data/portfolio";
import ProjectRow from "./ProjectRow";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Turns one side of a period like "Mar 2026" or "2026" into a sortable
// number. A bare year counts as January when it starts a period and
// December when it ends one; "present" sorts after everything.
function toMonthIndex(part: string, year: number, isEnd: boolean): number {
  if (/present/i.test(part)) return Infinity;
  const month = MONTHS.findIndex((m) => part.includes(m));
  return year * 12 + (month >= 0 ? month : isEnd ? 11 : 0);
}

function periodRange(period: string): { start: number; end: number } {
  const [first, second = first] = period.split("–").map((s) => s.trim());
  const yearOf = (s: string) => Number(s.match(/\d{4}/)?.[0]);
  // "Mar – May 2025" carries its year only on the end side.
  const endYear = yearOf(second) || yearOf(first);
  const startYear = yearOf(first) || endYear;
  return { start: toMonthIndex(first, startYear, false), end: toMonthIndex(second, endYear, true) };
}

// Newest first: by when the project ended, then by when it started.
function byDateDesc(a: Project, b: Project): number {
  const ra = periodRange(a.period);
  const rb = periodRange(b.period);
  return rb.end - ra.end || rb.start - ra.start;
}

export default function MoreBuilds() {
  // Projects tied to a role already appear under Experience.
  const fromRoles = new Set(experiences.map((role) => role.projectSlug));
  const rest = projects.filter((project) => !fromRoles.has(project.slug)).sort(byDateDesc);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="shell">
        <h2 id="projects-heading" className="display display-lg">
          Projects
        </h2>
        <ul className="mt-8 border-b border-rule">
          {rest.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
