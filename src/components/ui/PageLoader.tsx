import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Pre-compute trail colours — avoids rgba string allocation every frame (GC pressure)
const TRAIL_COLORS = Array.from({ length: 25 }, (_, ci) => {
  const a = Math.max(0.20, 1 - ci * 0.05).toFixed(2)
  return `rgba(160,210,0,${a})`
})

const WORDS = [
  // Software engineering
  'ALGORITHM', 'RECURSION', 'COMPILE', 'DEPLOY', 'REFACTOR',
  'ASYNC', 'BINARY', 'CACHE', 'COMMIT', 'CONTAINER',
  'DAEMON', 'ENDPOINT', 'FUNCTION', 'INSTANCE', 'LAMBDA',
  'MODULE', 'PIPELINE', 'RUNTIME', 'SCHEMA', 'THREAD',
  'TOKEN', 'WEBHOOK', 'CLOSURE', 'PROMISE', 'INTERFACE',
  'INVARIANT', 'IDEMPOTENT', 'LATENCY', 'DEBOUNCE', 'THROTTLE',
  'MIGRATE', 'REBASE', 'BRANCH', 'MERGE', 'RELEASE',
  'SCAFFOLD', 'LIBRARY', 'PACKAGE', 'REGISTRY', 'LINTER',
  'PARSER', 'LEXER', 'ABSTRACT', 'GENERIC', 'MUTABLE',
  'REACTIVE', 'OBSERVER', 'SINGLETON', 'FACTORY', 'PROXY',
  'FALLBACK', 'TIMEOUT', 'RETRY', 'CIRCUIT', 'SHARD',
  'CLUSTER', 'REPLICA', 'INDEX', 'QUERY', 'STREAM',
  // Design
  'WIREFRAME', 'PROTOTYPE', 'COMPONENT', 'TYPOGRAPHY', 'HIERARCHY',
  'CONTRAST', 'MOTION', 'TRANSITION', 'INTERACTION', 'ATOMIC',
  'HEURISTIC', 'GESTALT', 'AFFORDANCE', 'GRID', 'SPACING',
  'KERNING', 'BASELINE', 'PALETTE', 'OPACITY', 'SHADOW',
  'RADIUS', 'PADDING', 'MARGIN', 'VIEWPORT', 'BREAKPOINT',
  'ICON', 'BADGE', 'TOOLTIP', 'MODAL', 'DRAWER',
  'LAYOUT', 'CANVAS', 'FRAME', 'LAYER', 'VARIANT',
  'TOKEN', 'THEME', 'SYSTEM', 'PATTERN', 'SURFACE',
  // Product
  'ROADMAP', 'SPRINT', 'BACKLOG', 'VELOCITY', 'ITERATE',
  'METRIC', 'PIVOT', 'FUNNEL', 'RETENTION', 'COHORT',
  'HYPOTHESIS', 'OKR', 'MVP', 'PERSONA', 'TRACTION',
  'DISCOVERY', 'LAUNCH', 'ADOPTION', 'CHURN', 'SEGMENT',
  'INSIGHT', 'SIGNAL', 'EXPERIMENT', 'VALIDATE', 'EPIC',
  'STORY', 'TICKET', 'ALIGNMENT', 'SCOPE', 'IMPACT',
  'BENCHMARK', 'FEATURE', 'BASELINE', 'EFFORT', 'STAKEHOLDER',
]

// Minimum splash duration — human attention span target (milliseconds)
const MIN_DISPLAY_MS = 18000

export function PageLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const FONT_SIZE   = 15
    const COL_WIDTH   = Math.round(FONT_SIZE * 2.2)
    const LINE_HEIGHT = FONT_SIZE + 5
    const MAX_TRAIL   = 25
    const cols        = Math.floor(W / COL_WIDTH)

    ctx.font      = `${FONT_SIZE}px "JetBrains Mono", monospace`
    ctx.textAlign = 'left'
    ctx.shadowBlur = 0

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, W, H)

    // Spread initial y so canvas looks full from frame 1:
    // range from -(MAX_TRAIL * LINE_HEIGHT) to H * 0.55
    // — columns already on-screen (y > 0) cover top/mid/bottom immediately,
    //   columns above-screen (y < 0) cascade in over the first few seconds.
    const spreadTop = MAX_TRAIL * LINE_HEIGHT
    const spreadBot = Math.round(H * 0.55)
    const state = Array.from({ length: cols }, () => ({
      word:  WORDS[Math.floor(Math.random() * WORDS.length)],
      y:     Math.random() * (spreadBot + spreadTop) - spreadTop,
      speed: 1.0 + Math.random() * 0.8,   // 60–108 px/s at 60fps → ~15–20s to traverse H
    }))

    let raf: number
    let exitStarted = false
    const startTime = Date.now()

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.13)'
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < cols; i++) {
        const { word, y, speed } = state[i]
        const x = i * COL_WIDTH

        const limit = Math.min(word.length, MAX_TRAIL)
        for (let ci = 0; ci < limit; ci++) {
          const charY = y + ci * LINE_HEIGHT
          if (charY < -LINE_HEIGHT || charY > H + LINE_HEIGHT) continue
          ctx.fillStyle = ci === 0
            ? '#D4FF40'
            : TRAIL_COLORS[Math.min(ci, TRAIL_COLORS.length - 1)]
          ctx.fillText(word[ci % word.length], x, charY)
        }

        state[i].y += speed

        // Exit only after MIN_DISPLAY_MS AND once a lead char reaches the bottom
        if (state[i].y >= H && !exitStarted) {
          const elapsed = Date.now() - startTime
          if (elapsed >= MIN_DISPLAY_MS) {
            exitStarted = true
            setExiting(true)
            setTimeout(() => setGone(true), 800)
          }
        }

        if (y > H + MAX_TRAIL * LINE_HEIGHT) {
          state[i].word  = WORDS[Math.floor(Math.random() * WORDS.length)]
          state[i].y     = -Math.random() * H * 0.15
          state[i].speed = 1.0 + Math.random() * 0.8
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => cancelAnimationFrame(raf)
  }, [])

  if (gone) return null

  return (
    <motion.div
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      onClick={() => {
        if (!exiting) {
          setExiting(true)
          setTimeout(() => setGone(true), 700)
        }
      }}
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        9999,
        background:    '#000',
        cursor:        'pointer',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
      title="Click to skip"
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', position: 'absolute', inset: 0 }}
      />
    </motion.div>
  )
}
