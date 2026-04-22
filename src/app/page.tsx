'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#181021' }}>
      {/* Name Silhouette Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-center opacity-5">
          <h2 className="text-9xl font-bold tracking-tighter leading-none" style={{ color: '#ecb1ff' }}>
            CHARLES
          </h2>
          <h3 className="text-7xl font-bold tracking-tighter mt-4" style={{ color: '#ecb1ff' }}>
            NATHANIEL TOGLE
          </h3>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Terminal Frame */}
        <div className="border shadow-2xl" style={{ backgroundColor: '#241c2e', borderColor: '#514254' }}>
          {/* Title Bar */}
          <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: '#2f2638', borderBottom: '1px solid #514254' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs font-mono ml-auto" style={{ color: '#d5c0d7' }}>charles@abyss</span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Session ID */}
            <div className="text-sm font-mono tracking-widest" style={{ color: '#9d8ba0' }}>
              SESSION: ID_000_ABYSS
            </div>

            {/* Main Text - Pulsing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono" style={{ color: '#9d8ba0' }}>$</span>
                <span className={`font-mono text-2xl tracking-tight animate-pulse`} style={{ color: '#7dd8c0' }}>
                  Diving into the Abyss...
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 text-xs font-mono font-bold tracking-wider transition-colors" style={{ borderColor: '#ecb1ff', color: '#ecb1ff', border: '1px solid' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 177, 255, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                CORE_SYSTEM.EXE
              </button>
              <button className="px-4 py-2 text-xs font-mono font-bold tracking-wider transition-colors" style={{ borderColor: '#ecb1ff', color: '#ecb1ff', border: '1px solid' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(236, 177, 255, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                SHADOW_ROOT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, transparent, transparent, rgba(24, 16, 33, 0.5))' }}></div>
    </div>
  );
}
