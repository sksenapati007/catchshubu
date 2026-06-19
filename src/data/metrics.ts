export interface HeroMetric {
  value: string
  label: string
  accent: string
  numericTarget: number
  prefix: string
  suffix: string
  isStatic?: boolean   // skip count-up animation (e.g. symbol values)
}

export const HERO_METRICS: HeroMetric[] = [
  { value: '6',  label: 'years shipping code',  accent: '6',  numericTarget: 6,  prefix: '', suffix: '' },
  { value: '3+', label: 'domains worked across', accent: '+', numericTarget: 3,  prefix: '', suffix: '+' },
  { value: '12+',label: 'side projects built',  accent: '+', numericTarget: 12, prefix: '', suffix: '+' },
  { value: '∞',  label: 'things yet to learn',  accent: '∞', numericTarget: 0,  prefix: '', suffix: '', isStatic: true },
]
