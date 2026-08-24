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
  source?: string
  project?: string
}

export interface ContactItem {
  label: string
  val: string
  href?: string
}

export const aboutHighlights = [
  'Technical and systems-level thinking grounded in practical software',
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
      'Won this university-level algorithmic coding competition twice, standing out among 20-30 people each year. Solved increasingly difficult problems under intense time pressure through fast reasoning, strong Java fundamentals, and precise implementation.'
  },
  {
    period: 'JUL 2026',
    title: 'eGovHackathon 2026 - Top 10 Finalist',
    source: 'https://github.com/Jerothegreat/eGovPHHackaton2026',
    project: 'https://e-handa.vercel.app/',
    summary:
      'Selected as a Top 10 Finalist for HANDA, a post-disaster household needs-assessment tool built as a super app integration with the eGovPH platform. The project focused on helping communities report urgent needs faster and giving responders clearer information to act on after a disaster.'
  }
]

export const contactItems: ContactItem[] = [
  { label: 'EMAIL', val: 'charles3togle@gmail.com', href: 'mailto:charles3togle@gmail.com' },
  { label: 'PHONE', val: '+63 9281995178', href: 'tel:+639281995178' },
  { label: 'LOCATION', val: 'Pasay City, PH' },
  {
    label: 'GITHUB',
    val: 'github.com/CharlesTogle',
    href: 'https://github.com/CharlesTogle'
  },
  {
    label: 'LINKEDIN',
    val: 'in/charles-nathaniel-togle',
    href: 'https://www.linkedin.com/in/charles-nathaniel-togle-09858b350/'
  },
  {
    label: 'FACEBOOK',
    val: 'facebook.com/charles3togle',
    href: 'https://www.facebook.com/charles3togle'
  }
]
