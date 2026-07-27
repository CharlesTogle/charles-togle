export interface EducationEntry {
  period: string
  degree: string
  school: string
  bullets: string[]
}

export interface AwardEntry {
  period: string
  title: string
  summary: string
}

export interface ContactItem {
  label: string
  val: string
  href?: string
}

export const aboutHighlights = [
  'Seeking a junior software engineering role to keep growing technical and systems-level skills',
  'Strong interest in building real-world software and practical systems that help people operate better',
  'Comfortable in challenging, high-pressure environments with real delivery expectations',
  'Approachable, teachable, and committed to continuous improvement in team settings'
]

export const educationEntries: EducationEntry[] = [
  {
    period: 'EXPECTED MAY 2027',
    degree: 'Bachelor of Science in Computer Science, Major in Application Development',
    school: 'University of Makati · Makati City, Philippines',
    bullets: [
      "Dean's List - 1st & 2nd Sem, 2023-2024",
      "Dean's List - 1st & 2nd Sem, 2024-2025",
      "Dean's List - 1st & 2nd Sem, 2025-2026"
    ]
  },
  {
    period: 'MAY 2025',
    degree: 'Direcho Trabaho: Introduction to ReactJS',
    school: 'Certification / Training',
    bullets: []
  }
]

export const awardEntries: AwardEntry[] = [
  {
    period: 'NOV 2024, NOV 2025',
    title: 'Java Speed Coding - Infotech Winner',
    summary:
      'Won this university-level algorithmic coding competition twice, solving problems of increasing difficulty under time pressure against 10-15 competing pairs.'
  },
  {
    period: 'JUL 2026',
    title: 'eGovHackathon 2026 - Top 10 Finalist',
    summary:
      'Selected as a Top 10 Finalist for HANDA, a post-disaster household needs-assessment tool built as a super app integration with the eGovPH platform.'
  }
]

export const contactItems: ContactItem[] = [
  { label: 'EMAIL', val: 'charles3togle@gmail.com' },
  { label: 'PHONE', val: '+63 9281995178' },
  { label: 'LOCATION', val: 'Pasay City, PH' },
  {
    label: 'GITHUB',
    val: 'github.com/CharlesTogle',
    href: 'https://github.com/CharlesTogle'
  },
  {
    label: 'WEBSITE',
    val: 'charles-togle.vercel.app',
    href: 'https://charles-togle.vercel.app'
  },
  {
    label: 'LINKEDIN',
    val: 'in/charles-nathaniel-togle',
    href: 'https://www.linkedin.com/in/charles-nathaniel-togle-09858b350/'
  }
]
