"use client";

import Image from "next/image";
import Link from "next/link";

const homeLinks = [
  { href: "#about", label: "About" },
  { href: "#tools", label: "Tools" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export default function Nav() {
  const onHome = true;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--background) 88%, transparent)", backdropFilter: "blur(14px)" }}>
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold tracking-[-0.04em]">
            Charles Togle
          </Link>
          <span className="hidden text-sm sm:inline" style={{ color: "var(--foreground-soft)" }}>
            Web systems engineer
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
          <Image
            src="/profile.png"
            alt="Charles Togle"
            width={44}
            height={44}
            className="h-11 w-11 border object-cover"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
      </div>
    </header>
  );
}
