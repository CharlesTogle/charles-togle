'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { sidebarFiles } from '../data/navigation'
import {
  MOBILE_SIDEBAR_CLOSE_DELAY_MS,
  buildTrackedSidebarSections,
  getActiveSidebarFile,
  getSidebarSectionElements,
  iconButtonStyle,
  scrollToSection,
  setDesktopSidebarWidth
} from '../helpers/sidebar'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const closeTimeoutRef = useRef<number | null>(null)
  const [mobilePhase, setMobilePhase] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed')
  const [activeFile, setActiveFile] =
    useState<typeof sidebarFiles[number]['name']>('portfolio.sh')
  const isHomePage = pathname === '/'
  const isLogPage = pathname === '/log'
  const mobileVisible = mobilePhase !== 'closed'
  const mobileOpen = mobilePhase === 'open'
  const displayedActiveFile = isHomePage ? activeFile : 'portfolio.sh'

  const trackedSections = useMemo(() => buildTrackedSidebarSections(), [])

  useEffect(() => {
    const openMobileDrawer = () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }

      setMobilePhase(current => {
        if (current === 'open' || current === 'opening') {
          return current
        }

        window.requestAnimationFrame(() => {
          setMobilePhase(next => (next === 'opening' ? 'open' : next))
        })

        return 'opening'
      })
    }

    const closeMobileDrawer = () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }

      setMobilePhase(current => {
        if (current === 'closed' || current === 'closing') {
          return current
        }

        closeTimeoutRef.current = window.setTimeout(() => {
          setMobilePhase('closed')
          closeTimeoutRef.current = null
        }, MOBILE_SIDEBAR_CLOSE_DELAY_MS)

        return 'closing'
      })
    }

    const handleToggle = () => {
      if (mobileOpen) {
        closeMobileDrawer()
        return
      }

      openMobileDrawer()
    }

    const handleClose = () => closeMobileDrawer()
    window.addEventListener('toggle-mobile-sidebar', handleToggle)
    window.addEventListener('close-mobile-sidebar', handleClose)

    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }
      window.removeEventListener('toggle-mobile-sidebar', handleToggle)
      window.removeEventListener('close-mobile-sidebar', handleClose)
    }
  }, [mobileOpen])

  useEffect(() => {
    setDesktopSidebarWidth(isLogPage)

    return () => {
      setDesktopSidebarWidth(false)
    }
  }, [isLogPage])

  useEffect(() => {
    if (!isHomePage) return

    const sections = getSidebarSectionElements(trackedSections)
    if (!sections.length) return

    const updateActiveFile = () => setActiveFile(getActiveSidebarFile(sections))

    const observer = new IntersectionObserver(
      () => updateActiveFile(),
      {
        rootMargin: '-64px 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1]
      }
    )

    for (const { element } of sections) {
      observer.observe(element)
    }

    window.addEventListener('scroll', updateActiveFile, { passive: true })
    window.addEventListener('resize', updateActiveFile)
    updateActiveFile()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateActiveFile)
      window.removeEventListener('resize', updateActiveFile)
    }
  }, [isHomePage, trackedSections])

  const sidebarContent = (
    <div className='flex h-full'>
      <div
        className='flex flex-col items-center pt-1'
        style={{
          width: '40px',
          backgroundColor: 'var(--sidebar-strip)',
          borderRight: '1px solid var(--shell-border)'
        }}
      >
        <button
          type='button'
          aria-label='Go to home page'
          style={iconButtonStyle(isHomePage)}
          onClick={() => {
            router.push('/')
            window.dispatchEvent(new Event('close-mobile-sidebar'))
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={e =>
            (e.currentTarget.style.color = isHomePage ? 'var(--primary-container)' : 'var(--outline)')
          }
        >
          <svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
            <path d='M2 3h5l2 2h7v10H2V3z' stroke='currentColor' strokeWidth='1.2' fill='none' />
          </svg>
        </button>

        <button
          style={iconButtonStyle(false)}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary-container)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--outline)')}
        >
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <rect x='1' y='1' width='6' height='6' stroke='currentColor' strokeWidth='1.2' />
            <rect x='9' y='1' width='6' height='6' stroke='currentColor' strokeWidth='1.2' />
            <rect x='1' y='9' width='6' height='6' stroke='currentColor' strokeWidth='1.2' />
            <rect x='9' y='9' width='6' height='6' stroke='currentColor' strokeWidth='1.2' />
          </svg>
        </button>
      </div>

      {!isLogPage && (
        <div
          style={{
            width: '220px',
            backgroundColor: 'var(--sidebar-panel)',
            borderRight: '1px solid var(--shell-border)',
            overflow: 'hidden'
          }}
        >
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
            <span>CABINET</span>
            <button
              type='button'
              className='md:hidden'
              style={{ color: 'var(--outline)', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => window.dispatchEvent(new Event('close-mobile-sidebar'))}
            >
              CLOSE
            </button>
            <span className='hidden md:inline' style={{ cursor: 'pointer', color: 'var(--outline)' }}>···</span>
          </div>

          <div className='py-2'>
            <div
              className='flex items-center gap-2 px-3 py-1'
              style={{
                fontSize: '12px',
                color: 'var(--on-surface-variant)',
                cursor: 'pointer'
              }}
            >
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path d='M2 3l3 4 3-4' stroke='currentColor' strokeWidth='1.2' strokeLinecap='square' />
              </svg>
              <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
                <path d='M1 2h4l1.5 1.5H13v8H1V2z' stroke='var(--primary-container)' strokeWidth='1' fill='var(--accent-soft)' />
              </svg>
              <span style={{ fontWeight: '600', letterSpacing: '0.05em', color: 'var(--primary-container)' }}>
                CHARLES_TOGLE
              </span>
            </div>

            {sidebarFiles.map(file => {
              const isActive = file.name === displayedActiveFile
              const isClickable = file.sectionIds.length > 0

              return (
                <div
                  key={file.name}
                  className='flex items-center gap-2 pl-8 pr-3 py-2 cursor-pointer transition-colors duration-100'
                  style={{
                    fontSize: '12px',
                    color: isActive ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                    backgroundColor: isActive ? 'var(--accent-active)' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--primary-container)' : '2px solid transparent',
                    cursor: isClickable ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (file.sectionIds[0]) {
                      scrollToSection(file.sectionIds[0])
                    }
                  }}
                  onMouseEnter={e => {
                    if (!isActive && isClickable) {
                      e.currentTarget.style.backgroundColor = 'var(--accent-hover)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <span style={{ color: isActive ? 'var(--primary-container)' : 'var(--outline)', fontSize: '10px' }}>
                    {file.icon}
                  </span>
                  <span>{file.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      <div className='hidden md:flex' style={{ position: 'fixed', top: '40px', left: 0, bottom: 0, zIndex: 40 }}>
        {sidebarContent}
      </div>

      {mobileVisible && (
        <div
          className='md:hidden fixed inset-0 top-10 z-40 flex transition-opacity duration-200 ease-out'
          style={{ opacity: mobileOpen ? 1 : 0 }}
        >
          <div
            className='h-full shadow-2xl transition-transform duration-200 ease-out'
            style={{
              width: '260px',
              transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}
          >
            {sidebarContent}
          </div>
          <button
            type='button'
            aria-label='Close cabinet'
            className='flex-1'
            style={{
              backgroundColor: 'rgba(4, 0, 10, 0.72)',
              border: 'none',
              cursor: 'pointer',
              opacity: mobileOpen ? 1 : 0
            }}
            onClick={() => window.dispatchEvent(new Event('close-mobile-sidebar'))}
          />
        </div>
      )}
    </>
  )
}
