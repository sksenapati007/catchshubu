import { useEffect, useState } from 'react'
import { TERMINAL_LINES, TERMINAL_STATUS } from '@/data/terminal'

export function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showScan, setShowScan] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setShowScan(true)
      setVisibleLines(TERMINAL_LINES.length)
      setShowStatus(true)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(setTimeout(() => setShowScan(true), 600))

    TERMINAL_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 1200 + i * 150))
    })

    timers.push(setTimeout(() => setShowStatus(true), 2100))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="w-full overflow-hidden rounded-[6px]"
      style={{
        /* Terminal keeps a dark bg in both themes — code editors always are */
        background: '#0D0D0D',
        border: '1px solid #1E1E1E',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '12px',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5"
        style={{
          background: '#161616',
          borderBottom: '1px solid #1E1E1E',
          padding: '10px 14px',
        }}
      >
        <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full" style={{ background: '#FF5F57' }} />
        <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full" style={{ background: '#FEBC2E' }} />
        <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full" style={{ background: '#28C840' }} />
        <span style={{ color: '#3A3A3A', fontSize: '11px', marginLeft: '8px' }}>~/shubhendu</span>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 14px 14px' }}>
        {/* Command line */}
        <div className="flex items-center gap-1 flex-wrap">
          <span style={{ color: '#C8FF00' }}>$</span>
          <span style={{ color: '#D0CEC8' }}> run portfolio </span>
          <span style={{ color: '#D0CEC8' }}>--stack=production</span>
          <span
            className="inline-block"
            aria-hidden="true"
            style={{
              width: '8px',
              height: '13px',
              background: '#C8FF00',
              animation: 'blink 1s step-end infinite',
              marginLeft: '2px',
            }}
          />
        </div>

        {/* Scanning line */}
        {showScan && (
          <div style={{ color: '#3A3A3A', fontSize: '11px', marginTop: '4px' }}>
            … scanning 6 years of commits
          </div>
        )}

        {/* Checkmark lines */}
        <div className="mt-3 flex flex-col gap-1">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={line.key}
              className="flex items-center gap-1"
              style={{
                animation: `slide-in-up 0.2s ease-out forwards`,
                opacity: 0,
                animationDelay: `${i * 10}ms`,
              }}
            >
              <span style={{ color: '#C8FF00' }}>✓</span>
              <span style={{ color: '#888580' }}> {line.key}</span>
              <span style={{ color: '#3A3A3A' }}> →</span>
              <span style={{ color: '#D0CEC8' }}> {line.value}</span>
            </div>
          ))}
        </div>

        {/* Status pill */}
        {showStatus && (
          <div
            className="flex items-center gap-1.5 mt-3 pt-3"
            style={{ borderTop: '1px solid #1E1E1E' }}
          >
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
              style={{
                background: '#C8FF00',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span style={{ color: '#3A3A3A', fontSize: '11px' }}>{TERMINAL_STATUS}</span>
          </div>
        )}
      </div>
    </div>
  )
}
