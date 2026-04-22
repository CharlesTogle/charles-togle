'use client'

import { useEffect, useMemo, useState } from 'react'

const iconBtnStyle = (active: boolean) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? 'var(--primary-container)' : 'var(--outline)',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderLeft: active ? '2px solid var(--primary-container)' : '2px solid transparent',
  transition: 'color 0.15s'
})

const files = [
  { name: 'portfolio.sh', icon: '◈', sectionIds: ['hero', 'about'] },
  { name: 'projects.tsx', icon: '◈', sectionIds: ['projects'] },
  { name: 'experience.log', icon: '◈', sectionIds: ['experience'] },
  { name: 'skills.tsx', icon: '◈', sectionIds: ['skills'] },
  { name: 'README.md', icon: '≡', sectionIds: [] }
] as const

export default function Sidebar () {
  const [explorerOpen, setExplorerOpen] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeFile, setActiveFile] =
    useState<typeof files[number]['name']>('portfolio.sh')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme')
    const preferredTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark'

    setTheme(preferredTheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'light') {
      root.dataset.theme = 'light'
    } else {
      delete root.dataset.theme
    }

    window.localStorage.setItem('theme', theme)
  }, [theme])

  const trackedSections = useMemo(
    () =>
      files.flatMap(file =>
        file.sectionIds.map(sectionId => ({
          sectionId,
          fileName: file.name
        }))
      ),
    []
  )

  useEffect(() => {
    const sectionMap = new Map<string, number>()
    const sections = trackedSections
      .map(({ sectionId, fileName }) => {
        const element = document.getElementById(sectionId)
        return element ? { element, sectionId, fileName } : null
      })
      .filter(Boolean) as Array<{
      element: HTMLElement
      sectionId: string
      fileName: typeof files[number]['name']
    }>

    if (!sections.length) return

    const updateActiveFile = () => {
      if (window.scrollY < 80) {
        setActiveFile('portfolio.sh')
        return
      }

      let bestMatch = sections[0]
      let bestRatio = sectionMap.get(bestMatch.sectionId) ?? 0

      for (const section of sections) {
        const ratio = sectionMap.get(section.sectionId) ?? 0
        if (ratio > bestRatio) {
          bestMatch = section
          bestRatio = ratio
        }
      }

      if (bestRatio > 0) {
        setActiveFile(bestMatch.fileName)
        return
      }

      const viewportAnchor = window.innerHeight * 0.35
      const closestSection = [...sections]
        .reverse()
        .find(
          ({ element }) => element.getBoundingClientRect().top <= viewportAnchor
        )

      setActiveFile(closestSection?.fileName ?? 'portfolio.sh')
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          sectionMap.set(entry.target.id, entry.intersectionRatio)
        }
        updateActiveFile()
      },
      {
        rootMargin: '-64px 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1]
      }
    )

    for (const { element } of sections) {
      observer.observe(element)
    }

    window.addEventListener('scroll', updateActiveFile, { passive: true })
    updateActiveFile()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateActiveFile)
    }
  }, [trackedSections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div
      className='flex'
      style={{ position: 'fixed', top: '40px', left: 0, bottom: 0, zIndex: 40 }}
    >
      {/* Icon strip */}
      <div
        className='flex flex-col items-center pt-1'
        style={{
          width: '40px',
          backgroundColor: 'var(--sidebar-strip)',
          borderRight: '1px solid var(--shell-border)'
        }}
      >
        {/* Files */}
        <button
          style={iconBtnStyle(explorerOpen)}
          onClick={() => setExplorerOpen(v => !v)}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={e =>
            (e.currentTarget.style.color = explorerOpen ? 'var(--primary-container)' : 'var(--outline)')
          }
        >
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <path
              d='M2 3h5l2 2h7v10H2V3z'
              stroke='currentColor'
              strokeWidth='1.2'
              fill='none'
            />
          </svg>
        </button>

        {/* Theme toggle */}
        <button
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={iconBtnStyle(theme === 'light')}
          onClick={() => setTheme(current => (current === 'light' ? 'dark' : 'light'))}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={e =>
            (e.currentTarget.style.color =
              theme === 'light' ? 'var(--primary-container)' : 'var(--outline)')
          }
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            {theme === 'light' ? (
              <>
                <circle cx='8' cy='8' r='2.8' stroke='currentColor' strokeWidth='1.2' />
                <path
                  d='M8 1.4v1.8M8 12.8v1.8M1.4 8h1.8M12.8 8h1.8M3.3 3.3l1.3 1.3M11.4 11.4l1.3 1.3M3.3 12.7l1.3-1.3M11.4 4.6l1.3-1.3'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='square'
                />
              </>
            ) : (
              <path
                d='M10.8 2.2c-2.7.3-4.8 2.6-4.8 5.4 0 2.9 2.4 5.3 5.3 5.3 1.1 0 2.1-.3 2.9-.9a5.8 5.8 0 0 1-4.4 2C6.6 14 4 11.4 4 8.2c0-2.5 1.6-4.7 3.9-5.5.9-.3 1.9-.5 2.9-.5Z'
                stroke='currentColor'
                strokeWidth='1.2'
                strokeLinejoin='round'
              />
            )}
          </svg>
        </button>

        {/* Source control */}
        <button
          style={iconBtnStyle(false)}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--outline)')}
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <circle
              cx='4'
              cy='4'
              r='2'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <circle
              cx='12'
              cy='4'
              r='2'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <circle
              cx='4'
              cy='12'
              r='2'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <path
              d='M4 6v2a2 2 0 002 2h2M12 6v4'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='square'
            />
          </svg>
        </button>

        {/* Extensions */}
        <button
          style={iconBtnStyle(false)}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--outline)')}
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <rect
              x='1'
              y='1'
              width='6'
              height='6'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <rect
              x='9'
              y='1'
              width='6'
              height='6'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <rect
              x='1'
              y='9'
              width='6'
              height='6'
              stroke='currentColor'
              strokeWidth='1.2'
            />
            <rect
              x='9'
              y='9'
              width='6'
              height='6'
              stroke='currentColor'
              strokeWidth='1.2'
            />
          </svg>
        </button>

      </div>

      {/* Explorer panel */}
      {explorerOpen && (
        <div
          style={{
            width: '220px',
            backgroundColor: 'var(--sidebar-panel)',
            borderRight: '1px solid var(--shell-border)',
            overflow: 'hidden'
          }}
        >
          {/* Explorer header */}
          <div
            className='flex items-center justify-between px-4 py-2'
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              color: 'var(--outline)',
              borderBottom: '1px solid var(--shell-border)'
            }}
          >
            <span>EXPLORER</span>
            <span style={{ cursor: 'pointer', color: 'var(--outline)' }}>
              ···
            </span>
          </div>

          {/* File tree */}
          <div className='py-2'>
            {/* Root folder */}
            <div
              className='flex items-center gap-2 px-3 py-1'
              style={{
                fontSize: '12px',
                color: 'var(--on-surface-variant)',
                cursor: 'pointer'
              }}
            >
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path
                  d='M2 3l3 4 3-4'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='square'
                />
              </svg>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path
                  d='M1 2h4l1.5 1.5H13v8H1V2z'
                  stroke='var(--primary-container)'
                  strokeWidth='1'
                  fill='var(--accent-soft)'
                />
              </svg>
              <span
                style={{
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  color: 'var(--primary-container)'
                }}
              >
                CHARLES_TOGLE
              </span>
            </div>

            {/* Files */}
            {files.map(file => {
              const isActive = file.name === activeFile
              const isClickable = file.sectionIds.length > 0

              return (
                <div
                  key={file.name}
                  className='flex items-center gap-2 pl-8 pr-3 py-1 cursor-pointer transition-colors duration-100'
                  style={{
                    fontSize: '12px',
                    color: isActive ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                    backgroundColor: isActive ? 'var(--accent-active)' : 'transparent',
                    borderLeft: isActive
                      ? '2px solid var(--primary-container)'
                      : '2px solid transparent',
                    cursor: isClickable ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (file.sectionIds[0]) {
                      scrollToSection(file.sectionIds[0])
                    }
                  }}
                  onMouseEnter={e => {
                    if (!isActive && isClickable)
                      e.currentTarget.style.backgroundColor =
                        'var(--accent-hover)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <span
                    style={{
                      color: isActive ? 'var(--primary-container)' : 'var(--outline)',
                      fontSize: '10px'
                    }}
                  >
                    {file.icon}
                  </span>
                  <span>{file.name}</span>
                </div>
              )
            })}

            {/* Assets folder */}
            <div
              className='flex items-center gap-2 px-3 py-1 mt-1 cursor-pointer'
              style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}
            >
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path
                  d='M3 2l4 3-4 3'
                  stroke='currentColor'
                  strokeWidth='1.2'
                  strokeLinecap='square'
                />
              </svg>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path
                  d='M1 2h4l1.5 1.5H13v8H1V2z'
                  stroke='var(--outline)'
                  strokeWidth='1'
                  fill='transparent'
                />
              </svg>
              <span style={{ letterSpacing: '0.05em' }}>ASSETS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
