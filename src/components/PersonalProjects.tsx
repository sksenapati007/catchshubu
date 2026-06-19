import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Github, ExternalLink, FlaskConical } from 'lucide-react'
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

type Tab = 'code' | 'case-studies'

const TABS: { id: Tab; label: string }[] = [
  { id: 'code',         label: 'Code' },
  { id: 'case-studies', label: 'Case Studies' },
]

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div
      className="inline-flex mb-10"
      role="tablist"
      aria-label="Personal projects categories"
      style={{
        border: '1px solid var(--c-border)',
        borderRadius: '6px',
        padding: '3px',
        gap: '2px',
        background: 'var(--c-surface)',
      }}
    >
      {TABS.map(tab => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 180ms ease, color 180ms ease',
              background: isActive ? 'var(--c-accent)' : 'transparent',
              color: isActive ? 'var(--c-base)' : 'var(--c-text-3)',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

function CodeGrid({ reduced }: { reduced: boolean | null }) {
  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }
  return (
    <motion.div
      key="code"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
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
    </motion.div>
  )
}

function CaseStudiesPlaceholder() {
  return (
    <motion.div
      key="case-studies"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      style={{
        border: '1px dashed var(--c-border)',
        borderRadius: '6px',
        padding: '56px 24px',
        background: 'var(--c-surface)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <FlaskConical
        size={24}
        strokeWidth={1.5}
        style={{ color: 'var(--c-text-3)', opacity: 0.45 }}
      />
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--c-text-2)',
        }}
      >
        UI / UX &amp; Product case studies
      </p>
      <p
        style={{
          fontSize: '13px',
          color: 'var(--c-text-3)',
          maxWidth: '420px',
          lineHeight: '1.6',
        }}
      >
        Documenting design and product decisions from past work. Coming together slowly.
      </p>
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--c-accent)',
          border: '1px solid var(--c-accent)',
          borderRadius: '3px',
          padding: '3px 10px',
          opacity: 0.7,
          marginTop: '4px',
        }}
      >
        Coming Soon
      </span>
    </motion.div>
  )
}

export function PersonalProjects() {
  const reduced = useReducedMotion()
  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }
  const [activeTab, setActiveTab] = useState<Tab>('code')

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
          <span className="eyebrow">Personal</span>
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
          className="mb-10 text-sm sm:text-base leading-relaxed max-w-[600px]"
          style={{ color: 'var(--c-text-2)' }}
        >
          Side projects, experiments, and thinking-out-loud work — code and case studies.
        </motion.p>

        <TabBar active={activeTab} onChange={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === 'code'
            ? <CodeGrid key="code" reduced={reduced} />
            : <CaseStudiesPlaceholder key="case-studies" />
          }
        </AnimatePresence>

      </div>
    </section>
  )
}
