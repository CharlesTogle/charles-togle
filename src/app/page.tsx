'use client'

import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Experience from './components/Experience'

export default function Home () {
  return (
    <>
      <div
        id='hero'
        className='relative flex min-h-[calc(100vh-40px)] w-full items-center justify-center overflow-hidden px-4 sm:px-6'
        style={{ backgroundColor: 'var(--hero-bg)' }}
      >
        {/* Terminal Window */}
        <div className='relative z-10 w-full max-w-3xl'>
          <div
            className='border'
            style={{
              backgroundColor: 'var(--hero-panel)',
              borderColor: 'var(--shell-border-strong)',
              borderRadius: 0,
              boxShadow: 'var(--hero-panel-shadow)'
            }}
          >
            {/* Title Bar */}
            <div
              className='flex items-center gap-3 px-4 py-3 sm:px-5'
              style={{
                backgroundColor: 'var(--hero-titlebar)',
                borderBottom: '1px solid var(--shell-border-strong)'
              }}
            >
              {/* Traffic lights — muted squares matching image */}
              <div className='flex gap-2'>
                <div
                  className='w-3.5 h-3.5'
                  style={{ backgroundColor: '#8b3a2e' }}
                />
                <div
                  className='w-3.5 h-3.5'
                  style={{ backgroundColor: '#8b6c1e' }}
                />
                <div
                  className='w-3.5 h-3.5'
                  style={{ backgroundColor: '#2e6b3a' }}
                />
              </div>
              <span
                className='ml-2 font-mono tracking-widest sm:ml-3'
                style={{
                  color: 'var(--outline)',
                  fontSize: 'var(--fs-mono-label)'
                }}
              >
                <span className='hidden sm:inline'>SESSION: ID_000_ABYSS</span>
                <span className='sm:hidden'>ID_000_ABYSS</span>
              </span>
            </div>

            {/* Body */}
            <div className='space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8'>
              {/* Main command line */}
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                <span
                  className='font-mono'
                  style={{
                    color: 'var(--outline)',
                    fontSize: 'clamp(20px, 6vw, 28px)',
                    lineHeight: 1
                  }}
                >
                  $
                </span>
                <span
                  className='font-mono animate-pulse'
                  style={{
                    color: 'var(--primary-container)',
                    fontSize: 'clamp(20px, 6vw, 28px)',
                    lineHeight: 1
                  }}
                >
                  Diving into the Abyss...
                </span>
                {/* Cursor block — neon glow */}
                <span
                  className='cursor'
                  style={{
                    display: 'inline-block',
                    width: '14px',
                    height: '28px',
                    backgroundColor: 'var(--primary-container)',
                    flexShrink: 0,
                    boxShadow: '0 0 8px var(--primary-container), 0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow-soft)'
                  }}
                />
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-3'>
                <button
                  className='font-mono font-bold tracking-widest transition-all duration-200'
                  style={{
                    border: '1px solid var(--outline-variant)',
                    color: 'var(--on-surface-variant)',
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    padding: '6px 14px',
                    fontSize: 'var(--fs-mono-label)',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor =
                      'var(--primary-container)'
                    e.currentTarget.style.color = 'var(--primary-container)'
                    e.currentTarget.style.boxShadow = '0 0 8px var(--accent-glow)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--outline-variant)'
                    e.currentTarget.style.color = 'var(--on-surface-variant)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  CORE_SYSTEM.EXE
                </button>
                <button
                  className='font-mono font-bold tracking-widest transition-all duration-200'
                  style={{
                    border: '1px solid var(--outline-variant)',
                    color: 'var(--on-surface-variant)',
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    padding: '6px 14px',
                    fontSize: 'var(--fs-mono-label)',
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor =
                      'var(--primary-container)'
                    e.currentTarget.style.color = 'var(--primary-container)'
                    e.currentTarget.style.boxShadow = '0 0 8px var(--accent-glow)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--outline-variant)'
                    e.currentTarget.style.color = 'var(--on-surface-variant)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  SHADOW_ROOT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <button
          type='button'
          className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
          style={{
            color: 'var(--outline)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--primary-container)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--outline)'
          }}
          aria-label='Scroll to about section'
        >
          <span
            className='font-mono tracking-widest'
            style={{ fontSize: 'var(--fs-mono-label)' }}
          >
            SCROLL
          </span>
          <svg
            className='animate-bounce'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M3 5l5 6 5-6'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='square'
            />
          </svg>
        </button>
      </div>
      <About />
      <Projects />
      <Experience />
      <Skills />
    </>
  )
}
