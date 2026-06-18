import { motion, AnimatePresence } from 'framer-motion'
import { useMusic } from '@/context/MusicContext'

export function MusicPrompt() {
  const { prompted, dismiss } = useMusic()

  return (
    <AnimatePresence>
      {!prompted && (
        <motion.div
          key="music-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#080808',
            zIndex: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(12px, 1.5vw, 14px)',
              color: '#555',
              letterSpacing: '0.04em',
              marginBottom: '28px',
              textAlign: 'center',
            }}
          >
            This website has music playing in the background.
          </p>

          <p
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(20px, 3vw, 28px)',
              color: '#E8E6E0',
              marginBottom: '48px',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            Do you want to play the music<br />or keep it muted?
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => dismiss(true)}
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                padding: '14px 40px',
                borderRadius: '9999px',
                border: 'none',
                background: '#E8E6E0',
                color: '#0A0A0A',
                cursor: 'pointer',
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Play It!
            </button>

            <button
              onClick={() => dismiss(false)}
              style={{
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                padding: '14px 40px',
                borderRadius: '9999px',
                border: '1px solid #333',
                background: 'transparent',
                color: '#888580',
                cursor: 'pointer',
                transition: 'color 150ms ease, border-color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8E6E0'; e.currentTarget.style.borderColor = '#555' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#888580'; e.currentTarget.style.borderColor = '#333' }}
            >
              Keep It Muted
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
