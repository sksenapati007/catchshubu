export interface ProjectSlide {
  // TODO: add `src: string` and replace `color` once you have real screenshots
  color: string
  caption?: string
  projectName?: string
}

export interface Project {
  id: string
  year: string
  yearStart: number          // for sorting
  name: string
  discipline: 'Engineering' | 'Product' | 'Design Engineering'
  description: string
  stack: string[]
  metric: { label: string; value: string }
  role: string
  status?: 'live' | 'unpublished'
  slides?: ProjectSlide[]   // TODO: fill with real screenshots
}

export const PROJECTS: Project[] = [
  {
    id: 'sonyliv',
    year: '2020 — 2021',
    yearStart: 2020,
    name: 'SonyLIV OTT TV Application',
    discipline: 'Design Engineering',
    description:
      'Smart TV application for SonyLIV streaming platform. Built for large-screen UX constraints — D-pad navigation, 10-foot UI, adaptive bitrate streaming, and remote-first interaction design.',
    stack: ['React', 'JavaScript', 'HLS.js', 'REST APIs', 'TV SDKs'],
    metric: { label: 'Target screen size', value: '10-foot UI' },
    role: 'Frontend Engineer',
  },
  {
    id: 'fugit',
    year: '2021',
    yearStart: 2021,
    name: 'Fugit — Flutter Mobile App',
    discipline: 'Design Engineering',
    description:
      'Cross-platform mobile application built in Flutter. Worked through the full product lifecycle — from wireframes to production build on iOS and Android. Focused on fluid motion design and native-feeling interactions.',
    stack: ['Flutter', 'Dart', 'Firebase', 'iOS', 'Android'],
    metric: { label: 'Platforms', value: 'iOS + Android' },
    role: 'Team effort',
    status: 'unpublished',
  },
  {
    id: 'doctor-evidence',
    year: '2021',
    yearStart: 2021,
    name: 'Doctor Evidence — Health Analytics',
    discipline: 'Product',
    description:
      'Clinical data intelligence platform for evidence-based medicine. Worked on data extraction pipelines and the researcher-facing interface for synthesising clinical trial outcomes at scale.',
    stack: ['React', 'Python', 'REST APIs', 'D3.js', 'PostgreSQL'],
    metric: { label: 'Industry', value: 'Health · MedTech' },
    role: 'Product Engineer',
  },
  {
    id: 'account-aggregator',
    year: '2022 — 2023',
    yearStart: 2022,
    name: 'Account Aggregator Platform',
    discipline: 'Engineering',
    description:
      'Fintech consent framework built on the RBI Account Aggregator stack. Secure financial data sharing between FIPs and FIUs with end-to-end encryption, consent lifecycle management, and real-time data fetch pipelines.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Encryption APIs'],
    metric: { label: 'Consent flows', value: '10K+' },
    role: 'Senior Engineer',
  },
  {
    id: 'sports-betting',
    year: '2022 — 2023',
    yearStart: 2022,
    name: 'Sports Betting Platform',
    discipline: 'Engineering',
    description:
      'Live odds engine and bet settlement system for an iGaming operator. Sub-100ms odds updates via WebSocket pub/sub, with event-driven bet validation and wallet reconciliation.',
    stack: ['TypeScript', 'WebSocket', 'PostgreSQL', 'Redis', 'Node.js'],
    metric: { label: 'P95 latency', value: '12ms' },
    role: 'Senior Engineer',
  },
  {
    id: 'payment-gateway',
    year: '2023 — 2024',
    yearStart: 2023,
    name: 'Payment Gateway Infrastructure',
    discipline: 'Engineering',
    description:
      'Real-time payment processing layer handling multiple PSPs with automatic failover, retry logic, and reconciliation pipelines. Designed for high-availability with zero-downtime deploys.',
    stack: ['Node.js', 'Kafka', 'Redis', 'PostgreSQL', 'AWS'],
    metric: { label: 'Peak throughput', value: '8,400 TPS' },
    role: 'Lead Engineer',
  },
  {
    id: 'eod-automator',
    year: '2024',
    yearStart: 2024,
    name: 'EOD Standup Automator',
    discipline: 'Design Engineering',
    description:
      'ClickUp task fetcher + MS Teams webhook pipeline with a mandatory human review gate before any post goes out. Built to solve a personal workflow problem in an afternoon.',
    stack: ['Node.js', 'ClickUp API', 'MS Teams', 'Webhooks'],
    metric: { label: 'Daily time saved', value: '~15 min' },
    role: 'Solo Builder',
  },
  {
    id: 'crm-telephony',
    year: '2025 — 2026',
    yearStart: 2025,
    name: 'CRM & Telephony Bridge',
    discipline: 'Product',
    description:
      'Unified agent desktop integrating 3 CRM systems with VoIP telephony and real-time customer context. Scoped, specced, and shipped — wore the PM and engineer hat simultaneously.',
    stack: ['React', 'WebRTC', 'REST APIs', 'Node.js'],
    metric: { label: 'Handle time reduced', value: '34%' },
    role: 'Product Engineer',
  },
]
