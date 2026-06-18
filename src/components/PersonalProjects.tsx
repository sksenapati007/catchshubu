import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { Tag } from '@/components/ui/Tag'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const MotionSpotlightCard = motion(SpotlightCard)

interface PersonalProject {
  name: string
  description: string
  tags: string[]
  github: string
  demo?: string
}

const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    name: 'NutrimentPWA',
    description: 'Personal diet & nutrition tracker built as an installable Progressive Web App.',
    tags: ['PWA', 'Diet Tracker'],
    github: 'https://github.com/sksenapati007/NutrimentPWA',
    demo: 'https://nutrimentpwa.onrender.com',
  },
  {
    name: 'FarmPlanner',
    description: 'Farm planning and management web app for organising layouts and schedules.',
    tags: ['Web App', 'Planner'],
    github: 'https://github.com/sksenapati007/FarmPlanner-v1',
    demo: 'https://farmplanner-v1.onrender.com',
  },
  {
    name: 'PawPal',
    description: 'MVP built during Certified Scrum Product Owner (CSPO) training.',
    tags: ['MVP', 'CSPO'],
    github: 'https://github.com/sksenapati007/PawPal',
    demo: 'https://sksenapati007.github.io/PawPal',
  },
  {
    name: 'Expense Tracker',
    description: 'Flutter-based expense tracking app for logging and categorising spend. (Unpublished)',
    tags: ['Flutter', 'Mobile'],
    github: 'https://github.com/sksenapati007/ExpenseTrackerApp',
  },
  {
    name: 'Simple TODO App',
    description: 'Lightweight to-do app — pure client-side, no databases involved.',
    tags: ['Todo', 'Client-side'],
    github: 'https://github.com/sksenapati007/Simple-TODO-App',
    demo: 'https://todo-list-shubu.web.app',
  },
  {
    name: 'weather-cli',
    description: 'Weather service that returns live conditions by city via a simple API endpoint.',
    tags: ['CLI', 'API'],
    github: 'https://github.com/sksenapati007/weather-cli',
    demo: 'https://weather-cli-mrlm.onrender.com/weather?city=Dubai',
  },
  {
    name: 'Employee Management',
    description: 'C++ console application for employee records — an early high-school project.',
    tags: ['C++', 'Console'],
    github: 'https://github.com/sksenapati007/Employee-Mgmt-C-plus-plus',
  },
]

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export function PersonalProjects() {
  const reduced = useReducedMotion()
  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }

  return (
    <section id="personal-projects" aria-labelledby="personal-projects-heading">
      <hr className="section-divider" />

      <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-[72px]">

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <span className="eyebrow">Personal Projects</span>
        </motion.div>

        <motion.h2
          id="personal-projects-heading"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="font-serif font-normal mb-3"
          style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--c-text-1)' }}
        >
          Built for the love of it
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12 text-sm sm:text-base leading-relaxed max-w-[600px]"
          style={{ color: 'var(--c-text-2)' }}
        >
          Side projects and experiments — from PWAs and Flutter apps to CLIs and a nostalgic C++ console app.
        </motion.p>

        <motion.div
          variants={reduced ? undefined : grid}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={vp}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PERSONAL_PROJECTS.map(p => (
            <MotionSpotlightCard
              key={p.name}
              variants={reduced ? undefined : card}
              style={{
                border: '1px solid var(--c-border)',
                borderRadius: '6px',
                padding: '20px',
                background: 'var(--c-surface)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.borderColor = 'var(--c-muted)')}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => (e.currentTarget.style.borderColor = 'var(--c-border)')}
            >
              <h3
                className="font-serif leading-snug mb-2"
                style={{ fontSize: '18px', color: 'var(--c-text-1)' }}
              >
                {p.name}
              </h3>

              <p
                className="text-[13px] leading-relaxed flex-1 mb-4"
                style={{ color: 'var(--c-text-2)' }}
              >
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>

              <div
                className="flex items-center gap-5 pt-3"
                style={{ borderTop: '1px solid var(--c-border)' }}
              >
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} source code on GitHub`}
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    color: 'var(--c-text-3)',
                    textDecoration: 'none',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text-1)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-3)')}
                >
                  <Github size={13} strokeWidth={1.5} />
                  Code
                </a>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} live demo`}
                    className="flex items-center gap-1.5"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '11px',
                      color: 'var(--c-text-3)',
                      textDecoration: 'none',
                      transition: 'color 150ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-text-1)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-text-3)')}
                  >
                    <ExternalLink size={13} strokeWidth={1.5} />
                    Live Demo
                  </a>
                )}
              </div>
            </MotionSpotlightCard>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
