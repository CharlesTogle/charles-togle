export type PlanetFeature = 'ring' | 'moon' | 'shell' | 'satellite' | 'none'

export interface Planet {
  id: string
  /** Matches a project slug in portfolio.ts */
  projectSlug: string
  /** Matches a system map id in systems.ts, when the project has one */
  mapId?: string
  name: string
  tagline: string
  result: string
  /** Visual tuning for the 3D scene */
  radius: number
  orbit: number
  /** Radians per second */
  speed: number
  /** Starting angle, radians */
  phase: number
  tilt: number
  /** Two-tone surface: faces are painted in bands between these */
  palette: [string, string]
  roughness: number
  feature: PlanetFeature
  campfire?: boolean
}

// Ordered from the sun outward. Each planet's look hints at the system:
// Centervert is the big ringed industrial one, Budgie keeps a satellite in sync,
// the home server sits inside a firewall shell,
// with a campfire burning on it because it's home.
export const planets: Planet[] = [
  {
    id: 'sic',
    projectSlug: 'sic',
    mapId: 'sic',
    name: 'UMak SIC App',
    tagline: 'Event registration, emailed QR passes and attendance',
    result: 'Check-in went from 5–10 minutes in line to about 5 seconds per student.',
    radius: 0.48,
    orbit: 3.2,
    speed: 0.3,
    phase: 0.6,
    tilt: 0.05,
    palette: ['#c9496d', '#f19ab3'],
    roughness: 0.85,
    feature: 'none'
  },
  {
    id: 'katada',
    projectSlug: 'katada',
    mapId: 'katada',
    name: 'Katada Van Rentals',
    tagline: 'Rental platform with route-matched tolls',
    result: 'Removed a ₱1,000/month platform fee and made double-bookings impossible.',
    radius: 0.55,
    orbit: 4.7,
    speed: 0.22,
    phase: 2.4,
    tilt: 0.12,
    palette: ['#d9a441', '#f0d08a'],
    roughness: 0.8,
    feature: 'moon'
  },
  {
    id: 'crm',
    projectSlug: 'crm',
    mapId: 'crm',
    name: 'Centervert',
    tagline: '460K+ records, a production intake pipeline, Stripe billing',
    result: '5 FTEs’ worth of manual entry automated and 30–40 more leads a day.',
    radius: 0.85,
    orbit: 6.6,
    speed: 0.14,
    phase: 4.1,
    tilt: 0.28,
    palette: ['#4f6fa8', '#8fb0dc'],
    roughness: 0.7,
    feature: 'ring'
  },
  {
    id: 'budgie',
    projectSlug: 'budgie',
    mapId: 'budgie',
    name: 'Budgie',
    tagline: 'Budgeting that sees December coming, with its own offline sync engine',
    result: 'Works with no signal, then converges across devices.',
    radius: 0.6,
    orbit: 8.4,
    speed: 0.1,
    phase: 1.2,
    tilt: 0.1,
    // Sky blue and butter yellow, like the bird
    palette: ['#4fa8dc', '#f3dc6b'],
    roughness: 0.55,
    feature: 'satellite'
  },
  {
    id: 'homeserver',
    projectSlug: 'homeserver',
    mapId: 'homeserver',
    name: 'Home server',
    tagline: 'A private file cloud behind nginx, DNS and Tailscale',
    result: 'Reachable only from my tailnet. Everything else is firewalled.',
    radius: 0.46,
    orbit: 10,
    speed: 0.075,
    phase: 5.3,
    tilt: 0.2,
    palette: ['#6d4fb0', '#a98ae0'],
    roughness: 1,
    feature: 'shell',
    campfire: true
  }
]
