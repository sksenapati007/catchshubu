import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface Slide {
  // TODO: replace `color` with `src: string` once you have real screenshots
  color: string
  caption?: string
  projectName?: string
}

interface Props {
  children: ReactNode
  slides: Slide[]
  onOpen: () => void
}

// Resting and hovered transforms for each card in the deck
const DECK_REST = [
  { rotate: -10, x: -18, y: -6,  scale: 0.92 },
  { rotate: -2,  x: -6,  y: -12, scale: 0.96 },
  { rotate: 6,   x: 10,  y: -8,  scale: 0.94 },
]
const DECK_HOVER = [
  { rotate: -18, x: -38, y: -28, scale: 0.90 },
  { rotate: -4,  x: -12, y: -40, scale: 0.96 },
  { rotate: 12,  x: 24,  y: -32, scale: 0.92 },
]

export function DeckLink({ children, slides, onOpen }: Props) {
  const [hovered, setHovered] = useState(false)
  const visibleSlides = slides.slice(0, 3)

  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card deck popup */}
      <AnimatePresence>
        {hovered && visibleSlides.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 12px)',
              left: '0',
              pointerEvents: 'none',
              zIndex: 100,
              height: '120px',
              width: '90px',
            }}
          >
            {visibleSlides.map((slide, i) => (
              <motion.div
                key={i}
                initial={DECK_REST[i]}
                animate={DECK_HOVER[i]}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: i * 0.04 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '72px',
                  height: '96px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: slide.color,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  // TODO: swap background for: backgroundImage: `url(${slide.src})`, backgroundSize: 'cover'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The link itself */}
      <motion.button
        onClick={onOpen}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          color: 'var(--c-accent)',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
        }}
      >
        {children}
        {/* Animated underline */}
        <motion.span
          style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: '1px',
            background: 'var(--c-accent)',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </motion.button>
    </span>
  )
}
