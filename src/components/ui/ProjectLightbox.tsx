import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Slide } from './DeckLink'

interface Props {
  slides: Slide[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function ProjectLightbox({ slides, index, onClose, onPrev, onNext }: Props) {
  const slide = slides[index]
  const hasPrev = index > 0
  const hasNext = index < slides.length - 1

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onPrev()
    if (e.key === 'ArrowRight' && hasNext) onNext()
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return createPortal(
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#888',
          zIndex: 10,
        }}
      >
        <X size={16} strokeWidth={1.5} />
      </button>

      {/* Slide counter */}
      <span style={{
        position: 'absolute', top: '24px', right: '24px',
        fontFamily: '"JetBrains Mono", monospace', fontSize: '11px',
        color: '#444', letterSpacing: '0.1em',
      }}>
        {index + 1} / {slides.length}
      </span>

      {/* Slide */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '24px' }}
      >
        {/* Prev arrow */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous"
          style={{
            background: hasPrev ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: hasPrev ? 'pointer' : 'default',
            color: hasPrev ? '#888' : '#222',
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        {/* Active slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.22 }}
            style={{
              width: 'min(80vw, 720px)',
              height: 'min(65vh, 480px)',
              borderRadius: '10px',
              background: slide?.color ?? '#1A1A1A',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              // TODO: replace with <img src={slide.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            }}
          >
            {/* Placeholder label — remove when real screenshots are added */}
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {slide?.projectName ?? `Slide ${index + 1}`}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next"
          style={{
            background: hasNext ? 'rgba(255,255,255,0.06)' : 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: hasNext ? 'pointer' : 'default',
            color: hasNext ? '#888' : '#222',
            flexShrink: 0,
          }}
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      {/* Caption */}
      {slide?.caption && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            marginTop: '24px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            color: '#555',
            letterSpacing: '0.04em',
            textAlign: 'center',
            maxWidth: '480px',
          }}
        >
          {slide.caption}
        </motion.p>
      )}
    </motion.div>,
    document.body
  )
}
