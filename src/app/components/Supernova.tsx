"use client";

import { useEffect, useRef, useState } from "react";

const SEEN_KEY = "supernova:seen";
const MIN_TIME_ON_PAGE_MS = 6000;
const FLASH_MS = 1400;

function alreadySeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Without storage it may show again next page load, which is harmless.
  }
}

/**
 * Exit-intent send-off: when a desktop visitor's cursor leaves through the
 * top of the window (toward the tab bar), the sun goes supernova and leaves
 * an email behind. Shown once per session; never blocks leaving.
 */
export default function Supernova({ email }: { email: string }) {
  const [phase, setPhase] = useState<"idle" | "flash" | "card">("idle");
  const [copied, setCopied] = useState(false);
  const firstButtonRef = useRef<HTMLAnchorElement>(null);
  const address = email.replace(/^mailto:/, "");

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    if (!finePointer || alreadySeen()) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Low power mode is read when the send-off fires, since it can change at any time.
    const skipFlash = () => reducedMotion || document.documentElement.hasAttribute("data-low-power");
    const armedAt = Date.now() + MIN_TIME_ON_PAGE_MS;
    let timer = 0;

    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget || event.clientY > 0 || Date.now() < armedAt) return;
      document.removeEventListener("mouseout", onMouseOut);
      markSeen();
      if (skipFlash()) {
        setPhase("card");
      } else {
        setPhase("flash");
        timer = window.setTimeout(() => setPhase("card"), FLASH_MS);
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "card") return;
    firstButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setPhase("idle");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink/80" onClick={() => phase === "card" && setPhase("idle")}>
      {phase === "flash" ? <div aria-hidden="true" className="supernova-flash" /> : null}

      {phase === "card" ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="supernova-title"
          className="supernova-card mx-4 w-full max-w-xl border border-rule bg-ink p-7 sm:p-10"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="text-sm text-signal">The sun just went supernova</p>
          <h2 id="supernova-title" className="display display-lg mt-4">
            Leaving before the next loop?
          </h2>
          <p className="mt-5 text-muted">
            Everything resets when you close the tab. My inbox doesn&apos;t. If you&apos;re hiring an intern or a new grad
            engineer, I&apos;m one email away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a ref={firstButtonRef} href={email} className="btn btn-signal">
              Email {address}
            </a>
            <button type="button" onClick={copyEmail} className="btn">
              {copied ? "Copied" : "Copy email"}
            </button>
            <button type="button" onClick={() => setPhase("idle")} className="btn border-rule-strong! text-muted hover:text-ink">
              Keep exploring
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied ? "Email address copied" : ""}
          </p>
        </div>
      ) : null}
    </div>
  );
}
