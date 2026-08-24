"use client";

import { ArrowDownRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const stats = [
  { value: "460K+", label: "records unified for scalable access" },
  { value: "5 FTE", label: "worth of manual work automated away" },
  { value: "$1K-$2K", label: "client requests processed in production" },
  { value: "168 students", label: "taught agentic coding" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const animateUp = reduceMotion ? {} : { opacity: 1, y: 0 };
  const initialUp = reduceMotion ? {} : { opacity: 0, y: 24 };

  return (
    <section id="hero" className="section-shell pb-10 pt-8 lg:pb-14 lg:pt-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
        <motion.div initial={initialUp} animate={animateUp} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="flex min-h-[calc(100dvh-9rem)] flex-col justify-center gap-8 lg:min-h-[calc(100dvh-8rem)]">
          <Image
            src="/profile.png"
            alt="Charles Togle"
            width={96}
            height={96}
            loading="eager"
            className="h-24 w-24 border object-cover"
            style={{ borderColor: "var(--border)" }}
          />
          <div className="inline-flex w-fit items-center gap-2 border px-3 py-2 text-sm" style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground-soft)" }}>
            Future Forward Deployed Engineer
          </div>
          <div className="max-w-3xl space-y-5">
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.06em] md:text-6xl lg:text-7xl">
              Charles Nathaniel Togle builds practical software with measurable impact.
            </h1>
            <p className="max-w-[58ch] text-lg leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
              Future Forward Deployed Engineer building practical software for real-world problems, from responsive interfaces to systems that help people operate better.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="button-primary">
              View Projects
              <ArrowRight size={16} />
            </a>
            <a href="#experience" className="button-secondary">
              See Experience
              <ArrowDownRight size={16} />
            </a>
            <a href="/RESUME_CHARLES_TOGLE.pdf" download className="button-secondary">
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.aside initial={initialUp} animate={animateUp} transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }} className="card-surface grid gap-0 overflow-hidden">
          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
            {stats.map((stat) => (
              <div key={stat.value} className="space-y-3 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <p className="metric-value font-semibold">{stat.value}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-soft)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t px-6 py-5 text-sm sm:px-8" style={{ borderColor: "var(--border)", background: "var(--accent-soft)", color: "var(--foreground-soft)" }}>
            Based in Pasay City, PH. Interested in real-world software, high-pressure delivery, and practical systems that help people operate better.
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
