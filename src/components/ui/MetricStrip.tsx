import { useEffect, useRef, useState } from 'react'
import { HERO_METRICS, type HeroMetric } from '@/data/metrics'

function useCountUp(target: number, duration = 1000, start = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setValue(target); return }

    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return value
}

function MetricItem({ value, label, accent, numericTarget, prefix, suffix, isStatic }: HeroMetric) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(numericTarget, 1000, started && !isStatic)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const formatCount = () => {
    const dp = (numericTarget.toString().split('.')[1] ?? '').length
    return count.toFixed(dp)
  }

  // Static values (e.g. ∞) skip the count-up entirely
  const displayValue = isStatic
    ? value
    : started ? `${prefix}${formatCount()}${suffix}` : value

  // Colour the accent character; for static symbols colour the whole value
  const renderValue = () => {
    if (isStatic) {
      return <span style={{ color: 'var(--c-accent)' }}>{displayValue}</span>
    }
    const idx = displayValue.indexOf(accent)
    if (idx === -1) return <span style={{ color: 'var(--c-text-1)' }}>{displayValue}</span>
    return (
      <>
        <span style={{ color: 'var(--c-text-1)' }}>{displayValue.slice(0, idx)}</span>
        <span style={{ color: 'var(--c-accent)' }}>{accent}</span>
        <span style={{ color: 'var(--c-text-1)' }}>{displayValue.slice(idx + accent.length)}</span>
      </>
    )
  }

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="font-mono font-medium leading-tight" style={{ fontSize: 'clamp(18px, 2.2vw, 26px)' }}>
        {renderValue()}
      </div>
      <div className="eyebrow">{label}</div>
    </div>
  )
}

export function MetricStrip() {
  return (
    <div
      role="region"
      aria-label="About in numbers"
      className="grid grid-cols-2 gap-x-8 gap-y-5 pt-6 sm:grid-cols-4"
      style={{ borderTop: '1px solid var(--c-border)' }}
    >
      {HERO_METRICS.map(m => (
        <MetricItem key={m.label} {...m} />
      ))}
    </div>
  )
}
