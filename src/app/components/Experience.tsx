'use client'

import { useState, useRef, useEffect } from 'react'

function useInView(threshold = 0.12) {
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

const experience = [
  {
    period: 'SEPT 2025 – APR 2026',
    title: 'Dev Specialist',
    company: 'Centervert',
    location: 'Greenville, NC (Remote)',
    bullets: [
      'Reduced operational workload for a client by 4–6 hrs/day, eliminating need for 5 Full Time Employees through automation',
      'Built automated lead intake system (Supabase Edge Functions + GHL API), replacing manual CRM workflows and increasing lead intake by 30–40 per day',
      'Architected centralized database handling 460K+ records for scalable cross-system access',
      'Migrated 2 full-stack apps to AWS, improving scalability and reducing vendor dependency',
      'Contributed to payment portal (Next.js + Stripe) processing $1K–$2K/client requests',
      'Built CMS dashboard enabling non-technical clients to manage content independently, eliminating developer deployment dependency',
    ],
  },
  {
    period: 'MAR – MAY 2025',
    title: 'Developer & Project Manager',
    company: 'Freelance Software Engineer',
    location: 'Makati City, PH',
    bullets: [
      'Led development of a multi-tenant fitness education platform (React, PostgreSQL, Supabase)',
      'Designed role-based access system for Teachers and Students across 4 core modules',
      'Built quiz system tied to lecture content for structured assessments',
      'Implemented automated Physical Fitness Test classification using recorded sessions',
    ],
  },
  {
    period: 'FEB – APR 2025',
    title: 'Developer & Project Manager',
    company: 'University Project',
    location: 'University of Makati',
    bullets: [
      'Built centralized lost & found platform (React, Capacitor, FastifyJS, Supabase) for web and mobile',
      'Integrated AI image classification (Gemini API) to extract structured metadata (color, category, descriptors)',
      'Implemented PostgreSQL full-text + similarity search to match lost and found items',
    ],
  },
]

export default function Experience() {
  const header = useInView()
  const body = useInView()

  return (
    <section
      id="experience"
      style={{
        background: 'var(--section-bg)',
        padding: '48px 0',
        fontFamily: 'Space Grotesk, sans-serif',
        borderTop: '1px solid rgba(81,66,84,0.4)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section label */}
        <div ref={header.ref} style={{ marginBottom: '24px', ...fadeUp(header.visible) }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--outline)', fontFamily: 'monospace' }}>
            $ EXPERIENCE_
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '40px' }} />

        {/* Entries */}
        <div ref={body.ref} style={{ display: 'flex', flexDirection: 'column', ...fadeUp(body.visible, 100) }}>
          {experience.map((item, i) => (
            <div key={item.company + item.period}>
              {/* Entry */}
              <div style={{ padding: '32px 0' }}>
                {/* Period */}
                <span
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    color: '#bf00ff',
                    letterSpacing: '0.12em',
                    marginBottom: '6px',
                    textShadow: '0 0 8px rgba(191,0,255,0.4)',
                  }}
                >
                  {item.period}
                </span>

                {/* Title */}
                <span
                  style={{
                    display: 'block',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--on-surface)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '-0.01em',
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </span>

                {/* Company · Location */}
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: 'var(--outline)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}
                >
                  {item.company} · {item.location}
                </span>

                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {item.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          color: '#bf00ff',
                          flexShrink: 0,
                          fontSize: '14px',
                          lineHeight: 1.75,
                          textShadow: '0 0 8px rgba(191,0,255,0.6)',
                        }}
                      >
                        ›
                      </span>
                      <span
                        style={{
                          fontSize: '14px',
                          color: 'var(--on-surface-variant)',
                          lineHeight: 1.75,
                          fontFamily: 'Space Grotesk, sans-serif',
                        }}
                      >
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider between entries, not after last */}
              {i < experience.length - 1 && (
                <div style={{ height: '1px', background: 'var(--outline-variant)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
