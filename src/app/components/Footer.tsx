import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { contactItems } from "../data/about";

export default function Footer() {
  return (
    <footer className="border-t py-10" style={{ borderColor: "var(--border)" }}>
      <div className="section-shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-2xl font-semibold tracking-[-0.04em]">Charles Nathaniel Togle</p>
          <p className="text-sm" style={{ color: "var(--foreground-soft)" }}>
            Simple portfolio, measurable work, and a strong interest in systems that matter.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {contactItems
            .filter((item) => item.label === "GITHUB" || item.label === "LINKEDIN")
            .map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="button-secondary">
                {item.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
