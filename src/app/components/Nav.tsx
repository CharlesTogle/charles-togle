"use client";

import { List, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const homeLinks = [
  { href: "#about", label: "About" },
  { href: "#tools", label: "Tools" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export default function Nav() {
  usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const onHome = true;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--background) 88%, transparent)", backdropFilter: "blur(14px)" }}>
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">
            Charles Togle
          </Link>
          <span className="hidden text-sm sm:inline" style={{ color: "var(--foreground-soft)" }}>
            Full-stack engineer
          </span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {onHome &&
            homeLinks.map((item) => (
              <a key={item.href} href={item.href} className="text-sm" style={{ color: "var(--foreground-soft)" }}>
                {item.label}
              </a>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="button-secondary h-11 w-11 p-0 lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t lg:hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="section-shell flex flex-col gap-4 py-4">
            {onHome &&
              homeLinks.map((item) => (
                <a key={item.href} href={item.href} className="text-base" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </a>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
