export function VerticalStrip() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex"
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '24px',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '9px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--c-text-3)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          whiteSpace: 'nowrap',
          opacity: 0.6,
        }}
      >
        CATCHSHUBU · ALWAYS SHIPPING · DUBAI, UAE · PRODUCT BUILDER © 2025
      </p>
    </div>
  )
}
