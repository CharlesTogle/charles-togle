export interface SkillEntry {
  name: string
  pct: number
}

export interface SkillGroup {
  label: string
  skills: SkillEntry[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'DATABASES',
    skills: [
      { name: 'PostgreSQL', pct: 80 },
      { name: 'MySQL', pct: 70 },
      { name: 'Supabase', pct: 90 }
    ]
  },
  {
    label: 'FRAMEWORKS',
    skills: [
      { name: 'ReactJS', pct: 80 },
      { name: 'Next.JS', pct: 65 },
      { name: 'Hono', pct: 50 }
    ]
  },
  {
    label: 'CLOUD & DEVOPS',
    skills: [
      { name: 'AWS (S3, CloudFront, RDS, Route53, Lightsail)', pct: 55 },
      { name: 'GCP', pct: 80 },
      { name: 'Vercel', pct: 90 },
      { name: 'Docker', pct: 65 },
      { name: 'Nginx', pct: 55 }
    ]
  },
  {
    label: 'TOOLS & OS',
    skills: [
      { name: 'VPS & SSH', pct: 90 },
      { name: 'Git & GitHub', pct: 90 },
      { name: 'Linux', pct: 90 },
      { name: 'Figma', pct: 50 }
    ]
  },
  {
    label: 'LANGUAGES',
    skills: [
      { name: 'English', pct: 70 },
      { name: 'Filipino', pct: 95 }
    ]
  }
]
