# Sidebar Strip + Music Player Redesign — Design Spec

**Date:** 2026-06-19  
**Branch:** version3-features  
**Status:** Approved

---

## Scope

Three coordinated changes:

1. **VerticalStrip → Sidebar** — move the marquee text into the left sidebar
2. **Merge version3 → version3-features** — port latest version3 commits
3. **Music Player Redesign** — floating turntable widget with multi-track playlist, replacing the full-screen modal prompt

---

## Feature 1: VerticalStrip Into Sidebar

### What changes

The text `CATCHSHUBU · ALWAYS SHIPPING · DUBAI, UAE · PRODUCT BUILDER © 2025` currently lives in `src/components/ui/VerticalStrip.tsx` as a separate fixed element pinned to the right edge of the screen.

It moves into the left sidebar (`src/components/layout/Sidebar.tsx`), positioned between the nav icon column and the theme toggle button.

### Layout position

```
[sidebar — 52px wide, left edge, full height]
  ├── Logo / home link                  ← top
  ├── Nav icons (flex-1 column)         ← Home, About, Projects, Personal, Goals, Contact
  ├── [strip text here, vertical]       ← NEW POSITION
  ├── Theme toggle button (mb-3)
  └── Dot decoration
```

### Style changes

- `fontWeight`: change from 400 → **600** (slightly heavier)
- `fontSize`: keep `9px`
- `letterSpacing`: keep `0.18em`
- `color`: keep `var(--c-text-3)`
- `opacity`: keep `0.6`
- `writingMode`: keep `vertical-rl`
- `transform`: keep `rotate(180deg)`
- Add `marginBottom: '12px'` between strip and theme toggle for spacing

### Files

- **Delete:** `src/components/ui/VerticalStrip.tsx`
- **Modify:** `src/components/layout/Sidebar.tsx` — inline the text between nav column and theme toggle
- **Modify:** `src/pages/Index.tsx` — remove `<VerticalStrip />` import and JSX

---

## Feature 2: Merge version3 → version3-features

Run `git merge version3` on the `version3-features` branch to port latest commits from `version3` (currently at `7fbddc6`). Resolve any conflicts in favor of version3-features' own additions (MusicContext, MusicPlayer, MusicPrompt, VerticalStrip, Sidebar additions).

This is a mechanical git step — no code authoring needed.

---

## Feature 3: Music Player Redesign

### Playlist

Seven royalty-free tracks from freetouse.com (all free tier):

```ts
export const PLAYLIST = [
  { title: 'Rose',        artist: 'Lukrembo',            genre: 'Lofi',       src: 'https://data.freetouse.com/music/tracks/07397534-09dd-9693-24e8-54e09ff1e015/file/mp3/file.mp3' },
  { title: 'Okay Energy', artist: 'Aylex',               genre: 'EDM',        src: 'https://data.freetouse.com/music/tracks/4054d29b-7793-3b82-2a28-bc2802323c1c/file/mp3/file.mp3' },
  { title: 'Aurora',      artist: 'Luke Bergs',          genre: 'Deep House', src: 'https://data.freetouse.com/music/tracks/f8a154cc-47cb-8220-ee4f-8e22fa1f52bc/file/mp3/file.mp3' },
  { title: 'Enlivening',  artist: 'Pufino',              genre: 'Inspiring',  src: 'https://data.freetouse.com/music/tracks/60974ab4-afa7-211d-3ffc-09fdbaff8e58/file/mp3/file.mp3' },
  { title: 'Last Summer', artist: 'Aylex',               genre: 'Upbeat',     src: 'https://data.freetouse.com/music/tracks/8a530b0e-0b17-79c0-0aa9-ba19abff4ad3/file/mp3/file.mp3' },
  { title: 'Supersonic',  artist: 'Burgundy',            genre: 'Synthwave',  src: 'https://data.freetouse.com/music/tracks/16ea1f05-33cb-2347-00d4-238a1d8b189c/file/mp3/file.mp3' },
  { title: 'Take Off',    artist: 'Luke Bergs & Waesto', genre: 'Pop',        src: 'https://data.freetouse.com/music/tracks/ec841bfd-a3bb-7598-8522-5bcfde6317d8/file/mp3/file.mp3' },
]
```

### MusicContext changes

**Remove:** `TRACK` export, `prompted` state, `dismiss()` function, `'music-prompted'` localStorage key.

**Add:**
- `PLAYLIST` array (exported)
- `currentIndex: number` state (default `0`)
- `nextTrack(): void` — increments index mod playlist length, loads new audio src, plays if was playing
- `prevTrack(): void` — decrements index mod playlist length, loads new audio src, plays if was playing
- `selectTrack(index: number): void` — jump to specific track

**Keep:** `playing`, `muted`, `currentTime`, `duration`, `loop`, `togglePlay`, `toggleMute`, `toggleLoop`, `seek`, `skipForward`, `restart`

**Audio element:** When track index changes, update `audio.src` and `audio.currentTime = 0`. If playing, call `audio.play()`.

**Auto-advance:** On `ended` event, call `nextTrack()`. The browser's native `ended` event does not fire when `audio.loop = true`, so no extra guard is needed — loop repeats the track naturally and `nextTrack` is only called when the track actually finishes without looping.

**Interface:**
```ts
interface MusicCtx {
  playing: boolean
  muted: boolean
  currentTime: number
  duration: number
  loop: boolean
  currentIndex: number
  currentTrack: typeof PLAYLIST[0]
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

### MusicPlayer redesign

**File:** `src/components/ui/MusicPlayer.tsx` (full rewrite)

**Position:** `position: fixed, bottom: 24px, right: 24px, zIndex: 60`

**Two visual states controlled by `isExpanded: boolean` (React state, toggled on mouseenter/mouseleave with 200ms leave delay):**

#### Minimized state

```
┌──────────────────┐
│   ╭──────────╮   │
│   │  vinyl   │   │  ← 56×56px circle
│   │  disc    │   │
│   │  ⏻ icon  │   │  ← power icon overlay (click = togglePlay + unmute if first time)
│   ╰──────────╯   │
└──────────────────┘
```

- Outer circle: 56×56px, `border-radius: 50%`
- Vinyl disc layers (CSS, no image):
  - Background: `#111` base
  - Groove rings: `repeating-conic-gradient` or concentric rings via `box-shadow` or CSS `border`
  - Center label: 20×20px inner circle, slightly lighter (`#1a1a1a`)
- Spin animation: `@keyframes vinyl-spin { to { transform: rotate(360deg) } }` at `8s linear infinite`
  - `animationPlayState: playing ? 'running' : 'paused'`
- Power icon (`⏻`): centered absolutely, 16px, `color: #888`, switches to accent color when playing
- No text visible in minimized state
- Subtle glow when playing: `boxShadow: playing ? '0 0 16px rgba(200,255,0,0.15)' : 'none'`

#### Expanded state (hover)

Expands from the minimized 56px circle to a 280px wide panel. Uses Framer Motion layout animation (`layout` prop on the container).

```
┌─────────────────────────────────┐
│ ◀  Okay Energy · Aylex  ▶  ⏸  │  ← track controls row
│ ─────────────────────────────── │
│  ○ Rose           Lofi          │  ← playlist items
│  ● Okay Energy    EDM    ▶      │  ← active track (highlighted)
│  ○ Aurora         Deep House    │
│  ○ Enlivening     Inspiring     │
│  ○ Last Summer    Upbeat        │
│  ○ Supersonic     Synthwave     │
│  ○ Take Off       Pop           │
└─────────────────────────────────┘
```

**Controls row:**
- `SkipBack` (16px) — `prevTrack()`
- Track title + artist (truncated to 1 line, `max-width: 140px`)
- `SkipForward` (16px) — `nextTrack()`
- Divider `|`
- Play/Pause button (20px circle, filled)
- Mute toggle icon

**Playlist:**
- Max height `168px` (shows ~4 tracks), `overflowY: auto`
- Each row: `36px` height, `cursor: pointer`, `onClick: () => selectTrack(i)`
- Active row: left accent bar `3px` + track name in `var(--c-text-1)` vs muted `var(--c-text-3)`
- Genre label: right-aligned, `9px` mono, `var(--c-text-3)`

**Framer Motion:**
- Container uses `motion.div` with `layout` for smooth size transition
- Playlist fades in with `AnimatePresence` / `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
- Transition: `type: 'spring', stiffness: 300, damping: 30`

**Mouse handling:**
```ts
let leaveTimer: ReturnType<typeof setTimeout>
onMouseEnter={() => { clearTimeout(leaveTimer); setExpanded(true) }}
onMouseLeave={() => { leaveTimer = setTimeout(() => setExpanded(false), 200) }}
```

### MusicPrompt removal

- **Delete:** `src/components/ui/MusicPrompt.tsx`
- **Modify:** `src/pages/Index.tsx` — remove `<MusicPrompt />` import and usage
- No localStorage key for `'music-prompted'` (removed from MusicContext)

### Browser autoplay policy

First interaction that starts audio **must** come from a user gesture. The power button click in the MusicPlayer is that gesture — `togglePlay()` calls `audio.play()` directly from the click handler. No auto-play on load. `audio.muted` starts as `true`; on first play click, set `audio.muted = false` then `audio.play()`. This is the same pattern the current `dismiss(true)` used.

Implementation: add a `hasInteracted` ref (starts `false`). On `togglePlay`, if `!hasInteracted.current`, set `audio.muted = false`, `setMuted(false)`, flip `hasInteracted.current = true`.

---

## Files Summary

| Action | File |
|--------|------|
| Delete | `src/components/ui/VerticalStrip.tsx` |
| Delete | `src/components/ui/MusicPrompt.tsx` |
| Rewrite | `src/context/MusicContext.tsx` |
| Rewrite | `src/components/ui/MusicPlayer.tsx` |
| Modify | `src/components/layout/Sidebar.tsx` |
| Modify | `src/pages/Index.tsx` |
| Git op | merge `version3` into `version3-features` |

---

## Non-goals

- No audio waveform visualizer
- No volume slider (mute toggle only)
- No keyboard shortcuts
- No persist of last-played track across sessions
- No album art images (vinyl disc is pure CSS)
