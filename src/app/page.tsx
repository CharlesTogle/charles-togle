'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0e0818' }}
    >
      {/* Name Silhouette — watermark behind everything */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <div className="text-center opacity-[0.04] leading-none">
          <div
            className="font-bold tracking-tighter"
            style={{ fontSize: '18vw', color: 'var(--primary)', letterSpacing: 'var(--ls-tight)' }}
          >
            CHARLES
          </div>
          <div
            className="font-bold tracking-tighter"
            style={{ fontSize: '9vw', color: 'var(--primary)', letterSpacing: 'var(--ls-tight)' }}
          >
            NATHANIEL TOGLE
          </div>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 w-full max-w-3xl mx-6">
        <div
          className="border"
          style={{
            backgroundColor: '#120a1a',
            borderColor: 'rgba(191,0,255,0.25)',
            borderRadius: 0,
            boxShadow: '0 0 40px rgba(191,0,255,0.08), inset 0 0 60px rgba(10,2,16,0.6)',
          }}
        >
          {/* Title Bar */}
          <div
            className="flex items-center gap-3 px-5 py-3"
            style={{
              backgroundColor: '#1a0d22',
              borderBottom: '1px solid rgba(191,0,255,0.2)',
            }}
          >
            {/* Traffic lights — muted squares matching image */}
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5" style={{ backgroundColor: '#8b3a2e' }} />
              <div className="w-3.5 h-3.5" style={{ backgroundColor: '#8b6c1e' }} />
              <div className="w-3.5 h-3.5" style={{ backgroundColor: '#2e6b3a' }} />
            </div>
            <span
              className="ml-3 font-mono tracking-widest"
              style={{ color: 'var(--outline)', fontSize: 'var(--fs-mono-label)' }}
            >
              SESSION: ID_000_ABYSS
            </span>
          </div>

          {/* Body */}
          <div className="px-6 py-8 space-y-8">
            {/* Main command line */}
            <div className="flex items-center gap-3">
              <span
                className="font-mono"
                style={{ color: 'var(--outline)', fontSize: '28px', lineHeight: 1 }}
              >
                $
              </span>
              <span
                className="font-mono animate-pulse"
                style={{ color: 'var(--primary-container)', fontSize: '28px', lineHeight: 1 }}
              >
                Diving into the Abyss...
              </span>
              {/* Cursor block — neon glow */}
              <span
                className="cursor"
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '28px',
                  backgroundColor: '#bf00ff',
                  flexShrink: 0,
                  boxShadow: '0 0 8px #bf00ff, 0 0 20px rgba(191,0,255,0.6), 0 0 40px rgba(191,0,255,0.3)',
                }}
              />
            </div>

            {/* Tags */}
            <div className="flex gap-3">
              <button
                className="font-mono font-bold tracking-widest transition-all duration-200"
                style={{
                  border: '1px solid var(--outline-variant)',
                  color: 'var(--on-surface-variant)',
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  padding: '6px 14px',
                  fontSize: 'var(--fs-mono-label)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-container)';
                  e.currentTarget.style.color = 'var(--primary-container)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(191,0,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--outline-variant)';
                  e.currentTarget.style.color = 'var(--on-surface-variant)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                CORE_SYSTEM.EXE
              </button>
              <button
                className="font-mono font-bold tracking-widest transition-all duration-200"
                style={{
                  border: '1px solid var(--outline-variant)',
                  color: 'var(--on-surface-variant)',
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  padding: '6px 14px',
                  fontSize: 'var(--fs-mono-label)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-container)';
                  e.currentTarget.style.color = 'var(--primary-container)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(191,0,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--outline-variant)';
                  e.currentTarget.style.color = 'var(--on-surface-variant)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                SHADOW_ROOT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
