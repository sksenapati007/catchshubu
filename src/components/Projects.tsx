import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { DeckLink } from '@/components/ui/DeckLink'
import { ProjectLightbox } from '@/components/ui/ProjectLightbox'
import { PROJECTS } from '@/data/projects'
import type { Slide } from '@/components/ui/DeckLink'

// Flatten all project slides for the lightbox
const ALL_SLIDES: Slide[] = PROJECTS.flatMap(p =>
  (p.slides ?? [{ color: '#111', projectName: p.name, caption: p.description }]).map(s => ({
    ...s,
    projectName: p.name,
  }))
)

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const reduced = useReducedMotion()

  // Phase: 'text' shows manifesto first, then transitions to 'cards'
  const [phase, setPhase] = useState<'text' | 'cards'>(reduced ? 'cards' : 'text')

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Transition from manifesto text → cards after 2.5s once in view
  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return

    let timer: ReturnType<typeof setTimeout>
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setPhase('cards'), 2500)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(section)
    return () => { obs.disconnect(); clearTimeout(timer) }
  }, [reduced])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0))
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0)
  }, [])
  const onMouseLeave = useCallback(() => setIsDragging(false), [])
  const onMouseUp = useCallback(() => setIsDragging(false), [])
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0)
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2
  }, [isDragging, startX, scrollLeft])

  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }

  return (
    <section id="projects" ref={sectionRef} aria-labelledby="projects-heading">
      <hr className="section-divider" />

      <div className="py-[72px]">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-10 xl:px-14 mb-8">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <span className="eyebrow">Work</span>
          </motion.div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <motion.h2
              id="projects-heading"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5 }}
              className="font-serif font-normal"
              style={{ fontSize: '28px', color: 'var(--c-text-1)' }}
            >
              Things I've shipped
            </motion.h2>

            {/* DeckLink — fans out cards on hover, opens lightbox on click */}
            <DeckLink slides={ALL_SLIDES} onOpen={() => { setLightboxIndex(0); setLightboxOpen(true) }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                View all work →
              </span>
            </DeckLink>
          </div>
        </div>

        {/* Manifesto → Cards animated phase switch */}
        <AnimatePresence mode="wait">
          {phase === 'text' ? (
            <motion.div
              key="manifesto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={() => setPhase('cards')}
              style={{
                minHeight: '52vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                padding: '0 24px',
              }}
              title="Click to skip"
            >
              {/* Accent circle */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'clamp(180px, 22vw, 280px)',
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  background: 'var(--c-accent)',
                  zIndex: 1,
                  opacity: 0.9,
                }}
              />
              {/* Manifesto text (above circle) */}
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 'clamp(22px, 4vw, 54px)',
                  lineHeight: 1.35,
                  color: 'var(--c-text-2)',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2,
                  maxWidth: '700px',
                  letterSpacing: '-0.01em',
                }}
              >
                i write systems<br />
                that hold at scale.<br />
                i ship code where<br />
                failure is not<br />
                an option.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hint text */}
              <div className="px-4 sm:px-6 lg:px-10 xl:px-14 mb-4 flex justify-end">
                <span className="eyebrow hidden sm:block">drag to explore →</span>
              </div>

              {/* Horizontal scroll */}
              <div
                ref={scrollRef}
                role="list"
                aria-label="Projects"
                className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-6 lg:px-10 xl:px-14 cursor-grab active:cursor-grabbing select-none max-sm:snap-x max-sm:snap-mandatory"
                style={{ paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onKeyDown={e => {
                  if (!scrollRef.current) return
                  if (e.key === 'ArrowLeft')  { e.preventDefault(); scrollRef.current.scrollLeft -= 320 }
                  if (e.key === 'ArrowRight') { e.preventDefault(); scrollRef.current.scrollLeft += 320 }
                }}
                tabIndex={0}
              >
                {PROJECTS.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                <div className="flex-shrink-0 w-4" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <ProjectLightbox
            slides={ALL_SLIDES}
            index={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setLightboxIndex(i => Math.max(0, i - 1))}
            onNext={() => setLightboxIndex(i => Math.min(ALL_SLIDES.length - 1, i + 1))}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
