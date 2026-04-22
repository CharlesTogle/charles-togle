'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Name Silhouette Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-center opacity-5">
          <h2 className="text-9xl font-bold tracking-tighter leading-tight" style={{ color: 'var(--primary)' }}>
            CHARLES
          </h2>
          <h3 className="text-7xl font-bold tracking-tighter mt-4" style={{ color: 'var(--primary)', letterSpacing: 'var(--ls-tight)' }}>
            NATHANIEL TOGLE
          </h3>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Terminal Frame - Sharp corners */}
        <div className="border shadow-2xl" style={{
          backgroundColor: 'var(--surface-container)',
          borderColor: 'var(--outline-variant)',
          borderWidth: '1px',
          borderRadius: '0px'
        }}>
          {/* Title Bar */}
          <div className="px-4 py-3 flex items-center gap-3" style={{
            backgroundColor: 'var(--surface-container-high)',
            borderBottom: '1px solid var(--outline-variant)',
            borderRadius: '0px'
          }}>
            <div className="flex gap-2">
              <div className="w-3 h-3" style={{ backgroundColor: '#ff5555' }}></div>
              <div className="w-3 h-3" style={{ backgroundColor: '#ffaa55' }}></div>
              <div className="w-3 h-3" style={{ backgroundColor: '#55ff55' }}></div>
            </div>
            <span className="text-xs font-mono ml-auto" style={{ color: 'var(--on-surface-variant)' }}>charles@abyss</span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Session ID */}
            <div className="text-sm font-mono tracking-widest" style={{ color: 'var(--outline)' }}>
              SESSION: ID_000_ABYSS
            </div>

            {/* Main Text - Pulsing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono" style={{ color: 'var(--outline)' }}>$</span>
                <span className={`font-mono text-2xl tracking-tight animate-pulse`} style={{ color: 'var(--primary)' }}>
                  Diving into the Abyss...
                </span>
              </div>
            </div>

            {/* Tags - Sharp corners, Primary container style */}
            <div className="flex gap-3 pt-4">
              <button
                className="px-4 py-2 text-xs font-mono font-bold tracking-wider transition-all"
                style={{
                  borderColor: 'var(--primary-container)',
                  color: 'var(--primary-container)',
                  backgroundColor: 'transparent',
                  border: '1px solid',
                  borderRadius: '0px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(191, 0, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(191, 0, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                CORE_SYSTEM.EXE
              </button>
              <button
                className="px-4 py-2 text-xs font-mono font-bold tracking-wider transition-all"
                style={{
                  borderColor: 'var(--primary-container)',
                  color: 'var(--primary-container)',
                  backgroundColor: 'transparent',
                  border: '1px solid',
                  borderRadius: '0px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(191, 0, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(191, 0, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                SHADOW_ROOT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay - Subtle */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(26, 16, 30, 0.4) 100%)',
        borderRadius: '0px'
      }}></div>
    </div>
  );
}
