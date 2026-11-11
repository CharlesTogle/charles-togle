import Link from "next/link";
import { findContact } from "../data/about";
import LowPowerToggle from "./LowPowerToggle";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#wins", label: "Wins" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const email = findContact("EMAIL")?.href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-ink/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-3 sm:gap-6">
        <Link href="/" className="whitespace-nowrap font-semibold tracking-tight">
          Charles Togle
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <LowPowerToggle />
          {email ? (
            <a href={email} className="btn btn-signal whitespace-nowrap px-4! py-2! text-sm! sm:px-[1.35rem]! sm:py-2.5!">
              Email me
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
