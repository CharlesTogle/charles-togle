'use client'

import { experiences } from '../data/portfolio'
import { fadeUp } from '../helpers/animations'
import { useInView } from '../helpers/useInView'

export default function Experience() {
  const [headerRef, headerVisible] = useInView()
  const [bodyRef, bodyVisible] = useInView()

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
        <div ref={headerRef} style={{ marginBottom: '24px', ...fadeUp(headerVisible) }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--outline)', fontFamily: 'monospace' }}>
            $ EXPERIENCE_
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--outline-variant)', marginBottom: '40px' }} />

        {/* Entries */}
        <div ref={bodyRef} style={{ display: 'flex', flexDirection: 'column', ...fadeUp(bodyVisible, 100) }}>
          {experiences.map((item, i) => (
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
              {i < experiences.length - 1 && (
                <div style={{ height: '1px', background: 'var(--outline-variant)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
