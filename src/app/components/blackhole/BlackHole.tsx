"use client";

import { useEffect, useRef, useState } from "react";
import { applyDevour, collectMorsels, releaseAll, type Morsel } from "./devour";
import { drawWarpGrid } from "./warpGrid";

const DWELL_SECONDS = 0.8; // time at the bottom before it starts eating
const EAT_SECONDS = 5; // from first bite to everything gone
const SPIT_SECONDS = 1.1; // how fast it all comes back out
const BOTTOM_SLACK_PX = 12;
const LEAVE_PX = 240; // scroll this far up to re-arm after "pull it all back out"
const SWALLOWED_AT = 0.97;

// Measured from the black hole zone's layout box, which transforms don't
// move. (Checking scrollHeight instead breaks: pieces falling past the page
// edge would grow the page, read as "left the bottom", and stall the eating.)
function atBottom(zone: HTMLElement | null, slack: number) {
  if (!zone) return false;
  return zone.getBoundingClientRect().bottom <= window.innerHeight + slack;
}

function motionAllowed() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !document.documentElement.hasAttribute("data-low-power")
  );
}

/**
 * A black hole at the end of the page. Linger at the bottom and it slowly
 * pulls the contact section in; scroll away and it all comes back out.
 */
export default function BlackHole({ email }: { email?: string }) {
  const horizonRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const warpRef = useRef<SVGSVGElement>(null);
  const releaseRef = useRef<() => void>(() => {});
  const [swallowed, setSwallowed] = useState(false);

  useEffect(() => {
    let frame = 0;
    let last = 0;
    let progress = 0;
    let dwell = 0;
    let holdOff = false; // set by "pull it all back out" until the visitor leaves the bottom
    let morsels: Morsel[] | null = null;
    let wasSwallowed = false;

    const setVars = (p: number) => {
      rootRef.current?.style.setProperty("--bh-p", p.toFixed(4));
      document.documentElement.style.setProperty("--eaten", p.toFixed(4));
    };

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      const bottom = atBottom(rootRef.current, BOTTOM_SLACK_PX);
      if (!atBottom(rootRef.current, LEAVE_PX)) holdOff = false;

      if (bottom && !holdOff && motionAllowed()) {
        dwell += dt;
        if (dwell >= DWELL_SECONDS) progress = Math.min(1, progress + dt / EAT_SECONDS);
      } else {
        dwell = 0;
        progress = Math.max(0, progress - dt / SPIT_SECONDS);
      }

      if (progress > 0 && !morsels && horizonRef.current) {
        morsels = collectMorsels(horizonRef.current.getBoundingClientRect());
      }
      // Starts gently, then gathers pace
      const eased = Math.pow(progress, 1.3);
      if (morsels) applyDevour(morsels, eased);
      setVars(eased);
      if (warpRef.current && horizonRef.current && eased > 0) {
        const hole = horizonRef.current.getBoundingClientRect();
        drawWarpGrid(warpRef.current, hole.left + hole.width / 2, hole.top + hole.height / 2, eased);
      }

      const nowSwallowed = progress >= SWALLOWED_AT;
      if (nowSwallowed !== wasSwallowed) {
        wasSwallowed = nowSwallowed;
        setSwallowed(nowSwallowed);
      }

      if (progress === 0 && morsels) {
        releaseAll(morsels);
        morsels = null;
      }

      // Keep running only while something can change.
      if (progress > 0 || (bottom && !holdOff)) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        last = 0;
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    releaseRef.current = () => {
      holdOff = true;
      wake();
    };

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    wake();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (morsels) releaseAll(morsels);
      document.documentElement.style.removeProperty("--eaten");
    };
  }, []);

  return (
    <div ref={rootRef} className="blackhole-zone">
      <svg ref={warpRef} className="bh-warp" aria-hidden="true" preserveAspectRatio="none">
        <path />
      </svg>
      <div className="blackhole" aria-hidden="true">
        <div className="bh-glow" />
        <div className="bh-disk">
          <div className="bh-disk-spin" />
        </div>
        <div ref={horizonRef} className="bh-horizon" />
        <div className="bh-photon-ring" />
        <div className="bh-disk bh-disk-front">
          <div className="bh-disk-spin" />
        </div>
      </div>

      <div className={`bh-message ${swallowed ? "is-visible" : ""}`} aria-live="polite">
        {swallowed ? (
          <>
            <p className="display display-md">Everything falls in eventually.</p>
            <p className="mt-3 text-muted">My inbox doesn&apos;t.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {email ? (
                <a href={email} className="btn btn-signal">
                  Email me
                </a>
              ) : null}
              <button type="button" onClick={() => releaseRef.current()} className="btn">
                Pull it all back out
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
