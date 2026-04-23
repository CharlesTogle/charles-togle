export interface HeaderTab {
  label: string
  active: boolean
}

export interface SidebarFile {
  name: string
  icon: string
  sectionIds: string[]
}

export const headerTabs: HeaderTab[] = [
  { label: 'ROOT', active: false },
  { label: 'SRC', active: false },
  { label: 'PORTFOLIO', active: true },
  { label: 'MAIN.JS', active: false }
]

export const sidebarFiles: SidebarFile[] = [
  { name: 'portfolio.sh', icon: '◈', sectionIds: ['hero', 'about'] },
  { name: 'projects.tsx', icon: '◈', sectionIds: ['projects'] },
  { name: 'experience.log', icon: '◈', sectionIds: ['experience'] },
  { name: 'skills.tsx', icon: '◈', sectionIds: ['skills'] }
]
