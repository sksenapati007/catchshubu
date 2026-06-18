import { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { PROJECTS } from '@/data/projects'

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const reduced = useReducedMotion()

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
    const walk = (x - startX) * 1.2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }, [isDragging, startX, scrollLeft])

  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }

  return (
    <section id="projects" aria-labelledby="projects-heading">
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

          <div className="flex items-end justify-between">
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
            <span className="eyebrow hidden sm:block">drag to explore →</span>
          </div>
        </div>

        {/* Horizontal scroll — full bleed */}
        <div
          ref={scrollRef}
          role="list"
          aria-label="Projects"
          tabIndex={0}
          className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-6 lg:px-10 xl:px-14 cursor-grab active:cursor-grabbing select-none"
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
        >
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
