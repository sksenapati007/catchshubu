import { useEffect, useRef } from 'react'

const RADIUS_DEFAULT  = 50   // px diameter — inverting circle at rest
const RADIUS_MAGNETIC = 50   // px diameter — same size when snapped
const LERP_DEFAULT    = 0.12 // smoothing at rest
const LERP_MAGNETIC   = 0.22 // faster catch-up when snapped

const MAGNETIC_SELECTOR = '[data-magnetic]'

// Tags eligible for the semibold hover effect — text-bearing semantics only
const SEMIBOLD_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'P', 'A', 'BUTTON', 'SPAN', 'LI'])

function findSemiboldTarget(el: Element | null): HTMLElement | null {
  let curr = el
  for (let i = 0; i < 4 && curr; i++) {
    if (
      curr instanceof HTMLElement &&
      SEMIBOLD_TAGS.has(curr.tagName) &&
      curr.getAttribute('aria-hidden') !== 'true' &&
      curr.textContent?.trim()
    ) return curr
    curr = curr.parentElement
  }
  return null
}

function applySemibold(el: HTMLElement) {
  el.classList.add('cursor-semibold')
}

function removeSemibold(el: HTMLElement) {
  el.classList.remove('cursor-semibold')
}

export function CustomCursor() {
  const ringRef   = useRef<HTMLDivElement>(null)
  const dotRef    = useRef<HTMLDivElement>(null)
  const state = useRef({
    mouseX: -999, mouseY: -999,
    curX:   -999, curY:   -999,
    targetX: -999, targetY: -999,
    radius: RADIUS_DEFAULT,
    lerp:   LERP_DEFAULT,
  })
  const prevSemiboldEl = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    document.documentElement.classList.add('cursor-none')

    const onMove = (e: MouseEvent) => {
      const s = state.current
      s.mouseX = e.clientX
      s.mouseY = e.clientY

      const els = document.elementsFromPoint(e.clientX, e.clientY)

      // Magnetic snap
      const target = els.find(el => el.matches(MAGNETIC_SELECTOR)) as HTMLElement | undefined
      if (target) {
        const rect = target.getBoundingClientRect()
        s.targetX = rect.left + rect.width  / 2
        s.targetY = rect.top  + rect.height / 2
        s.radius  = RADIUS_MAGNETIC
        s.lerp    = LERP_MAGNETIC
      } else {
        s.targetX = e.clientX
        s.targetY = e.clientY
        s.radius  = RADIUS_DEFAULT
        s.lerp    = LERP_DEFAULT
      }

      // Semibold — find text element directly under cursor
      const topEl = document.elementFromPoint(e.clientX, e.clientY)
      const semiboldEl = findSemiboldTarget(topEl)

      if (semiboldEl !== prevSemiboldEl.current) {
        if (prevSemiboldEl.current) removeSemibold(prevSemiboldEl.current)
        if (semiboldEl) applySemibold(semiboldEl)
        prevSemiboldEl.current = semiboldEl
      }
    }

    const onLeave = () => {
      if (prevSemiboldEl.current) {
        removeSemibold(prevSemiboldEl.current)
        prevSemiboldEl.current = null
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    let raf: number
    const tick = () => {
      const s = state.current
      s.curX += (s.targetX - s.curX) * s.lerp
      s.curY += (s.targetY - s.curY) * s.lerp

      const r = s.radius
      ring.style.transform = `translate(${s.curX - r / 2}px, ${s.curY - r / 2}px)`
      ring.style.width     = `${r}px`
      ring.style.height    = `${r}px`

      dot.style.transform = `translate(${s.mouseX - 3}px, ${s.mouseY - 3}px)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('cursor-none')
      if (prevSemiboldEl.current) removeSemibold(prevSemiboldEl.current)
    }
  }, [])

  return (
    <>
      {/* Inverting circle — white + mix-blend-mode:difference = inversion */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         RADIUS_DEFAULT,
          height:        RADIUS_DEFAULT,
          borderRadius:  '50%',
          background:    'white',
          mixBlendMode:  'difference',
          pointerEvents: 'none',
          zIndex:        9999,
          willChange:    'transform, width, height',
          transition:    'width 200ms ease, height 200ms ease',
        }}
      />

      {/* Crisp dot at exact click point */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         6,
          height:        6,
          borderRadius:  '50%',
          background:    'white',
          mixBlendMode:  'difference',
          pointerEvents: 'none',
          zIndex:        9999,
          willChange:    'transform',
        }}
      />
    </>
  )
}
