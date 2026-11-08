export interface SystemNode {
  id: string
  label: string
  detail: string
  col: number
  row: number
}

export interface SystemEdge {
  from: string
  to: string
}

export interface SystemMap {
  id: string
  name: string
  nodes: SystemNode[]
  edges: SystemEdge[]
}

// Nodes sit on a grid of at most 4 columns x 2 rows, and edges only join
// neighbouring cells, so the same map can be drawn left-to-right on desktop
// and top-to-bottom on phones without lines crossing.
export const systemMaps: SystemMap[] = [
  {
    id: 'sic',
    name: 'Event check-in',
    nodes: [
      { id: 'signup', label: 'Registration', detail: '100–200 a day', col: 0, row: 0 },
      { id: 'queue', label: 'Email queue', detail: 'leases + idempotency', col: 1, row: 0 },
      { id: 'provider', label: 'Email provider', detail: 'retry + failover', col: 2, row: 0 },
      { id: 'pass', label: 'QR pass', detail: 'signed ticket', col: 3, row: 0 },
      { id: 'scan', label: 'Scanner', detail: 'at the door', col: 3, row: 1 },
      { id: 'verify', label: 'Verify ticket', detail: 'server-side', col: 2, row: 1 },
      { id: 'attend', label: 'Attendance', detail: '~5 s per student', col: 1, row: 1 }
    ],
    edges: [
      { from: 'signup', to: 'queue' },
      { from: 'queue', to: 'provider' },
      { from: 'provider', to: 'pass' },
      { from: 'pass', to: 'scan' },
      { from: 'scan', to: 'verify' },
      { from: 'verify', to: 'attend' }
    ]
  },
  {
    id: 'crm',
    name: 'CRM intake',
    nodes: [
      { id: 'sheet', label: 'Lead sheet', detail: 'Google Sheets', col: 0, row: 0 },
      { id: 'edge', label: 'Edge Function', detail: 'validate + retry', col: 1, row: 0 },
      { id: 'db', label: 'Supabase', detail: '460K+ records', col: 2, row: 0 },
      { id: 'ghl', label: 'GoHighLevel', detail: 'backoff + jitter', col: 1, row: 1 },
      { id: 'portal', label: 'Next.js portal', detail: 'change requests', col: 2, row: 1 },
      { id: 'stripe', label: 'Stripe', detail: '$1K–$2K / request', col: 3, row: 1 }
    ],
    edges: [
      { from: 'sheet', to: 'edge' },
      { from: 'edge', to: 'db' },
      { from: 'edge', to: 'ghl' },
      { from: 'db', to: 'portal' },
      { from: 'portal', to: 'stripe' }
    ]
  },
  {
    id: 'katada',
    name: 'Van bookings',
    nodes: [
      { id: 'renter', label: 'Renter', detail: 'booking flow', col: 0, row: 0 },
      { id: 'route', label: 'Route', detail: 'polyline', col: 1, row: 0 },
      { id: 'tolls', label: 'Toll matcher', detail: '97 toll plazas', col: 2, row: 0 },
      { id: 'rpc', label: 'Booking RPC', detail: 'no double-booking', col: 3, row: 0 },
      { id: 'kpi', label: 'Owner dashboard', detail: 'KPIs + reports', col: 3, row: 1 },
      { id: 'csv', label: 'CSV export', detail: 'finance', col: 2, row: 1 }
    ],
    edges: [
      { from: 'renter', to: 'route' },
      { from: 'route', to: 'tolls' },
      { from: 'tolls', to: 'rpc' },
      { from: 'rpc', to: 'kpi' },
      { from: 'kpi', to: 'csv' }
    ]
  },
  {
    id: 'budgie',
    name: 'Offline sync',
    nodes: [
      { id: 'sqlite', label: 'Phone SQLite', detail: 'local first', col: 0, row: 0 },
      { id: 'queue', label: 'Op queue', detail: 'idempotent push', col: 1, row: 0 },
      { id: 'api', label: 'Sync API', detail: 'Express', col: 2, row: 0 },
      { id: 'pg', label: 'Postgres', detail: 'RLS + RPCs', col: 3, row: 0 },
      { id: 'merge', label: 'Conflict rules', detail: 'delete-wins + LWW', col: 2, row: 1 },
      { id: 'cron', label: 'Recurring jobs', detail: 'cron templates', col: 3, row: 1 }
    ],
    edges: [
      { from: 'sqlite', to: 'queue' },
      { from: 'queue', to: 'api' },
      { from: 'api', to: 'pg' },
      { from: 'api', to: 'merge' },
      { from: 'pg', to: 'cron' }
    ]
  },
  {
    id: 'homeserver',
    name: 'Home server',
    nodes: [
      { id: 'device', label: 'Laptop / phone', detail: 'on the tailnet', col: 0, row: 0 },
      { id: 'tailscale', label: 'Tailscale', detail: 'Split DNS', col: 1, row: 0 },
      { id: 'nginx', label: 'nginx', detail: 'host + path routing', col: 2, row: 0 },
      { id: 'app', label: 'Fastify API', detail: 'uploads, trash', col: 3, row: 0 },
      { id: 'dns', label: 'BIND DNS', detail: 'home zone', col: 1, row: 1 },
      { id: 'store', label: 'SQLite', detail: 'file index', col: 3, row: 1 }
    ],
    edges: [
      { from: 'device', to: 'tailscale' },
      { from: 'tailscale', to: 'nginx' },
      { from: 'nginx', to: 'app' },
      { from: 'tailscale', to: 'dns' },
      { from: 'app', to: 'store' }
    ]
  }
]
