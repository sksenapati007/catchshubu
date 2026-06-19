import { useState, useRef, useEffect, CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useMusic, PLAYLIST } from '@/context/MusicContext'

const BTN: CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
  borderRadius: '50%',
  color: '#888580',
  flexShrink: 0,
  transition: 'color 150ms ease',
}

export function MusicPlayer() {
  const {
    playing, muted, currentIndex, currentTrack,
    togglePlay, toggleMute, nextTrack, prevTrack, selectTrack,
  } = useMusic()

  const [expanded, setExpanded] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>()

  const onEnter = () => {
    clearTimeout(leaveTimer.current)
    setExpanded(true)
  }
  const onLeave = () => {
    leaveTimer.current = setTimeout(() => setExpanded(false), 200)
  }
  useEffect(() => () => clearTimeout(leaveTimer.current), [])

  return (
    <>
      {/* Vinyl spin keyframe injected once */}
      <style>{`@keyframes vinyl-spin { to { transform: rotate(360deg); } }`}</style>

      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 60,
          width: expanded ? '280px' : '56px',
          minHeight: '56px',
          borderRadius: expanded ? '16px' : '50%',
          background: '#0D0D0D',
          border: `1px solid ${playing ? '#2a2a2a' : '#1F1F1F'}`,
          boxShadow: playing
            ? '0 0 24px rgba(200,255,0,0.10), 0 8px 32px rgba(0,0,0,0.6)'
            : '0 8px 32px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          transition: 'width 280ms cubic-bezier(0.4,0,0.2,1), border-radius 280ms ease, box-shadow 300ms ease, border-color 300ms ease',
          userSelect: 'none',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!expanded ? (
            <motion.div
              key="mini"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={togglePlay}
              style={{
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              title={playing ? 'Pause' : 'Play music'}
            >
              {/* Vinyl disc */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: [
                    'radial-gradient(circle at center,',
                    '  #2a2a2a 0%, #2a2a2a 18%,',
                    '  #111 18%, #111 22%,',
                    '  #1c1c1c 22%, #1c1c1c 28%,',
                    '  #111 28%, #111 32%,',
                    '  #1c1c1c 32%, #1c1c1c 38%,',
                    '  #111 38%, #111 42%,',
                    '  #1c1c1c 42%, #1c1c1c 48%,',
                    '  #111 48%',
                    ')',
                  ].join(''),
                  animation: 'vinyl-spin 8s linear infinite',
                  animationPlayState: playing ? 'running' : 'paused',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {/* Spindle hole */}
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#0D0D0D',
                }} />
              </div>

              {/* Play/Pause icon overlay — stops rotating even when disc spins */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: playing ? 'var(--c-accent, #C8FF00)' : '#555',
                transition: 'color 300ms ease',
                pointerEvents: 'none',
              }}>
                {playing
                  ? <Pause size={13} strokeWidth={2} />
                  : <Play size={13} strokeWidth={2} />
                }
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              {/* Controls row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 10px 8px',
              }}>
                <button style={BTN} onClick={prevTrack} aria-label="Previous track"
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8E6E0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888580')}>
                  <SkipBack size={13} strokeWidth={1.5} />
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#E8E6E0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {currentTrack.title}
                  </p>
                  <p style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '9px',
                    color: '#555',
                    letterSpacing: '0.04em',
                    lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {currentTrack.artist}
                  </p>
                </div>

                <button style={BTN} onClick={nextTrack} aria-label="Next track"
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8E6E0')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#888580')}>
                  <SkipForward size={13} strokeWidth={1.5} />
                </button>

                <div style={{ width: '1px', height: '18px', background: '#222', flexShrink: 0 }} />

                <button
                  style={{ ...BTN, background: '#1e1e1e', width: '26px', height: '26px', borderRadius: '50%', color: '#E8E6E0' }}
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause' : 'Play'}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1e1e1e')}
                >
                  {playing ? <Pause size={11} strokeWidth={1.5} /> : <Play size={11} strokeWidth={1.5} />}
                </button>

                <button
                  style={{ ...BTN, color: muted ? '#333' : '#888580' }}
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  onMouseEnter={e => (e.currentTarget.style.color = '#E8E6E0')}
                  onMouseLeave={e => (e.currentTarget.style.color = muted ? '#333' : '#888580')}
                >
                  {muted ? <VolumeX size={13} strokeWidth={1.5} /> : <Volume2 size={13} strokeWidth={1.5} />}
                </button>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: '#181818' }} />

              {/* Playlist */}
              <div style={{ maxHeight: '168px', overflowY: 'auto' }}>
                {PLAYLIST.map((track, i) => {
                  const isActive = i === currentIndex
                  return (
                    <button
                      key={track.src}
                      onClick={() => selectTrack(i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0',
                        padding: '5px 10px 5px 9px',
                        background: 'none',
                        border: 'none',
                        borderLeft: isActive
                          ? '2px solid var(--c-accent, #C8FF00)'
                          : '2px solid transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 120ms ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      aria-label={`Play ${track.title} by ${track.artist}`}
                      aria-pressed={isActive}
                    >
                      <span style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '11px',
                        color: isActive ? '#E8E6E0' : '#555',
                        fontWeight: isActive ? 500 : 400,
                        flex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        transition: 'color 150ms ease',
                      }}>
                        {track.title}
                      </span>
                      <span style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '8px',
                        color: '#333',
                        letterSpacing: '0.04em',
                        flexShrink: 0,
                        paddingLeft: '6px',
                      }}>
                        {track.genre}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
