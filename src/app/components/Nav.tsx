import Link from "next/link";
import { availability, findContact } from "../data/about";
import Availability from "./Availability";
import LowPowerToggle from "./LowPowerToggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#wins", label: "Wins" },
  { href: "/#contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const email = findContact("EMAIL")?.href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-ink/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-semibold tracking-tight">
          Charles Togle
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-paper">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <LowPowerToggle />
          <Availability label={availability} className="hidden text-sm xl:inline-flex" />
          {email ? (
            <a href={email} className="btn btn-signal py-2.5! text-sm!">
              Email me
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
