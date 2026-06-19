import { WordSwap } from '@/components/ui/WordSwap'
import { MetricStrip } from '@/components/ui/MetricStrip'
import { TerminalCard } from '@/components/ui/TerminalCard'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function PhotoCollage() {
  const size = 'clamp(140px, 16vw, 200px)'
  return (
    <div className="select-none" style={{ width: size }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1px solid var(--c-border)',
          background: 'var(--c-surface-alt)',
        }}
      >
        <img
          src="/images/portrait.png"
          alt="Shubhendu"
          className="portrait-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
      </div>
      <p style={{
        textAlign: 'center',
        marginTop: '10px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--c-text-3)',
      }}>
        Shubhendu Senapati
      </p>
    </div>
  )
}

// Animated scroll indicator
function ScrollHint({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.a
      href="#about"
      data-magnetic
      aria-label="Scroll to About"
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={reduced ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        textDecoration: 'none',
        color: 'var(--c-text-3)',
        cursor: 'none',
      }}
    >
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        scroll
      </span>
      <motion.div
        animate={reduced ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={16} strokeWidth={1.5} />
      </motion.div>
    </motion.a>
  )
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const HS = 'clamp(34px, 4.8vw, 62px)'

export function Hero() {
  const reduced = useReducedMotion()

  const motionProps = reduced
    ? {}
    : { variants: container, initial: 'hidden', animate: 'visible' }

  const itemProps = reduced ? {} : { variants: item }

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="flex flex-col pt-5 lg:pt-0 lg:min-h-screen"
    >
      {/* Main content */}
      <div className="flex-1 w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6 lg:py-8 lg:flex lg:items-center">
        <div className="w-full grid gap-10 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_520px] lg:gap-14 lg:items-center">

          {/* ── LEFT ── */}
          <motion.div {...motionProps} className="flex flex-col">

            <motion.div {...itemProps} className="mb-6">
              <PhotoCollage />
            </motion.div>

            <motion.h1
              {...itemProps}
              id="hero-heading"
              className="font-serif font-normal leading-[1.06] mb-0"
              style={{ fontSize: HS, color: 'var(--c-text-1)' }}
            >
              Working at the intersection of
            </motion.h1>

            <motion.div
              {...itemProps}
              style={{
                fontSize: HS,
                height: '1.1em',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                marginTop: 0,
                marginBottom: '1.25rem',
              }}
            >
              <WordSwap />
            </motion.div>

            <motion.p
              {...itemProps}
              className="mb-8 text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--c-text-2)', maxWidth: '480px' }}
            >
              The problems I find most interesting tend to sit where{' '}
              <span style={{ color: 'var(--c-text-1)' }}>technical decisions have product consequences</span>{' '}
              — and product ones have technical costs. I've spent enough time in that
              space to feel comfortable there, though there's always more to figure out.
            </motion.p>

            <motion.div {...itemProps}>
              <MetricStrip />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: terminal card ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 20 }}
            animate={reduced ? false : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col lg:pt-4"
          >
            <TerminalCard />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint — pinned to bottom center */}
      <div className="flex justify-center pb-5 lg:pb-8">
        <ScrollHint reduced={reduced} />
      </div>
    </section>
  )
}
