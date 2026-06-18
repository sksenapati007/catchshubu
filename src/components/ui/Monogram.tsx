// Monogram — crescent moon (शुभेन्दु = "auspicious moon" in Sanskrit)
// Shubhendu is composed of शुभ (auspicious) + इन्दु (moon)
export function Monogram() {
  return (
    <div
      role="img"
      aria-label="Shubhendu — auspicious moon"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <svg
        viewBox="0 0 52 50"
        fill="none"
        aria-hidden="true"
        style={{ width: '52px', height: '50px', overflow: 'visible' }}
      >
        <defs>
          {/* Mask: outer filled circle minus offset inner circle = crescent */}
          <mask id="shubu-moon">
            <rect width="52" height="50" fill="white" />
            <circle cx="29" cy="19" r="17" fill="black" />
          </mask>
        </defs>

        {/* Crescent body — accent colour */}
        <circle cx="20" cy="22" r="19" fill="var(--c-accent)" mask="url(#shubu-moon)" />

        {/* Stars in the cleared night-sky area */}
        <circle cx="36" cy="6"  r="1.6" fill="var(--c-text-3)" />
        <circle cx="44" cy="14" r="1.1" fill="var(--c-text-3)" />
        <circle cx="42" cy="22" r="1.3" fill="var(--c-text-3)" />
        <circle cx="48" cy="7"  r="0.9" fill="var(--c-text-3)" />
      </svg>

      {/* Devanagari name — system serif renders Kohinoor/Noto Devanagari */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: '"Noto Serif Devanagari", "Kohinoor Devanagari", "Mangal", serif',
          fontSize: '11px',
          lineHeight: 1,
          color: 'var(--c-text-3)',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        शुभेन्दु
      </span>
    </div>
  )
}
