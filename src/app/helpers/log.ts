import { experiences, projects } from '../data/portfolio'

export type BranchName =
  | 'main'
  | 'agentic'
  | 'android'
  | 'manualQuiz'
  | 'phishing'
  | 'hopeHub'
  | 'umakLink'
  | 'digitalPulse'

export interface BranchConfig {
  color: string
  label: string
  column: number
}

export interface CommitRow {
  kind: 'commit'
  hash: string
  title: string
  date: string
  branch: BranchName
  activeBranches: BranchName[]
}

export interface ConnectorRow {
  kind: 'branch-off' | 'merge-in'
  from: BranchName
  to: BranchName
  activeBranches: BranchName[]
}

export type LogRow = CommitRow | ConnectorRow

export const BRANCHES: Record<BranchName, BranchConfig> = {
  main: { color: '#bf00ff', label: 'main', column: 0 },
  agentic: { color: '#ffd84d', label: 'agentic-coding', column: 1 },
  android: { color: '#35cfff', label: 'android-llm', column: 2 },
  manualQuiz: { color: '#ff6b9a', label: 'manual-quiz', column: 1 },
  phishing: { color: '#7dff8a', label: 'phishing-scraper', column: 2 },
  hopeHub: { color: '#ff9b4a', label: 'hope-hub', column: 1 },
  umakLink: { color: '#59d7ff', label: 'umak-link', column: 1 },
  digitalPulse: { color: '#ffe36a', label: 'digital-pulse', column: 2 }
}

export const LOG_GRAPH_COLUMNS = [10, 42, 74]
export const LOG_ROW_HEIGHT = 54
export const LOG_GRAPH_WIDTH = 88
export const legendBranches: BranchName[] = [
  'main',
  'agentic',
  'android',
  'manualQuiz',
  'phishing',
  'hopeHub',
  'umakLink',
  'digitalPulse'
]

function hashFrom(value: string): string {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString(16).padStart(6, '0').slice(0, 6)
}

function experienceTitle(entry: (typeof experiences)[number]) {
  return `${entry.company} · ${entry.title}`
}

export function buildLogRows(): LogRow[] {
  const centervert = experiences.find(item => item.company === 'Centervert')
  const freelance = experiences.find(item => item.company === 'Freelance Software Engineer')
  const university = experiences.find(item => item.company === 'University Project')

  const hopeHub = projects.find(item => item.code === 'HOPE_HUB')
  const umakLink = projects.find(item => item.code === 'UMAK_LINK')
  const androidServer = projects.find(item => item.code === 'ANDROID_LLM_SERVER')
  const manualQuiz = projects.find(item => item.code === 'MANUAL_QUIZ_APP')
  const digitalPulse = projects.find(item => item.code === 'DIGITAL_PULSE')
  const phishingScraper = projects.find(item => item.code === 'PHISHING_SCRAPER')
  const agenticSlides = projects.find(item => item.code === 'AGENTIC_CODING_SLIDES')

  if (
    !centervert ||
    !freelance ||
    !university ||
    !hopeHub ||
    !umakLink ||
    !androidServer ||
    !manualQuiz ||
    !digitalPulse ||
    !phishingScraper ||
    !agenticSlides
  ) {
    throw new Error('Portfolio data is incomplete for the git log page.')
  }

  return [
    {
      kind: 'commit',
      hash: hashFrom(`${centervert.company}-${centervert.period}`),
      title: experienceTitle(centervert),
      date: centervert.period,
      branch: 'main',
      activeBranches: ['main']
    },
    { kind: 'branch-off', from: 'main', to: 'agentic', activeBranches: ['main'] },
    { kind: 'branch-off', from: 'main', to: 'android', activeBranches: ['main', 'agentic'] },
    {
      kind: 'commit',
      hash: hashFrom(agenticSlides.name),
      title: agenticSlides.name,
      date: agenticSlides.period,
      branch: 'agentic',
      activeBranches: ['main', 'agentic', 'android']
    },
    {
      kind: 'commit',
      hash: hashFrom(androidServer.name),
      title: androidServer.name,
      date: androidServer.period,
      branch: 'android',
      activeBranches: ['main', 'agentic', 'android']
    },
    { kind: 'merge-in', from: 'agentic', to: 'main', activeBranches: ['main', 'agentic', 'android'] },
    { kind: 'merge-in', from: 'android', to: 'main', activeBranches: ['main', 'android'] },
    { kind: 'branch-off', from: 'main', to: 'manualQuiz', activeBranches: ['main'] },
    { kind: 'branch-off', from: 'main', to: 'digitalPulse', activeBranches: ['main', 'manualQuiz'] },
    {
      kind: 'commit',
      hash: hashFrom(digitalPulse.name),
      title: digitalPulse.name,
      date: digitalPulse.period,
      branch: 'digitalPulse',
      activeBranches: ['main', 'manualQuiz', 'digitalPulse']
    },
    {
      kind: 'commit',
      hash: hashFrom(manualQuiz.name),
      title: manualQuiz.name,
      date: manualQuiz.period,
      branch: 'manualQuiz',
      activeBranches: ['main', 'manualQuiz', 'digitalPulse']
    },
    { kind: 'merge-in', from: 'digitalPulse', to: 'main', activeBranches: ['main', 'manualQuiz', 'digitalPulse'] },
    { kind: 'merge-in', from: 'manualQuiz', to: 'main', activeBranches: ['main', 'manualQuiz'] },
    { kind: 'branch-off', from: 'main', to: 'phishing', activeBranches: ['main'] },
    {
      kind: 'commit',
      hash: hashFrom(phishingScraper.name),
      title: phishingScraper.name,
      date: phishingScraper.period,
      branch: 'phishing',
      activeBranches: ['main', 'phishing']
    },
    { kind: 'merge-in', from: 'phishing', to: 'main', activeBranches: ['main', 'phishing'] },
    {
      kind: 'commit',
      hash: hashFrom(`${freelance.company}-${freelance.period}`),
      title: experienceTitle(freelance),
      date: freelance.period,
      branch: 'main',
      activeBranches: ['main']
    },
    { kind: 'branch-off', from: 'main', to: 'hopeHub', activeBranches: ['main'] },
    {
      kind: 'commit',
      hash: hashFrom(hopeHub.name),
      title: hopeHub.name,
      date: hopeHub.period,
      branch: 'hopeHub',
      activeBranches: ['main', 'hopeHub']
    },
    { kind: 'merge-in', from: 'hopeHub', to: 'main', activeBranches: ['main', 'hopeHub'] },
    {
      kind: 'commit',
      hash: hashFrom(`${university.company}-${university.period}`),
      title: experienceTitle(university),
      date: university.period,
      branch: 'main',
      activeBranches: ['main']
    },
    { kind: 'branch-off', from: 'main', to: 'umakLink', activeBranches: ['main'] },
    {
      kind: 'commit',
      hash: hashFrom(umakLink.name),
      title: umakLink.name,
      date: umakLink.period,
      branch: 'umakLink',
      activeBranches: ['main', 'umakLink']
    },
    { kind: 'merge-in', from: 'umakLink', to: 'main', activeBranches: ['main', 'umakLink'] }
  ]
}

export function getGraphX(branch: BranchName): number {
  return LOG_GRAPH_COLUMNS[BRANCHES[branch].column]
}

export function getBranchLabel(rows: LogRow[], row: LogRow, index: number): string | null {
  if (row.kind !== 'commit') return null
  if (index === 0 && row.branch === 'main') return 'HEAD -> main'

  const previous = rows[index - 1]
  if (previous?.kind === 'branch-off' && previous.to === row.branch) {
    return BRANCHES[row.branch].label
  }

  return null
}

export function getLineSpan(row: LogRow, branch: BranchName) {
  if (row.kind !== 'merge-in') {
    return { y1: 0, y2: LOG_ROW_HEIGHT }
  }

  if (branch === row.from) {
    return { y1: 0, y2: LOG_ROW_HEIGHT / 2 }
  }

  return { y1: 0, y2: LOG_ROW_HEIGHT }
}

export function getVisibleBranches(row: LogRow): BranchName[] {
  if (row.kind === 'commit') {
    return row.activeBranches
  }

  if (row.kind === 'branch-off') {
    return [row.from]
  }

  return [row.to]
}

export function curvedPath(from: BranchName, to: BranchName, merge: boolean): string {
  const startX = getGraphX(from)
  const endX = getGraphX(to)
  const midY = LOG_ROW_HEIGHT / 2
  const startY = merge ? 0 : midY
  const endY = merge ? midY : LOG_ROW_HEIGHT
  const horizontalPull = Math.abs(endX - startX) * 0.7

  if (merge) {
    const controlY1 = LOG_ROW_HEIGHT * 0.22
    const controlY2 = LOG_ROW_HEIGHT * 0.78
    return `M ${startX} ${startY} C ${startX} ${controlY1}, ${endX} ${controlY2}, ${endX} ${endY}`
  }

  const controlX1 = startX + horizontalPull
  const controlX2 = endX
  const controlY1 = midY
  const controlY2 = LOG_ROW_HEIGHT * 0.78

  return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`
}
