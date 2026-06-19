# Sidebar Strip + Music Player Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the vertical marquee text into the sidebar, port version3 changes, and replace the music prompt modal with a floating turntable player with a 7-track playlist.

**Architecture:** Three sequential tasks — git merge first to avoid conflicts, then UI changes (sidebar strip, MusicContext, MusicPlayer) that are independent of each other after the merge. MusicContext is rewritten before MusicPlayer since MusicPlayer imports from it.

**Tech Stack:** React 18 + TypeScript, Framer Motion v12, Tailwind CSS, Lucide React, Vite

## Global Constraints

- Branch: `version3-features` — all work happens here
- Do NOT touch any file outside the files listed per task
- Font family for sidebar text: `"JetBrains Mono", monospace` — exact string
- Sidebar text copy (exact, unchanged): `CATCHSHUBU · ALWAYS SHIPPING · DUBAI, UAE · PRODUCT BUILDER © 2025`
- Sidebar text font-weight: `600` (increased from prior `400`)
- All 7 playlist track URLs must be verbatim — they are direct CDN links, do not shorten or change them
- TypeScript must compile cleanly after each task: `npx tsc --noEmit`
- `npm run dev` must start without errors after each task

---

### Task 1: Git merge version3 → version3-features

**Goal:** Port all commits from `version3` into `version3-features` before making any code changes.

**Files:** None created or modified (git operation only)

**Interfaces:**
- Produces: clean `version3-features` branch that includes all version3 commits

- [ ] **Step 1: Confirm current branch**

```bash
git branch --show-current
```

Expected output: `version3-features`

If not on `version3-features`, run `git checkout version3-features` first.

- [ ] **Step 2: Check version3 tip commit**

```bash
git log version3 --oneline -3
```

Expected: most recent commit is `7fbddc6 feat: enhance Footer and Projects components...` (or newer if version3 has advanced).

- [ ] **Step 3: Run the merge**

```bash
git merge version3 --no-edit
```

Expected: either `Already up to date.` or a merge commit created. If there are conflicts, resolve them by keeping the version3-features version of any file that version3-features added (MusicContext.tsx, MusicPlayer.tsx, MusicPrompt.tsx, VerticalStrip.tsx) and the merged version of shared files (Index.tsx, Sidebar.tsx, etc.). After resolving: `git add -A && git merge --continue`.

- [ ] **Step 4: Verify TypeScript still compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on some port (usually 5173–5175). Open in browser and confirm site loads without console errors.

Kill the dev server (`Ctrl+C`) after verifying.

---

### Task 2: Move VerticalStrip text into Sidebar

**Goal:** Inline the vertical marquee text inside the desktop sidebar between the nav column and the theme toggle. Delete the standalone `VerticalStrip` component.

**Files:**
- Modify: `src/components/layout/Sidebar.tsx`
- Delete: `src/components/ui/VerticalStrip.tsx`
- Modify: `src/pages/Index.tsx`

**Interfaces:**
- Consumes: nothing from other tasks
- Produces: `Sidebar.tsx` that renders the text strip inline; `VerticalStrip.tsx` no longer exists

- [ ] **Step 1: Open `src/components/layout/Sidebar.tsx` and locate the desktop nav element**

The desktop `<nav>` (line ~72) has this structure:
```tsx
<nav className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-[52px] flex-col items-center py-6" ...>
  <div className="flex flex-col items-center gap-5 flex-1">
    {NAV_ITEMS.map(item => <NavItem ... />)}
  </div>

  {/* Theme toggle */}
  <button ...>...</button>

  <span aria-hidden="true" className="h-1 w-1 rounded-full" ... />
</nav>
```

- [ ] **Step 2: Add the strip text between the nav column and the theme toggle**

Insert this block between the closing `</div>` of the nav column and the `{/* Theme toggle */}` comment:

```tsx
{/* Vertical marquee strip */}
<p
  aria-hidden="true"
  style={{
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '9px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'var(--c-text-3)',
    writingMode: 'vertical-rl' as const,
    transform: 'rotate(180deg)',
    whiteSpace: 'nowrap',
    opacity: 0.6,
    marginBottom: '12px',
    pointerEvents: 'none',
    userSelect: 'none' as const,
  }}
>
  CATCHSHUBU · ALWAYS SHIPPING · DUBAI, UAE · PRODUCT BUILDER © 2025
</p>
```

The full updated desktop `<nav>` block in `Sidebar.tsx` should look like this after the edit:

```tsx
<nav
  aria-label="Page navigation"
  className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-[52px] flex-col items-center py-6"
  style={{ background: 'var(--c-base)', borderRight: '1px solid var(--c-border)', transition: 'background 250ms ease, border-color 250ms ease' }}
>
  <div className="flex flex-col items-center gap-5 flex-1">
    {NAV_ITEMS.map(item => <NavItem key={item.id} item={item} active={active} />)}
  </div>

  {/* Vertical marquee strip */}
  <p
    aria-hidden="true"
    style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '9px',
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase' as const,
      color: 'var(--c-text-3)',
      writingMode: 'vertical-rl' as const,
      transform: 'rotate(180deg)',
      whiteSpace: 'nowrap',
      opacity: 0.6,
      marginBottom: '12px',
      pointerEvents: 'none',
      userSelect: 'none' as const,
    }}
  >
    CATCHSHUBU · ALWAYS SHIPPING · DUBAI, UAE · PRODUCT BUILDER © 2025
  </p>

  {/* Theme toggle */}
  <button
    onClick={toggle}
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    data-magnetic
    className="group relative flex h-9 w-9 items-center justify-center rounded-[4px] mb-3"
    style={{ color: 'var(--c-text-3)', transition: 'color 150ms ease', background: 'none', border: 'none', cursor: 'pointer' }}
  >
    {theme === 'dark'
      ? <Sun size={16} strokeWidth={1.5} className="transition-colors group-hover:[color:var(--c-text-2)]" />
      : <Moon size={16} strokeWidth={1.5} className="transition-colors group-hover:[color:var(--c-text-2)]" />
    }
    {/* Hover tooltip */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-full z-50 flex items-center gap-1
                 opacity-0 translate-x-[-6px]
                 group-hover:opacity-100 group-hover:translate-x-0
                 transition-all duration-200 ease-out"
      style={{ marginLeft: '10px' }}
    >
      <span style={{ fontFamily: HANDWRITTEN, fontSize: '18px', color: 'var(--c-accent)', lineHeight: 1 }}>→</span>
      <span style={{ fontFamily: HANDWRITTEN, fontSize: '17px', color: 'var(--c-text-1)', whiteSpace: 'nowrap', lineHeight: 1 }}>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </span>
  </button>

  <span aria-hidden="true" className="h-1 w-1 rounded-full" style={{ background: 'var(--c-border)' }} />
</nav>
```

- [ ] **Step 3: Delete `src/components/ui/VerticalStrip.tsx`**

```bash
rm "src/components/ui/VerticalStrip.tsx"
```

- [ ] **Step 4: Remove VerticalStrip from `src/pages/Index.tsx`**

Open `src/pages/Index.tsx`. Remove these two lines:

```tsx
import { VerticalStrip } from "@/components/ui/VerticalStrip"
```

and

```tsx
<VerticalStrip />
```

The imports section after removal should contain no reference to `VerticalStrip`. The JSX in the component should contain no `<VerticalStrip />`.

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see an error about `VerticalStrip` still being imported somewhere, search for it: `grep -r "VerticalStrip" src/` and remove any remaining references.

- [ ] **Step 6: Visual check**

```bash
npm run dev
```

Open in browser. On desktop (viewport ≥ 1024px):
- The sidebar on the left should show the vertical text between the Contact icon and the theme toggle
- The text should be in JetBrains Mono, small, dimmed, rotated
- No vertical strip element should appear on the right side of the screen

Kill dev server after checking.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Sidebar.tsx src/pages/Index.tsx
git rm src/components/ui/VerticalStrip.tsx
git commit -m "feat: move vertical strip text into sidebar, increase font weight"
```

---

### Task 3: MusicContext — multi-track playlist

**Goal:** Rewrite `src/context/MusicContext.tsx` to support a 7-track playlist, remove the `prompted`/`dismiss` prompt flow, add `nextTrack`/`prevTrack`/`selectTrack`, and handle first-play unmute via a `hasInteracted` ref.

**Files:**
- Rewrite: `src/context/MusicContext.tsx`

**Interfaces:**
- Consumes: nothing from other tasks
- Produces: exported `PLAYLIST`, `Track` type, and updated `MusicCtx` interface consumed by Task 4's `MusicPlayer`

The exact exports Task 4 relies on:
```ts
export const PLAYLIST: Track[]  // array of 7 tracks
export type Track = { title: string; artist: string; genre: string; src: string }
export function useMusic(): MusicCtx
// MusicCtx shape (Task 4 uses all of these):
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
```

- [ ] **Step 1: Replace the full content of `src/context/MusicContext.tsx`**

Write this exact file:

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

If you see errors about `TRACK` being imported elsewhere (e.g. in `MusicPlayer.tsx`), they'll be fixed in Task 4. For now, if the only TS errors are in `MusicPlayer.tsx` referencing the old API, that's acceptable — Task 4 rewrites that file.

Expected for this task: no errors in `MusicContext.tsx` itself.

- [ ] **Step 3: Commit**

```bash
git add src/context/MusicContext.tsx
git commit -m "feat: expand MusicContext to 7-track playlist, remove prompt flow"
```

---

### Task 4: MusicPlayer turntable widget + remove MusicPrompt

**Goal:** Rewrite `MusicPlayer.tsx` as a floating bottom-right turntable widget (minimized vinyl disc → hover-expand with controls + playlist). Delete `MusicPrompt.tsx`. Remove `<MusicPrompt />` from `Index.tsx`.

**Files:**
- Rewrite: `src/components/ui/MusicPlayer.tsx`
- Delete: `src/components/ui/MusicPrompt.tsx`
- Modify: `src/pages/Index.tsx`

**Interfaces:**
- Consumes from Task 3:
  ```ts
  import { useMusic, PLAYLIST } from '@/context/MusicContext'
  // useMusic() returns: { playing, muted, currentIndex, currentTrack, togglePlay, toggleMute, nextTrack, prevTrack, selectTrack }
  ```
- Produces: self-contained `<MusicPlayer />` component, no props

- [ ] **Step 1: Replace the full content of `src/components/ui/MusicPlayer.tsx`**

Write this exact file:

```tsx
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
                    '  #2a2a2a 0%, #2a2a2a 18%,',   /* center label */
                    '  #111 18%, #111 22%,',          /* groove */
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
```

- [ ] **Step 2: Delete `src/components/ui/MusicPrompt.tsx`**

```bash
rm "src/components/ui/MusicPrompt.tsx"
```

- [ ] **Step 3: Update `src/pages/Index.tsx`**

Remove these two lines from `Index.tsx`:

```tsx
import { MusicPrompt } from "@/components/ui/MusicPrompt"
```

and

```tsx
<MusicPrompt />
```

Also remove the old `TRACK` import if it appears:
```tsx
import { useMusic, TRACK } from '@/context/MusicContext'
```
(this was in `MusicPlayer.tsx`, not `Index.tsx`, but double-check `Index.tsx` has no remaining `MusicPrompt` or `TRACK` references)

The imports block of `Index.tsx` after the edit:
```tsx
import { Sidebar } from "@/components/layout/Sidebar"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { PersonalProjects } from "@/components/PersonalProjects"
import { Goals } from "@/components/Goals"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { PageSpotlight } from "@/components/ui/PageSpotlight"
import { MusicPlayer } from "@/components/ui/MusicPlayer"
```

The JSX body of `Index.tsx`:
```tsx
const Index = () => {
  return (
    <div className="relative min-h-screen">
      <div className="grain" aria-hidden="true" />
      <PageSpotlight />
      <CustomCursor />
      <MusicPlayer />
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:px-4 focus:py-2 focus:text-sm focus:font-mono focus:outline-none"
        style={{ background: 'var(--c-accent)', color: 'var(--c-base)' }}
      >
        Skip to content
      </a>

      <Sidebar />

      <main id="main-content" className="lg:pl-[52px] pb-14 lg:pb-0">
        <Hero />
        <About />
        <Projects />
        <PersonalProjects />
        <Goals />
        <Contact />
      </main>

      <div className="lg:pl-[52px]">
        <Footer />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. Common issues to fix:
- If `TRACK` is still imported from `MusicContext` anywhere → remove it (it no longer exists)
- If `prompted` or `dismiss` are used anywhere → remove (they no longer exist on `MusicCtx`)

- [ ] **Step 5: Visual check in browser**

```bash
npm run dev
```

Open the site. Verify:

1. **No full-screen music prompt** appears on page load — the site should load straight to the portfolio content
2. **Bottom-right** of the page shows a 56×56px dark circle (the vinyl widget)
3. **Clicking the vinyl** starts audio (disc starts rotating, play icon changes to pause)
4. **Hovering the vinyl** expands it to show track name, artist, prev/next/play/mute controls, and a list of 7 tracks
5. **Clicking a track** in the list switches to that track and starts playing
6. **Mute button** works — toggling mute/unmute
7. **Hover-leave** (after ~200ms) collapses back to the vinyl disc
8. **On mobile** (< 1024px): the player should still appear at bottom-right (it uses `position: fixed`, not hidden on mobile)

Kill dev server after verifying.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/MusicPlayer.tsx src/pages/Index.tsx
git rm src/components/ui/MusicPrompt.tsx
git commit -m "feat: turntable music player with 7-track playlist, remove prompt modal"
```
