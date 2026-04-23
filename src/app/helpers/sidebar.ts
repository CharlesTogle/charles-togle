import { sidebarFiles, type SidebarFile } from '../data/navigation'

export const MOBILE_SIDEBAR_CLOSE_DELAY_MS = 220

export interface TrackedSidebarSection {
  sectionId: string
  fileName: SidebarFile['name']
}

export function iconButtonStyle(active: boolean): React.CSSProperties {
  return {
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
  }
}

export function buildTrackedSidebarSections(): TrackedSidebarSection[] {
  return sidebarFiles.flatMap(file =>
    file.sectionIds.map(sectionId => ({
      sectionId,
      fileName: file.name
    }))
  )
}

export function getSidebarSectionElements(trackedSections: TrackedSidebarSection[]) {
  return trackedSections
    .map(({ sectionId, fileName }) => {
      const element = document.getElementById(sectionId)
      return element ? { element, sectionId, fileName } : null
    })
    .filter(Boolean) as Array<{
    element: HTMLElement
    sectionId: string
    fileName: SidebarFile['name']
  }>
}

export function getActiveSidebarFile(
  sections: Array<{ element: HTMLElement; fileName: SidebarFile['name'] }>
): SidebarFile['name'] {
  const viewportAnchor = window.innerHeight * 0.35
  const scrollTop = window.scrollY
  const scrollBottom = scrollTop + window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  if (scrollTop < 80) {
    return 'portfolio.sh'
  }

  if (documentHeight - scrollBottom < 24) {
    return sections[sections.length - 1].fileName
  }

  for (const section of [...sections].reverse()) {
    const rect = section.element.getBoundingClientRect()
    if (rect.top <= viewportAnchor) {
      return section.fileName
    }
  }

  return sections[0].fileName
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (!element) return

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })

  window.dispatchEvent(new Event('close-mobile-sidebar'))
}

export function setDesktopSidebarWidth(isLogPage: boolean) {
  document.documentElement.style.setProperty(
    '--desktop-sidebar-width',
    isLogPage ? '40px' : '260px'
  )
}
