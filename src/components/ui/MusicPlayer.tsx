import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat } from 'lucide-react'
import { useMusic, TRACK } from '@/context/MusicContext'

function fmt(s: number) {
  if (!isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const BTN: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  borderRadius: '50%',
  transition: 'background 150ms ease',
  color: '#888580',
  flexShrink: 0,
}

export function MusicPlayer() {
  const { prompted, playing, muted, currentTime, duration, loop, togglePlay, toggleMute, toggleLoop, restart, skipForward } = useMusic()

  return (
    <AnimatePresence>
      {prompted && (
        <motion.div
          key="music-player"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.3 }}
          className="music-player-bar"
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            background: '#0D0D0D',
            border: '1px solid #1F1F1F',
            borderRadius: '9999px',
            padding: '8px 16px 8px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            userSelect: 'none',
            minWidth: '320px',
            maxWidth: '520px',
          }}
        >
          {/* Album art placeholder */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #8B7A2A 0%, #3A3A1A 100%)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
            aria-hidden="true"
          >
            🎵
          </div>

          {/* Track info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 500, color: '#E8E6E0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2 }}>
              {TRACK.title}
            </p>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.04em', lineHeight: 1.2 }}>
              {TRACK.artist}
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '24px', background: '#1F1F1F', flexShrink: 0 }} />

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button style={BTN} onClick={restart} aria-label="Restart"
              onMouseEnter={e => (e.currentTarget.style.background = '#1F1F1F')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
              <SkipBack size={14} strokeWidth={1.5} />
            </button>

            <button
              style={{ ...BTN, background: '#222', width: '34px', height: '34px', color: '#E8E6E0' }}
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              onMouseEnter={e => (e.currentTarget.style.background = '#2A2A2A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#222')}
            >
              {playing ? <Pause size={14} strokeWidth={1.5} /> : <Play size={14} strokeWidth={1.5} />}
            </button>

            <button style={BTN} onClick={skipForward} aria-label="Skip 10 seconds"
              onMouseEnter={e => (e.currentTarget.style.background = '#1F1F1F')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
              <SkipForward size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mute */}
          <button style={{ ...BTN, color: muted ? '#333' : '#888580' }} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}
            onMouseEnter={e => (e.currentTarget.style.background = '#1F1F1F')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
            {muted ? <VolumeX size={14} strokeWidth={1.5} /> : <Volume2 size={14} strokeWidth={1.5} />}
          </button>

          {/* Time */}
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#444', letterSpacing: '0.04em', flexShrink: 0 }}>
            {fmt(currentTime)}{duration > 0 ? ` / ${fmt(duration)}` : ''}
          </span>

          {/* Divider */}
          <div style={{ width: '1px', height: '24px', background: '#1F1F1F', flexShrink: 0 }} />

          {/* Loop */}
          <button style={{ ...BTN, color: loop ? '#C8FF00' : '#333' }} onClick={toggleLoop} aria-label="Toggle loop"
            onMouseEnter={e => (e.currentTarget.style.background = '#1F1F1F')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
            <Repeat size={13} strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
