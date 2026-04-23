'use client'

import { useEffect, useState } from 'react'
import { projects, type Project } from '../data/portfolio'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconEdu () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <path d='M8 2L1 6l7 4 7-4-7-4z' />
      <path d='M1 6v5' />
      <path d='M4 7.5v3.5c0 1.1 1.8 2 4 2s4-.9 4-2V7.5' />
    </svg>
  )
}

function IconLink () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <path d='M6.5 9.5a3.5 3.5 0 0 0 4.95 0l2-2a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25' />
      <path d='M9.5 6.5a3.5 3.5 0 0 0-4.95 0l-2 2a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25' />
    </svg>
  )
}

function IconTerminal () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <rect x='1' y='2' width='14' height='12' />
      <path d='M4 6l3 3-3 3' />
      <path d='M9 12h3' />
    </svg>
  )
}

function IconQuiz () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <rect x='2' y='1' width='12' height='14' />
      <path d='M5 6l2 2 4-4' />
      <path d='M5 10h6' />
    </svg>
  )
}

function IconPulse () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <path d='M1 8h2v-4h3v8h3v-4h3v4h1' />
    </svg>
  )
}

function IconShield () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <path d='M8 1L2 4v4c0 3.5 2.5 6.2 6 7 3.5-.8 6-3.5 6-7V4L8 1z' />
    </svg>
  )
}

function IconSlides () {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.2'
    >
      <rect x='1' y='2' width='14' height='10' />
      <path d='M6 7l4-2v4L6 7z' />
      <path d='M6 14l2-2 2 2' />
    </svg>
  )
}

function ProjectIcon ({ icon }: { icon: string }) {
  switch (icon) {
    case 'edu':
      return <IconEdu />
    case 'link':
      return <IconLink />
    case 'terminal':
      return <IconTerminal />
    case 'quiz':
      return <IconQuiz />
    case 'pulse':
      return <IconPulse />
    case 'shield':
      return <IconShield />
    case 'slides':
      return <IconSlides />
    default:
      return <IconTerminal />
  }
}

// ─── Featured Card ────────────────────────────────────────────────────────────

function FeaturedCard ({ project }: { project: Project }) {
  return (
    <div
      style={{
        background: 'var(--surface-container-low)',
        border: '1px solid var(--outline-variant)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Visual area */}
      <div
        style={{
          height: 'clamp(200px, 42vw, 280px)',
          background: 'var(--surface-container-lowest)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              opacity: 0.85
            }}
          />
        ) : (
          <span
            style={{
              fontSize: '15vw',
              fontWeight: 700,
              color: '#bf00ff',
              opacity: 0.06,
              lineHeight: 1,
              userSelect: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              position: 'absolute'
            }}
          >
            {project.id}
          </span>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top, #0d0917 0%, transparent 100%)'
          }}
        />
      </div>

      {/* Meta area */}
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1
        }}
      >
        {/* Project label */}
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.1em',
            color: '#bf00ff',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}
        >
          PROJECT_{project.id}
        </span>

        {/* Name */}
        <h3
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--on-surface)',
            margin: 0,
            fontFamily: 'Space Grotesk, sans-serif'
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '14px',
            color: 'var(--on-surface-variant)',
            margin: 0,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'Space Grotesk, sans-serif'
          }}
        >
          {project.description}
        </p>

        {/* Role & Period */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span
            style={{
              fontSize: 'var(--fs-mono-label)',
              letterSpacing: 'var(--ls-wide)',
              color: 'var(--outline)',
              fontFamily: 'monospace',
              textTransform: 'uppercase'
            }}
          >
            ROLE: {project.role}
          </span>
          <span
            style={{
              fontSize: 'var(--fs-mono-label)',
              letterSpacing: 'var(--ls-wide)',
              color: 'var(--outline)',
              fontFamily: 'monospace',
              textTransform: 'uppercase'
            }}
          >
            PERIOD: {project.period}
          </span>
        </div>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.map(t => (
            <span
              key={t}
              style={{
                fontSize: '10px',
                color: 'var(--primary)',
                background: 'rgba(191,0,255,0.1)',
                border: '1px solid rgba(191,0,255,0.3)',
                padding: '2px 8px',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.05em'
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '4px',
            flexWrap: 'wrap'
          }}
        >
          {project.links.live && (
            <ActionButton
              href={project.links.live}
              variant='solid'
              label='EXECUTE'
            />
          )}
          {project.links.source && (
            <ActionButton
              href={project.links.source}
              variant='outline'
              label='SOURCE'
            />
          )}
          {project.links.source2 && (
            <ActionButton
              href={project.links.source2}
              variant='outline'
              label='SOURCE_2'
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Action Button ────────────────────────────────────────────────────────────

function ActionButton ({
  href,
  variant,
  label
}: {
  href: string
  variant: 'solid' | 'outline'
  label: string
}) {
  const [hovered, setHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    padding: '6px 16px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'Space Grotesk, sans-serif',
    display: 'inline-block',
    transition: 'box-shadow 0.2s, background 0.2s',
    borderRadius: 0
  }

  const solidStyle: React.CSSProperties = {
    ...baseStyle,
    background: '#bf00ff',
    color: '#ffffff',
    border: 'none',
    boxShadow: hovered ? '0 0 12px rgba(191,0,255,0.5)' : 'none'
  }

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    background: hovered ? 'rgba(191,0,255,0.1)' : 'transparent',
    color: '#bf00ff',
    border: '1px solid #bf00ff'
  }

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      style={variant === 'solid' ? solidStyle : outlineStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

// ─── Mini Card ────────────────────────────────────────────────────────────────

function MiniCard ({
  project,
  active,
  onClick
}: {
  project: Project
  active: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        background: active
          ? 'rgba(191,0,255,0.08)'
          : hovered
          ? 'rgba(191,0,255,0.05)'
          : 'transparent',
        borderLeft: active ? '2px solid #bf00ff' : '2px solid transparent',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: '1px solid var(--outline-variant)',
        padding: '16px',
        cursor: 'pointer',
        transition: 'background 0.15s'
      }}
    >
      {/* Icon */}
      <span style={{ color: '#bf00ff', display: 'block', lineHeight: 0 }}>
        <ProjectIcon icon={project.icon} />
      </span>

      {/* Code name */}
      <span
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: active ? '#bf00ff' : 'var(--on-surface)',
          marginTop: '12px',
          fontFamily: 'Space Grotesk, sans-serif'
        }}
      >
        {project.code}
      </span>

      {/* Description */}
      <span
        style={
          {
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '11px',
            color: 'var(--outline)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginTop: '4px',
            lineHeight: 1.5,
            fontFamily: 'Space Grotesk, sans-serif'
          } as React.CSSProperties
        }
      >
        {project.description}
      </span>

      {/* Role + Period */}
      <span
        style={{
          display: 'block',
          fontSize: '10px',
          color: 'var(--outline-variant)',
          marginTop: '6px',
          fontFamily: 'monospace',
          letterSpacing: '0.05em'
        }}
      >
        {project.role} · {project.period}
      </span>
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Projects () {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const featured = projects[activeIndex]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sync = () => setIsMobile(window.innerWidth < 768)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <section
      id='projects'
      style={{
        background: 'var(--section-bg-alt)',
        padding: '80px 0',
        fontFamily: 'Space Grotesk, sans-serif'
      }}
    >
      <div className='mx-auto max-w-[1200px] px-4 sm:px-8'>
        {/* Section header */}
        <div style={{ marginBottom: '24px' }}>
          <span
            style={{
              fontSize: 'var(--fs-mono-label)',
              letterSpacing: 'var(--ls-wide)',
              color: 'var(--outline)',
              fontFamily: 'monospace'
            }}
          >
            $ PROJECTS_
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--outline-variant)',
            marginBottom: '32px'
          }}
        />

        {/* Two-column grid */}
        <div
          className='grid grid-cols-1 md:grid-cols-[60%_40%]'
          style={{
            display: 'grid',
            gap: '0',
            alignItems: 'start'
          }}
        >
          {/* Left: Featured card */}
          <FeaturedCard project={featured} />

          {/* Right: Mini card list */}
          <div
            style={{
              height: isMobile ? 'auto' : '640px',
              overflowY: 'auto',
              border: '1px solid var(--outline-variant)',
              borderLeft: isMobile
                ? '1px solid var(--outline-variant)'
                : 'none',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--outline-variant) transparent'
            }}
          >
            {projects.map((project, index) => (
              <MiniCard
                key={project.id}
                project={project}
                active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
