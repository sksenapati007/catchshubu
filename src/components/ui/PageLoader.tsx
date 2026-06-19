import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const WORDS = [
  'ΤΕΧΝΗ', 'ΛΟΓΟΣ', 'ΚΟΣΜΟΣ', 'ΑΡΧΗ', 'ΑΡΙΘΜΟΣ', 'ΜΗΧΑΝΗ',
  'ΑΥΤΟΜΑΤΟΝ', 'ΣΥΣΤΗΜΑ', 'ΚΥΒΕΡΝΗΤΗΣ', 'ΕΝΕΡΓΕΙΑ', 'ΔΥΝΑΜΙΣ',
  'ΑΝΑΛΥΣΙΣ', 'ΦΥΣΙΣ', 'ΔΙΚΤΥΟΝ', 'ΧΑΟΣ', 'ΤΕΛΟΣ', 'ΛΟΓΙΚΗ',
  'MACHINA', 'CALCULUS', 'MATRIX', 'NEXUS', 'CURSOR',
  'DATUM', 'CODEX', 'RECURSIO', 'ITERATIO', 'SYSTEMA',
  'ALGORITHMVS', 'ARCHITECTURA', 'PROCESSUS', 'INGENIUM',
]

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
    const COL_WIDTH   = Math.round(FONT_SIZE * 1.7)
    const LINE_HEIGHT = FONT_SIZE + 5
    const cols        = Math.floor(W / COL_WIDTH)

    ctx.font      = `${FONT_SIZE}px "JetBrains Mono", monospace`
    ctx.textAlign = 'left'

    // Black base
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, W, H)

    // Columns start near the top (small negative offset) so words
    // have time to traverse the full screen during the animation window
    const state = Array.from({ length: cols }, () => ({
      word:  WORDS[Math.floor(Math.random() * WORDS.length)],
      y:    -Math.random() * H * 0.35,
      speed: 3.0 + Math.random() * 3.5,
    }))

    let raf: number

    const draw = () => {
      // Slow fade so previous chars dim gradually without blurring
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, W, H)

      // No shadow/blur on ctx — it smears glyphs and kills readability
      ctx.shadowBlur = 0

      for (let i = 0; i < cols; i++) {
        const { word, y, speed } = state[i]
        const x = i * COL_WIDTH

        for (let ci = 0; ci < word.length; ci++) {
          const charY = y + ci * LINE_HEIGHT
          if (charY < -LINE_HEIGHT || charY > H + LINE_HEIGHT) continue

          if (ci === 0) {
            // Lead: pure white-green, fully opaque, sharp
            ctx.fillStyle = '#D4FF40'
          } else {
            // Trail: stays legible for the full word length
            const alpha = Math.max(0.25, 1 - ci * 0.07)
            ctx.fillStyle = `rgba(160,210,0,${alpha})`
          }

          ctx.fillText(word[ci], x, charY)
        }

        state[i].y += speed

        if (y > H + word.length * LINE_HEIGHT) {
          state[i].word  = WORDS[Math.floor(Math.random() * WORDS.length)]
          state[i].y     = -Math.random() * H * 0.3
          state[i].speed = 3.0 + Math.random() * 3.5
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    const t1 = setTimeout(() => setExiting(true), 4000)
    const t2 = setTimeout(() => setGone(true),    4800)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (gone) return null

  return (
    <motion.div
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      onClick={() => { setExiting(true); setTimeout(() => setGone(true), 700) }}
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
