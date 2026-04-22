'use client'

import { useState, useRef, useEffect } from 'react'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const fadeUp = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(24px)',
  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
})

const groups = [
  {
    label: 'DATABASES',
    skills: [
      { name: 'PostgreSQL', pct: 80 },
      { name: 'MySQL',      pct: 70 },
      { name: 'Supabase',   pct: 90 },
    ],
  },
  {
    label: 'FRAMEWORKS',
    skills: [
      { name: 'ReactJS',  pct: 80 },
      { name: 'Next.JS',  pct: 65 },
      { name: 'Hono',     pct: 50 },
    ],
  },
  {
    label: 'CLOUD & DEVOPS',
    skills: [
      { name: 'AWS (S3, CloudFront, RDS, Route53, Lightsail)', pct: 55 },
      { name: 'GCP',     pct: 80 },
      { name: 'Vercel',  pct: 90 },
      { name: 'Docker',  pct: 65 },
      { name: 'Nginx',   pct: 55 },
    ],
  },
  {
    label: 'TOOLS & OS',
    skills: [
      { name: 'VPS & SSH',    pct: 90 },
      { name: 'Git & GitHub', pct: 90 },
      { name: 'Linux',        pct: 90 },
      { name: 'Figma',        pct: 50 },
    ],
  },
  {
    label: 'LANGUAGES',
    skills: [
      { name: 'English',  pct: 70 },
      { name: 'Filipino', pct: 95 },
    ],
  },
]

function SkillBar({ name, pct, animate }: { name: string; pct: number; animate: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span
          style={{
            fontSize: '18px',
            color: 'var(--on-surface-variant)',
            fontFamily: 'Space Grotesk, sans-serif',
            letterSpacing: '0.02em',
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: '15px',
            fontFamily: 'monospace',
            color: 'var(--outline)',
            letterSpacing: '0.08em',
          }}
        >
          {pct}%
        </span>
      </div>
      {/* Track */}
      <div
        style={{
          height: '3px',
          background: 'rgba(81,66,84,0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: animate ? `${pct}%` : '0%',
            background: '#bf00ff',
            transition: 'width 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  )
}

function SkillCard({ group, animate, delay }: { group: typeof groups[0]; animate: boolean; delay: number }) {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Group label */}
      <span
        style={{
          fontSize: '9px',
          fontFamily: 'monospace',
          letterSpacing: '0.14em',
          color: 'var(--outline)',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--outline-variant)',
          paddingBottom: '10px',
        }}
      >
        {group.label}
      </span>

      {/* Skill bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {group.skills.map((s) => (
          <SkillBar key={s.name} name={s.name} pct={s.pct} animate={animate} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const header = useInView()
  const grid = useInView(0.05)

  return (
    <section
      id="skills"
      style={{
        background: 'var(--section-bg)',
        padding: '48px 0',
        fontFamily: 'Space Grotesk, sans-serif',
        borderTop: '1px solid rgba(81,66,84,0.4)',
      }}
    >
      <div className='mx-auto max-w-[1200px] px-4 sm:px-8'>

        {/* Section label */}
        <div ref={header.ref} style={{ marginBottom: '24px', ...fadeUp(header.visible) }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--outline)', fontFamily: 'monospace' }}>
            $ SKILLS_
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '40px' }} />

        {/* Card grid */}
        <div
          ref={grid.ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            justifyContent: 'center',
            gap: '1px',
          }}
        >
          {groups.map((group, i) => (
            <SkillCard key={group.label} group={group} animate={grid.visible} delay={i * 80} />
          ))}
        </div>

        {/* Quote */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            ...fadeUp(grid.visible, 500),
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              fontStyle: 'italic',
              fontWeight: 700,
              color: 'var(--outline)',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            "Nothing is truly 100% Learnable in this world..."
          </p>
        </div>

      </div>
    </section>
  )
}
