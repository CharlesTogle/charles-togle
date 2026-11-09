"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { availability } from "../../data/about";
import { planets } from "../../data/planets";
import { readLowPower, useLowPower } from "../../hooks/useLowPower";
import Availability from "../Availability";
import PlanetPanel from "./PlanetPanel";
import type { SolarSceneController } from "./scene";
import ShipLog from "./ShipLog";
import StaticSystem from "./StaticSystem";
import { useVisitedPlanets } from "./useVisitedPlanets";

const planetIds = planets.map((p) => p.id);

export default function SolarHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SolarSceneController | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sceneState, setSceneState] = useState<"loading" | "ready" | "unavailable">("loading");
  // Bumped each time a 3D scene is created so selection and visits re-apply to it.
  const [sceneVersion, setSceneVersion] = useState(0);
  const lowPower = useLowPower();
  const showStatic = lowPower || sceneState === "unavailable";
  const { visited, markVisited } = useVisitedPlanets(planetIds);

  const select = useCallback(
    (id: string) => {
      if (document.activeElement instanceof HTMLElement) returnFocusRef.current = document.activeElement;
      setSelectedId(id);
      markVisited(id);
      // On phones the scene sits above the buttons; bring it back into view
      // so the landing is visible above the bottom sheet.
      if (window.matchMedia("(max-width: 767px)").matches) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [markVisited],
  );

  // The newborn black hole points to its grown-up self at the bottom of the page.
  const visitBlackHole = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const close = useCallback(() => {
    setSelectedId(null);
    returnFocusRef.current?.focus({ preventScroll: true });
  }, []);

  // Load three.js after first paint so the headline never waits on it.
  useEffect(() => {
    // Hydration renders with the server's "full power" assumption first, so
    // check the real preference here too; otherwise three.js would start
    // downloading before the stored simple mode setting applies.
    if (lowPower || readLowPower()) return;
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    import("./scene").then(({ createSolarScene }) => {
      if (cancelled) return;
      const controller = createSolarScene(canvas, {
        planets,
        reducedMotion,
        onHover: setHoveredId,
        onSelect: select,
        onBlackHole: visitBlackHole,
      });
      controllerRef.current = controller;
      setSceneState(controller ? "ready" : "unavailable");
      setSceneVersion((v) => v + 1);
    });

    return () => {
      cancelled = true;
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, [select, visitBlackHole, lowPower]);

  useEffect(() => controllerRef.current?.select(selectedId), [selectedId, sceneVersion]);
  useEffect(() => controllerRef.current?.setVisited(visited), [visited, sceneVersion]);

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, close]);

  const selected = planets.find((p) => p.id === selectedId) ?? null;

  return (
    <section id="hero" className="relative overflow-hidden md:h-svh md:min-h-[680px]">
      <div
        className={`relative md:absolute md:inset-0 md:h-auto ${showStatic ? "pt-16 md:pt-0" : "h-[56svh]"}`}
        aria-hidden="true"
      >
        {showStatic ? (
          // On phones the drawing sets its own height (it matches the SVG's
          // aspect ratio) so it doesn't float in empty space above the copy.
          <div className="aspect-[1120/580] w-full px-2 md:ml-auto md:aspect-auto md:h-full md:w-[68%] md:px-0 md:pb-24 md:pt-20">
            <StaticSystem
              planets={planets}
              selectedId={selectedId}
              hoveredId={hoveredId}
              visited={visited}
              onSelect={select}
              onHover={setHoveredId}
              onBlackHole={visitBlackHole}
            />
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={`block size-full transition-opacity duration-700 ${sceneState === "ready" ? "opacity-100" : "opacity-0"} ${
              selectedId ? "touch-none" : "touch-pan-y"
            }`}
          />
        )}
      </div>

      <div className="pointer-events-none relative md:absolute md:inset-0">
        <div className="shell flex h-full flex-col justify-end gap-8 pb-10 pt-6 md:pb-12 md:pt-24">
          <div className={`transition-opacity duration-500 ${selected ? "md:pointer-events-none md:opacity-0" : "opacity-100"}`}>
            <Availability label={availability} className="inline-flex text-sm" />
            <h1 className="display mt-6 max-w-[12ch] text-[clamp(2.5rem,6.4vw,6rem)]">I build the systems behind the software.</h1>
            <p className="lede mt-6 max-w-[46ch]">
              Full-stack engineer, graduating in CS from the University of Makati in May 2027.
              Every planet here is a system I&apos;ve shipped. Land on one.
            </p>
          </div>

          <div className="pointer-events-auto flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Land on a planet">
                {planets.map((planet) => {
                  const active = planet.id === selectedId || planet.id === hoveredId;
                  return (
                    <button
                      key={planet.id}
                      type="button"
                      aria-pressed={planet.id === selectedId}
                      onClick={() => select(planet.id)}
                      onMouseEnter={() => controllerRef.current?.highlight(planet.id)}
                      onMouseLeave={() => controllerRef.current?.highlight(null)}
                      onFocus={() => controllerRef.current?.highlight(planet.id)}
                      onBlur={() => controllerRef.current?.highlight(null)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm backdrop-blur-sm transition-colors ${
                        active ? "border-paper bg-paper text-ink" : "border-rule-strong bg-ink/60 text-muted hover:border-paper hover:text-paper"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        style={{ background: planet.palette[0] }}
                        className={`size-2 rounded-full ${visited.includes(planet.id) ? "ring-2 ring-signal ring-offset-1 ring-offset-ink" : ""}`}
                      />
                      {planet.name}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="/RESUME_CHARLES_TOGLE.pdf" download className="btn bg-ink/60 backdrop-blur-sm">
                  Download resume
                </a>
              </div>
            </div>
            <ShipLog visited={visited} />
          </div>
        </div>
      </div>

      {selected ? <PlanetPanel planet={selected} canRoll={!showStatic} onClose={close} /> : null}
    </section>
  );
}
