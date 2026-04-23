'use client'

import { contactItems, educationEntries, aboutHighlights } from '../data/about'
import { fadeUp } from '../helpers/animations'
import { useInView } from '../helpers/useInView'

export default function About() {
  const [headerRef, headerVisible] = useInView()
  const [bodyRef, bodyVisible] = useInView()

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
      <div className='mx-auto max-w-[1200px] px-4 sm:px-8'>

        {/* Section label */}
        <div ref={headerRef} style={{ marginBottom: '24px', ...fadeUp(headerVisible) }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--outline)', fontFamily: 'monospace' }}>
            $ ABOUT_
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '40px' }} />

        {/* Body */}
        <div
          ref={bodyRef}
          style={{
            ...fadeUp(bodyVisible),
          }}
        >
          <div className='flex flex-col gap-8 px-0 py-6 sm:px-4 sm:py-8 md:px-9'>

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
              {aboutHighlights.map((h) => (
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
                {educationEntries.map((edu) => (
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
                {contactItems.map(({ label, val, href }) => (
                  <div key={label} className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3'>
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
