import { useEffect, useState } from 'react'
import { TERMINAL_LINES, BHAILANG_LINES, TERMINAL_QUOTES, TERMINAL_STATUS } from '@/data/terminal'

// Pick a random quote once at module load — stable across re-renders
const QUOTE = TERMINAL_QUOTES[Math.floor(Math.random() * TERMINAL_QUOTES.length)]

export function TerminalCard() {
  const [showScan,     setShowScan]     = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [showStatus,   setShowStatus]   = useState(false)
  const [showBhai,     setShowBhai]     = useState(false)
  const [visibleBhai,  setVisibleBhai]  = useState(0)
  const [showQuote,    setShowQuote]    = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setShowScan(true)
      setVisibleLines(TERMINAL_LINES.length)
      setShowStatus(true)
      setShowBhai(true)
      setVisibleBhai(BHAILANG_LINES.length)
      setShowQuote(true)
      return
    }

    const t: ReturnType<typeof setTimeout>[] = []

    t.push(setTimeout(() => setShowScan(true), 600))

    // Stack lines
    TERMINAL_LINES.forEach((_, i) =>
      t.push(setTimeout(() => setVisibleLines(i + 1), 1200 + i * 150))
    )

    const afterLines = 1200 + TERMINAL_LINES.length * 150

    t.push(setTimeout(() => setShowStatus(true), afterLines + 100))

    // Bhailang section
    t.push(setTimeout(() => setShowBhai(true), afterLines + 500))
    BHAILANG_LINES.forEach((_, i) =>
      t.push(setTimeout(() => setVisibleBhai(i + 1), afterLines + 800 + i * 280))
    )

    const afterBhai = afterLines + 800 + BHAILANG_LINES.length * 280

    // Thought of the day
    t.push(setTimeout(() => setShowQuote(true), afterBhai + 400))

    return () => t.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="w-full overflow-hidden rounded-[6px] terminal-neomorph"
      style={{
        background: '#0D0D0D',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 'clamp(12px, 1.1vw, 14px)',
        minHeight: 'clamp(0px, 42vh, 380px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5"
        style={{ background: '#161616', borderBottom: '1px solid #1E1E1E', padding: '12px 16px' }}
      >
        <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full" style={{ background: '#FF5F57' }} />
        <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full" style={{ background: '#FEBC2E' }} />
        <span aria-hidden="true" className="h-[10px] w-[10px] rounded-full" style={{ background: '#28C840' }} />
        <span style={{ color: '#808080', fontSize: '11px', marginLeft: '8px' }}>~/shubhendu</span>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* ── Section 1: Portfolio stack ── */}
        <div className="flex items-center gap-1 flex-wrap">
          <span style={{ color: '#C8FF00' }}>$</span>
          <span style={{ color: '#D0CEC8' }}> run portfolio</span>
          <span style={{ color: '#808080' }}> --stack=production</span>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block', width: '8px', height: '13px',
              background: '#C8FF00', animation: 'blink 1s step-end infinite', marginLeft: '2px',
            }}
          />
        </div>

        {showScan && (
          <div style={{ color: '#808080', fontSize: '11px', marginTop: '4px' }}>
            … scanning 6 years of commits
          </div>
        )}

        <div className="mt-3 flex flex-col gap-1">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={line.key}
              className="flex items-center gap-1"
              style={{ animation: 'slide-in-up 0.2s ease-out forwards', opacity: 0, animationDelay: `${i * 10}ms` }}
            >
              <span style={{ color: '#C8FF00' }}>✓</span>
              <span style={{ color: '#888580' }}> {line.key}</span>
              <span style={{ color: '#808080' }}> →</span>
              <span style={{ color: '#D0CEC8' }}> {line.value}</span>
            </div>
          ))}
        </div>

        {showStatus && (
          <div
            className="flex items-center gap-1.5 mt-3 pt-3"
            style={{ borderTop: '1px solid #1E1E1E' }}
          >
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
              style={{ background: '#C8FF00', animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span style={{ color: '#808080', fontSize: '11px' }}>{TERMINAL_STATUS}</span>
          </div>
        )}

        {/* ── Section 2: Bhailang ── */}
        {showBhai && (
          <div
            style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #1E1E1E' }}
          >
            <div className="flex items-center gap-1">
              <span style={{ color: '#FF7A5C' }}>$</span>
              <span style={{ color: '#808080' }}> bhailang run</span>
              <span style={{ color: '#C8A8FF' }}> life.bhai</span>
            </div>

            <div className="mt-2 flex flex-col gap-1">
              {BHAILANG_LINES.slice(0, visibleBhai).map((line, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1 flex-wrap"
                  style={{ animation: 'slide-in-up 0.2s ease-out forwards', opacity: 0, animationDelay: `${i * 10}ms` }}
                >
                  <span style={{ color: '#808080', flexShrink: 0 }}>  &gt;</span>
                  <span style={{ color: '#C8A8FF' }}> {line.code}</span>
                  <span style={{ color: '#808080' }}>  // {line.out}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Section 3: Thought of the day ── */}
        {showQuote && (
          <div
            style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #1E1E1E' }}
          >
            <div style={{ color: '#808080', fontSize: '11px', marginBottom: '8px' }}>
              <span style={{ color: '#C8FF00' }}>$</span>
              <span> thought --today</span>
            </div>

            <div
              style={{
                fontSize: '11px',
                lineHeight: 1.6,
                animation: 'slide-in-up 0.35s ease-out forwards',
                opacity: 0,
              }}
            >
              <span style={{ color: '#888580' }}>&#8220;</span>
              <span style={{ color: '#D0CEC8' }}>{QUOTE.text}</span>
              <span style={{ color: '#888580' }}>&#8221;</span>
              <div style={{ color: '#808080', marginTop: '4px', textAlign: 'right' }}>
                — {QUOTE.author}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
