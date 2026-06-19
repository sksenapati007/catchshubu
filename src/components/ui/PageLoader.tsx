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

    const FONT_SIZE   = 14
    const COL_WIDTH   = Math.round(FONT_SIZE * 1.6)
    const LINE_HEIGHT = FONT_SIZE + 2
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
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, W, H)

      for (let i = 0; i < cols; i++) {
        const { word, y, speed } = state[i]
        const x = i * COL_WIDTH

        for (let ci = 0; ci < word.length; ci++) {
          const charY = y + ci * LINE_HEIGHT
          if (charY < -LINE_HEIGHT || charY > H + LINE_HEIGHT) continue

          if (ci === 0) {
            ctx.fillStyle  = '#C8FF00'
            ctx.shadowColor = '#C8FF00'
            ctx.shadowBlur  = 8
          } else {
            const alpha = Math.max(0.08, 1 - ci * 0.13)
            ctx.fillStyle  = `rgba(168,220,0,${alpha})`
            ctx.shadowBlur = 0
          }

          ctx.fillText(word[ci], x, charY)
        }
        ctx.shadowBlur = 0

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
