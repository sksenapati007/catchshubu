import { ArrowUp } from 'lucide-react'

const ArrowBtn = () => (
  <a
    href="#home"
    aria-label="Scroll to top"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: '1px solid var(--c-accent)',
      color: 'var(--c-accent)',
      transition: 'background 150ms ease, color 150ms ease',
      textDecoration: 'none',
      flexShrink: 0,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'var(--c-accent)'
      e.currentTarget.style.color = 'var(--c-base)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent'
      e.currentTarget.style.color = 'var(--c-accent)'
    }}
  >
    <ArrowUp size={13} strokeWidth={2} />
  </a>
)

export function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 lg:px-10 xl:px-14 pb-16 lg:pb-12"
      style={{ borderTop: '1px solid var(--c-border)', transition: 'border-color 250ms ease' }}
    >
      <div className="w-full pt-8"
        style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--c-text-3)' }}
      >

        {/* Mobile: 2-col — text stack left, arrow right */}
        <div className="flex items-center justify-between sm:hidden">
          <div className="flex flex-col gap-2">
            <span>SHUBHENDU</span>
            <span aria-label="Coordinates: 25.2048 degrees North, 55.2708 degrees East">
              DXB · 25.2048° N, 55.2708° E
            </span>
          </div>
          <ArrowBtn />
        </div>

        {/* Desktop sm+: 3-col grid — name | coords centered | arrow right */}
        <div
          className="hidden sm:grid items-center"
          style={{ gridTemplateColumns: '1fr auto 1fr' }}
        >
          <span>SHUBHENDU</span>
          <span aria-label="Coordinates: 25.2048 degrees North, 55.2708 degrees East">
            25.2048° N, 55.2708° E
          </span>
          <div className="flex justify-end">
            <ArrowBtn />
          </div>
        </div>

      </div>
    </footer>
  )
}
