export interface EducationEntry {
  period: string
  degree: string
  school: string
  bullets: string[]
}

export interface ContactItem {
  label: string
  val: string
  href?: string
}

export const aboutHighlights = [
  'Full-stack engineer across web, mobile, and cloud infrastructure',
  'Built systems handling 460K+ records and automated 5 FTE worth of daily work',
  'Shipped production apps on AWS, Vercel, and Supabase - real users, real impact',
  'Strong in JavaScript, React, Next.js, Node.js, PostgreSQL, and DevOps tooling'
]

export const educationEntries: EducationEntry[] = [
  {
    period: '2023 - EXPECTED 2027',
    degree: 'BS Computer Science - Application Development',
    school: 'University of Makati · Makati City, PH',
    bullets: [
      "Dean's List - 1st & 2nd Sem, 2023-2024",
      "Dean's List - 1st & 2nd Sem, 2024-2025",
      "Dean's List - 1st Sem, 2025-2026"
    ]
  },
  {
    period: 'GRADUATED 2022',
    degree: 'GED / Senior High School',
    school: 'Pasay City National Science HS · Pasay, PH',
    bullets: ['Graduated With Honors', 'Consistent With Honors']
  }
]

export const contactItems: ContactItem[] = [
  { label: 'EMAIL', val: 'charles3togle@gmail.com' },
  { label: 'LOCATION', val: 'Pasay City, PH' },
  {
    label: 'GITHUB',
    val: 'github.com/charlestogle',
    href: 'https://github.com/charlestogle/portfolio'
  },
  {
    label: 'LINKEDIN',
    val: 'in/charles-nathaniel-togle',
    href: 'https://www.linkedin.com/in/charles-nathaniel-togle-09858b350/'
  }
]
