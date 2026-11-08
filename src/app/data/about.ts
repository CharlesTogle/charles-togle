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

export const educationEntries: EducationEntry[] = [
  {
    period: 'Expected 2027',
    degree: 'Bachelor of Science in Computer Science, Major in Application Development',
    school: 'University of Makati, Makati City',
    bullets: [
      "Dean's List, 1st & 2nd Sem, 2023–2024",
      "Dean's List, 1st & 2nd Sem, 2024–2025",
      "Dean's List, 1st & 2nd Sem, 2025–2026"
    ]
  }
]

export const awardEntries: AwardEntry[] = [
  {
    period: 'Oct 2026',
    title: 'InfoTechnOlympics 2026 Hackathon: Champion, Best Prototype and Best Presenter',
    summary:
      'Won all three out of 7 teams by building, in 5 hours, a LangChain retrieval chatbot that answers questions from PDF documents and pulls student details from Technology-Based Learning (TBL) Hub accounts.'
  },
  {
    period: 'Jul 2026',
    title: 'eGovHackathon 2026: Top 10 Finalist',
    source: 'https://github.com/Jerothegreat/eGovPHHackaton2026',
    project: 'https://e-handa.vercel.app/',
    summary:
      'A national-level hackathon. Built eHANDA, a post-disaster household needs-assessment tool integrated with the eGovPH platform.'
  },
  {
    period: 'Nov 2024, Nov 2025',
    title: 'InfoTechnOlympics Java Speed Coding: Champion, two years running',
    summary:
      'First place in 2024 and 2025 against 10–15 competing pairs, solving easy-to-hard algorithmic problems in Java under a strict time limit.'
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

export const availability = 'Open to internships and full-time roles'

export function findContact(label: string) {
  return contactItems.find((item) => item.label === label)
}
