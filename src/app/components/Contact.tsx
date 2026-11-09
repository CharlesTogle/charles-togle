import { Suspense } from "react";
import { availability, findContact } from "../data/about";
import Availability from "./Availability";
import VisitCount, { VisitCountLoading } from "./VisitCount";

const socials = ["GITHUB", "LINKEDIN"] as const;
const socialNames: Record<(typeof socials)[number], string> = {
  GITHUB: "GitHub",
  LINKEDIN: "LinkedIn",
};

export default function Contact() {
  const email = findContact("EMAIL");

  return (
    <footer id="contact" className="section">
      <div className="shell">
        <Availability label={availability} className="inline-flex text-sm" />
        <h2 className="display display-xl mt-8 max-w-[14ch]">Need someone who ships from day one?</h2>
        <p className="lede mt-8">
          I&apos;m open to internships and full-time roles now, on-site in Metro Manila or remote.
          Email is the fastest way to reach me.
        </p>

        <div data-petrova-end className="mt-10 flex flex-wrap items-center gap-3">
          {email?.href ? (
            <a href={email.href} className="btn btn-signal">
              {email.val}
            </a>
          ) : null}
          <a href="/RESUME_CHARLES_TOGLE.pdf" download className="btn">
            Download resume
          </a>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-rule pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((label) => {
              const item = findContact(label);
              return item?.href ? (
                <a key={label} href={item.href} target="_blank" rel="noreferrer" className="text-link text-paper">
                  {socialNames[label]}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null;
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>Pasay City, Philippines</span>
            <Suspense fallback={<VisitCountLoading />}>
              <VisitCount />
            </Suspense>
            <span>© 2026 Charles Togle</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted">
          I redesign this portfolio often so you might see a different look next time :DDD
        </p>
      </div>
    </footer>
  );
}
