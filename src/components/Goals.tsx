import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Lightbulb, TrendingUp, Users, Globe } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const MotionSpotlightCard = motion(SpotlightCard)

const GOALS = [
  {
    Icon: Lightbulb,
    title: 'Product-Minded Engineering',
    description:
      'CSPO-certified — owning requirements, roadmap and release alongside the code, not just shipping tickets.',
  },
  {
    Icon: TrendingUp,
    title: 'Scale & Reliability',
    description:
      'Building systems that hold up under load — payments, real-time infra and high-volume data, measured by real metrics.',
  },
  {
    Icon: Users,
    title: 'Technical Leadership',
    description:
      'Mentoring engineers, setting coding standards, and aligning teams around predictable, high-quality releases.',
  },
  {
    Icon: Globe,
    title: 'Global Opportunities',
    description:
      'Open to roles across the Middle East, Europe, Australia and Southeast Asia to broaden international impact.',
  },
]

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export function Goals() {
  const reduced = useReducedMotion()
  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }

  return (
    <section id="goals">
      <hr className="section-divider" />

      <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-[72px]">

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <span className="eyebrow">Goals</span>
        </motion.div>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="font-serif font-normal mb-4"
          style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--c-text-1)' }}
        >
          Where I'm headed
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12 text-sm sm:text-base leading-relaxed max-w-[560px]"
          style={{ color: 'var(--c-text-2)' }}
        >
          Leveraging a technical foundation to drive product innovation and meaningful user experiences — globally.
        </motion.p>

        <motion.div
          variants={reduced ? undefined : grid}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={vp}
          className="grid gap-3 sm:grid-cols-2"
        >
          {GOALS.map(({ Icon, title, description }) => (
            <MotionSpotlightCard
              key={title}
              variants={reduced ? undefined : card}
              style={{
                border: '1px solid var(--c-border)',
                borderRadius: '6px',
                padding: '20px 22px',
                background: 'var(--c-surface)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.borderColor = 'var(--c-muted)')}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.borderColor = 'var(--c-border)')}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'var(--c-accent-20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--c-accent)' }} />
              </div>

              <div>
                <h3
                  className="font-serif leading-snug mb-2"
                  style={{ fontSize: '17px', color: 'var(--c-text-1)' }}
                >
                  {title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: 'var(--c-text-2)' }}
                >
                  {description}
                </p>
              </div>
            </MotionSpotlightCard>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
