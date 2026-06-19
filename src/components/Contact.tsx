import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Linkedin, Github, FileText } from 'lucide-react'

const CONTACT_LINKS = [
  {
    label: 'Email',
    handle: 'catchshubu@gmail.com',
    href: 'mailto:catchshubu@gmail.com',
    Icon: Mail,
  },
  {
    label: 'LinkedIn',
    handle: '/in/shubhendukumars',
    href: 'https://linkedin.com/in/shubhendukumars',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    handle: '@sksenapati007',
    href: 'https://github.com/sksenapati007',
    Icon: Github,
  },
  {
    label: 'Substack',
    handle: '@catchshubu',
    href: 'https://catchshubu.substack.com',
    Icon: FileText,
  },
]

const card = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function Contact() {
  const reduced = useReducedMotion()
  const vp = reduced ? undefined : { once: true, margin: '-60px' as const }

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <hr className="section-divider" />

      <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-[72px]">
        <div className="mx-auto max-w-[720px] lg:mx-0">

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="eyebrow">Contact</span>
          </motion.div>

          <motion.h2
            id="contact-heading"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="font-serif font-normal mb-10"
            style={{ fontSize: '28px', color: 'var(--c-text-1)' }}
          >
            Let's build something
          </motion.h2>

          <motion.div
            variants={reduced ? undefined : listContainer}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={vp}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {CONTACT_LINKS.map(({ label, handle, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                variants={reduced ? undefined : card}
                className="flex items-center justify-between px-4 py-4 rounded-[4px] group"
                style={{
                  border: '1px solid var(--c-border)',
                  textDecoration: 'none',
                  transition: 'border-color 200ms ease, background 200ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--c-muted)'
                  e.currentTarget.style.background = 'var(--c-surface)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--c-border)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} style={{ color: 'var(--c-text-3)', flexShrink: 0 }} strokeWidth={1.5} />
                  <span className="text-sm" style={{ color: 'var(--c-text-1)' }}>{label}</span>
                </div>
                <span
                  className="font-mono text-[11px] ml-3 truncate"
                  style={{ color: 'var(--c-text-3)' }}
                >
                  {handle}
                </span>
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
