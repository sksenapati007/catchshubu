import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

// Fixed scroll-to-top — shown only when near the bottom of the page,
// positioned above the music player (bottom: 24 + 56 + 16 = 96px).
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const scrolledToNearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200
      setVisible(scrolledToNearBottom)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <a
      href="#home"
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '96px',
        right: '26px',
        zIndex: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '1px solid var(--c-accent)',
        color: 'var(--c-accent)',
        background: 'transparent',
        transition: 'opacity 250ms ease, transform 250ms ease, background 150ms ease, color 150ms ease',
        textDecoration: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        pointerEvents: visible ? 'auto' : 'none',
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
}

export function Footer() {
  return (
    <>
      <ScrollToTop />
      <footer
        className="px-4 sm:px-6 lg:px-10 xl:px-14 pb-16 lg:pb-12"
        style={{ borderTop: '1px solid var(--c-border)', transition: 'border-color 250ms ease' }}
      >
        <div
          className="w-full pt-8"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--c-text-3)' }}
        >
          {/* Mobile: text stack */}
          <div className="flex flex-col gap-2 sm:hidden">
            <span>SHUBHENDU</span>
            <span aria-label="Coordinates: 25.2048 degrees North, 55.2708 degrees East">
              DXB · 25.2048° N, 55.2708° E
            </span>
          </div>

          {/* Desktop sm+: 3-col grid — name | coords centered */}
          <div
            className="hidden sm:grid items-center"
            style={{ gridTemplateColumns: '1fr auto 1fr' }}
          >
            <span>SHUBHENDU</span>
            <span aria-label="Coordinates: 25.2048 degrees North, 55.2708 degrees East">
              DXB · 25.2048° N, 55.2708° E
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
