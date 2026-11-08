import { experiences, type ExperienceEntry } from "../data/portfolio";

interface CompanyGroup {
  company: string;
  location: string;
  roles: ExperienceEntry[];
}

// Consecutive roles at the same company collapse into one block, so a
// progression like consultant -> engineer -> specialist reads as one story.
function groupByCompany(entries: ExperienceEntry[]): CompanyGroup[] {
  return entries.reduce<CompanyGroup[]>((groups, entry) => {
    const last = groups.at(-1);
    if (last && last.company === entry.company) {
      last.roles.push(entry);
    } else {
      groups.push({ company: entry.company, location: entry.location, roles: [entry] });
    }
    return groups;
  }, []);
}

export default function Experience() {
  const groups = groupByCompany(experiences);

  return (
    <section id="experience" className="section">
      <div className="shell">
        <h2 className="display display-lg">Experience</h2>

        <div className="mt-14 grid gap-14">
          {groups.map((group) => (
            <article key={`${group.company}-${group.roles[0].period}`} className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
              <div>
                <h3 className="display display-md">{group.company}</h3>
                <p className="mt-2 text-sm text-muted">{group.location}</p>
                {group.roles.length > 1 ? (
                  <p className="mt-4 text-sm">
                    {group.roles.length} roles, from {group.roles.at(-1)?.title} to {group.roles[0].title}
                  </p>
                ) : null}
              </div>

              <ol className="grid gap-8 border-l border-rule pl-6">
                {group.roles.map((role, index) => (
                  <li key={`${role.title}-${role.period}`} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[calc(1.5rem+4.5px)] top-2 size-2 rounded-full ${index === 0 ? "bg-signal" : "bg-rule-strong"}`}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-lg font-semibold">{role.title}</h4>
                      <p className="text-sm text-muted">{role.period}</p>
                    </div>
                    <ul className="mt-3 grid list-disc gap-2 pl-5 text-muted marker:text-rule-strong">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="max-w-[70ch]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
