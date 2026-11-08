"use client";

import { useEffect, useRef } from "react";

/**
 * The Petrova line continued below the solar system: a thin infrared thread
 * down the page margin. Everything above the reader's position glows brighter
 * and a bright point travels with the scroll. The thread ends beside the
 * element marked `data-petrova-end` (the contact buttons).
 *
 * Renders inside a `position: relative` wrapper around the page sections and
 * writes two CSS variables on that wrapper; the drawing is all CSS.
 */
export default function PetrovaThread() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = markerRef.current?.parentElement;
    if (!track) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const trackRect = track.getBoundingClientRect();
      const end = track.querySelector<HTMLElement>("[data-petrova-end]");
      const endRect = end?.getBoundingClientRect();
      const endY = endRect ? endRect.top + endRect.height / 2 - trackRect.top : trackRect.height;
      // The bright point sits a little above the middle of the screen.
      const reading = window.innerHeight * 0.55 - trackRect.top;
      track.style.setProperty("--petrova-end", `${Math.max(endY, 0)}px`);
      track.style.setProperty("--petrova-progress", `${Math.min(Math.max(reading, 0), endY)}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(track);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <span ref={markerRef} aria-hidden="true" className="petrova-rail" />
      <span aria-hidden="true" className="petrova-lit" />
      <span aria-hidden="true" className="petrova-head" />
      <span aria-hidden="true" className="petrova-end" />
    </>
  );
}
