'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Name Silhouette Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="text-center">
          <h2 className="text-9xl font-bold tracking-tighter leading-tight" style={{ color: 'var(--primary)', letterSpacing: 'var(--ls-tight)' }}>
            CHARLES
          </h2>
          <h3 className="text-8xl font-bold tracking-tighter" style={{ color: 'var(--primary)', letterSpacing: 'var(--ls-tight)' }}>
            NATHANIEL TOGLE
          </h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 py-20 space-y-16">

        {/* Hero Text Section */}
        <div className="space-y-8">
          {/* Prefix Label */}
          <div style={{ color: 'var(--outline)', fontSize: 'var(--fs-mono-label)', fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase' }}>
            $ WELCOME TO SECTOR
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 style={{
              fontSize: 'var(--fs-h1)',
              fontWeight: 'var(--fw-bold)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-tight)',
              color: 'var(--on-surface)'
            }}>
              Charles Nathaniel Togle
            </h1>

            {/* Subheading with accent */}
            <div className="flex items-baseline gap-3">
              <span style={{
                fontSize: 'var(--fs-h2)',
                fontWeight: 'var(--fw-semibold)',
                color: 'var(--primary-container)'
              }}>
                Forward Deployed Engineer
              </span>
              <span className="animate-pulse" style={{
                display: 'inline-block',
                width: '2px',
                height: '24px',
                backgroundColor: 'var(--primary-container)'
              }}></span>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 'var(--fs-body-lg)',
            fontWeight: 'var(--fw-regular)',
            lineHeight: 'var(--lh-relaxed)',
            color: 'var(--on-surface-variant)',
            maxWidth: '600px'
          }}>
            Full-stack systems engineer building high-impact solutions in real-world, high-pressure environments. Specializing in automation, cloud infrastructure, and scalable architectures.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            className="px-6 py-3 text-sm font-bold tracking-wider transition-all duration-200"
            style={{
              backgroundColor: 'var(--primary-container)',
              color: 'var(--on-primary-container)',
              borderRadius: '0px',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'var(--fs-mono-label)',
              letterSpacing: 'var(--ls-wide)',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 16px rgba(191, 0, 255, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            → View Projects
          </button>

          <button
            className="px-6 py-3 text-sm font-bold tracking-wider transition-all duration-200"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--primary-container)',
              border: '1px solid var(--primary-container)',
              borderRadius: '0px',
              cursor: 'pointer',
              fontSize: 'var(--fs-mono-label)',
              letterSpacing: 'var(--ls-wide)',
              textTransform: 'uppercase'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(191, 0, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(191, 0, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            → Contact
          </button>
        </div>

        {/* Stats / Skills Preview */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t" style={{ borderColor: 'var(--outline-variant)', paddingTop: 'var(--spacing-lg)' }}>
          <div>
            <div style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--primary)'
            }}>
              5+
            </div>
            <div style={{
              fontSize: 'var(--fs-body-md)',
              color: 'var(--on-surface-variant)',
              marginTop: 'var(--spacing-sm)'
            }}>
              Projects
            </div>
          </div>

          <div>
            <div style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--primary)'
            }}>
              3+
            </div>
            <div style={{
              fontSize: 'var(--fs-body-md)',
              color: 'var(--on-surface-variant)',
              marginTop: 'var(--spacing-sm)'
            }}>
              Years Exp
            </div>
          </div>

          <div>
            <div style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--primary)'
            }}>
              Full-Stack
            </div>
            <div style={{
              fontSize: 'var(--fs-body-md)',
              color: 'var(--on-surface-variant)',
              marginTop: 'var(--spacing-sm)'
            }}>
              Engineer
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(26, 16, 30, 0.6) 100%)',
        borderRadius: '0px'
      }}></div>
    </div>
  );
}
