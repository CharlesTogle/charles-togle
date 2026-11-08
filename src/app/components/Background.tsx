import { educationEntries } from "../data/about";
import { skillGroups } from "../data/skills";

const toSentenceCase = (label: string) => label.charAt(0) + label.slice(1).toLowerCase();

export default function Background() {
  return (
    <section id="background" className="section">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="display display-md">Tools I work with</h2>
          <dl className="mt-8 border-b border-rule">
            {skillGroups.map((group) => (
              <div key={group.label} className="grid gap-1 border-t border-rule py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-sm text-muted">{toSentenceCase(group.label)}</dt>
                <dd>{group.skills.map((skill) => skill.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="display display-md">Education</h2>
          <div className="mt-8 border-b border-rule">
            {educationEntries.map((entry) => (
              <div key={`${entry.degree}-${entry.period}`} className="border-t border-rule py-4">
                <p className="text-sm text-muted">{toSentenceCase(entry.period)}</p>
                <h3 className="mt-1 font-semibold">{entry.degree}</h3>
                <p className="text-muted">{entry.school}</p>
                {entry.bullets.length > 0 ? (
                  <ul className="mt-2 grid gap-0.5 text-sm">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
