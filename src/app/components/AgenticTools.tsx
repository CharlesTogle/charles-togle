import { BracketsAngle, Code, Robot } from "@phosphor-icons/react/dist/ssr";
import { agenticTools } from "../data/agentic-tools";

const icons = {
  Opencode: Code,
  "Claude Code": Robot,
  Codex: BracketsAngle,
};

export default function AgenticTools() {
  return (
    <section id="tools" className="section-frame">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-4">
          <p className="text-sm" style={{ color: "var(--accent-strong)" }}>
            Agentic coding stack
          </p>
          <h2 className="section-title max-w-[11ch] font-semibold">The tools I use for agentic delivery.</h2>
          <p className="section-copy text-base">
            I actively teach and apply agentic coding workflows. These are the three tools I want represented in the portfolio because they shape how I research, build, and refine software.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {agenticTools.map((tool) => {
            const Icon = icons[tool.name as keyof typeof icons];

            return (
              <article key={tool.name} className="card-surface flex h-full flex-col gap-5 p-6">
                <div className="flex h-12 w-12 items-center justify-center border" style={{ borderColor: "var(--border)", background: "var(--accent-soft)", color: "var(--accent-strong)" }}>
                  <Icon size={22} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{tool.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                    {tool.summary}
                  </p>
                </div>
                <div className="mt-auto border-t pt-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--foreground-soft)" }}>
                  <span className="font-medium" style={{ color: "var(--foreground)" }}>
                    Best for:
                  </span>{" "}
                  {tool.strength}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
