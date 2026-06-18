# catchshubu — 4-Feature Implementation Plan

## Context
Adding four distinct UI/UX features to the portfolio: ambient music with a prompt, a vertical identity strip, a manifesto reveal in the Projects section, and a deck-of-cards hover + lightbox for projects. All build on the existing Vite+React+Framer Motion stack.

---

## Feature 1 — Music Player

### Architecture
- `MusicContext.tsx` — React context holding a single `<audio>` element (created imperatively in `useEffect`, not as JSX). Exposes: `prompted`, `playing`, `muted`, `currentTime`, `duration`, `loop`, and actions: `dismiss(play)`, `togglePlay`, `toggleMute`, `toggleLoop`, `seek`, `skip`.
- `localStorage` key `music-prompted` — stores `"play"` or `"mute"` so the prompt never re-shows.
- `MusicPrompt.tsx` — renders only when `!prompted`. Fullscreen `position:fixed` dark overlay. Two buttons: "Play It!" calls `dismiss(true)`, "Keep It Muted" calls `dismiss(false)`. Click handler calls `audio.play()` directly (satisfies browser autoplay policy).
- `MusicPlayer.tsx` — always rendered once prompted. Pill-shaped dark bar (`border-radius: 9999px`, always `background: #0D0D0D`). Fixed to bottom-center. Content: 32×32 album art placeholder, track name + artist, ⏮/⏸/⏭ controls, 🔊 mute, time display, 🔁 loop. Slides up with Framer Motion when `prompted` becomes true.
- Audio source: `/public/audio/praise-you.mp4` (user must self-host; comment in code points to joydeeproni reference).

### Wiring
- `App.tsx`: wrap tree in `<MusicProvider>`.
- `Index.tsx`: add `<MusicPrompt />` and `<MusicPlayer />` at top of root div.
- `index.css`: `.music-player` — `z-index: 60` (above everything except cursor at 9999). On mobile, add `bottom` offset to clear the bottom nav bar (`bottom: 56px` on `< lg`, `bottom: 16px` on `lg+`).

### Critical note
`audio.play()` MUST be called synchronously inside the button click handler — not deferred via state + useEffect. Deferred calls will be blocked by the browser.

---

## Feature 2 — Vertical Text Strip

### Implementation
Single component `VerticalStrip.tsx`, ~30 lines.
- `position: fixed; right: 0; top: 0; height: 100vh; z-index: 40; pointer-events: none`
- Inner `<p>`: `writing-mode: vertical-rl; transform: rotate(180deg)` — text reads bottom-to-top on right edge.
- Font: JetBrains Mono, 10px, `letter-spacing: 0.15em`, uppercase, `color: var(--c-text-3)`.
- Text: `CATCHSHUBU · ALWAYS SHIPPING · DUBAI, UAE · PRODUCT BUILDER © 2025`
- `aria-hidden="true"` — decorative only.
- Hidden below `lg` via `hidden lg:block` to avoid overlap with mobile content.

### Wiring
- `Index.tsx`: add `<VerticalStrip />` alongside `<Sidebar />`.

---

## Feature 3 — Manifesto Reveal + Text-First Projects

### Sequence
Modify `Projects.tsx` to add a two-phase reveal:

1. Add `const [phase, setPhase] = useState<'text' | 'cards'>('text')`.
2. `useReducedMotion()` → if true, skip directly to `'cards'`.
3. Use an `IntersectionObserver` ref on the section element. When it enters the viewport (threshold: 0.3), start a `setTimeout(2500)` that sets phase → `'cards'`. Clear observer after firing once.
4. Phase `'text'`: render a full-bleed manifesto panel (min-height `60vh`, flex center) with large JetBrains Mono text + a `var(--c-accent)` filled circle (~280px) absolutely centered, z-index above text. Framer Motion `exit` animation: `opacity 0, y -20`.
5. Phase `'cards'`: existing horizontal scroll carousel, enters with `motion` from `y: 30, opacity: 0`.
6. Wrap both in `AnimatePresence mode="wait"`.

### Manifesto text
```
i write systems
that hold at scale.
i ship code where
failure is not
an option.
```
Font size: `clamp(24px, 4.5vw, 58px)`. Color: `var(--c-text-2)`. Circle: `width: clamp(200px, 25vw, 320px)`, `background: var(--c-accent)`, `border-radius: 50%`, `position: absolute`, centered via `top: 50%; left: 50%; transform: translate(-50%,-50%)`, `z-index: 1`. Text `z-index: 2` (text floats above circle, as per reference).

---

## Feature 4 — DeckLink Hover + ProjectLightbox

### DeckLink component (`DeckLink.tsx`)
Props: `children` (link text), `slides: Slide[]`, `onOpen: () => void`.
- Wraps content in `position: relative` span.
- Link text has animated underline: `scaleX 0→1` on hover (Framer Motion `whileHover`).
- On hover: `AnimatePresence` mounts a deck of 3 cards above the link.
  - Cards are `position: absolute; bottom: 100%; left: 0` container.
  - Card transforms: `{ rotate: -12, x: -24, y: -8 }`, `{ rotate: -3, x: -8, y: -16 }`, `{ rotate: 6, x: 12, y: -10 }` → on hover they animate to more spread positions.
  - Each card: `72×96px`, `border-radius: 6px`, `border: 1px solid var(--c-border)`. Background is a placeholder color from the project's `color` field (to be swapped for screenshots).
  - `pointer-events: none` on cards.
- On click: calls `onOpen()`.

### ProjectLightbox component (`ProjectLightbox.tsx`)
Props: `slides: Slide[]`, `initialIndex: number`, `onClose: () => void`. Rendered via `createPortal` to `document.body`.
- Full-screen backdrop: `position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 200`.
- Close button (×) top-left, keyboard `Escape` closes.
- Active slide centered: max `80vw × 70vh`, `border-radius: 8px`. Placeholder color div (TODO: replace with `<img>`).
- Prev/Next arrows: fade in on hover.
- Caption below: project name + description, `JetBrains Mono`.
- `AnimatePresence` with `x: ±60, opacity: 0` slide transition.
- Keyboard: ← → arrows + Escape.

### Slide data
Add to `src/data/projects.ts` on each project:
```ts
slides?: Array<{
  // TODO: replace placeholder with real screenshot path
  color: string   // placeholder background e.g. '#1A2A1A'
  caption?: string
}>
```

### Wiring in Projects.tsx
Replace the "drag to explore →" eyebrow text on the right with `<DeckLink slides={allSlides} onOpen={() => setLightboxOpen(true)}>View all work →</DeckLink>`.
Add `ProjectLightbox` conditionally with `AnimatePresence`.

---

## Files Summary

| File | Status |
|---|---|
| `src/context/MusicContext.tsx` | New |
| `src/components/ui/MusicPrompt.tsx` | New |
| `src/components/ui/MusicPlayer.tsx` | New |
| `src/components/ui/VerticalStrip.tsx` | New |
| `src/components/ui/DeckLink.tsx` | New |
| `src/components/ui/ProjectLightbox.tsx` | New |
| `src/App.tsx` | Modify — add MusicProvider |
| `src/pages/Index.tsx` | Modify — add MusicPrompt, MusicPlayer, VerticalStrip |
| `src/components/Projects.tsx` | Modify — phase state + manifesto + DeckLink |
| `src/data/projects.ts` | Modify — add slides[] |
| `src/index.css` | Modify — music player z-index + bottom offset |

---

## Verification
1. `npm run dev` — no TS errors.
2. Hard-reload → music prompt appears fullscreen.
3. "Play It!" → audio plays, mini bar slides up, prompt gone on next reload.
4. "Keep It Muted" → bar visible but no audio; mute icon reflects state.
5. Scroll to Projects → manifesto text visible ~2.5s, then cards slide in.
6. Hover "View all work →" → 3 cards fan out.
7. Click → lightbox opens; ← → and Escape work.
8. Vertical strip visible on desktop right edge, hidden on mobile.
9. Light mode: portrait loses grayscale; grain opacity shifts; music player stays dark.
