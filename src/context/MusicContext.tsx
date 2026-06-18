import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'

export const TRACK = {
  title: 'Praise You',
  artist: 'Fatboy Slim',
  // TODO: self-host this file at /public/audio/praise-you.mp4
  // Reference: https://yqyhl5b6mya2r8ci.public.blob.vercel-storage.com/audio/praise-you.mp4
  src: 'https://yqyhl5b6mya2r8ci.public.blob.vercel-storage.com/audio/praise-you.mp4',
}

const LS_KEY = 'music-prompted'

interface MusicCtx {
  prompted: boolean
  playing: boolean
  muted: boolean
  currentTime: number
  duration: number
  loop: boolean
  dismiss: (play: boolean) => void
  togglePlay: () => void
  toggleMute: () => void
  toggleLoop: () => void
  seek: (t: number) => void
  restart: () => void
  skipForward: () => void
}

const Ctx = createContext<MusicCtx | null>(null)

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [prompted, setPrompted] = useState(() => !!localStorage.getItem(LS_KEY))
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loop, setLoop] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = TRACK.src
    audio.preload = 'none'
    audio.muted = true
    audio.loop = false
    audioRef.current = audio

    const onTime = () => setCurrentTime(audio.currentTime)
    const onDuration = () => setDuration(audio.duration || 0)
    const onEnded = () => setPlaying(false)

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

  // dismiss MUST be called from a click handler — browser autoplay requires a user gesture
  const dismiss = (play: boolean) => {
    localStorage.setItem(LS_KEY, play ? 'play' : 'mute')
    setPrompted(true)
    const audio = audioRef.current
    if (!audio) return
    if (play) {
      audio.muted = false
      setMuted(false)
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
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

  return (
    <Ctx.Provider value={{ prompted, playing, muted, currentTime, duration, loop, dismiss, togglePlay, toggleMute, toggleLoop, seek, restart, skipForward }}>
      {children}
    </Ctx.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useMusic must be used inside MusicProvider')
  return ctx
}
