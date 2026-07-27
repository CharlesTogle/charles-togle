export interface ProjectLinks {
  live?: string
  source?: string
  source2?: string
}

export interface Project {
  id: string
  code: string
  name: string
  description: string
  role: string
  period: string
  tech: string[]
  impact?: string
  links: ProjectLinks
  icon: string
  screenshot?: string
}

export interface ExperienceEntry {
  period: string
  title: string
  company: string
  location: string
  bullets: string[]
}

export const projects: Project[] = [
  {
    id: '0X01',
    code: 'HOPE_HUB',
    name: 'Hope Hub',
    description:
      'Multi-tenant fitness education platform with role-based access for Teachers and Students across 4 modules. Quiz system tied to lecture content, automated Physical Fitness Test classification.',
    role: 'Developer & Project Manager',
    period: 'March – May 2025',
    tech: ['React', 'PostgreSQL', 'Supabase'],
    links: {
      source: 'https://github.com/CharlesTogle/Hope-Hub'
    },
    icon: 'edu',
    screenshot: '/projects/hope-hub.png'
  },
  {
    id: '0X02',
    code: 'UMAK_LINK',
    name: 'Umak Link',
    description:
      'Lost & found platform for web and mobile with AI image classification via Gemini API. PostgreSQL full-text and similarity search.',
    role: 'Developer & Project Manager',
    period: 'Feb – April 2025, Feb - March 2026',
    tech: ['React', 'Capacitor', 'FastifyJS', 'Supabase', 'Gemini API'],
    links: {
      live: 'https://umak-link-web.vercel.app/',
      source: 'https://github.com/CharlesTogle/umak-link-web',
      source2: 'https://github.com/CharlesTogle/umak-link-backend'
    },
    icon: 'link',
    screenshot: '/projects/umak-link.png'
  },
  {
    id: '0X03',
    code: 'ANDROID_LLM_SERVER',
    name: 'Android LLM Server',
    description:
      'Guide to running a local LLM on Android via SSH and Ollama, exposed to local network. Turns your phone into an AI inference server.',
    role: 'Author',
    period: 'Feb 2026',
    tech: ['SSH', 'Ollama', 'Android', 'Linux'],
    links: {
      source: 'https://github.com/CharlesTogle/android-server-with-llm'
    },
    icon: 'terminal'
  },
  {
    id: '0X04',
    code: 'MANUAL_QUIZ_APP',
    name: 'Manual Quiz App',
    description:
      'Quiz platform supporting Multiple Choice, Identification, and Acronyms. Helped 40+ classmates review and increased class passing rate.',
    role: 'Solo Developer',
    period: 'March 2026',
    tech: ['React', 'Supabase'],
    impact: '40+ students',
    links: {
      live: 'https://not-so-simple-quiz-app.vercel.app/',
      source: 'https://github.com/CharlesTogle/not-so-simple-quiz-app'
    },
    icon: 'quiz',
    screenshot: '/projects/manual-quiz.png'
  },
  {
    id: '0X05',
    code: 'DIGITAL_PULSE',
    name: 'Digital Pulse Converter',
    description:
      'Converts characters into digital pulse codes (NRZ, Manchester, etc.) with visualization. Automated networking assignments for 50+ students.',
    role: 'Co Developer',
    period: 'March 2026',
    tech: ['JavaScript', 'Canvas API'],
    impact: '50+ students',
    links: {
      live: 'https://digital-pulsify.vercel.app/',
      source: 'https://github.com/CharlesTogle/DigitalPulsify'
    },
    icon: 'pulse',
    screenshot: '/projects/digital-pulse.png'
  },
  {
    id: '0X06',
    code: 'PHISHING_SCRAPER',
    name: 'Phishing URL Scraper',
    description:
      'Automated scraper and checker for phishing URLs. Gathers and validates malicious URLs for security research and analysis.',
    role: 'Solo Developer',
    period: 'April 2026',
    tech: ['Python', 'BeautifulSoup'],
    links: {
      source: 'https://github.com/CharlesTogle/gather-phishing-urls'
    },
    icon: 'shield',
    screenshot: '/projects/phishing-scraper.png'
  },
  {
    id: '0X07',
    code: 'AGENTIC_CODING_SLIDES',
    name: 'Agentic Coding Presentation',
    description:
      'Taught entire 3rd year CS cohort agentic coding, Motivated the professor to integrate it as future curriculum for underclassmen.',
    role: 'Author & Presenter',
    period: 'March 2026',
    tech: ['AI', 'Education'],
    links: {
      source: 'https://github.com/CharlesTogle/agentic-coding-slides'
    },
    icon: 'slides',
    screenshot: '/projects/agentic-slides.png'
  },
  {
    id: '0X08',
    code: 'HOME_SERVER_SYSTEM',
    name: 'HomeServer Lite + NginxConf',
    description:
      'Private self-hosted file server system split across the product app and its infrastructure layer. Combines the React/Fastify/PostgreSQL file server with the nginx, BIND DNS, Tailscale, and firewall routing setup that makes the private VPS deployment usable.',
    role: 'System Designer, App Developer & Infrastructure Engineer',
    period: '2026',
    tech: ['React', 'Vite', 'Fastify', 'PostgreSQL', 'Nginx', 'BIND DNS', 'Tailscale', 'UFW'],
    links: {
      source: 'https://github.com/CharlesTogle/HomeServer-Lite',
      source2: 'https://github.com/CharlesTogle/NginxConf'
    },
    icon: 'terminal',
    screenshot: '/projects/home-server-lite.png'
  }
]

export const experiences: ExperienceEntry[] = [
  {
    period: 'SEP 2025 - APR 2026',
    title: 'Dev Specialist',
    company: 'Centervert',
    location: 'Greenville, North Carolina (Remote)',
    bullets: [
      "Automated 5 FTEs' worth of manual data entry (per manager estimate) via a Supabase Edge Function intake pipeline",
      'Increased lead intake by 30–40 per day by building an automated lead intake system using Supabase Edge Functions and GHL API',
      "Migrated 460K+ records to a self-architected Supabase schema, now the CRM's source of truth",
      'Generated $1K–$2K in per-request billing through a Next.js/Stripe change-request-to-invoice pipeline'
    ]
  },
  {
    period: 'MAR 2025 - MAY 2025',
    title: 'Developer & Project Manager',
    company: 'Freelance Software Engineer',
    location: 'Makati City, Metro Manila, Philippines',
    bullets: [
      'Worked with a team of 5 to deliver a multi-tenant fitness education platform by leading full-stack development using React, PostgreSQL, and Supabase',
      'Secured access for Teachers and Students across 4 core modules by designing a role-based access system',
      'Automated Physical Fitness Test classification by implementing a session-based recording system'
    ]
  },
  {
    period: 'FEB 2025 - APR 2025',
    title: 'Developer & Project Manager',
    company: 'University Project',
    location: 'University of Makati',
    bullets: [
      'Worked with a team of 4 to deliver unified lost & found reporting across web and mobile by building a centralized platform using React, Capacitor, FastifyJS, and Supabase',
      'Extracted structured metadata (color, category, descriptors) from item photos by integrating AI image classification via Gemini API',
      'Matched lost and found items accurately by implementing PostgreSQL full-text and similarity search'
    ]
  }
]
