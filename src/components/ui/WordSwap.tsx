import { useState, useEffect } from 'react'

const WORDS = ['fintech', 'iGaming', 'healthtech', 'media', 'payments']
const INTERVAL = 2600

type Phase = 'idle' | 'exit' | 'enter'

export function WordSwap() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const timer = setInterval(() => {
      setPhase('exit')
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length)
        setPhase('enter')
        setTimeout(() => setPhase('idle'), 360)
      }, 350)
    }, INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const animStyle: React.CSSProperties =
    phase === 'exit'
      ? { animation: 'word-exit 350ms cubic-bezier(0.76,0,0.24,1) forwards' }
      : phase === 'enter'
      ? { animation: 'word-enter 350ms cubic-bezier(0.76,0,0.24,1) forwards' }
      : {}

  return (
    <span
      className="inline-flex items-center"
      aria-live="polite"
      aria-label={`at the intersection of ${WORDS[index]}`}
    >
      <span
        aria-hidden="true"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.68em',
          color: 'var(--c-accent-30)',
          marginRight: '0.25em',
          flexShrink: 0,
          lineHeight: 1,
          alignSelf: 'center',
        }}
      >
        [
      </span>

      {/* Fixed-height clipping wrapper — prevents layout shift on word change */}
      <span
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          lineHeight: 1.05,
          verticalAlign: 'middle',
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontStyle: 'italic',
            color: 'var(--c-accent)',
            lineHeight: 1.05,
            ...animStyle,
          }}
        >
          {WORDS[index]}
        </span>
      </span>

      <span
        aria-hidden="true"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.68em',
          color: 'var(--c-accent-30)',
          marginLeft: '0.25em',
          flexShrink: 0,
          lineHeight: 1,
          alignSelf: 'center',
        }}
      >
        ]
      </span>
    </span>
  )
}
