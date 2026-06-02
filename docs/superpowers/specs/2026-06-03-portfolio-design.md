# Portfolio Design Spec
**Date:** 2026-06-03  
**Project:** muhammad-rapi portfolio  
**Stack:** Astro 6 · Tailwind v4 · TinaCMS · Motion One  

---

## 1. Overview

Personal portfolio for **Muhammad Rapi**, Software Engineer based in Jakarta. Primary audience: technical recruiters, senior engineers, startup founders/CTOs. Goal: convey competence and personality without noise.

Design direction: **minimalist dark-first, editorial, Motion-inspired + brutalism accents**. Not a generic AI-looking portfolio — raw edges, offset shadows, tight typography, real content.

---

## 2. Design Tokens

### Color Palette

**Dark mode (default):**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#111112` | Page background — dark charcoal, slight cool undertone (not pure black) |
| `--bg-surface` | `#18181a` | Raised surface (featured card bg) |
| `--border` | `#242426` | Default dividers & card borders |
| `--border-mid` | `#303033` | Mid-emphasis borders |
| `--border-strong` | `#464649` | Hover state borders |
| `--text` | `#eeeef0` | Primary text |
| `--text-sub` | `#808085` | Secondary text |
| `--text-muted` | `#44444a` | Labels, eyebrows, muted |
| `--green-text` | `#3d9950` | Available status dot |

**Light mode:**
| Token | Value |
|---|---|
| `--bg` | `#f3f1eb` |
| `--bg-surface` | `#ebe9e3` |
| `--border` | `#d0cdc5` |
| `--text` | `#111` |
| `--text-sub` | `#666` |
| `--text-muted` | `#aaa` |

**Brutalism shadow color** = foreground (`#f2f2f2` dark / `#111` light). Applied as `3px 3px 0px var(--brut-fg)` on interactive cards and buttons.

### Spacing System (4px base — Notion-derived)
| Token | Value |
|---|---|
| `--sp-xs` | 8px |
| `--sp-sm` | 12px |
| `--sp-md` | 16px |
| `--sp-xl` | 24px |
| `--sp-xxl` | 32px |
| `--sp-sec-sm` | 48px |
| `--sp-sec` | 64px |
| `--sp-sec-lg` | 96px |

### Border Radius (Notion-derived)
| Token | Value | Use |
|---|---|---|
| `--r-xs` | 4px | Tag chips, lang toggle, brut buttons |
| `--r-sm` | 6px | Small elements |
| `--r-md` | 8px | Buttons, mini project cards |
| `--r-lg` | 12px | Featured project card |

### Typography — Poppins
Minimum font weight is **600** across all text — no thin or light weights anywhere.

| Role | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero name | clamp(58px, 13vw, 88px) | 900 | -4px | 0.92 |
| Featured project title | 20px | 800 | -0.5px | 1.3 |
| Experience company | 15px | 800 | -0.3px | — |
| Tagline / about / body | 16–17px | 600 | -0.1px | 1.55–1.72 |
| Blog title | 16px | 700 | — | — |
| Nav links | 12px | 600 | 0.3px | — |
| Labels / eyebrows / chips | 9–10px | 700–800 | 3–4px | — |
| Stack chips | 10px | 700 | 1.5px | — |

---

## 3. Layout

- **Max width:** 720px, centered, `24px` horizontal padding
- **Single-column** linear scroll — no sidebar, no grid hero
- **Sticky nav** with `border-bottom: 1px solid var(--border)`
- Section separation: `border-bottom: 1px solid var(--border)` on each `<section>`, `64px` vertical padding

---

## 4. Components

### Top Bar (minimal)
- Logo: `rapi©` — Poppins 900, letter-spacing -1.2px, superscript `©` in `--text-muted`
- Right: EN/ID segmented toggle + `◐` theme button only — no nav links here

### Bottom Tab Bar (floating)
- Position: `fixed`, `bottom: 24px`, centered horizontally, `max-width: 640px`, `width: calc(100% - 48px)`
- Style: `border-radius: 12px`, `border: 1px solid var(--border-mid)`, `box-shadow` + brutalism offset shadow
- Tabs: **Home · Projects · Blog · About · Contact**
- Each tab: Font Awesome icon + label (9px/800, letter-spacing 1.5px uppercase)
- Active state: `border-top: 2px solid var(--text)`, background `var(--bg-card)`, icon+label color `var(--text)`
- Inactive: icon+label color `var(--text-muted)`

### Section Cards
- Each section wrapped in `.sec-card`: `border: 1px solid var(--border-mid)`, `border-radius: 8px`, `background: var(--bg-surface)`
- `.card-header`: title 28px/900 + count label, with subtle grid lines `::before` (`rgba(255,255,255,0.014)`, `28px` grid), fade masked
- `.card-body`: `padding: 20px 24px`

### Hero
- Eyebrow: `SOFTWARE ENGINEER` — 10px, weight 700, letter-spacing 4px, `--text-muted`, with extending horizontal rule `::after`
- Name: `Muhammad` + `Rapi.` — 88px weight 900, letter-spacing -4px, `Rapi.` has `border-bottom: 4px solid var(--text)` (brutalism underline)
- Tagline: 17px/1.55, weight 600, `--text-sub`, max-width 440px
- CTA row: primary button + ghost button
- Status line: green dot + "Available" text + separator + stack summary
- **Grid lines** (`::before` pseudo-element) inside hero only — `40px` grid, masked with linear-gradient fade to bottom. Not on any other section.

### Buttons
**Primary (brutalism):**
- Background: `var(--text)` | Color: `var(--on-btn)` | Border: `1.5px solid var(--brut-fg)`
- Border-radius: `var(--r-xs)` (4px) | Padding: `10px 22px`
- Box-shadow: `3px 3px 0px var(--brut-fg)`
- Hover: `translate(-1px, -1px)` + shadow `4px 4px`
- Active: `translate(3px, 3px)` + shadow none

**Ghost:**
- No background/border, `border-bottom: 1px solid var(--border-mid)`
- Hover: color `var(--text)`, border-color `var(--border-strong)`

**Contact buttons:** Same as primary but smaller, `--bg` background (not filled)

### Featured Project Card
- Border: `1.5px solid var(--brut-fg)` | Border-radius: `var(--r-lg)` (12px)
- Padding: `var(--sp-xxl)` | Background: `var(--bg-surface)`
- Box-shadow: `3px 3px 0 var(--brut-fg)`
- Subtle grain texture overlay (`opacity: 0.04` fractalNoise SVG filter)
- Hover: `translate(-2px, -2px)` + shadow `5px 5px`
- Contains: badge · title (18px/700) · description (13px/1.6) · stack (9px uppercase)

### Mini Project Grid
- 2-column grid, `8px` gap
- Each card: `border: 1px solid var(--border)`, `border-radius: var(--r-md)`, `padding: 16px`
- Hover: border-color `var(--border-strong)`, background `var(--bg-surface)`
- Last item (GitHub link) at 0.4 opacity

### Experience Rows
- 2-column grid: `88px` (period) + `1fr` (content)
- Separated by `border-bottom: 1px solid var(--border)`
- Period: 9px, letter-spacing 1px, `--text-muted`
- Company: 14px/700 | Role: 11px `--text-sub` | Note: 11px/1.5 `--text-muted`

### Skill Chips
- `border: 1px solid var(--border-mid)`, `border-radius: 4px`
- 10px/800, letter-spacing 1px, uppercase, `--text-sub`, background `var(--bg-card)`
- Each chip includes **Devicon** icon (16px) left of label — loaded via `devicon` CDN (self-hosted in prod)
- Hover: border `--border-strong`, color `--text`

### Blog Rows
- Horizontal row: title (15px/700) left, date (10px/700) right
- `border-bottom: 1px solid var(--border)`
- No cards — editorial list style
- Hover: `padding-left: 6px` slide-in effect

### Contact Section
- Social buttons row: Email · GitHub · LinkedIn — each with Font Awesome icon (`fa-envelope`, `fa-brands fa-github`, `fa-brands fa-linkedin`) + brutalism style
- Divider: `OR SEND A MESSAGE` with extending horizontal rules
- Email form: Name + Email (side by side) · Subject · Message (textarea 88px) · Send button with `fa-paper-plane`
- Form inputs: `border: 1px solid var(--border-mid)`, focus → `var(--border-strong)`, `border-radius: 3px`, Poppins 600 13px
- Form is cosmetic in static site — wire to Resend / Formspree on deploy

---

## 5. Motion

**Page load (hero):** Fade + slide-up per element, staggered:
- Eyebrow → name → tagline → CTA → status
- `opacity: 0 → 1`, `translateY(16px) → 0`
- Duration: 500ms ease, stagger: 100ms per element
- Library: **Motion One** — vanilla (`motion` package, not Framer Motion). Import: `import { animate, inView } from 'motion'`

**Scroll-triggered reveal:** Each `<section>` fades + slides up when entering viewport. Threshold: 0.15. One-time (no re-trigger on scroll up).

**Hover micro-interactions:**
- Buttons: transform snap (already in CSS)
- Project cards: transform + shadow grow
- Nav links: color transition 150ms
- Skill chips: border + color 150ms

---

## 6. Sections & Content Structure

Order (top → bottom):
1. **Hero** — name, tagline, CTA, status
2. **Selected Work** — featured + mini grid
3. **Experience** — timeline rows
4. **Stack** — skill chips
5. **About** — 2-paragraph text
6. **Writing** — blog row list
7. **Contact** — brutalism buttons
8. **Footer** — copyright + stack credit

---

## 7. i18n (EN / ID)

- Toggle in nav: segmented control, persists via `localStorage`
- Translation files: `src/i18n/en.json` + `src/i18n/id.json` (already exists)
- All user-facing strings go through i18n helper — no hardcoded text in `.astro` components
- Content (projects, experience, about) stays in content collections; descriptions have `en` + `id` fields

---

## 8. Content Management (TinaCMS)

- Projects: title, description (EN+ID), tech stack, link, featured flag
- Experience: company, role, period, note (EN+ID)
- Skills: name, category
- About: text (EN+ID)
- Blog posts: title, date, slug, content (MDX, EN+ID)
- All editable via TinaCMS admin at `/admin`

---

## 9. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 |
| Styling | Tailwind v4 (utility) + CSS custom properties (tokens) |
| CMS | TinaCMS (existing) |
| Animation | Motion One |
| i18n | Custom helper (existing `src/i18n/`) |
| Font | Poppins via Google Fonts (self-hosted in prod) |
| Deploy | Static output (`astro build`) |

---

## 10. Responsive

| Breakpoint | Changes |
|---|---|
| `< 480px` | Nav links hidden, hamburger or icon-only. Hero 48px. Mini grid 1-col. |
| `480–768px` | Hero 60px. Mini grid 2-col. |
| `> 768px` | Full layout as designed. Max-width 720px centered. |

---

## 11. Out of Scope

- Dark/light auto-detection (OS preference) — manual toggle only for now
- Search or tag filtering on blog
- Contact form (links only — email, GitHub, LinkedIn)
- Animations on mobile reduced-motion: respect `prefers-reduced-motion`
