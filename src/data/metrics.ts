export interface HeroMetric {
  value: string
  label: string
  accent: string
  numericTarget: number
  prefix: string
  suffix: string
}

export const HERO_METRICS: HeroMetric[] = [
  { value: '$2.4B+', label: 'payment volume', accent: '$', numericTarget: 2.4, prefix: '$', suffix: 'B+' },
  { value: '99.98%', label: 'uptime delivered', accent: '.98', numericTarget: 99.98, prefix: '', suffix: '%' },
  { value: '8,400', label: 'peak TPS', accent: ',', numericTarget: 8400, prefix: '', suffix: '' },
  { value: '12ms', label: 'p95 latency', accent: 'ms', numericTarget: 12, prefix: '', suffix: 'ms' },
]
