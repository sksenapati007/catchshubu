import { motion, useReducedMotion } from 'framer-motion'
import { Tag } from '@/components/ui/Tag'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

const ROLE_BADGES = [
  'Software Engineer',
  'Tech Product Manager',
  'Design Engineer',
]

const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Java', 'C++', 'SQL', 'Rust (learning)'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Remix', 'Angular', 'Tailwind CSS', 'shadcn/ui', 'Flutter', 'BBC TAL'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'NestJS (Fastify)', 'Express', 'Bun', 'Supabase', 'Firebase'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Oracle', 'Redis', 'Prisma'],
  },
  {
    label: 'Messaging & Queue',
    skills: ['RabbitMQ', 'EMQX MQTT', 'SSE', 'Kafka'],
  },
  {
    label: 'DevOps & Cloud',
    skills: ['Docker', 'GitHub Actions', 'GitLab CI/CD', 'AWS', 'Render', 'fly.io', 'OpenTelemetry', 'Grafana Tempo'],
  },
  {
    label: 'Payments',
    skills: ['PayTM', 'Razorpay', 'Cashfree', 'Webhooks', 'Reconciliation'],
  },
  {
    label: 'AI & Tooling',
    skills: ['Cursor AI', 'Copilot', 'n8n', 'Ollama', 'Multi-repo orchestration'],
  },
]


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function SkillCard({ label, skills }: { label: string; skills: string[] }) {
  return (
    <SpotlightCard
      style={{
        border: '1px solid var(--c-border)',
        borderRadius: '6px',
        padding: '16px 18px',
        background: 'var(--c-surface)',
        transition: 'border-color 200ms ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--c-muted)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--c-border)')}
    >
      <p
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--c-accent)',
          marginBottom: '12px',
        }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map(s => <Tag key={s}>{s}</Tag>)}
      </div>
    </SpotlightCard>
  )
}

export function About() {
  const reduced = useReducedMotion()
  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }

  return (
    <section id="about" aria-labelledby="about-heading">
      <hr className="section-divider" />

      <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-[72px]">
        <div className="mx-auto max-w-[720px] lg:mx-0 lg:max-w-none">

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="eyebrow">About</span>
          </motion.div>

          {/* Bio + role badges */}
          <div className="grid gap-8 sm:gap-10 md:grid-cols-[1fr_200px] mb-14">
            <motion.div
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={vp}
              variants={fadeUp}
            >
              <h2
                id="about-heading"
                className="font-serif font-normal mb-6"
                style={{ fontSize: '28px', color: 'var(--c-text-1)' }}
              >
                Still figuring things out, one ship at a time
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--c-text-2)' }}>
                <p>
                  I've spent the last few years working across payments, real-time systems,
                  and connected hardware — enough variety to appreciate that the interesting
                  problems usually live at the seams between things, not in any single layer.
                </p>
                <p>
                  I also hold a CSPO — not because I wanted to manage products, but because
                  I kept finding myself more curious about <em style={{ color: 'var(--c-text-1)', fontStyle: 'normal' }}>why</em> we
                  were building something than <em style={{ color: 'var(--c-text-1)', fontStyle: 'normal' }}>how</em>.
                  When something catches my attention that way, I tend to follow it all the
                  way — researching it properly, spinning up an MVP or POC to see if the
                  idea actually holds, or pursuing a certification when I want more than
                  surface familiarity.
                </p>
                <p>
                  The design side crept in gradually. I find it hard to feel done with
                  something that works technically but feels rough to use. Those two things
                  are harder to separate than they look.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.15 }}
              role="list"
              className="flex flex-row md:flex-col gap-3 flex-wrap"
            >
              {ROLE_BADGES.map(label => (
                <div
                  key={label}
                  role="listitem"
                  className="inline-flex items-center px-3 py-2 rounded-[4px]"
                  style={{
                    border: '1px solid var(--c-border)',
                    color: 'var(--c-text-2)',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Technical skills */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow block mb-6">Technical Skills</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {SKILL_GROUPS.map(g => (
                <SkillCard key={g.label} label={g.label} skills={g.skills} />
              ))}
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  )
}
