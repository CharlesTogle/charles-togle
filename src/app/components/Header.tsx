'use client'

import { useEffect, useState } from 'react'

const tabs = [
  { label: 'ROOT', active: false },
  { label: 'SRC', active: false },
  { label: 'PORTFOLIO', active: true },
  { label: 'MAIN.JS', active: false }
]

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-10 items-stretch"
      style={{
        backgroundColor: 'var(--shell-top)',
        borderBottom: '1px solid var(--shell-border-strong)',
      }}
    >
      <div
        className="flex items-center gap-3 px-3 md:px-4 shrink-0 font-mono font-bold tracking-widest"
        style={{
          fontSize: '13px',
          borderRight: '1px solid var(--shell-border-strong)',
          minWidth: 'fit-content',
        }}
      >
        <button
          type="button"
          aria-label="Open cabinet"
          className="md:hidden flex h-7 w-7 items-center justify-center"
          style={{ color: 'var(--outline)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={() => window.dispatchEvent(new Event('toggle-mobile-sidebar'))}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 3h12M2 8h12M2 13h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </button>
        <span style={{ fontSize: '14px', color: 'var(--primary-container)', opacity: 0.9 }}>◆</span>
        <span className="hidden sm:inline" style={{ color: 'var(--on-surface)', opacity: 0.75 }}>charles@portfolio: ~</span>
        <span className="sm:hidden" style={{ color: 'var(--on-surface)', opacity: 0.75 }}>CT</span>
      </div>

      <div className="hidden md:flex items-stretch flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className="relative flex items-center px-5 font-mono tracking-widest transition-colors duration-150"
            style={{
              fontSize: '11px',
              color: tab.active ? 'var(--primary-container)' : 'var(--outline)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRight: '1px solid var(--shell-border)',
            }}
            onMouseEnter={(e) => {
              if (!tab.active) e.currentTarget.style.color = 'var(--on-surface-variant)'
            }}
            onMouseLeave={(e) => {
              if (!tab.active) e.currentTarget.style.color = 'var(--outline)'
            }}
          >
            {tab.label}
            {tab.active && (
              <span
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '2px',
                  backgroundColor: 'var(--primary-container)',
                  boxShadow: '0 0 6px var(--accent-glow)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        className="ml-auto flex items-center gap-1 px-2 md:px-3 shrink-0"
        style={{ borderLeft: '1px solid var(--shell-border-strong)' }}
      >
        <button
          type="button"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="flex items-center justify-center transition-colors duration-150"
          style={{
            width: '28px',
            height: '28px',
            color: theme === 'light' ? 'var(--primary-container)' : 'var(--outline)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => setTheme(current => (current === 'light' ? 'dark' : 'light'))}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = theme === 'light' ? 'var(--primary-container)' : 'var(--outline)')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {theme === 'light' ? (
              <>
                <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M8 1.4v1.8M8 12.8v1.8M1.4 8h1.8M12.8 8h1.8M3.3 3.3l1.3 1.3M11.4 11.4l1.3 1.3M3.3 12.7l1.3-1.3M11.4 4.6l1.3-1.3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </>
            ) : (
              <path
                d="M10.8 2.2c-2.7.3-4.8 2.6-4.8 5.4 0 2.9 2.4 5.3 5.3 5.3 1.1 0 2.1-.3 2.9-.9a5.8 5.8 0 0 1-4.4 2C6.6 14 4 11.4 4 8.2c0-2.5 1.6-4.7 3.9-5.5.9-.3 1.9-.5 2.9-.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>
    </header>
  )
}
