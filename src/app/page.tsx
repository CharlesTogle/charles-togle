'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Silhouette at top */}
      <div className="absolute top-0 inset-x-0 h-80 flex justify-center pointer-events-none">
        <div className="w-32 h-full opacity-30">
          <svg
            viewBox="0 0 100 200"
            className="w-full h-full fill-gray-900"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M 50 0 Q 70 30 70 80 Q 70 120 60 140 L 60 200 L 40 200 L 40 140 Q 30 120 30 80 Q 30 30 50 0" />
          </svg>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Terminal Frame */}
        <div className="bg-[#1a1a1a] border border-[#333] shadow-2xl">
          {/* Title Bar */}
          <div className="bg-gray-800 px-4 py-2 flex items-center gap-3 border-b border-[#333]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-xs font-mono ml-auto">Charles—Abyss</span>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Session ID */}
            <div className="text-gray-500 text-sm font-mono tracking-widest">
              SESSION: ID_000_ABYSS
            </div>

            {/* Main Text */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 font-mono">$</span>
                <span className="text-cyan-400 font-mono text-2xl tracking-tight">
                  Diving into the Abyss...
                  <span className="cursor ml-1 inline-block w-3 h-6 bg-cyan-400"></span>
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-3 pt-4">
              <button className="px-4 py-2 border border-cyan-400/50 text-cyan-400 text-xs font-mono font-bold tracking-wider hover:bg-cyan-400/10 transition-colors">
                CORE_SYSTEM.EXE
              </button>
              <button className="px-4 py-2 border border-cyan-400/50 text-cyan-400 text-xs font-mono font-bold tracking-wider hover:bg-cyan-400/10 transition-colors">
                SHADOW_ROOT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none"></div>
    </div>
  );
}
