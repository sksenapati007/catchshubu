# catchshubu.dev — Portfolio Build Plan

> **For Claude Code:** This document is the single source of truth for building the portfolio site at `catchshubu.dev`. Follow it section by section. Ask no clarifying questions — all decisions are made here. Where you see `[PLACEHOLDER]`, fill with sensible defaults until the owner provides real content.

---

## 0. The Narrative (Read This First)

The visitor should leave with one clear impression:

> *"Shubhendu is the rare engineer who can architect a payment system on Monday, spec the product on Tuesday, and ship a polished UI on Wednesday."*

The portfolio tells a **three-act story** in this order:

1. **Engineer** — I build serious production systems. Real scale. Real numbers.
2. **Product Thinker** — I don't just build what I'm told. I understand the why.
3. **Design Engineer** — I care about craft, interface, and the end experience.

Every section, every line of copy, every visual choice must serve this story. The site is NOT a resume dump. It is a **curated argument** for a specific type of hire: a senior full-stack engineer with product instincts and design sensibility — the person who can own a feature end-to-end.

---

## 1. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSG for speed, easy deploy on Vercel |
| Styling | **Tailwind CSS v3** | Utility-first, no design system overhead |
| Fonts | **DM Serif Display** + **Inter** + **JetBrains Mono** | Loaded via `next/font` from Google Fonts |
| Animation | **Framer Motion** | Word-swap, scroll reveals, hover states |
| Icons | **Lucide React** | Consistent, tree-shakeable |
| Deployment | **Vercel** | Zero-config, domain already `catchshubu.dev` |
| Analytics | **Vercel Analytics** (optional) | Privacy-first, no cookie banner needed |

**No chart libraries.** Metrics are displayed as ambient mono type, not charts.  
**No CMS.** All content is co-located in `/data/` as TypeScript constants.  
**No UI component library.** Build all components from scratch with Tailwind.

---

## 2. Visual Design System

### 2.1 Color Tokens

Define in `tailwind.config.ts` under `theme.extend.colors`:

```ts
colors: {
  base: '#0A0A0A',        // page background
  surface: '#111111',     // card backgrounds
  border: '#1F1F1F',      // subtle borders
  muted: '#2A2A2A',       // dividers, inactive states

  text: {
    primary: '#E8E6E0',   // headings, primary content
    secondary: '#888580', // body, descriptions
    tertiary: '#444240',  // labels, captions, timestamps
  },

  accent: '#C8FF00',      // acid green — USED SPARINGLY
                           // only: word-swap word, key metrics, hover underlines
}
```

**Accent usage rule:** The acid green `#C8FF00` appears in exactly 3 places:
1. The animated swap word in the hero headline
2. The key metric value highlight (one number per project card)
3. Hover state on nav links and external link arrows

Nowhere else. No green backgrounds. No green borders.

### 2.2 Typography Scale

```ts
// tailwind.config.ts fontFamily
fontFamily: {
  serif: ['DM Serif Display', 'Georgia', 'serif'],
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
}
```

| Role | Font | Size | Weight | Usage |
|---|---|---|---|---|
| Hero headline | DM Serif Display | `clamp(48px, 7vw, 80px)` | 400 | H1 only |
| Section title | DM Serif Display | `28px` | 400 | H2s |
| Project name | DM Serif Display | `20px` | 400 | Card H3s |
| Body | Inter | `16px` | 400 | Paragraphs |
| Small body | Inter | `14px` | 400 | Descriptions |
| Label/eyebrow | JetBrains Mono | `11px` | 400 | ALL CAPS, `0.1em` tracking |
| Metric value | JetBrains Mono | `22–28px` | 500 | Data numbers |
| Tag/pill | JetBrains Mono | `10px` | 400 | Tech tags |

### 2.3 Spacing & Layout

- Max content width: `720px`, centered
- Left sidebar: `52px` wide, fixed, icon-only nav
- Page padding-left: `52px` (accounts for sidebar)
- Section vertical padding: `72px` top and bottom
- Section divider: `<hr>` — `1px` solid `#1F1F1F`
- Card border-radius: `4px` (deliberate — not rounded, engineered)

### 2.4 Motion Principles

- **Word swap:** `translateY` slide — exit up, enter from below. Duration `350ms`, easing `cubic-bezier(0.76, 0, 0.24, 1)`
- **Scroll reveals:** Framer Motion `whileInView`, `opacity: 0 → 1`, `y: 16 → 0`, `duration: 0.5s`, `once: true`
- **Hover on cards:** `border-color` transition only — `200ms ease`. No scale, no lift.
- **Hover on links:** Underline slide-in from left. No color change.
- **Respect `prefers-reduced-motion`:** Wrap all Framer Motion animations with the `useReducedMotion()` hook. If true, skip transitions.

---

## 3. File & Folder Structure

```
catchshubu.dev/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, sidebar
│   ├── page.tsx            # Homepage — composes all sections
│   └── globals.css         # Tailwind base + custom scrollbar styles
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Fixed left icon nav
│   │   └── SectionDivider.tsx  # <hr> wrapper with aria-hidden
│   │
│   ├── sections/
│   │   ├── Hero.tsx        # Word-swap headline + metrics strip
│   │   ├── About.tsx       # Bio paragraph + skill tags
│   │   ├── Projects.tsx    # Horizontal scroll project cards
│   │   ├── Writing.tsx     # Optional: blog/note links (can stub)
│   │   └── Contact.tsx     # Contact grid links
│   │
│   └── ui/
│       ├── WordSwap.tsx    # Animated word cycling component
│       ├── MetricStrip.tsx # Ambient metrics row
│       ├── ProjectCard.tsx # Individual project card
│       ├── Tag.tsx         # Mono tech tag pill
│       └── ExternalLink.tsx # Link with arrow icon
│
├── data/
│   ├── projects.ts         # All project content
│   ├── metrics.ts          # Hero metrics
│   └── nav.ts              # Sidebar nav items
│
├── public/
│   └── og.png              # OpenGraph image (1200x628, dark bg)
│
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 4. Section-by-Section Spec

### 4.1 Sidebar — `Sidebar.tsx`

**Fixed left column, `52px` wide, full viewport height.**

```
[ ~ ]   ← home icon (Lucide: Home)
[ # ]   ← projects (Lucide: LayoutGrid)
[ @ ]   ← contact (Lucide: Mail)
[ ↗ ]   ← live site external (Lucide: ExternalLink)
  ·     ← decorative dot, pushed to bottom with mt-auto
```

- Icons: `18px`, color `text-tertiary` default, `text-primary` on hover
- Active state: highlight icon of current section in viewport (use IntersectionObserver)
- No text labels — icon-only, `aria-label` on each `<a>`
- Right border: `1px solid #1F1F1F`
- `position: fixed`, `z-index: 50`

---

### 4.2 Hero — `Hero.tsx`

**The first thing the visitor sees. Must land in 3 seconds.**

#### Structure

Two-column grid on desktop (`grid-cols-[1fr_380px]`), stacked on mobile. Left = headline + subtext + metrics. Right = Terminal Card (floated, no label).

```
LEFT COLUMN                         RIGHT COLUMN
────────────────────────────────    ────────────────────────────────
[eyebrow]  catchshubu.dev · DXB    ┌──────────────────────────────┐
                                    │ ~/shubhendu $ run --stack    │
[h1]  Senior engineer working at   │                              │
      the intersection of          │ ✓ payment.gateway            │
[ payments ]                        │ ✓ realtime.engine            │
                                    │ ✓ crm.bridge                 │
[subtext]  6+ years building...    │ ✓ standup.automator          │
                                    │                              │
[metrics strip]                     │ ● 3 domains · 6+ yrs active  │
                                    └──────────────────────────────┘
```

#### WordSwap Component (`WordSwap.tsx`)

```tsx
// Words to cycle through — industries only, in this exact order
const WORDS = ['fintech', 'iGaming', 'healthtech', 'media', 'payments']
// fintech    → Account Aggregator + Payment Gateway
// iGaming    → Sports Betting Platform
// healthtech → Doctor Evidence
// media      → SonyLIV OTT
// payments   → Payment Gateway / fintech anchor, loops back naturally

// Interval: 2600ms
// Transition: translateY slide (exit up → enter from below)
// The word renders in DM Serif Display italic, color: accent (#C8FF00)
// Bracket characters [ ] render in JetBrains Mono, color: accent at 30% opacity
// Bracket and word are inline-flex, baseline-aligned
```

#### Subtext copy

```
6+ years shipping production fintech and iGaming infrastructure.
CSPO certified. I work across the full stack — from payment rails
to the interfaces that sit on top of them.
```

#### Metrics Strip (`MetricStrip.tsx`)

Four metrics, separated by a top border `1px solid #1F1F1F`, rendered in JetBrains Mono.

```ts
// data/metrics.ts
export const HERO_METRICS = [
  { value: '$2.4B+',  label: 'payment volume',    accent: '$' },
  { value: '99.98%',  label: 'uptime delivered',  accent: '.98' },
  { value: '8,400',   label: 'peak TPS',           accent: ',' },
  { value: '12ms',    label: 'p95 latency',        accent: 'ms' },
]
// accent = the substring rendered in #C8FF00 within the value string
```

Count-up animation on mount: use a simple `requestAnimationFrame` counter that runs once on page load, duration `1200ms`, easing `easeOut`. Numbers count from 0 to their target value.

---

### 4.3 About — `About.tsx`

**This is Act 2 — the product/design engineering argument.**

#### Layout

Two-column on desktop (`grid-cols-[1fr_200px]`), stacked on mobile.

**Left: bio paragraph**

```
I build things people rely on — payment systems processing
millions of transactions, real-time platforms where a 100ms
delay matters, iGaming infrastructure where correctness and
speed are equally non-negotiable.

But I also hold a CSPO. Which means I sit in the room where
requirements are written and push back when the right feature
is being built the wrong way — or when the wrong feature is
being built at all.

Design engineering is the third angle: I care how the thing
looks and feels in the hand, not just whether it ships.
```

**Right: role badges** — three stacked pills, each one a discipline label:

```
[ Software Engineer ]     ← border: accent at 20% opacity
[ Tech Product Manager ]  ← border: accent at 20% opacity  
[ Design Engineer ]       ← border: accent at 20% opacity, text: accent
```

The `Design Engineer` badge is the last one, with full accent color text — a deliberate visual anchor that ends the right column and echoes the word-swap theme.

**Below bio:** Flat tag row of skills.

```ts
// All tags render in JetBrains Mono 10px, border #1F1F1F
const SKILLS = [
  'TypeScript', 'Node.js', 'React', 'Next.js',
  'Flutter', 'Dart', 'PostgreSQL', 'Redis',
  'Kafka', 'AWS', 'WebSocket', 'REST APIs',
  'Docker', 'CI/CD', 'Figma', 'CSPO',
  'System Design', 'HLS', 'WebRTC',
]
```

---

### 4.4 Projects — `Projects.tsx`

**Act 1 and Act 3 in evidence form. Hard numbers. Real stack.**

#### Layout

Horizontal scroll container with drag support (mouse + touch). No scrollbar visible (`scrollbar-width: none`). A `"drag to explore →"` mono label sits top-right of the section header.

#### Project Data (`data/projects.ts`)

```ts
export const PROJECTS = [
  {
    id: 'account-aggregator',
    year: '2022 — 2023',
    name: 'Account Aggregator Platform',
    discipline: 'Engineering',
    description: 'Fintech consent framework built on the RBI Account Aggregator stack. Secure financial data sharing between FIPs and FIUs with end-to-end encryption, consent lifecycle management, and real-time data fetch pipelines.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Encryption APIs'],
    metric: { label: 'Consent flows processed', value: '[PLACEHOLDER — add real figure]' },
    role: 'Senior Engineer',
    // NOTE TO SHUBHENDU: Fill in metric value and any NDA-safe description edits before publishing.
  },
  {
    id: 'payment-gateway',
    year: '2023 — 2024',
    name: 'Payment Gateway Infrastructure',
    discipline: 'Engineering',
    description: 'Real-time payment processing layer handling multiple PSPs with automatic failover, retry logic, and reconciliation pipelines. Designed for high-availability with zero-downtime deploys.',
    stack: ['Node.js', 'Kafka', 'Redis', 'PostgreSQL', 'AWS'],
    metric: { label: 'Peak throughput', value: '8,400 TPS' },
    role: 'Lead Engineer',
  },
  {
    id: 'sonyliv',
    year: '2020 — 2021',
    name: 'SonyLIV OTT TV Application',
    discipline: 'Design Engineering',
    description: 'Smart TV application for SonyLIV streaming platform. Built for large-screen UX constraints — D-pad navigation, 10-foot UI, adaptive bitrate streaming, and remote-first interaction design.',
    stack: ['React', 'JavaScript', 'HLS.js', 'REST APIs', 'TV SDKs'],
    metric: { label: 'Target screen size', value: '10-foot UI' },
    role: 'Frontend Engineer',
    // NOTE TO SHUBHENDU: Add platform targets (Tizen, webOS, AndroidTV) and any viewership metric if available.
  },
  {
    id: 'doctor-evidence',
    year: '2019 — 2020',
    name: 'Doctor Evidence — Health Analytics',
    discipline: 'Product',
    description: 'Clinical data intelligence platform for evidence-based medicine. Worked on data extraction pipelines and the researcher-facing interface for synthesising clinical trial outcomes at scale.',
    stack: ['React', 'Python', 'REST APIs', 'D3.js', 'PostgreSQL'],
    metric: { label: 'Industry', value: 'Health · MedTech' },
    role: 'Product Engineer',
    // NOTE TO SHUBHENDU: Add any concrete metric — trials processed, researchers served, etc.
  },
  {
    id: 'fugit',
    year: '2021',
    name: 'Fugit — Flutter Mobile App',
    discipline: 'Design Engineering',
    description: 'Cross-platform mobile application built in Flutter. Handled full product lifecycle — from wireframes to production release on iOS and Android. Focused on fluid motion design and native-feeling interactions.',
    stack: ['Flutter', 'Dart', 'Firebase', 'iOS', 'Android'],
    metric: { label: 'Platforms shipped', value: 'iOS + Android' },
    role: 'Solo Builder',
    // NOTE TO SHUBHENDU: Add app category/purpose if not under NDA, and any download or rating metric.
  },
  {
    id: 'sports-betting',
    year: '2022 — 2023',
    name: 'Sports Betting Platform',
    discipline: 'Engineering',
    description: 'Live odds engine and bet settlement system for an iGaming operator. Sub-100ms odds updates via WebSocket pub/sub, with event-driven bet validation and wallet reconciliation.',
    stack: ['TypeScript', 'WebSocket', 'PostgreSQL', 'Redis', 'Node.js'],
    metric: { label: 'P95 latency', value: '12ms' },
    role: 'Senior Engineer',
  },
  {
    id: 'crm-telephony',
    year: '2021 — 2022',
    name: 'CRM & Telephony Bridge',
    discipline: 'Product',
    description: 'Unified agent desktop integrating 3 CRM systems with VoIP telephony and real-time customer context. Scoped, specced, and shipped — wore the PM and engineer hat simultaneously.',
    stack: ['React', 'WebRTC', 'REST APIs', 'Node.js'],
    metric: { label: 'Handle time reduced', value: '34%' },
    role: 'Product Engineer',
  },
  {
    id: 'eod-automator',
    year: '2024',
    name: 'EOD Standup Automator',
    discipline: 'Design Engineering',
    description: 'ClickUp task fetcher + MS Teams webhook pipeline with a mandatory human review gate before any post goes out. Built to solve a personal workflow problem in an afternoon.',
    stack: ['Node.js', 'ClickUp API', 'MS Teams', 'Webhooks'],
    metric: { label: 'Daily time saved', value: '~15 min' },
    role: 'Solo Builder',
  },
]
```

> **Card order for horizontal scroll:** Account Aggregator → Payment Gateway → SonyLIV → Doctor Evidence → Fugit → Sports Betting → CRM Bridge → EOD Automator. This ordering tells the story arc: Fintech infra → OTT/consumer → Health/data → Mobile craft → iGaming infra → Product thinking → Tooling.

#### ProjectCard Component (`ProjectCard.tsx`)

```
┌─────────────────────────────────┐
│ 2023 — 2024          Engineering│  ← year left, discipline badge right
│                                 │
│ Payment Gateway                 │  ← DM Serif Display 20px
│ Infrastructure                  │
│                                 │
│ Real-time payment processing... │  ← Inter 13px, text-secondary
│                                 │
│ [Node.js] [Kafka] [Redis]       │  ← mono tags, accent border
│                                 │
│ ─────────────────────────────── │  ← 1px divider
│ Peak throughput    8,400 TPS    │  ← label left, value right in accent
└─────────────────────────────────┘
```

Card width: `280px` fixed. Card height: `auto`. Gap between cards: `20px`.

Discipline badge colors:
- `Engineering` → text `text-secondary`, border `#1F1F1F`
- `Product` → text `text-secondary`, border `#1F1F1F`
- `Design Engineering` → text `accent (#C8FF00)`, border `accent at 20%`

---

### 4.5 Contact — `Contact.tsx`

**Keep it dead simple. Four links. No form.**

```
┌──────────────────────┐  ┌──────────────────────┐
│ ✉  Email             │  │ in  LinkedIn          │
│              hello@  │  │          /shubhendu   │
└──────────────────────┘  └──────────────────────┘
┌──────────────────────┐  ┌──────────────────────┐
│ <>  GitHub           │  │ ↗  Portfolio          │
│         @catchshubu  │  │    catchshubu.dev     │
└──────────────────────┘  └──────────────────────┘
```

2×2 grid on desktop, 1 column on mobile. Each link:
- `display: flex; justify-content: space-between`
- Icon left (Lucide, `18px`, `text-tertiary`)
- Label left
- Handle right (mono, `text-tertiary`)
- Border: `1px solid #1F1F1F`, hover: `#2A2A2A`
- No background fill

**Contact data:**
```ts
export const CONTACT_LINKS = [
  { label: 'Email',     handle: 'hello@catchshubu.dev', href: 'mailto:hello@catchshubu.dev', icon: 'Mail' },
  { label: 'LinkedIn',  handle: '/in/shubhendu',        href: 'https://linkedin.com/in/shubhendu', icon: 'Linkedin' },
  { label: 'GitHub',    handle: '@catchshubu',          href: 'https://github.com/catchshubu', icon: 'Github' },
  { label: 'Portfolio', handle: 'catchshubu.dev',       href: 'https://catchshubu.dev', icon: 'ExternalLink' },
]
```

---

### 4.6 Footer — inline in `page.tsx`

Two-line footer. First line: left/right split. Second line: coordinates centered.

```
SHUBHENDU · DUBAI, UAE                    catchshubu.dev

              DXB · 25.2048° N, 55.2708° E
```

- Both lines in JetBrains Mono `11px`, `text-tertiary` (`#444240`)
- Line 1: `display: flex; justify-content: space-between`
- Line 2: `text-align: center`, `margin-top: 12px`
- Padding: `32px 0 48px`
- Top border: `1px solid #1F1F1F`
- Coordinates are purely decorative — `aria-hidden="true"` on the coords line

---

### 4.7 TerminalCard — `TerminalCard.tsx`

**Positioned in the right column of the Hero grid. This is the visual signature of the site.**

#### Anatomy

```
┌─────────────────────────────────────────────┐
│  ● ● ●   ~/shubhendu                        │  ← traffic lights + path (decorative)
├─────────────────────────────────────────────┤
│                                             │
│  $ run portfolio --stack=production  █      │  ← green $ prompt, blinking cursor
│  … scanning 6 years of commits             │  ← dim output, typing animation
│                                             │
│  ✓  payment.gateway     → $2.4B+ processed │
│  ✓  realtime.engine     → 12ms p95 latency │
│  ✓  igaming.platform    → 8,400 TPS peak   │
│  ✓  crm.bridge          → 34% handle↓      │
│  ✓  standup.automator   → ships daily      │
│                                             │
│  ● 3 domains · 6+ yrs · DXB               │  ← green dot status pill
└─────────────────────────────────────────────┘
```

#### Styling

```ts
// Card container
background: '#141414'
border: '1px solid #1F1F1F'
border-radius: '6px'
font-family: 'JetBrains Mono', monospace
font-size: '12px'
padding: '0'  // titlebar handles top padding, body handles rest
width: '100%'
max-width: '380px'

// Title bar (traffic lights row)
background: '#1A1A1A'
border-bottom: '1px solid #1F1F1F'
padding: '10px 14px'
display: 'flex'
align-items: 'center'
gap: '6px'

// Traffic light dots — purely decorative, aria-hidden
// Red: #FF5F57, Yellow: #FEBC2E, Green: #28C840
// Size: 10px circles

// Path text beside dots
color: '#444240'  // text-tertiary
font-size: '11px'
margin-left: '8px'

// Body
padding: '16px 14px 14px'

// $ prompt
color: '#C8FF00'  // accent

// Command text
color: '#E8E6E0'  // text-primary

// Blinking cursor
display: 'inline-block'
width: '8px'
height: '13px'
background: '#C8FF00'
animation: 'blink 1s step-end infinite'

// Scanning output line (appears 600ms after mount)
color: '#444240'  // text-tertiary
font-size: '11px'

// Checkmark lines (staggered reveal, 150ms apart, starting at 1200ms)
// ✓ symbol: color '#C8FF00'
// key (payment.gateway): color '#888580'  text-secondary
// arrow →: color '#444240'
// value ($2.4B+ processed): color '#E8E6E0'

// Status pill (bottom, appears after all lines)
display: 'flex'
align-items: 'center'
gap: '6px'
margin-top: '12px'
padding-top: '12px'
border-top: '1px solid #1F1F1F'
// Dot: 6px, background '#C8FF00', border-radius '50%', animation 'pulse 2s infinite'
// Text: color '#444240', font-size '11px'
```

#### Animation Sequence

All animations run once on mount. Respect `prefers-reduced-motion` — if true, show final state immediately with no transitions.

```
0ms     → command line appears instantly (no type-out, cursor starts blinking)
600ms   → scanning line fades in
1200ms  → ✓ payment.gateway slides in (translateY 4px → 0, opacity 0 → 1, 200ms)
1350ms  → ✓ realtime.engine
1500ms  → ✓ igaming.platform
1650ms  → ✓ crm.bridge
1800ms  → ✓ standup.automator
2100ms  → status pill fades in
```

#### Terminal data (co-locate in component or pull from `data/terminal.ts`)

```ts
export const TERMINAL_LINES = [
  { key: 'account.aggregator',  value: 'RBI AA stack · consent flows' },
  { key: 'payment.gateway',     value: '$2.4B+ processed · 8,400 TPS' },
  { key: 'sonyliv.tv',          value: '10-foot UI · HLS streaming'    },
  { key: 'doctor.evidence',     value: 'clinical data · MedTech'       },
  { key: 'fugit.mobile',        value: 'Flutter · iOS + Android'       },
  { key: 'igaming.platform',    value: '12ms p95 · live odds engine'   },
]

export const TERMINAL_STATUS = '6 domains · 6+ yrs · DXB'
```

---

## 5. Metadata & SEO

In `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  title: 'Shubhendu — Senior Engineer & Design Engineer',
  description: 'Senior Full Stack Engineer with 6+ years in fintech and iGaming. CSPO certified. Based in Dubai, UAE.',
  openGraph: {
    title: 'Shubhendu — Senior Engineer & Design Engineer',
    description: 'Fintech · iGaming · Product · Design Engineering',
    url: 'https://catchshubu.dev',
    siteName: 'catchshubu.dev',
    images: [{ url: '/og.png', width: 1200, height: 628 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubhendu — Senior Engineer & Design Engineer',
    description: 'Senior Full Stack Engineer · Fintech · iGaming · Dubai',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}
```

---

## 6. Accessibility Requirements (WCAG 2.2 AA)

- All icon-only buttons and links must have `aria-label`
- Word-swap container must have `aria-live="polite"` so screen readers announce changes
- Metrics strip must have `role="region"` and `aria-label="Key metrics"`
- Project scroll must use `role="list"` + `role="listitem"` on cards
- Color contrast: `#E8E6E0` on `#0A0A0A` = 16.5:1 ✓. `#888580` on `#0A0A0A` = 5.3:1 ✓. `#C8FF00` on `#0A0A0A` = 13.4:1 ✓
- Focus ring: `outline: 2px solid #C8FF00; outline-offset: 3px` on all interactive elements
- Skip-to-content link: first focusable element in DOM, visually hidden until focused
- `prefers-reduced-motion`: disable all Framer Motion animations, disable word-swap interval

---

## 7. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| LCP | < 1.2s |
| CLS | 0 |
| Total page weight | < 150KB JS (excl. fonts) |

- Use `next/font` for zero-CLS font loading
- No images in initial viewport — defer any future photography section
- All animations are CSS `transform` and `opacity` only — no layout thrashing
- Framer Motion: import only used components (`import { motion } from 'framer-motion'`)

---

## 8. Build Order (for Claude Code)

Execute in this sequence to avoid dependency issues:

1. **Init project** — `npx create-next-app@latest catchshubu --typescript --tailwind --app --no-src-dir`
2. **Install deps** — `npm install framer-motion lucide-react`
3. **Configure Tailwind** — add custom colors and fonts to `tailwind.config.ts`
4. **globals.css** — base styles, scrollbar hide, custom focus ring, font-face imports
5. **Data files** — create `/data/projects.ts`, `/data/metrics.ts`, `/data/nav.ts`, `/data/terminal.ts`
6. **UI primitives** — `Tag.tsx`, `ExternalLink.tsx`
7. **WordSwap.tsx** — standalone, testable component
8. **MetricStrip.tsx**
9. **TerminalCard.tsx** — standalone, full staggered animation, respects `prefers-reduced-motion`
10. **Sidebar.tsx**
11. **Hero.tsx** — two-column grid: `[WordSwap + MetricStrip]` left, `[TerminalCard]` right
12. **About.tsx**
13. **ProjectCard.tsx** → **Projects.tsx**
14. **Contact.tsx**
15. **`app/layout.tsx`** — sidebar + metadata
16. **`app/page.tsx`** — compose all sections with dividers + DXB coordinates footer
17. **Accessibility pass** — aria-labels, skip link, focus rings, reduced-motion check
18. **`next.config.ts`** — set `output: 'export'` if static, else leave default for Vercel

---

## 9. Placeholders to Replace with Real Data

Before going live, Shubhendu must update:

| Field | Location | Note |
|---|---|---|
| Email | `data/nav.ts` + Contact | Real email address |
| LinkedIn URL | `data/nav.ts` + Contact | Full profile URL |
| GitHub handle | Contact | Confirm `@catchshubu` is correct |
| Project descriptions | `data/projects.ts` | Expand with NDA-safe details on all 8 projects |
| Account Aggregator metric | `data/projects.ts` | Add real consent flow volume or transaction count |
| SonyLIV platforms | `data/projects.ts` | Confirm: Tizen / webOS / AndroidTV? Add if not NDA |
| Doctor Evidence metric | `data/projects.ts` | Add trials processed, researchers served, or similar |
| Fugit app details | `data/projects.ts` | Add app category/purpose and any store rating/downloads |
| Payment Gateway metrics | `data/metrics.ts` | Confirm `$2.4B+` and `8,400 TPS` are shareable publicly |
| OG image | `public/og.png` | Generate a dark-bg 1200×628px image |
| Favicon | `public/favicon.ico` | Custom or initials-based |

---

## 10. Future Sections (Do Not Build Now — Stub Only)

These sections are planned but not in v1 scope:

- **Writing** — a `/writing` route for blog posts or notes. Stub with a "coming soon" state on the nav icon.
- **Photography** — a `/photos` route. Shubhendu shoots on Fuji X-E5. Will add once shot library is ready.
- **Postcards** — inspired by iamrob.in. A guestbook/postcard feature. Requires a backend (Supabase). Phase 2.

---

*End of plan. Claude Code: begin with Step 1 in Section 8.*
