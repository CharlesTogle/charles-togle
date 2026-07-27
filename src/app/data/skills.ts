export interface SkillEntry {
  name: string
}

export interface SkillGroup {
  label: string
  skills: SkillEntry[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'LANGUAGES & FRAMEWORKS',
    skills: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'ReactJS' },
      { name: 'Next.js' },
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Hono' }
    ]
  },
  {
    label: 'DATABASES',
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Supabase' }
    ]
  },
  {
    label: 'CLOUD & DEVOPS',
    skills: [
      { name: 'AWS (S3, CloudFront, RDS, Route53, Lightsail)' },
      { name: 'GCP' },
      { name: 'Docker' },
      { name: 'Nginx' },
      { name: 'VPS' }
    ]
  },
  {
    label: 'TOOLS',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Linux' },
      { name: 'SSH' },
      { name: 'Vercel' },
      { name: 'Render' },
      { name: 'GitHub Workflows' },
      { name: 'Tailscale' }
    ]
  },
  {
    label: 'OTHER',
    skills: [
      { name: 'API Integration' },
      { name: 'Full-stack Development' }
    ]
  }
]
