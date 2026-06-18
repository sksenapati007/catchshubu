import { useEffect, useRef } from 'react'

/**
 * Full-page ambient glow that follows the cursor.
 * Uses direct DOM style mutation (no React state) for zero re-render overhead.
 */
export function PageSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    let rafId: number
    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2

    const paint = () => {
      el.style.background = `radial-gradient(700px circle at ${cx}px ${cy}px, hsl(var(--accent) / 0.04), transparent 75%)`
    }

    const onMove = (e: MouseEvent) => {
      cx = e.clientX
      cy = e.clientY
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0ms',
      }}
    />
  )
}
