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

const highlights = [
  'Full-stack engineer across web, mobile, and cloud infrastructure',
  'Built systems handling 460K+ records and automated 5 FTE worth of daily work',
  'Shipped production apps on AWS, Vercel, and Supabase — real users, real impact',
  'Strong in JavaScript, React, Next.js, Node.js, PostgreSQL, and DevOps tooling',
]

const education = [
  {
    period: '2023 – EXPECTED 2027',
    degree: 'BS Computer Science — Application Development',
    school: 'University of Makati · Makati City, PH',
    bullets: [
      "Dean's List — 1st & 2nd Sem, 2023–2024",
      "Dean's List — 1st & 2nd Sem, 2024–2025",
      "Dean's List — 1st Sem, 2025–2026",
    ],
  },
  {
    period: 'GRADUATED 2022',
    degree: 'GED / Senior High School',
    school: 'Pasay City National Science HS · Pasay, PH',
    bullets: ['Graduated With Honors', 'Consistent With Honors'],
  },
]

export default function About() {
  const header = useInView()
  const body = useInView()

  return (
    <section
      id="about"
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
            $ ABOUT_
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '40px' }} />

        {/* Body */}
        <div
          ref={body.ref}
          style={{
            ...fadeUp(body.visible),
          }}
        >
          <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Bio */}
            <p
              style={{
                margin: 0,
                fontSize: '15px',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.75,
                fontFamily: 'Space Grotesk, sans-serif',
                maxWidth: '820px',
              }}
            >
              Aspiring web systems engineer seeking a Junior Software Engineer role, with a long-term goal of becoming a{' '}
              <span
                style={{
                  color: '#bf00ff',
                  fontWeight: 700,
                  textShadow: '0 0 12px rgba(191,0,255,0.5)',
                }}
              >
                Forward Deployed Engineer
              </span>
              . Strong interest in building real-world software, thrives in challenging and high-pressure environments.
              Motivated to learn deeply from both systems and people — communicates effectively, approachable, and
              committed to delivering practical, high-quality solutions.
            </p>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--outline-variant)' }} />

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {highlights.map((h) => (
                <div key={h} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
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
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--outline-variant)' }} />

            {/* Education */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--outline)',
                  fontFamily: 'monospace',
                  marginBottom: '20px',
                }}
              >
                EDUCATION
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {education.map((edu) => (
                  <div key={edu.degree}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        color: '#bf00ff',
                        letterSpacing: '0.1em',
                        marginBottom: '2px',
                        textShadow: '0 0 8px rgba(191,0,255,0.4)',
                      }}
                    >
                      {edu.period}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--on-surface)',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      {edu.degree}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        color: 'var(--outline)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}
                    >
                      {edu.school}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {edu.bullets.map((b) => (
                        <div key={b} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              color: '#bf00ff',
                              flexShrink: 0,
                              fontSize: '14px',
                              textShadow: '0 0 8px rgba(191,0,255,0.6)',
                            }}
                          >
                            ›
                          </span>
                          <span
                            style={{
                              fontSize: '13px',
                              color: 'var(--on-surface-variant)',
                              fontFamily: 'Space Grotesk, sans-serif',
                              lineHeight: 1.5,
                            }}
                          >
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--outline-variant)' }} />

            {/* Contact */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: 'var(--outline)',
                  fontFamily: 'monospace',
                  marginBottom: '16px',
                }}
              >
                CONTACT
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'EMAIL',    val: 'charles3togle@gmail.com' },
                  { label: 'LOCATION', val: 'Pasay City, PH' },
                  { label: 'GITHUB',   val: 'github.com/charlestogle',         href: 'https://github.com/charlestogle/portfolio' },
                  { label: 'LINKEDIN', val: 'in/charles-nathaniel-togle',      href: 'https://www.linkedin.com/in/charles-nathaniel-togle-09858b350/' },
                ].map(({ label, val, href }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#bf00ff', letterSpacing: '0.12em', minWidth: '72px', flexShrink: 0 }}>
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '12px', color: 'var(--on-surface-variant)', fontFamily: 'monospace', textDecoration: 'none', borderBottom: '1px solid rgba(191,0,255,0.3)', transition: 'color 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#bf00ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--on-surface-variant)')}
                      >
                        {val}
                      </a>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)', fontFamily: 'monospace' }}>{val}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
