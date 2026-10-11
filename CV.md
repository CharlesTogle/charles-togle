# Charles Nathaniel Togle

**Full Stack Software Engineer**  
Pasay City, Philippines | [charles3togle@gmail.com](mailto:charles3togle@gmail.com) | +63 928 199 5178  
[6digits.dev](https://6digits.dev) | [GitHub](https://github.com/CharlesTogle) | [LinkedIn](https://www.linkedin.com/in/charles-nathaniel-togle-09858b350/)

## Profile

Full-stack engineer who builds practical web software and the infrastructure behind it. Shipped client-facing platforms, production automations, and secure data systems across React, Next.js, Supabase, PostgreSQL, AWS, and Docker. Experienced leading teams from project definition through delivery, with a focus on systems that make day-to-day operations better.

## Journey

Started by strengthening algorithmic problem-solving, winning the University of Makati Java Speed Coding competition in 2024 and again in 2025. Moved quickly from learning React through Direcho Trabaho in 2025 to leading school, hackathon, and freelance teams. That work grew into production CRM automation at Centervert, client SaaS delivery, and current offline-first products where reliability, security, and real operating constraints matter as much as the interface.

## Experience

### Centervert, Greenville, South Carolina (Remote)
**Full Stack Developer / Dev Specialist** | Sep 2025 - Apr 2026

- Led CRM intake and billing-system development across Supabase, Next.js, and Stripe.
- Reconstructed an undocumented DigitalOcean load-balancer setup and moved connected Laravel products to AWS Lightsail and RDS PostgreSQL, preserving cross-application data access and bringing deployments in-house.
- Established production operations with Nginx, PHP-FPM, Supervisor queue workers, Laravel scheduling, DNS, SSL, and developer handoff documentation.

- Increased lead intake by 30-40 per day by strengthening failure handling and building a concurrent GoHighLevel migration script with exponential backoff and jitter.
- Built a Next.js and Stripe change-request-to-invoice flow that processed $1K-$2K in billing per request.
- Replaced a manual Google Sheets-to-GoHighLevel process with a Supabase Edge Function pipeline that validates leads, writes to a self-designed schema, and retries failed syncs; automated an estimated five FTEs of manual data entry.
- Migrated 460K+ records to Supabase as the CRM source of truth, then corrected audit findings through a production migration with no downtime or data loss.

**Portfolio project:** CRM Intake & Billing Systems

### Self-Employed, Philippines (Remote)
**Freelance Web Developer** | Apr 2025 - Present

- Accept commissions for full-stack web applications and lead client projects from planning through production delivery.
- Delivered the Katada Van Rentals and The Hope Hub platforms, translating operational needs into reliable user-facing systems.

### Katada Van Rentals, Pasay City, Philippines
**Project Manager & Full Stack Developer** | Jul 2026 - Aug 2026

- Delivered a multi-tenant car-rental SaaS covering fleet discovery, booking, receipt submission, operations, and status updates, replacing the client's PHP 1,000/month platform fee.
- Translated weekly client feedback into product delivery and added KPI dashboards, financial reports, and CSV exports for operational visibility.
- Matched toll plazas to route polylines using an owned Philippine toll dataset to generate budget-aware trip estimates.

[Live project](https://katada-van-rentals.vercel.app/)

### The Hope Hub, Makati City, Philippines
**Project Manager & Full Stack Developer** | Mar 2025 - May 2025

- Led full-stack delivery for a five-person team building a multi-tenant physical-education platform with React, PostgreSQL, and Supabase.
- Designed role-based teacher and student access across four core modules and automated Physical Fitness Test classification through session-based recording.

[Live project](https://hope-hub-fitness.vercel.app/) | [Source](https://github.com/CharlesTogle/Hope-Hub)

### University of Makati
**Project Manager & Full Stack Developer, Umak Link** | Feb 2025 - Apr 2025; Feb 2026 - Mar 2026

- Built a unified lost-and-found system across Ionic/Capacitor mobile, a Next.js staff portal, and a Fastify backend-for-frontend.
- Integrated Gemini image classification and PostgreSQL full-text and similarity search to extract item metadata and surface lost-and-found matches.
- Dockerized backend services for Cloud Run, with Firebase notifications, Resend email, role enforcement, audit logging, and storage workflows.

[Live project](https://umak-link-web.vercel.app/) | [Web source](https://github.com/CharlesTogle/umak-link-web) | [Backend source](https://github.com/CharlesTogle/umak-link-backend)

### AI Document Sorting System | University hackathon | May 2025

Project Manager and backend developer for a two-day faculty workflow hackathon. Led a four-person team and integrated TesseractJS OCR with an AI API to extract and classify documents such as resumes and CVs, reducing manual sorting work for faculty.

## Selected Projects

### SIC Photobooth Software | Offline-first event photobooth | 2026 - Present

Building a local-first photobooth platform with a Fastify backend, Vite booth interface, local PostgreSQL and media storage, and separate Next.js captive and public retrieval sites. Captured PNGs and GIFs are immediately retrievable over a captive Wi-Fi portal, while a durable queue publishes them to Cloudinary and Supabase when connectivity returns. Configured the Arch Linux appliance with Caddy, hostapd, dnsmasq, UFW, and a QR workflow that keeps the same photo link useful both offline and online. [Source](https://github.com/UMak-SIC/sic-photobooth-software)

### [Odin](https://odin-budgets.buzz/) | Offline-first personal finance app | 2026 - Present

Built a React Native/Expo financial-management app for Filipino working young adults. Local SQLite workflows remain usable offline, then converge through cursor-based sync with idempotent operations, tombstones, delete-wins conflict resolution, per-field last-write-wins, user-scoped RLS, and Postgres RPC boundaries. [Source](https://github.com/VibeCoders-3DCSAD/Odin)

### [CCIS Centralized Portal](https://github.com/CharlesTogle) | University student-council platform | 2026

Helped build and secure the CCIS student-council portal for announcements, event registration and verification, QR attendance passes, academic calendars, gallery and Patch media workflows, Bukas Kaban transparency records, and support messaging. Delivered role-preview and administration controls, Supabase RLS-backed gallery and media-write protections, atomic attendance check-in, and secured profile administration. Hardened operations with formula-safe CSV exports, transactional display ordering, recoverable email-queue failure handling, client-error telemetry, and accessible public and admin controls.

### [eHANDA](https://e-handa.vercel.app/) | Disaster needs assessment | 2026

Top 10 eGovHackathon 2026 project: a barangay disaster aid and assessment platform that turns alerts into structured RDANA assessments and a live response queue. Built the Supabase data model, official campaign setup and activation, resident check-ins, offline manual submissions, dashboard filters, case management, CSV export, and LGU/developer portals. Added alert-drafting helpers and moved eGov integrations behind a Supabase Edge Function to keep provider credentials server-side. [Source](https://github.com/Jerothegreat/eGovPHHackaton2026)

### [Digital Pulse Converter](https://digital-pulsify.vercel.app/) | Interactive communications lab | 2026

Created a React/Vite tool that turns text into ASCII bit streams and explains NRZ, RZ, Manchester, Binary AMI, and CMI pulse encodings with configurable diagrams and PNG/SVG export. Automated a manual networking exercise for 50+ students. [Source](https://github.com/CharlesTogle/DigitalPulsify)

### [Manual Quiz App](https://not-so-simple-quiz-app.vercel.app/) | Browser-first study tool | 2026

Built a zero-backend practice platform used by 40+ students, with AI-assisted quiz JSON import, normalized answers, live progress, feedback, shuffled retakes, and targeted retries. [Source](https://github.com/CharlesTogle/not-so-simple-quiz-app)

More work: [Android LLM Server](https://github.com/CharlesTogle/android-server-with-llm), [HomeServer Lite](https://github.com/CharlesTogle/HomeServer-Lite), [NginxConf](https://github.com/CharlesTogle/NginxConf), [Phishing URL Scraper](https://github.com/CharlesTogle/gather-phishing-urls), and [Agentic Coding Presentation](https://github.com/CharlesTogle/agentic-coding-slides).

## Skills

**Languages & frameworks:** TypeScript, JavaScript, React, React Native, Next.js, Node.js, Fastify, Express, Hono, Ionic, Capacitor, Electron, C#  
**Data & backend:** PostgreSQL, MySQL, SQLite, Supabase, Row Level Security, Postgres RPCs, Edge Functions, REST APIs  
**Cloud & operations:** AWS (Lightsail, RDS, S3, CloudFront, Route 53), Google Cloud Run, Docker, Nginx, PHP-FPM, Supervisor, VPS, DNS, SSL, Tailscale  
**Tools & practices:** Git, GitHub Actions, Linux, SSH, Vercel, Render, Stripe, GoHighLevel API, Gemini API, Firebase, Resend

## Education

### University of Makati, Makati City, Philippines
**Bachelor of Science in Computer Science, Major in Application Development** | Jan 2023 - Jun 2027

- Dean's List: 1st and 2nd semesters, AY 2023-2024; AY 2024-2025; AY 2025-2026.
- Direcho Trabaho / Frontier Technology Institute: React JavaScript, Apr - Jun 2025.

## Recognition

- **Java Speed Coding - Infotech Winner**, Nov 2024 and Nov 2025. Won the university algorithmic coding competition twice under timed conditions.
- **eGovHackathon 2026 - Top 10 Finalist**, Jul 2026. Recognized nationally for eHANDA, a post-disaster household needs-assessment integration for eGovPH.
