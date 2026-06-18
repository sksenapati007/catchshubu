import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 lg:px-10 xl:px-14 pb-16 lg:pb-12"
      style={{ borderTop: '1px solid var(--c-border)', transition: 'border-color 250ms ease' }}
    >
      <div className="w-full pt-8">
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            color: 'var(--c-text-3)',
          }}
        >
          <span>SHUBHENDU · DUBAI, UAE</span>
          <span aria-label="Coordinates: 25.2048 degrees North, 55.2708 degrees East">
            DXB · 25.2048° N, 55.2708° E
          </span>
          <div className="flex justify-end">
            <a
              href="#home"
              aria-label="Scroll to top"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1px solid var(--c-border)',
                color: 'var(--c-text-3)',
                transition: 'border-color 150ms ease, color 150ms ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--c-muted)'
                e.currentTarget.style.color = 'var(--c-text-1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--c-border)'
                e.currentTarget.style.color = 'var(--c-text-3)'
              }}
            >
              <ArrowUp size={13} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
