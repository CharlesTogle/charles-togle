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
  status?: string
  highlights?: { value: string; label: string }[]
  links: ProjectLinks
  icon: string
  screenshot?: string
  screenshotFit?: 'cover' | 'contain'
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
    code: 'CENTERVERT_SYSTEMS',
    name: 'CRM Intake & Billing Systems',
    description:
      'Production automation work for a remote CRM operation: an Edge Function intake pipeline, a self-architected Supabase schema for 460K+ records, and a Next.js/Stripe flow that turns change requests into invoices.',
    role: 'Dev Specialist',
    period: 'September 2025 – April 2026',
    tech: ['Next.js', 'Supabase', 'Edge Functions', 'Stripe', 'GoHighLevel API'],
    impact: '5 FTE + 30–40 leads/day',
    links: {},
    icon: 'terminal'
  },
  {
    id: '0X11',
    code: 'ODIN_PFM',
    name: 'Odin',
    description:
      'An offline-first personal finance management app for Filipino working young adults. Built around local SQLite reads and writes so transaction entry, balances, budgets, savings goals, and debt management stay useful when connectivity drops, then converges through a cursor-based sync engine with queued domain operations, idempotent push, tombstones, IBM-backed delete-wins conflict resolution, and per-field last-write-wins for concurrent edits. Security is enforced through user-scoped RLS, explicit sync allowlists, ownership validation, and Postgres RPCs for sensitive operations. Recurring transaction templates generate queued ledger entries automatically, while the backend is planned for Google Cloud Run and local development uses Tailscale for private remote access.',
    role: 'Full Stack Engineer and Infrastructure Engineer',
    period: '2026 – present',
    tech: ['React Native', 'Expo', 'SQLite', 'Express', 'Supabase', 'RLS', 'Sync allowlists', 'Postgres RPCs', 'Cloud Run', 'Tailscale', 'Cron jobs'],
    status: 'In Progress',
    highlights: [
      { value: 'Offline-first', label: 'local finance workflows' },
      { value: 'Cursor sync', label: 'incremental convergence' },
      { value: 'RLS + RPCs', label: 'scoped backend security' }
    ],
    links: {
      live: 'https://odin-budgets.buzz/',
      source: 'https://github.com/VibeCoders-3DCSAD/Odin'
    },
    icon: 'terminal',
    screenshot: '/projects/odin-layout.png',
    screenshotFit: 'contain'
  },
  {
    id: '0X02',
    code: 'KATADA_VAN_RENTALS',
    name: 'Katada Transportation Services',
    description:
      'A multi-tenant car-rental SaaS built for Katada Van Rentals, replacing a 1,000-peso monthly fee for the previous platform with a purpose-built system. Managed weekly client communication and delivered the full customer journey from fleet discovery and account onboarding to route-aware booking, payment receipt submission, and booking status updates. Matched toll plazas against the returned route polyline using an owned Philippine toll dataset to produce accurate estimates that still fit the customer\'s budget. Added meaningful KPI dashboards, financial reports, and CSV exports that gave the client a clearer view of the business, capabilities missing from the previous car-rental platform.',
    role: 'Project Manager and Full Stack Developer',
    period: 'July 2026 - August 2026',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'RPCs', 'Edge Functions', 'TanStack Query', 'Chart.js', 'Vercel'],
    highlights: [
      { value: 'Polyline', label: 'route-matched tolls' },
      { value: 'Own data', label: 'Philippine toll dataset' },
      { value: '30-50', label: 'projected renters/year' }
    ],
    links: {
      live: 'https://katada-van-rentals.vercel.app/'
    },
    icon: 'van',
    screenshot: '/projects/katada-van-rentals.png'
  },
  {
    id: '0X12',
    code: 'EHANDA_04',
    name: 'eHanda',
    description:
      'A pair-programmed barangay disaster assessment platform built for the eGovPH ecosystem. Served as Technical Lead, planning the team\'s feasible scope and coordinating delivery within eight hours of development time. My delivered work focused on the Assessment Builder for creating structured disaster campaigns, real-time dashboard and user-dashboard updates through the realtime/WebSocket layer, and a planned AWS-native production architecture covering load balancing, managed database infrastructure, secrets, encryption, and observability. The project was selected as a Top 10 hackathon finalist.',
    role: 'Technical Lead and Pair Programming Full Stack Engineer',
    period: 'July 2026',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'Realtime/WebSockets', 'AWS architecture', 'eGovPH SSO'],
    impact: 'Top 10 · 8-hour build',
    highlights: [
      { value: 'Realtime', label: 'dashboard + user updates' },
      { value: 'Builder', label: 'structured assessments' },
      { value: 'AWS', label: 'native production plan' }
    ],
    links: {
      live: 'https://e-handa.vercel.app/',
      source: 'https://github.com/CharlesTogle/eGovPHHackaton2026'
    },
    icon: 'shield',
    screenshot: '/projects/e-handa.png',
    screenshotFit: 'contain'
  },
  {
    id: '0X03',
    code: 'HOPE_HUB',
    name: 'Hope Hub',
    description:
      'A multi-tenant Physical Education platform built with a team of five to bring lectures, quizzes, workouts, health tools, fitness testing, and class tracking into one system. Led the full-stack delivery across React, PostgreSQL, and Supabase, including role-based student and teacher experiences, lecture progress that controls quiz access, resumable timed quizzes with scoring and leaderboards, and session-based pre-test and post-test recording that automates Physical Fitness Test classification. The teacher dashboard supports class-code management, performance review, and spreadsheet export for reporting.',
    role: 'Project Manager and Full Stack Developer',
    period: 'March – May 2025',
    tech: ['React', 'Vite', 'PostgreSQL', 'Supabase', 'React Query', 'Recharts'],
    links: {
      live: 'https://hope-hub-fitness.vercel.app/',
      source: 'https://github.com/CharlesTogle/Hope-Hub'
    },
    icon: 'edu',
    screenshot: '/projects/hope-hub.png'
  },
  {
    id: '0X04',
    code: 'UMAK_LINK',
    name: 'Umak Link',
    description:
      'A unified lost and found platform for web and mobile, delivered with a team of four to replace fragmented reporting with one searchable system for the University of Makati community. Built the Ionic React and Capacitor mobile client, a Next.js staff and admin portal, and a Fastify backend-for-frontend that centralizes authentication, role enforcement, posts, claims, fraud reports, notifications, storage, and audit logging. Integrated Gemini image classification to extract item metadata and generate search queries, then combined PostgreSQL full-text and similarity search to match lost and found reports. The backend was dockerized and deployed for Google Cloud Run, with Firebase push notifications and Resend email completing the operational workflow.',
    role: 'Project Manager and Full Stack Developer',
    period: 'Feb – April 2025, Feb - March 2026',
    tech: ['Ionic React', 'Capacitor', 'Next.js', 'FastifyJS', 'Supabase', 'Gemini API', 'Docker', 'Cloud Run'],
    links: {
      live: 'https://umak-link-web.vercel.app/',
      source: 'https://github.com/CharlesTogle/umak-link-web',
      source2: 'https://github.com/CharlesTogle/umak-link-backend'
    },
    icon: 'link',
    screenshot: '/projects/umak-link.png'
  },
  {
    id: '0X05',
    code: 'ANDROID_LLM_SERVER',
    name: 'Android LLM Server',
    description:
      'A practical setup guide for turning an Android phone into a self-hosted local LLM server. Documents the full path from installing Termux and configuring SSH to running TinyLlama through Ollama and exposing the inference endpoint across a trusted local network. The project makes an overlooked piece of hardware useful as a private, low-cost AI development environment that can be reached from a laptop without relying on a hosted API.',
    role: 'Author',
    period: 'Feb 2026',
    tech: ['SSH', 'Ollama', 'Android', 'Linux'],
    links: {
      source: 'https://github.com/CharlesTogle/android-server-with-llm'
    },
    icon: 'terminal',
    screenshot: '/projects/android-llm-server.png'
  },
  {
    id: '0X06',
    code: 'MANUAL_QUIZ_APP',
    name: 'Manual Quiz App',
    description:
      'A lightweight, browser-first learning platform that turns raw study material into repeatable practice sessions. Its AI-assisted JSON workflow lets users generate and load custom quizzes through file upload or direct paste, while a single unified engine supports multiple-choice, abbreviation, and identification questions with answer normalization, live progress tracking, instant scoring, correction feedback, shuffle-based retakes, and targeted retries for missed questions. Built as a zero-backend study tool, it helped 40+ classmates review course material more actively and contributed to a higher class passing rate.',
    role: 'Solo Developer',
    period: 'March 2026',
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Storage API'],
    impact: '40+ students',
    links: {
      live: 'https://not-so-simple-quiz-app.vercel.app/',
      source: 'https://github.com/CharlesTogle/not-so-simple-quiz-app'
    },
    icon: 'quiz',
    screenshot: '/projects/manual-quiz.png'
  },
  {
    id: '0X07',
    code: 'DIGITAL_PULSE',
    name: 'Digital Pulse Converter',
    description:
      'An interactive digital communications laboratory that makes abstract line-coding theory visible, inspectable, and easy to compare. The React/Vite application transforms every input character into an 8-bit ASCII stream and renders per-bit pulse patterns for NRZ, RZ, Manchester, Binary AMI, and CMI encoding, complete with voltage levels, timing transitions, character boundaries, binary and ASCII reference views, and encoding-specific explanations. Students can tune grid size, spacing, labels, connectors, markers, and animation, follow a guided tutorial, and export polished PNG or SVG diagrams for assignments and reports. Automated networking coursework for 50+ students while turning a typically manual exercise into an immediate visual learning experience.',
    role: 'Co Developer',
    period: 'March 2026',
    tech: ['React', 'Vite', 'JavaScript', 'Canvas API', 'SVG'],
    impact: '50+ students',
    links: {
      live: 'https://digital-pulsify.vercel.app/',
      source: 'https://github.com/CharlesTogle/DigitalPulsify'
    },
    icon: 'pulse',
    screenshot: '/projects/digital-pulse.png'
  },
  {
    id: '0X08',
    code: 'PHISHING_SCRAPER',
    name: 'Phishing URL Scraper',
    description:
      'A security research data pipeline that continuously harvests phishing URLs from OpenPhish and PhishTank instead of relying on a one-off scrape. The Node.js scrapers poll feeds, paginate through large datasets, measure response behavior, resolve domains for GeoIP enrichment, inspect Cloudflare headers and hreflang metadata for country classification, and write structured append-only NDJSON records for downstream analysis. PhishTank results also produce a valid-only subset, while checkpoint files and graceful shutdown handling make long-running collection jobs resumable and operationally reliable.',
    role: 'Solo Developer',
    period: 'April 2026',
    tech: ['Node.js', 'OpenPhish', 'PhishTank', 'GeoLite2', 'NDJSON'],
    links: {
      source: 'https://github.com/CharlesTogle/gather-phishing-urls'
    },
    icon: 'shield',
    screenshot: '/projects/phishing-scraper.png'
  },
  {
    id: '0X09',
    code: 'AGENTIC_CODING_SLIDES',
    name: 'Agentic Coding Presentation',
    description:
      'A 65-slide animated curriculum and presentation designed to move an entire third-year Computer Science cohort beyond copy-pasting AI output and toward deliberate agentic software engineering. Built as a programmatic React and Remotion deck, it covers the industry shift toward coding agents, agent fundamentals, tool comparisons, practical workflows, standards and CLAUDE.md customization, vibe coding versus vibe engineering, system design for agents, reusable skills, and a live coding demonstration. The presentation was itself built through the workflow it teaches, turning the deck into both an instructional resource and a working case study in AI-assisted software development. Presented to the full cohort and helped motivate the professor to consider agentic coding for future underclass curriculum.',
    role: 'Author & Presenter',
    period: 'March 2026',
    tech: ['React', 'TypeScript', 'Remotion', 'Tailwind CSS', 'Education'],
    links: {
      source: 'https://github.com/CharlesTogle/agentic-coding-slides'
    },
    icon: 'slides',
    screenshot: '/projects/agentic-slides.png'
  },
  {
    id: '0X10',
    code: 'HOME_SERVER_SYSTEM',
    name: 'HomeServer Lite + NginxConf',
    description:
      'A private self-hosted file server and its deployment layer. HomeServer Lite combines a React file-management interface with a Fastify API, authenticated sessions, nested folders, batched and idempotent uploads, file previews/downloads, search and type filtering, storage usage, favorites, and trash recovery backed by a durable SQLite database. The repository also includes a PostgreSQL schema for the planned database architecture. NginxConf supplies the operational front door: nginx hostname and path routing, private BIND DNS for the home zone, Tailscale Split DNS and Funnel integration, UFW rules limited to the tailnet interface, and a deployment script that validates and reloads the web and DNS configuration.',
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
    period: 'JUL 2026 - AUG 2026',
    title: 'Project Manager and Full Stack Developer',
    company: 'Katada Van Rentals (Freelance)',
    location: 'Pasay City, Metro Manila, Philippines',
    bullets: [
      'Communicated weekly with the client to translate day-to-day rental operations into a multi-tenant car-rental SaaS',
      'Replaced the client\'s 1,000-peso monthly fee for a previous car-rental platform with a purpose-built system for bookings, fleet management, payments, and operations',
      'Added meaningful KPI dashboards, financial reports, and CSV exports that gave the client visibility into business performance missing from the previous platform'
    ]
  },
  {
    period: 'MAR 2026 - APR 2026',
    title: 'Dev Specialist',
    company: 'Centervert',
    location: 'Greenville, North Carolina (Remote)',
    bullets: [
      'Led the development of the CRM intake and billing systems across Supabase, Next.js, and Stripe',
      'Reconstructed an undocumented vendor-managed DigitalOcean load-balancer setup and moved connected Laravel products, Perforam and 1on1, to AWS Lightsail and RDS PostgreSQL, preserving cross-app data access and bringing support and deployments in-house',
      'Established production deployment infrastructure with Nginx, PHP-FPM, Supervisor queue workers, Laravel scheduling, DNS, SSL, and developer handoff documentation'
    ]
  },
  {
    period: 'OCT 2025 - MAR 2026',
    title: 'Full Stack Engineer',
    company: 'Centervert',
    location: 'Greenville, North Carolina (Remote)',
    bullets: [
      'Increased lead intake by 30–40 per day by hardening failure handling and building a concurrent migration script with exponential backoff and jitter to backfill GHL data without triggering rate limits',
      'Generated $1K–$2K in per-request billing through a Next.js/Stripe change-request-to-invoice pipeline'
    ]
  },
  {
    period: 'AUG 2025 - OCT 2025',
    title: 'Supabase Consultant',
    company: 'Centervert',
    location: 'Greenville, North Carolina (Remote)',
    bullets: [
      'Replaced a manual Google Sheets-to-GHL data-entry process with a Supabase Edge Function pipeline that validated leads, wrote them to a self-architected schema, and retried failed GHL syncs, reducing manual work by an estimated 5 FTEs',
      'Migrated 460K+ records into a self-architected Supabase schema; after a senior audit exposed flaws in the first pass, corrected it in production through a migration with no downtime or data loss'
    ]
  },
  {
    period: 'MAR 2025 - MAY 2025',
    title: 'Project Manager and Full Stack Developer',
    company: 'The Hope Hub (Freelance)',
    location: 'Makati City, Metro Manila, Philippines',
    bullets: [
      'Worked with a team of 5 to deliver a multi-tenant fitness education platform by leading full-stack development using React, PostgreSQL, and Supabase',
      'Secured access for Teachers and Students across 4 core modules by designing a role-based access system',
      'Automated Physical Fitness Test classification by implementing a session-based recording system'
    ]
  },
  {
    period: 'FEB 2025 - APR 2025',
    title: 'Project Manager and Full Stack Developer',
    company: 'University Project',
    location: 'University of Makati',
    bullets: [
      'Worked with a team of 4 to deliver unified lost & found reporting across web and mobile by building a centralized platform using React, Capacitor, FastifyJS, and Supabase',
      'Extracted structured metadata (color, category, descriptors) from item photos by integrating AI image classification via Gemini API',
      'Matched lost and found items accurately by implementing PostgreSQL full-text and similarity search'
    ]
  }
]
