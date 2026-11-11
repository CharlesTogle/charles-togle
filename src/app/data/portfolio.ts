export interface ProjectLinks {
  /** The client or employer's own site, for work that isn't publicly viewable */
  company?: string
  live?: string
  source?: string
  source2?: string
}

export interface Project {
  slug: string
  name: string
  summary: string
  role: string
  period: string
  tech: string[]
  status?: string
  links: ProjectLinks
  screenshot?: string
  screenshotFit?: 'cover' | 'contain'
}

export interface ExperienceEntry {
  period: string
  title: string
  company: string
  location: string
  bullets: string[]
  /** Links this role to its project, for links, stack and the solar-system anchor */
  projectSlug?: string
}

export const projects: Project[] = [
  {
    slug: 'crm',
    name: 'Centervert',
    summary: 'Lead intake, a 460K-record CRM schema, and change-request billing for a US agency.',
    role: 'Dev specialist, remote',
    period: 'Sep 2025 – Apr 2026',
    tech: ['Supabase', 'Edge Functions', 'Next.js', 'Stripe', 'GoHighLevel API'],
    links: { company: 'https://centervert.com/' }
  },
  {
    slug: 'katada',
    name: 'Katada Van Rentals',
    summary: 'A rental platform that replaced a paid booking service for a van rental business.',
    role: 'Full-stack developer, freelance',
    period: 'Jul – Aug 2026',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'PL/pgSQL', 'Edge Functions', 'TanStack Query'],
    links: { live: 'https://katada-van-rentals.vercel.app/' },
    screenshot: '/projects/katada-van-rentals.png'
  },
  {
    slug: 'budgie',
    name: 'Budgie',
    summary: 'A financial planning app for Filipinos that forecasts each month’s spending from PSA household consumption data.',
    role: 'Full-stack and ML engineer',
    period: '2026 – present',
    status: 'In progress',
    tech: ['Python', 'FastAPI', 'statsmodels', 'SciPy', 'React Native', 'Expo', 'SQLite', 'Express', 'Supabase', 'Cloud Run'],
    links: {
      live: 'https://budgie-finances.app',
      source: 'https://github.com/VibeCoders-3DCSAD/Budgie'
    },
    screenshot: '/projects/budgie.png'
  },
  {
    slug: 'sic',
    name: 'UMak SIC App',
    summary: 'Event registration, emailed QR passes and attendance for the University of Makati’s SIC.',
    role: 'Lead developer',
    period: 'Sep 2026 – present',
    tech: ['Next.js', 'Prisma', 'Neon Postgres', 'Neon Auth', 'GitHub Actions', 'Vercel', 'Vitest', 'Playwright'],
    links: { source: 'https://github.com/UMak-SIC/sic-app' }
  },
  {
    slug: 'ehanda',
    name: 'eHanda',
    summary:
      'Post-disaster household needs assessment for the eGovPH super app. I led scoping in an 8-hour build and wrote the assessment builder and realtime dashboards. Top 10 at eGovHackathon 2026.',
    role: 'Technical lead',
    period: 'Jul 2026',
    tech: ['React', 'TypeScript', 'Supabase Realtime', 'eGovPH SSO'],
    links: {
      live: 'https://e-handa.vercel.app/',
      source: 'https://github.com/CharlesTogle/eGovPHHackaton2026'
    },
    screenshot: '/projects/e-handa.png',
    screenshotFit: 'contain'
  },
  {
    slug: 'ccis',
    name: 'CCIS Centralized Portal',
    summary:
      'Student council portal for UMak’s computing college: events with QR attendance passes, transparency records and role-aware admin, locked down with RLS.',
    role: 'Full-stack engineer',
    period: 'Aug 2026',
    tech: ['React', 'Supabase', 'Realtime', 'GSAP'],
    links: { live: 'https://ccis-rose.vercel.app' },
    screenshot: '/projects/ccis-central-portal.png'
  },
  {
    slug: 'homeserver',
    name: 'HomeServer Lite + NginxConf',
    summary:
      'My private file cloud: a React and Fastify app behind nginx, private BIND DNS and Tailscale, firewalled to the tailnet.',
    role: 'Solo',
    period: '2026',
    tech: ['Fastify', 'Nginx', 'BIND', 'Tailscale', 'UFW'],
    links: {
      source: 'https://github.com/CharlesTogle/HomeServer-Lite',
      source2: 'https://github.com/CharlesTogle/NginxConf'
    },
    screenshot: '/projects/home-server-lite.png'
  },
  {
    slug: 'umak-link',
    name: 'Umak Link',
    summary:
      'Lost and found for UMak on web and mobile. Gemini reads item photos, and Postgres full-text and similarity search pairs lost with found.',
    role: 'Full-stack developer, team of four',
    period: '2025 – 2026',
    tech: ['Ionic', 'Next.js', 'Fastify', 'Gemini', 'Cloud Run'],
    links: {
      live: 'https://umak-link-web.vercel.app/',
      source: 'https://github.com/CharlesTogle/umak-link-web',
      source2: 'https://github.com/CharlesTogle/umak-link-backend'
    },
    screenshot: '/projects/umak-link.png'
  },
  {
    slug: 'hope-hub',
    name: 'Hope Hub',
    summary:
      'A PE platform with gated lectures, resumable timed quizzes and automatic Physical Fitness Test classification.',
    role: 'Full-stack developer, team of five',
    period: 'Mar – May 2025',
    tech: ['React', 'PostgreSQL', 'Supabase', 'Recharts'],
    links: {
      live: 'https://hope-hub-fitness.vercel.app/',
      source: 'https://github.com/CharlesTogle/Hope-Hub'
    },
    screenshot: '/projects/hope-hub.png'
  },
  {
    slug: 'digital-pulse',
    name: 'Digital Pulse Converter',
    summary: 'Draws NRZ, RZ, Manchester, AMI and CMI line coding from any text. 50+ students used it for networking coursework.',
    role: 'Co-developer',
    period: 'Mar 2026',
    tech: ['React', 'Canvas', 'SVG'],
    links: {
      live: 'https://digital-pulsify.vercel.app/',
      source: 'https://github.com/CharlesTogle/DigitalPulsify'
    },
    screenshot: '/projects/digital-pulse.png'
  },
  {
    slug: 'quiz',
    name: 'Manual Quiz App',
    summary: 'A zero-backend quiz tool that 40+ classmates used to review for exams.',
    role: 'Solo',
    period: 'Mar 2026',
    tech: ['JavaScript', 'Web Storage'],
    links: {
      live: 'https://not-so-simple-quiz-app.vercel.app/',
      source: 'https://github.com/CharlesTogle/not-so-simple-quiz-app'
    },
    screenshot: '/projects/manual-quiz.png'
  },
  {
    slug: 'android-llm',
    name: 'Android LLM Server',
    summary: 'A guide to running TinyLlama on an Android phone with Termux and Ollama, served over the local network.',
    role: 'Author',
    period: 'Feb 2026',
    tech: ['Termux', 'Ollama', 'SSH'],
    links: { source: 'https://github.com/CharlesTogle/android-server-with-llm' },
    screenshot: '/projects/android-llm-server.png'
  }
]

export const experiences: ExperienceEntry[] = [
  {
    period: 'Sep 2026 – present',
    title: 'Lead Developer',
    company: 'SIC App, University of Makati',
    projectSlug: 'sic',
    location: 'Makati City, Philippines',
    bullets: [
      'Handled 100–200 event registrations in a single day by building a Postgres-backed ticket email queue with job leases, idempotency keys, retries and provider failover',
      'Automated pull request checks and separated production, staging and dev by building GitHub Actions CI on throwaway Neon database branches with matching Vercel deployments',
      'Cut check-in wait from 5–10 minutes in line to about 5 seconds per student by building emailed QR passes, server-side ticket verification and attendance tracking'
    ]
  },
  {
    period: 'Jul – Aug 2026',
    title: 'Full Stack Developer',
    company: 'Katada Transportation Services (Freelance)',
    projectSlug: 'katada',
    location: 'Pasay City, Philippines',
    bullets: [
      'Removed the client’s ₱1,000/month platform fee by delivering a rental system covering bookings, fleet, payments, KPI dashboards and CSV financial reports using React, TypeScript and Supabase',
      'Automated toll estimates by building a geocoded dataset of 97 Philippine toll plazas, matched against each booking’s route',
      'Stopped double-bookings during concurrent requests by replacing check-then-insert logic with a PostgreSQL exclusion constraint and atomic PL/pgSQL payment RPCs'
    ]
  },
  {
    period: 'Sep 2025 – Apr 2026',
    title: 'Dev Specialist',
    company: 'Centervert',
    projectSlug: 'crm',
    location: 'Greenville, South Carolina (Remote)',
    bullets: [
      'Automated 5 FTEs’ worth of manual data entry via a Supabase Edge Function intake pipeline',
      'Increased lead intake by 30–40 per day by building an automated lead intake system using Supabase Edge Functions and the GoHighLevel API',
      'Migrated 460K+ records to a senior-approved Supabase schema, now the CRM’s source of truth',
      'Generated $1K–$2K in per-request billing through a Next.js and Stripe change-request-to-invoice pipeline'
    ]
  }
]
