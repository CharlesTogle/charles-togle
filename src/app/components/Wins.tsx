import { awardEntries } from "../data/about";

export default function Wins() {
  return (
    <section id="wins" className="section">
      <div className="shell">
        <h2 className="display display-lg max-w-[18ch]">Fast under pressure, with the results to show it.</h2>

        <ul className="mt-14 border-b border-rule">
          {awardEntries.map((award) => (
            <li
              key={`${award.title}-${award.period}`}
              className="grid gap-3 border-t border-rule py-8 md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,6fr)] md:gap-8"
            >
              <p className="text-sm text-muted">{award.period}</p>
              <h3 className="text-xl font-semibold leading-snug">{award.title}</h3>
              <div>
                <p className="max-w-[60ch] text-muted">{award.summary}</p>
                {award.project || award.source ? (
                  <div className="mt-3 flex gap-5 text-sm font-medium">
                    {award.project ? (
                      <a href={award.project} target="_blank" rel="noreferrer" className="text-link">
                        Project<span className="sr-only"> for {award.title} (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {award.source ? (
                      <a href={award.source} target="_blank" rel="noreferrer" className="text-link">
                        Source<span className="sr-only"> for {award.title} on GitHub (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
