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
| `--bg` | `#080808` | Page background |
| `--bg-surface` | `#101010` | Raised surface (featured card bg) |
| `--bg-raised` | `#161616` | Further elevated |
| `--border` | `#1e1e1e` | Default dividers & card borders |
| `--border-mid` | `#2a2a2a` | Mid-emphasis borders |
| `--border-strong` | `#3a3a3a` | Hover state borders |
| `--text` | `#f2f2f2` | Primary text |
| `--text-sub` | `#888` | Secondary text |
| `--text-muted` | `#444` | Labels, eyebrows, muted |
| `--green-text` | `#4caf60` | Available status dot |

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
| Role | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero name | clamp(52px, 11vw, 76px) | 900 | -3px | 1.0 |
| Section heading | 18px | 700 | -0.4px | 1.3 |
| Tagline / body | 14–15px | 400 | -0.1px | 1.55–1.7 |
| Labels / eyebrows | 9–11px | 600–700 | 3px | — |
| Nav links | 11px | 500 | 0.3px | — |

---

## 3. Layout

- **Max width:** 720px, centered, `24px` horizontal padding
- **Single-column** linear scroll — no sidebar, no grid hero
- **Sticky nav** with `border-bottom: 1px solid var(--border)`
- Section separation: `border-bottom: 1px solid var(--border)` on each `<section>`, `64px` vertical padding

---

## 4. Components

### Navigation
- Logo: `rapi.` — Poppins 900, letter-spacing -1px
- Links: Work · About · Blog
- Right: EN/ID segmented toggle + ◐ Theme toggle button
- EN/ID: segmented control, active state = `background: var(--text)` (inverted)

### Hero
- Eyebrow: `SOFTWARE ENGINEER` — 11px, weight 500, letter-spacing 3px, `--text-muted`
- Name: `Muhammad` + `Rapi.` — 76px weight 900, `Rapi.` has 3px solid border-bottom (brutalism underline)
- Tagline: 15px/1.55, `--text-sub`, max-width 420px
- CTA row: primary button + ghost text button
- Status line: green dot + "Available for opportunities" + stack summary

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
- `border: 1px solid var(--border-mid)`, `border-radius: var(--r-xs)`
- 9px/600, letter-spacing 1.5px, uppercase, `--text-sub`
- Hover: border `--border-strong`, color `--text`

### Blog Rows
- Horizontal row: title left, date right
- `border-bottom: 1px solid var(--border)`
- No cards — editorial list style
- Hover: title color dims to `--text-sub`

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
