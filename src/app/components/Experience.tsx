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
      'Reduced client workload by 4–6 hrs/day and eliminated the need for 5 Full Time Employees by automating operational workflows',
      'Increased lead intake by 30–40 per day by building an automated lead intake system using Supabase Edge Functions and GHL API',
      'Enabled scalable cross-system access for 460K+ records by architecting a centralized database',
      'Improved scalability and reduced vendor dependency by migrating 2 full-stack apps to AWS',
      'Processed $1K–$2K/client requests in a payment portal built with Next.js and Stripe',
      'Eliminated developer deployment dependency by building a CMS dashboard that lets non-technical clients manage content independently',
    ],
  },
  {
    period: 'MAR – MAY 2025',
    title: 'Developer & Project Manager',
    company: 'Freelance Software Engineer',
    location: 'Makati City, PH',
    bullets: [
      'Delivered a multi-tenant fitness education platform by leading full-stack development using React, PostgreSQL, and Supabase',
      'Secured access for Teachers and Students across 4 core modules by designing a role-based access system',
'Automated Physical Fitness Test classification by implementing a session-based recording system',
    ],
  },
  {
    period: 'FEB – APR 2025',
    title: 'Developer & Project Manager',
    company: 'University Project',
    location: 'University of Makati',
    bullets: [
      'Unified lost & found reporting across web and mobile by building a centralized platform using React, Capacitor, FastifyJS, and Supabase',
      'Extracted structured metadata (color, category, descriptors) from item photos by integrating AI image classification via Gemini API',
      'Matched lost and found items accurately by implementing PostgreSQL full-text and similarity search',
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
      <div className='mx-auto max-w-[1200px] px-4 sm:px-8'>

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
              <div style={{ padding: '24px 0' }}>
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
                    fontSize: 'clamp(18px, 5vw, 20px)',
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
                          fontSize: '13px',
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
