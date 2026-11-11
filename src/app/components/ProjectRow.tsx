"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "../data/portfolio";
import ProjectLinks from "./ProjectLinks";

// One line per project; the screenshot stays hidden behind the caret so the
// list reads as a compact index until someone asks to see a build.
export default function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  // Load the image on first open only, then keep it so closing can animate.
  const [loaded, setLoaded] = useState(false);
  const imageId = `project-${project.slug}-image`;

  return (
    <li id={`project-${project.slug}`} className="border-t border-rule py-6">
      <div className="grid gap-3 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,3fr)] md:gap-8">
        <div>
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted">
            {project.role}, {project.period}
          </p>
        </div>
        <p className="max-w-[60ch] text-muted">{project.summary}</p>
        <div className="flex items-start justify-between gap-4 md:justify-end">
          <ProjectLinks project={project} className="md:justify-end" />
          {project.screenshot ? (
            <button
              type="button"
              onClick={() => {
                setLoaded(true);
                setOpen((v) => !v);
              }}
              aria-expanded={open}
              aria-controls={imageId}
              aria-label={`${open ? "Hide" : "Show"} ${project.name} screenshot`}
              className="-m-1.5 shrink-0 rounded-sm p-1.5 text-muted hover:text-paper"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className={`size-4 transition-transform duration-200 ${open ? "" : "rotate-180"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.5 10 8 5.5 12.5 10" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>

      {project.screenshot ? (
        // Animating grid rows from 0fr to 1fr slides the panel to its natural
        // height without measuring it.
        <div
          id={imageId}
          inert={!open}
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`relative mt-5 aspect-16/10 max-w-3xl overflow-hidden rounded-md border border-rule bg-panel transition-[opacity,translate] duration-300 ease-out md:ml-[calc((100%-4rem)*4/13+2rem)] ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
            >
              {loaded ? (
                <Image
                  src={project.screenshot}
                  alt={`${project.name} screenshot`}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className={project.screenshotFit === "contain" ? "object-contain" : "object-cover object-top"}
                />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}
