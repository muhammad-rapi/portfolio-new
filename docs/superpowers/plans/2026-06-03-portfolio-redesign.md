# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully redesign the portfolio site to match the v5 design spec — dark charcoal base, Poppins 600–900, section cards, floating bottom tab bar, devicons, contact form, Motion One animations, EN/ID i18n.

**Architecture:** Single-page scroll layout with floating bottom tab bar for navigation. Each section is a self-contained card component. Top bar holds logo + lang/theme toggles only. Motion One handles hero entrance and scroll-reveal animations. TinaCMS manages all content.

**Tech Stack:** Astro 6 · Tailwind v4 · TinaCMS · Motion One · Font Awesome 6 · Devicon · Poppins (Google Fonts)

---

## File Map

### Modified
- `src/styles/global.css` — replace all tokens, fonts, animations
- `src/layouts/Base.astro` — replace Navbar+Footer with TopBar+TabBar, add Motion One script
- `src/i18n/en.json` — rewrite all copy to match new design
- `src/i18n/id.json` — rewrite all copy (Indonesian)
- `src/pages/index.astro` — wire new components
- `src/pages/id/index.astro` — wire new components (ID locale)
- `src/content.config.ts` — add blog collection, add `note`+`featured` fields to experience
- `src/content/experience.json` — update with real data shape

### Replaced (rewrite in-place)
- `src/components/Navbar.astro` → `src/components/TopBar.astro` (new file, delete Navbar)
- `src/components/Footer.astro` → `src/components/TabBar.astro` (new file, delete Footer)
- `src/components/Hero.astro` — full rewrite
- `src/components/ProjectCard.astro` — full rewrite
- `src/components/ProjectsGrid.astro` — full rewrite
- `src/components/Timeline.astro` — full rewrite (Experience section)
- `src/components/Skills.astro` — full rewrite with devicons
- `src/components/About.astro` — full rewrite
- `src/components/Contact.astro` — full rewrite with form

### New
- `src/components/SectionCard.astro` — card wrapper (header with grid lines + body)
- `src/components/WritingList.astro` — blog row list
- `src/content/blog/` — blog posts directory (MDX)
- `src/lib/i18n.ts` — i18n helper (already at `src/i18n/`, extend if needed)

---

## Task 1: Design Tokens + Fonts (global.css)

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace font imports and CSS custom properties**

Replace the entire `src/styles/global.css` with:

```css
@import "tailwindcss";

/* ── FONTS ── */
/* In prod, self-host these. For now CDN is fine. */

@theme {
  --font-sans: 'Poppins', sans-serif;
}

/* ── DESIGN TOKENS ── */
:root {
  /* Dark (default) */
  --bg:            #111112;
  --bg-surface:    #18181a;
  --bg-card:       #1c1c1f;
  --border:        #242426;
  --border-mid:    #303033;
  --border-strong: #464649;
  --text:          #eeeef0;
  --text-sub:      #808085;
  --text-muted:    #44444a;
  --brut-fg:       #eeeef0;
  --brut-shadow:   3px 3px 0px var(--brut-fg);
  --brut-border:   1.5px solid var(--brut-fg);
  --green:         #3d9950;
  --grid-color:    rgba(255,255,255,0.014);
  --grid-size:     28px;
}

.light {
  --bg:            #f0ede6;
  --bg-surface:    #e8e5de;
  --bg-card:       #e2dfd8;
  --border:        #d4d0c9;
  --border-mid:    #bbb8b0;
  --border-strong: #8e8b83;
  --text:          #0e0e0e;
  --text-sub:      #6a6a6a;
  --text-muted:    #b0ada6;
  --brut-fg:       #0e0e0e;
  --green:         #1e7a32;
  --grid-color:    rgba(0,0,0,0.025);
}

/* ── BASE ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

body {
  font-family: 'Poppins', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
  transition: background .25s, color .25s;
  min-height: 100vh;
}

::selection { background: var(--text); color: var(--bg); }
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-thumb { background: var(--border-mid); }

/* ── SCROLL REVEAL (Motion One wires these) ── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .55s ease, transform .55s ease;
}
.reveal.in-view { opacity: 1; transform: translateY(0); }

/* ── FOCUS ── */
:focus-visible {
  outline: 1.5px solid var(--text);
  outline-offset: 3px;
  border-radius: 3px;
}

/* ── LAYOUT ── */
.wrap {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
  padding-bottom: 104px; /* space for floating tab bar */
}
```

- [ ] **Step 2: Verify Tailwind still loads**

```bash
cd /Users/mac/Dev/portfolio && npm run dev
```

Open http://localhost:4321 — should load without errors. Body background should be `#111112`.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: replace design tokens and fonts with Poppins + v5 palette"
```

---

## Task 2: Base Layout — TopBar + TabBar

**Files:**
- Create: `src/components/TopBar.astro`
- Create: `src/components/TabBar.astro`
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Create TopBar.astro**

```astro
---
interface Props {
  locale: 'en' | 'id';
}
const { locale } = Astro.props;
---

<header class="topbar">
  <div class="topbar-inner">
    <a href={locale === 'id' ? '/id' : '/'} class="logo">
      rapi<sup>©</sup>
    </a>
    <div class="top-right">
      <div class="lang-seg">
        <a href="/" class:list={['lang-opt', { on: locale === 'en' }]}>EN</a>
        <a href="/id" class:list={['lang-opt', { on: locale === 'id' }]}>ID</a>
      </div>
      <button class="theme-btn" id="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </div>
</header>

<style>
.topbar {
  position: sticky; top: 0; z-index: 50;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}
.topbar-inner {
  max-width: 680px; margin: 0 auto;
  padding: 0 24px; height: 48px;
  display: flex; align-items: center; justify-content: space-between;
}
.logo {
  font-size: 18px; font-weight: 900;
  letter-spacing: -1.2px; color: var(--text);
  text-decoration: none;
}
.logo sup {
  font-size: 9px; font-weight: 700;
  color: var(--text-muted); vertical-align: top; margin-top: 5px;
}
.top-right { display: flex; gap: 10px; align-items: center; }
.lang-seg {
  display: flex;
  border: 1px solid var(--border-mid);
  border-radius: 3px; overflow: hidden;
}
.lang-opt {
  font-size: 9px; font-weight: 800;
  letter-spacing: 1.5px; padding: 4px 8px;
  color: var(--text-muted);
  text-decoration: none;
  transition: all .12s;
}
.lang-opt.on { background: var(--text); color: var(--bg); }
.theme-btn {
  font-family: 'Poppins', sans-serif;
  font-size: 11px; font-weight: 700;
  background: none; border: 1px solid var(--border-mid);
  border-radius: 3px; padding: 4px 10px;
  color: var(--text-sub); cursor: pointer; transition: all .12s;
}
.theme-btn:hover { color: var(--text); border-color: var(--border-strong); }
</style>
```

- [ ] **Step 2: Create TabBar.astro**

```astro
---
interface Props {
  locale: 'en' | 'id';
}
const { locale } = Astro.props;
const base = locale === 'id' ? '/id' : '';
---

<nav class="tab-bar" id="tab-bar">
  <div class="tab-bar-inner">
    <a href={`${base}/`} class="tab" data-section="home">
      <i class="fa-solid fa-house tab-icon"></i>
      <span class="tab-label">Home</span>
    </a>
    <a href={`${base}/#projects`} class="tab" data-section="projects">
      <i class="fa-solid fa-code tab-icon"></i>
      <span class="tab-label">Projects</span>
    </a>
    <a href={`${base}/#blog`} class="tab" data-section="blog">
      <i class="fa-solid fa-pen-nib tab-icon"></i>
      <span class="tab-label">Blog</span>
    </a>
    <a href={`${base}/#about`} class="tab" data-section="about">
      <i class="fa-solid fa-user tab-icon"></i>
      <span class="tab-label">About</span>
    </a>
    <a href={`${base}/#contact`} class="tab" data-section="contact">
      <i class="fa-solid fa-paper-plane tab-icon"></i>
      <span class="tab-label">Contact</span>
    </a>
  </div>
</nav>

<style>
.tab-bar {
  position: fixed; bottom: 24px;
  left: 50%; transform: translateX(-50%);
  height: 60px;
  background: var(--bg-surface);
  border: 1px solid var(--border-mid);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), var(--brut-shadow);
  display: flex; align-items: stretch;
  z-index: 100;
  width: calc(100% - 48px);
  max-width: 640px;
  overflow: hidden;
}
.tab-bar-inner { width: 100%; display: flex; }
.tab {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 5px; cursor: pointer;
  border-right: 1px solid var(--border);
  transition: background .12s;
  padding: 0 8px;
  text-decoration: none;
  position: relative;
}
.tab:last-child { border-right: none; }
.tab:hover { background: var(--bg-card); }
.tab.active { background: var(--bg-card); border-top: 2px solid var(--text); margin-top: -1px; }
.tab-icon { font-size: 15px; color: var(--text-muted); transition: color .12s; }
.tab.active .tab-icon { color: var(--text); }
.tab-label {
  font-size: 8px; font-weight: 800;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--text-muted); transition: color .12s;
}
.tab.active .tab-label { color: var(--text); }
</style>

<script>
// Highlight active tab based on scroll position
const sections = ['home', 'projects', 'blog', 'about', 'contact'];
const tabs = document.querySelectorAll<HTMLElement>('.tab');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id || 'home';
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(id => {
  const el = document.getElementById(id) || document.body;
  observer.observe(el);
});
</script>
```

- [ ] **Step 3: Rewrite Base.astro**

```astro
---
import '../styles/global.css';
import TopBar from '../components/TopBar.astro';
import TabBar from '../components/TabBar.astro';
import SEO from '../components/SEO.astro';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  locale?: 'en' | 'id';
}

const {
  title = 'Muhammad Rapi — Software Engineer',
  description = 'Software Engineer based in Jakarta. Building reliable systems and clean interfaces.',
  image = '/og-image.png',
  locale = 'en',
} = Astro.props;
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <SEO {title} {description} {image} {locale} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
    <script is:inline>
      // Prevent flash of wrong theme
      (function() {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') document.documentElement.classList.add('light');
      })();
    </script>
  </head>
  <body>
    <TopBar locale={locale} />
    <main>
      <slot />
    </main>
    <TabBar locale={locale} />
    <script>
      // Theme toggle
      document.getElementById('theme-toggle')?.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        localStorage.setItem('theme',
          document.documentElement.classList.contains('light') ? 'light' : 'dark'
        );
      });

      // Scroll reveal
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        }),
        { threshold: 0.12 }
      );
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 4: Delete old Navbar.astro and Footer.astro**

```bash
rm src/components/Navbar.astro src/components/Footer.astro
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Expected: page loads with top bar (logo + EN/ID + ◐) and floating tab bar at bottom. No errors in console.

- [ ] **Step 6: Commit**

```bash
git add src/components/TopBar.astro src/components/TabBar.astro src/layouts/Base.astro
git rm src/components/Navbar.astro src/components/Footer.astro
git commit -m "feat: replace navbar/footer with TopBar + floating TabBar"
```

---

## Task 3: SectionCard Component

**Files:**
- Create: `src/components/SectionCard.astro`

- [ ] **Step 1: Create SectionCard.astro**

```astro
---
interface Props {
  title: string;
  count?: string;
  id?: string;
}
const { title, count, id } = Astro.props;
---

<section class="sec-card reveal" id={id}>
  <div class="card-header">
    <span class="card-title">{title}</span>
    {count && <span class="card-count">{count}</span>}
  </div>
  <div class="card-body">
    <slot />
  </div>
</section>

<style>
.sec-card {
  border: 1px solid var(--border-mid);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  background: var(--bg-surface);
}
.card-header {
  padding: 20px 24px 18px;
  border-bottom: 1px solid var(--border);
  display: flex; justify-content: space-between; align-items: baseline;
  position: relative; overflow: hidden;
}
.card-header::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  pointer-events: none;
}
.card-title {
  font-size: 28px; font-weight: 900;
  letter-spacing: -1px; color: var(--text);
  position: relative; z-index: 1;
}
.card-count {
  font-size: 11px; font-weight: 800;
  color: var(--text-muted); letter-spacing: 2px;
  position: relative; z-index: 1;
}
.card-body { padding: 20px 24px; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionCard.astro
git commit -m "feat: add SectionCard component with grid-line header"
```

---

## Task 4: Hero Section

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Rewrite Hero.astro**

```astro
---
import { getI18n } from '../i18n';

interface Props {
  locale: 'en' | 'id';
}
const { locale } = Astro.props;
const t = getI18n(locale);
---

<div class="hero" id="home">
  <div class="hero-eye">{t.hero.eyebrow}</div>
  <h1 class="hero-name">
    Muhammad<br /><span class="last">Rapi.</span>
  </h1>
  <p class="hero-tag" set:html={t.hero.tagline} />
  <div class="cta-row">
    <a href="#projects" class="btn-p">{t.hero.cta_work}</a>
    <a href="/cv.pdf" download class="btn-g">{t.hero.cta_cv} ↓</a>
  </div>
  <div class="hero-meta">
    <span class="sdot"></span>
    <span class="avail">{t.hero.available}</span>
    <span class="sep">—</span>
    <span>TypeScript</span><span class="sep">·</span>
    <span>Go</span><span class="sep">·</span>
    <span>React</span>
  </div>
</div>

<style>
.hero {
  padding: 52px 0 40px;
  border-bottom: 1px solid var(--border-mid);
  position: relative; overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,.7) 0%, transparent 100%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,.7) 0%, transparent 100%);
  pointer-events: none;
}
.hero-eye {
  font-size: 10px; font-weight: 800;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
  position: relative;
}
.hero-eye::after { content: ''; flex: 1; height: 1px; background: var(--border-mid); }
.hero-name {
  font-size: clamp(58px, 13vw, 88px);
  font-weight: 900; line-height: 0.92; letter-spacing: -4px;
  color: var(--text); margin-bottom: 24px; position: relative;
}
.hero-name .last {
  border-bottom: 4px solid var(--text);
  display: inline-block; padding-bottom: 4px;
}
.hero-tag {
  font-size: 17px; font-weight: 600; line-height: 1.55;
  color: var(--text-sub); max-width: 440px; margin-bottom: 28px;
  position: relative;
}
.hero-tag :global(strong) { color: var(--text); font-weight: 800; }
.cta-row {
  display: flex; gap: 10px; align-items: center;
  margin-bottom: 24px; flex-wrap: wrap; position: relative;
}
.btn-p {
  font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  background: var(--text); color: var(--bg);
  border: var(--brut-border); border-radius: 3px;
  padding: 11px 24px; box-shadow: var(--brut-shadow);
  text-decoration: none; display: inline-block;
  transition: transform .1s, box-shadow .1s;
}
.btn-p:hover  { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--brut-fg); }
.btn-p:active { transform: translate(3px,3px); box-shadow: none; }
.btn-g {
  font-size: 11px; font-weight: 700; letter-spacing: .5px;
  color: var(--text-sub); text-decoration: none;
  padding: 11px 6px;
  border-bottom: 1px solid var(--border-mid);
  transition: color .12s, border-color .12s;
}
.btn-g:hover { color: var(--text); border-color: var(--border-strong); }
.hero-meta {
  font-size: 11px; font-weight: 700; color: var(--text-muted);
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  position: relative;
}
.sdot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); display: inline-block; }
.avail { color: var(--green); }
.sep { color: var(--border-mid); }
</style>
```

- [ ] **Step 2: Verify hero renders correctly**

```bash
npm run dev
```

Open http://localhost:4321 — hero name should be 88px, "Rapi." has underline, grid lines fade in hero.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: rewrite Hero component to v5 design"
```

---

## Task 5: i18n Strings

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/id.json`
- Modify: `src/lib/i18n.ts` (or create if missing)

- [ ] **Step 1: Check existing i18n helper**

```bash
ls src/lib/ 2>/dev/null || ls src/i18n/
```

- [ ] **Step 2: Create/update src/lib/i18n.ts**

```typescript
import en from '../i18n/en.json';
import id from '../i18n/id.json';

export type Locale = 'en' | 'id';

export function getI18n(locale: Locale) {
  return locale === 'id' ? id : en;
}
```

- [ ] **Step 3: Rewrite src/i18n/en.json**

```json
{
  "hero": {
    "eyebrow": "Software Engineer",
    "tagline": "Building <strong>reliable systems</strong> and clean interfaces. Currently at <strong>Jersium</strong> · Jakarta.",
    "cta_work": "View Work",
    "cta_cv": "Download CV",
    "available": "Available"
  },
  "sections": {
    "work": "Selected Work",
    "experience": "Experience",
    "stack": "Stack",
    "about": "About",
    "writing": "Writing",
    "contact": "Contact"
  },
  "projects": {
    "featured": "Featured Project",
    "view": "↗",
    "more": "More"
  },
  "contact": {
    "or": "Or send a message",
    "name": "Name",
    "email": "Email",
    "subject": "Subject",
    "message": "Your message...",
    "send": "Send Message"
  },
  "footer": {
    "copy": "Muhammad Rapi",
    "built": "Astro · Jakarta"
  }
}
```

- [ ] **Step 4: Rewrite src/i18n/id.json**

```json
{
  "hero": {
    "eyebrow": "Software Engineer",
    "tagline": "Membangun <strong>sistem yang andal</strong> dan antarmuka yang bersih. Saat ini di <strong>Jersium</strong> · Jakarta.",
    "cta_work": "Lihat Proyek",
    "cta_cv": "Unduh CV",
    "available": "Tersedia"
  },
  "sections": {
    "work": "Karya Pilihan",
    "experience": "Pengalaman",
    "stack": "Stack",
    "about": "Tentang",
    "writing": "Tulisan",
    "contact": "Kontak"
  },
  "projects": {
    "featured": "Proyek Unggulan",
    "view": "↗",
    "more": "Lainnya"
  },
  "contact": {
    "or": "Atau kirim pesan",
    "name": "Nama",
    "email": "Email",
    "subject": "Subjek",
    "message": "Pesanmu...",
    "send": "Kirim Pesan"
  },
  "footer": {
    "copy": "Muhammad Rapi",
    "built": "Astro · Jakarta"
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n/en.json src/i18n/id.json src/lib/i18n.ts
git commit -m "feat: rewrite i18n strings for v5 design (EN + ID)"
```

---

## Task 6: Projects Section

**Files:**
- Modify: `src/components/ProjectsGrid.astro`
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Rewrite ProjectsGrid.astro**

```astro
---
import { getCollection } from 'astro:content';
import SectionCard from './SectionCard.astro';
import { getI18n } from '../lib/i18n';

interface Props { locale: 'en' | 'id'; }
const { locale } = Astro.props;
const t = getI18n(locale);

const allProjects = await getCollection('projects', ({ id }) => id.endsWith(`.${locale}.md`));
const sorted = allProjects.sort((a, b) => a.data.order - b.data.order);
const featured = sorted.find(p => p.data.featured);
const rest = sorted.filter(p => !p.data.featured).slice(0, 3);
---

<SectionCard title={t.sections.work} count={`${sorted.length.toString().padStart(2,'0')} Projects`} id="projects">
  {featured && (
    <div class="proj-feat">
      <div class="feat-badge">{t.projects.featured}</div>
      <a href={featured.data.liveUrl ?? featured.data.repoUrl ?? '#'} class="feat-link" target="_blank" rel="noopener">
        {t.projects.view}
      </a>
      <div class="feat-title">{featured.data.title}</div>
      <div class="feat-desc">{featured.data.description}</div>
      <div class="feat-stack">{featured.data.tags.join(' · ')}</div>
    </div>
  )}
  <div class="mini-grid">
    {rest.map(p => (
      <a href={p.data.liveUrl ?? p.data.repoUrl ?? '#'} class="mini-card" target="_blank" rel="noopener">
        <div class="mini-t">{p.data.title} ↗</div>
        <div class="mini-d">{p.data.tags.slice(0,2).join(' · ')}</div>
      </a>
    ))}
    <a href="https://github.com" class="mini-card faded" target="_blank" rel="noopener">
      <div class="mini-t">GitHub ↗</div>
      <div class="mini-d">{t.projects.more}</div>
    </a>
  </div>
</SectionCard>

<style>
.proj-feat {
  border: var(--brut-border); border-radius: 6px;
  padding: 20px; background: var(--bg-card);
  box-shadow: var(--brut-shadow); position: relative;
  margin-bottom: 10px; overflow: hidden;
  transition: transform .12s, box-shadow .12s;
}
.proj-feat::after {
  content: ''; position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
  background-size: 24px 24px; pointer-events: none;
}
:global(.light) .proj-feat::after {
  background-image:
    linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
}
.proj-feat:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--brut-fg); }
.feat-badge { font-size: 8px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }
.feat-title { font-size: 20px; font-weight: 800; letter-spacing: -.5px; color: var(--text); margin-bottom: 8px; }
.feat-desc { font-size: 15px; font-weight: 600; line-height: 1.6; color: var(--text-sub); margin-bottom: 14px; }
.feat-stack { font-size: 9px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); }
.feat-link {
  position: absolute; top: 18px; right: 18px;
  font-size: 11px; font-weight: 800;
  border: 1px solid var(--border-mid); border-radius: 3px;
  padding: 4px 9px; color: var(--text-muted);
  text-decoration: none; transition: all .12s;
}
.feat-link:hover { color: var(--text); border-color: var(--border-strong); }
.mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.mini-card {
  border: 1px solid var(--border); border-radius: 4px;
  padding: 14px; background: var(--bg);
  text-decoration: none;
  transition: border-color .12s, background .12s;
}
.mini-card:hover { border-color: var(--border-mid); background: var(--bg-surface); }
.mini-card.faded { opacity: .35; pointer-events: none; }
.mini-t { font-size: 14px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
.mini-d { font-size: 12px; font-weight: 600; color: var(--text-muted); }
</style>
```

- [ ] **Step 2: Mark one project as featured in content**

Edit `src/content/projects/project-alpha.en.md` frontmatter — add `featured: true` and `order: 1`.

- [ ] **Step 3: Verify projects render**

```bash
npm run dev
```

Open http://localhost:4321 — "Selected Work" card should show featured project + 3 mini cards.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsGrid.astro src/components/ProjectCard.astro src/content/projects/
git commit -m "feat: rewrite ProjectsGrid with featured+mini layout"
```

---

## Task 7: Experience Section

**Files:**
- Modify: `src/components/Timeline.astro`
- Modify: `src/content/experience.json`

- [ ] **Step 1: Update experience.json schema**

```json
[
  {
    "company": "Jersium",
    "role": "Software Engineer",
    "period": "2023 — Now",
    "note": "Core SaaS infrastructure — billing engine, multi-outlet inventory, POS."
  },
  {
    "company": "Previous Company",
    "role": "Software Developer",
    "period": "2021 — 2023",
    "note": ""
  }
]
```

- [ ] **Step 2: Rewrite Timeline.astro**

```astro
---
import SectionCard from './SectionCard.astro';
import { getI18n } from '../lib/i18n';
import experience from '../content/experience.json';

interface Props { locale: 'en' | 'id'; }
const { locale } = Astro.props;
const t = getI18n(locale);
---

<SectionCard
  title={t.sections.experience}
  count={`${experience.length.toString().padStart(2,'0')} Roles`}
  id="experience"
>
  {experience.map((item, i) => (
    <div class:list={['exp-item', { last: i === experience.length - 1 }]}>
      <div class="exp-period" set:html={item.period.replace('—', '—<br/>')} />
      <div>
        <div class="exp-co">{item.company}</div>
        <div class="exp-role">{item.role}</div>
        {item.note && <div class="exp-note">{item.note}</div>}
      </div>
    </div>
  ))}
</SectionCard>

<style>
.exp-item {
  display: grid; grid-template-columns: 80px 1fr;
  gap: 16px; padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.exp-item.last { border-bottom: none; }
.exp-period { font-size: 10px; font-weight: 700; color: var(--text-muted); letter-spacing: .5px; line-height: 1.6; padding-top: 2px; }
.exp-co { font-size: 16px; font-weight: 900; letter-spacing: -.3px; color: var(--text); }
.exp-role { font-size: 13px; font-weight: 700; color: var(--text-sub); margin-top: 3px; }
.exp-note { font-size: 13px; font-weight: 600; color: var(--text-muted); margin-top: 6px; line-height: 1.55; }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Timeline.astro src/content/experience.json
git commit -m "feat: rewrite Experience/Timeline with new card layout"
```

---

## Task 8: Stack Section with Devicons

**Files:**
- Modify: `src/components/Skills.astro`

- [ ] **Step 1: Rewrite Skills.astro**

```astro
---
import SectionCard from './SectionCard.astro';
import { getI18n } from '../lib/i18n';

interface Props { locale: 'en' | 'id'; }
const { locale } = Astro.props;
const t = getI18n(locale);

const stack = [
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'Go',         icon: 'devicon-go-original-wordmark' },
  { name: 'React',      icon: 'devicon-react-original' },
  { name: 'Next.js',    icon: 'devicon-nextjs-plain' },
  { name: 'Astro',      icon: 'devicon-astro-plain' },
  { name: 'Node.js',    icon: 'devicon-nodejs-plain' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  { name: 'Redis',      icon: 'devicon-redis-plain' },
  { name: 'Docker',     icon: 'devicon-docker-plain' },
  { name: 'Kotlin',     icon: 'devicon-kotlin-plain' },
  { name: 'Android',    icon: 'devicon-android-plain' },
  { name: 'Linux',      icon: 'devicon-linux-plain' },
];
---

<SectionCard title={t.sections.stack} id="stack">
  <div class="chips">
    {stack.map(s => (
      <span class="chip">
        <i class={s.icon}></i>
        {s.name}
      </span>
    ))}
  </div>
</SectionCard>

<style>
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  display: flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
  border: 1px solid var(--border-mid); border-radius: 4px;
  padding: 7px 13px; color: var(--text-sub); background: var(--bg-card);
  transition: border-color .12s, color .12s;
}
.chip:hover { border-color: var(--border-strong); color: var(--text); }
.chip i { font-size: 15px; color: var(--text-sub); transition: color .12s; }
.chip:hover i { color: var(--text); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Skills.astro
git commit -m "feat: rewrite Stack section with devicons"
```

---

## Task 9: About Section

**Files:**
- Modify: `src/components/About.astro`

- [ ] **Step 1: Rewrite About.astro**

```astro
---
import SectionCard from './SectionCard.astro';
import { getI18n } from '../lib/i18n';
import { getCollection } from 'astro:content';

interface Props { locale: 'en' | 'id'; }
const { locale } = Astro.props;
const t = getI18n(locale);

const abouts = await getCollection('about', ({ id }) => id.includes(locale));
const about = abouts[0];
---

<SectionCard title={t.sections.about} id="about">
  {about?.body
    ? <div class="about-body" set:html={about.rendered?.html} />
    : (
      <div class="about-body">
        <p>Software engineer based in <strong>Jakarta</strong>, focused on building reliable backend systems and clean frontend experiences. I care about code that ships and systems that last.</p>
        <p>When not coding, I write about engineering decisions and product thinking — things I wish someone had told me earlier.</p>
      </div>
    )
  }
</SectionCard>

<style>
.about-body { display: flex; flex-direction: column; gap: 14px; }
.about-body :global(p), .about-body p {
  font-size: 16px; font-weight: 600; line-height: 1.72; color: var(--text-sub);
}
.about-body :global(strong), .about-body strong { color: var(--text); font-weight: 800; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: rewrite About section"
```

---

## Task 10: Blog Content + WritingList

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/blog/post-1.en.md`
- Create: `src/content/blog/post-1.id.md`
- Create: `src/components/WritingList.astro`

- [ ] **Step 1: Add blog collection to content.config.ts**

Add to the existing collections in `src/content.config.ts`:

```typescript
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),          // "May 2026"
    slug: z.string(),
    published: z.boolean().default(true),
  }),
});
```

And add `blog: blogCollection` to the `export const collections` object.

- [ ] **Step 2: Create sample blog post**

`src/content/blog/post-1.en.md`:
```markdown
---
title: "Why I chose Go for our billing engine"
date: "May 2026"
slug: "go-billing-engine"
published: true
---

Content here.
```

`src/content/blog/post-1.id.md`:
```markdown
---
title: "Kenapa aku pilih Go untuk billing engine"
date: "Mei 2026"
slug: "go-billing-engine"
published: true
---

Konten di sini.
```

- [ ] **Step 3: Create WritingList.astro**

```astro
---
import { getCollection } from 'astro:content';
import SectionCard from './SectionCard.astro';
import { getI18n } from '../lib/i18n';

interface Props { locale: 'en' | 'id'; }
const { locale } = Astro.props;
const t = getI18n(locale);

const posts = await getCollection('blog', ({ id }) =>
  id.endsWith(`.${locale}.md`) && true
);
const sorted = posts.sort((a, b) => b.data.date.localeCompare(a.data.date));
---

<SectionCard
  title={t.sections.writing}
  count={`${sorted.length.toString().padStart(2,'0')} Posts`}
  id="blog"
>
  {sorted.map(post => (
    <a href={`/blog/${post.data.slug}`} class="blog-item">
      <span class="blog-title">{post.data.title}</span>
      <span class="blog-date">{post.data.date}</span>
    </a>
  ))}
</SectionCard>

<style>
.blog-item {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 13px 0; border-bottom: 1px solid var(--border);
  text-decoration: none;
  transition: padding-left .15s;
}
.blog-item:last-child { border-bottom: none; }
.blog-item:hover { padding-left: 6px; }
.blog-title { font-size: 15px; font-weight: 700; color: var(--text); }
.blog-date { font-size: 10px; font-weight: 700; color: var(--text-muted); letter-spacing: .5px; margin-left: 16px; white-space: nowrap; }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/blog/ src/components/WritingList.astro
git commit -m "feat: add blog collection and WritingList component"
```

---

## Task 11: Contact Section with Form

**Files:**
- Modify: `src/components/Contact.astro`

- [ ] **Step 1: Rewrite Contact.astro**

```astro
---
import SectionCard from './SectionCard.astro';
import { getI18n } from '../lib/i18n';

interface Props { locale: 'en' | 'id'; }
const { locale } = Astro.props;
const t = getI18n(locale);
---

<SectionCard title={t.sections.contact} id="contact">
  <div class="contact-links">
    <a href="mailto:hello@muhammadrap.dev" class="c-btn">
      <i class="fa-solid fa-envelope"></i> Email
    </a>
    <a href="https://github.com/muhammadrap" target="_blank" rel="noopener" class="c-btn">
      <i class="fa-brands fa-github"></i> GitHub
    </a>
    <a href="https://linkedin.com/in/muhammadrap" target="_blank" rel="noopener" class="c-btn">
      <i class="fa-brands fa-linkedin"></i> LinkedIn
    </a>
  </div>

  <div class="divider-label">
    <span>{t.contact.or}</span>
  </div>

  <form class="email-form" name="contact" method="POST" data-netlify="true">
    <div class="form-row">
      <input class="form-input" type="text" name="name" placeholder={t.contact.name} required />
      <input class="form-input" type="email" name="email" placeholder={t.contact.email} required />
    </div>
    <input class="form-input" type="text" name="subject" placeholder={t.contact.subject} required />
    <textarea class="form-input" name="message" placeholder={t.contact.message} rows="4" required></textarea>
    <button type="submit" class="form-submit">
      <i class="fa-solid fa-paper-plane"></i> {t.contact.send}
    </button>
  </form>
</SectionCard>

<style>
.contact-links { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
.c-btn {
  font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
  border: var(--brut-border); border-radius: 3px;
  padding: 10px 16px; color: var(--text); background: var(--bg);
  box-shadow: var(--brut-shadow); text-decoration: none;
  display: flex; align-items: center; gap: 8px;
  transition: transform .1s, box-shadow .1s;
}
.c-btn i { font-size: 13px; }
.c-btn:hover  { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--brut-fg); }
.c-btn:active { transform: translate(3px,3px); box-shadow: none; }
.divider-label {
  font-size: 9px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 16px;
  display: flex; align-items: center; gap: 10px;
}
.divider-label::before, .divider-label::after {
  content: ''; flex: 1; height: 1px; background: var(--border-mid);
}
.email-form { display: flex; flex-direction: column; gap: 10px; }
.form-row { display: flex; gap: 10px; }
.form-input {
  font-family: 'Poppins', sans-serif;
  font-size: 13px; font-weight: 600;
  background: var(--bg); color: var(--text);
  border: 1px solid var(--border-mid); border-radius: 3px;
  padding: 10px 14px; width: 100%; outline: none;
  transition: border-color .12s;
}
.form-input::placeholder { color: var(--text-muted); }
.form-input:focus { border-color: var(--border-strong); }
textarea.form-input { resize: none; }
.form-submit {
  font-family: 'Poppins', sans-serif;
  font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  background: var(--text); color: var(--bg);
  border: var(--brut-border); border-radius: 3px;
  padding: 11px 24px; box-shadow: var(--brut-shadow); cursor: pointer;
  display: flex; align-items: center; gap: 8px; align-self: flex-start;
  transition: transform .1s, box-shadow .1s;
}
.form-submit:hover  { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--brut-fg); }
.form-submit:active { transform: translate(3px,3px); box-shadow: none; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: rewrite Contact section with social links + email form"
```

---

## Task 12: Wire Pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/id/index.astro`

- [ ] **Step 1: Rewrite src/pages/index.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import ProjectsGrid from '../components/ProjectsGrid.astro';
import Timeline from '../components/Timeline.astro';
import Skills from '../components/Skills.astro';
import About from '../components/About.astro';
import WritingList from '../components/WritingList.astro';
import Contact from '../components/Contact.astro';

const locale = 'en';
---

<Base locale={locale} title="Muhammad Rapi — Software Engineer">
  <div class="wrap">
    <Hero locale={locale} />
    <ProjectsGrid locale={locale} />
    <Timeline locale={locale} />
    <Skills locale={locale} />
    <About locale={locale} />
    <WritingList locale={locale} />
    <Contact locale={locale} />
  </div>
</Base>
```

- [ ] **Step 2: Rewrite src/pages/id/index.astro**

Same as above but `const locale = 'id'` and title `"Muhammad Rapi — Software Engineer"`.

- [ ] **Step 3: Remove TechStack import from both pages (now merged into Skills)**

```bash
rm src/components/TechStack.astro 2>/dev/null || true
```

- [ ] **Step 4: Full build check**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/id/index.astro
git rm src/components/TechStack.astro 2>/dev/null || true
git commit -m "feat: wire all sections into index pages, remove TechStack"
```

---

## Task 13: Motion One Animations

**Files:**
- Modify: `src/layouts/Base.astro` (add Motion One script)
- Modify: `src/components/Hero.astro` (add entrance animation)

- [ ] **Step 1: Install Motion One**

```bash
npm install motion
```

- [ ] **Step 2: Add hero entrance animation to Hero.astro**

Add at the bottom of `src/components/Hero.astro`:

```astro
<script>
import { animate, stagger } from 'motion';

animate(
  '.hero > *',
  { opacity: [0, 1], y: [18, 0] },
  { duration: 0.55, delay: stagger(0.1), easing: 'ease-out' }
);
</script>
```

- [ ] **Step 3: Add scroll reveal in Base.astro**

Add inside the existing `<script>` block in `Base.astro`:

```typescript
import { inView, animate } from 'motion';

inView('.sec-card', (el) => {
  animate(
    el,
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.5, easing: 'ease-out' }
  );
}, { amount: 0.15 });
```

- [ ] **Step 4: Remove the old CSS `.reveal` IntersectionObserver fallback** from `Base.astro` `<script>` (the vanilla JS one from Task 2 Step 3 — keep only Motion One version).

- [ ] **Step 5: Verify animations work**

```bash
npm run dev
```

Open http://localhost:4321 — hero elements should stagger in on load. Scroll down — each section card should fade+slide up as it enters view.

- [ ] **Step 6: Add `prefers-reduced-motion` guard**

In `src/styles/global.css`, add:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .sec-card { opacity: 1 !important; transform: none !important; transition: none !important; }
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/Hero.astro src/layouts/Base.astro src/styles/global.css package.json package-lock.json
git commit -m "feat: add Motion One hero entrance + scroll reveal animations"
```

---

## Task 14: Final QA + Build

- [ ] **Step 1: Run full build**

```bash
npm run build && npm run preview
```

Expected: `dist/` generated, preview server starts at http://localhost:4321.

- [ ] **Step 2: Check EN/ID toggle**

Open http://localhost:4321 — click EN/ID in top bar. Page should switch to `/id` with Indonesian copy.

- [ ] **Step 3: Check dark/light toggle**

Click `◐` in top bar — body should gain `.light` class, palette switches to warm off-white.

- [ ] **Step 4: Check tab bar active state**

Scroll through sections — active tab should update as sections enter view.

- [ ] **Step 5: Check contact form fields**

All 4 inputs + textarea + submit button should render with correct placeholder text per locale.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: portfolio v5 redesign complete"
```
