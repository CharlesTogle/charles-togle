import {
  ArrowUp,
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { contactItems } from "../data/about";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#tools", label: "Tools" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
];

export default function Footer() {
  const email = contactItems.find((item) => item.label === "EMAIL");
  const phone = contactItems.find((item) => item.label === "PHONE");
  const github = contactItems.find((item) => item.label === "GITHUB");
  const linkedin = contactItems.find((item) => item.label === "LINKEDIN");
  const facebook = contactItems.find((item) => item.label === "FACEBOOK");

  return (
    <footer className="mt-10 overflow-hidden bg-[var(--surface-muted)] text-[var(--foreground)]">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1400px] py-8 pb-6">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 shadow-[0_24px_70px_rgba(98,65,38,0.1)] sm:px-7 sm:py-6">
          <div className="flex min-h-12 flex-wrap items-center gap-4">
          <a href="#hero" className="size-10 shrink-0 overflow-hidden rounded-full border border-[var(--border)]" aria-label="Back to the top">
            <Image src="/profile.png" alt="Charles Togle" width={40} height={40} className="size-full object-cover" />
          </a>
          <span className="h-4 w-px bg-[var(--border)]" aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--foreground-soft)]">Building useful software for people and teams.</p>

          <div className="ml-auto flex w-full gap-1.5 pt-1 sm:w-auto sm:pt-0" aria-label="Social links">
            {github?.href ? <a className="grid size-8 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground-soft)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent-strong)]" href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubLogo size={17} /></a> : null}
            {linkedin?.href ? <a className="grid size-8 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground-soft)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent-strong)]" href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinLogo size={17} /></a> : null}
            {facebook?.href ? <a className="grid size-8 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground-soft)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent-strong)]" href={facebook.href} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo size={17} /></a> : null}
            {phone?.href ? <a className="grid size-8 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground-soft)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent-strong)]" href="https://wa.me/639281995178" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsappLogo size={17} /></a> : null}
            {email?.href ? <a className="grid size-8 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground-soft)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent-strong)]" href={email.href} aria-label="Email"><EnvelopeSimple size={17} /></a> : null}
          </div>
        </div>

        <div className="grid gap-14 px-1 py-16 sm:px-3 sm:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)] lg:gap-16 lg:py-[5.5rem]">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent-strong)]">Have a good problem?</p>
            <h2 className="mt-4 max-w-[10ch] text-[clamp(3.3rem,16vw,5.5rem)] font-medium leading-[0.88] tracking-[-0.09em] lg:text-[clamp(3.5rem,8vw,7.5rem)]">Let&apos;s build something useful<span className="text-[var(--accent)]">.</span></h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {email?.href ? <a href={email.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-[1.1rem] py-3 text-xs font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]">Start a conversation <ArrowUpRight size={16} /></a> : null}
              {phone?.href ? <a href="https://wa.me/639281995178" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-[1.1rem] py-3 text-xs font-semibold text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent-strong)]">Message on WhatsApp</a> : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 self-center lg:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--foreground-soft)]">Explore</p>
              <nav className="mt-5 grid gap-4" aria-label="Footer navigation">
                {footerLinks.map((link) => <a className="flex items-center gap-2.5 text-[0.95rem] text-[var(--foreground)] hover:text-[var(--accent-strong)]" key={link.href} href={link.href}><span className="text-base text-[var(--accent)]">+</span>{link.label}</a>)}
              </nav>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--foreground-soft)]">Contact</p>
              <nav className="mt-5 grid gap-4" aria-label="Footer contact links">
                {email?.href ? <a className="flex items-center gap-2.5 text-[0.95rem] text-[var(--foreground)] hover:text-[var(--accent-strong)]" href={email.href}><span className="text-base text-[var(--accent)]">+</span>Email</a> : null}
                {github?.href ? <a className="flex items-center gap-2.5 text-[0.95rem] text-[var(--foreground)] hover:text-[var(--accent-strong)]" href={github.href} target="_blank" rel="noreferrer"><span className="text-base text-[var(--accent)]">+</span>GitHub</a> : null}
                {linkedin?.href ? <a className="flex items-center gap-2.5 text-[0.95rem] text-[var(--foreground)] hover:text-[var(--accent-strong)]" href={linkedin.href} target="_blank" rel="noreferrer"><span className="text-base text-[var(--accent)]">+</span>LinkedIn</a> : null}
                {facebook?.href ? <a className="flex items-center gap-2.5 text-[0.95rem] text-[var(--foreground)] hover:text-[var(--accent-strong)]" href={facebook.href} target="_blank" rel="noreferrer"><span className="text-base text-[var(--accent)]">+</span>Facebook</a> : null}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-[var(--border)] px-1 pt-5 sm:px-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--foreground-soft)]">All rights reserved.</p>
            <p className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.06em]">© 2026 Charles Togle</p>
          </div>
          <div className="ml-auto hidden sm:block">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--foreground-soft)]">Based in</p>
            <p className="mt-2 text-xs text-[var(--foreground)]">Pasay City, Philippines</p>
          </div>
          <a href="#hero" className="grid size-11 place-items-center rounded-full bg-[var(--accent)] text-white hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]" aria-label="Back to the top"><ArrowUp size={18} /></a>
        </div>
        </div>
      </div>
    </footer>
  );
}
