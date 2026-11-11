"use client";

import { useEffect, useRef } from "react";
import type { Planet } from "../../data/planets";
import { systemMaps } from "../../data/systems";
import MapDiagram from "../MapDiagram";

export default function PlanetPanel({
  planet,
  canRoll,
  onClose,
}: {
  planet: Planet;
  /** Only the 3D scene supports rolling planets */
  canRoll: boolean;
  onClose: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const unlockScrollRef = useRef<() => void>(() => {});
  const map = systemMaps.find((m) => m.id === planet.mapId);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [planet.id]);

  // On mobile the panel is a bottom sheet over the page, so lock the page
  // scroll behind it. Desktop keeps scrolling since the panel sits in the hero.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const html = document.documentElement;
    const body = document.body;
    const prev = { html: html.style.overflow, body: body.style.overflow };

    const apply = () => {
      const lock = mq.matches ? "hidden" : "";
      html.style.overflow = lock || prev.html;
      body.style.overflow = lock || prev.body;
    };

    const unlock = () => {
      mq.removeEventListener("change", apply);
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
    };

    apply();
    mq.addEventListener("change", apply);
    unlockScrollRef.current = unlock;
    return unlock;
  }, []);

  // Unlock synchronously before the browser follows the anchor; waiting for
  // the unmount would leave overflow hidden and the hash jump would not scroll.
  const readCaseFile = () => {
    unlockScrollRef.current();
    onClose();
  };

  return (
    <aside
      aria-labelledby="planet-panel-title"
      className="panel-enter pointer-events-auto fixed inset-x-0 bottom-0 z-40 max-h-[58svh] overflow-y-auto overscroll-contain rounded-t-xl border border-rule bg-ink/90 p-5 backdrop-blur-md md:absolute md:inset-x-auto md:bottom-8 md:right-[max(1rem,calc((100vw-1200px)/2))] md:top-24 md:max-h-none md:w-[400px] md:rounded-md md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-signal">Landed</p>
          <h2 id="planet-panel-title" ref={headingRef} tabIndex={-1} className="display display-md mt-1 outline-none">
            {planet.name}
          </h2>
        </div>
        <button type="button" onClick={onClose} className="btn shrink-0 px-3.5! py-2! text-sm!">
          Back to orbit
        </button>
      </div>

      <p className="mt-3 text-muted">{planet.tagline}</p>
      {canRoll ? <p className="mt-2 text-sm text-muted">Drag the planet to roll it around.</p> : null}

      {map ? (
        <div className="mt-6 border-y border-rule py-5">
          <p className="mb-4 text-sm text-muted">How data moves through it</p>
          <MapDiagram map={map} orientation="vertical" className="mx-auto max-w-[260px]" />
        </div>
      ) : null}

      <div className="mt-5">
        <p className="text-sm text-signal">Result</p>
        <p className="mt-1 text-lg font-semibold leading-snug">{planet.result}</p>
      </div>

      <a href={`#project-${planet.projectSlug}`} onClick={readCaseFile} className="btn btn-signal mt-6">
        Read more
      </a>
    </aside>
  );
}
