import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'

export type Track = { title: string; artist: string; genre: string; src: string }

export const PLAYLIST: Track[] = [
  { title: 'Rose',        artist: 'Lukrembo',            genre: 'Lofi',       src: 'https://data.freetouse.com/music/tracks/07397534-09dd-9693-24e8-54e09ff1e015/file/mp3/file.mp3' },
  { title: 'Okay Energy', artist: 'Aylex',               genre: 'EDM',        src: 'https://data.freetouse.com/music/tracks/4054d29b-7793-3b82-2a28-bc2802323c1c/file/mp3/file.mp3' },
  { title: 'Aurora',      artist: 'Luke Bergs',          genre: 'Deep House', src: 'https://data.freetouse.com/music/tracks/f8a154cc-47cb-8220-ee4f-8e22fa1f52bc/file/mp3/file.mp3' },
  { title: 'Enlivening',  artist: 'Pufino',              genre: 'Inspiring',  src: 'https://data.freetouse.com/music/tracks/60974ab4-afa7-211d-3ffc-09fdbaff8e58/file/mp3/file.mp3' },
  { title: 'Last Summer', artist: 'Aylex',               genre: 'Upbeat',     src: 'https://data.freetouse.com/music/tracks/8a530b0e-0b17-79c0-0aa9-ba19abff4ad3/file/mp3/file.mp3' },
  { title: 'Supersonic',  artist: 'Burgundy',            genre: 'Synthwave',  src: 'https://data.freetouse.com/music/tracks/16ea1f05-33cb-2347-00d4-238a1d8b189c/file/mp3/file.mp3' },
  { title: 'Take Off',    artist: 'Luke Bergs & Waesto', genre: 'Pop',        src: 'https://data.freetouse.com/music/tracks/ec841bfd-a3bb-7598-8522-5bcfde6317d8/file/mp3/file.mp3' },
]

interface MusicCtx {
  playing: boolean
  muted: boolean
  currentTime: number
  duration: number
  loop: boolean
  currentIndex: number
  currentTrack: Track
  togglePlay: () => void
  toggleMute: () => void
  toggleLoop: () => void
  seek: (t: number) => void
  restart: () => void
  skipForward: () => void
  nextTrack: () => void
  prevTrack: () => void
  selectTrack: (i: number) => void
}

const Ctx = createContext<MusicCtx | null>(null)

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Refs track mutable state read inside the audio 'ended' callback (avoids stale closures)
  const hasInteracted = useRef(false)
  const currentIndexRef = useRef(0)
  const playingRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loop, setLoop] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const audio = new Audio()
    audio.src = PLAYLIST[0].src
    audio.preload = 'none'
    audio.muted = true
    audio.loop = false
    audioRef.current = audio

    const onTime = () => setCurrentTime(audio.currentTime)
    const onDuration = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      // 'ended' only fires when audio.loop === false, so we always advance
      const next = (currentIndexRef.current + 1) % PLAYLIST.length
      currentIndexRef.current = next
      setCurrentIndex(next)
      audio.src = PLAYLIST[next].src
      audio.currentTime = 0
      if (playingRef.current) audio.play().catch(() => {})
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('durationchange', onDuration)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('durationchange', onDuration)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!hasInteracted.current) {
      audio.muted = false
      setMuted(false)
      hasInteracted.current = true
    }
    if (playingRef.current) {
      audio.pause()
      playingRef.current = false
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      playingRef.current = true
      setPlaying(true)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(m => !m)
  }

  const toggleLoop = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = !loop
    setLoop(l => !l)
  }

  const seek = (t: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = t
    setCurrentTime(t)
  }

  const restart = () => seek(0)

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10)
  }

  const changeTrack = (newIndex: number, autoplay: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    currentIndexRef.current = newIndex
    setCurrentIndex(newIndex)
    audio.src = PLAYLIST[newIndex].src
    audio.currentTime = 0
    setCurrentTime(0)
    setDuration(0)
    if (autoplay) {
      audio.play().catch(() => {})
      playingRef.current = true
      setPlaying(true)
    }
  }

  const nextTrack = () =>
    changeTrack((currentIndexRef.current + 1) % PLAYLIST.length, playingRef.current)

  const prevTrack = () =>
    changeTrack((currentIndexRef.current - 1 + PLAYLIST.length) % PLAYLIST.length, playingRef.current)

  const selectTrack = (i: number) => {
    if (!hasInteracted.current) {
      const audio = audioRef.current
      if (audio) { audio.muted = false; setMuted(false) }
      hasInteracted.current = true
    }
    changeTrack(i, true)
  }

  return (
    <Ctx.Provider value={{
      playing, muted, currentTime, duration, loop,
      currentIndex, currentTrack: PLAYLIST[currentIndex],
      togglePlay, toggleMute, toggleLoop,
      seek, restart, skipForward,
      nextTrack, prevTrack, selectTrack,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMusic must be used inside MusicProvider')
  return ctx
}
