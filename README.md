# Portfolio — Astro + Tina CMS

Personal portfolio website. Fast, beautiful, and dead simple to update via Tina CMS.

**Stack:** Astro 6 · Tailwind CSS 4 · Tina CMS v3 · TypeScript

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env

# 3. Start development server
npm run dev
```

Visit `http://localhost:4321`

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg          ← Your initials logo
│   ├── og-image.svg         ← Social share image (update with your name)
│   └── robots.txt
├── src/
│   ├── components/          ← All UI components
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── ProjectCard.astro
│   │   ├── ProjectsGrid.astro
│   │   ├── Skills.astro
│   │   ├── Timeline.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── SEO.astro
│   ├── content/
│   │   ├── projects/        ← Project case studies (EN + ID)
│   │   ├── about/           ← About page content
│   │   ├── skills.json      ← Skills data
│   │   └── experience.json  ← Work experience
│   ├── i18n/
│   │   ├── en.json          ← English strings
│   │   └── id.json          ← Indonesian strings
│   ├── layouts/
│   │   └── Base.astro       ← Root layout
│   ├── pages/
│   │   ├── index.astro      ← English homepage
│   │   ├── projects/[slug]  ← Project detail (EN)
│   │   ├── id/              ← Indonesian pages
│   │   └── admin/           ← CMS access page
│   └── styles/
│       └── global.css       ← Design tokens + animations
├── tina/
│   └── config.ts           ← Tina CMS schema definition
├── astro.config.mjs
├── tailwind.config.mjs
├── .env.example
└── SPEC.md                  ← Full design specification
```

---

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run tinacms` | Start Tina CMS local editor |
| `npm run tinacms:build` | Build Tina CMS admin UI |

---

## Customization Checklist

### Before Going Live

- [ ] Replace `Your Name` everywhere with your actual name
- [ ] Update `src/pages/index.astro` — hero name
- [ ] Update `src/pages/id/index.astro` — Indonesian hero name
- [ ] Update `src/components/Contact.astro` — email + social links
- [ ] Update `public/og-image.svg` — your name + title
- [ ] Update `public/favicon.svg` — your initials
- [ ] Update `astro.config.mjs` — `site:` URL
- [ ] Replace sample projects in `src/content/projects/`
- [ ] Update about content in `src/content/about/`
- [ ] Update skills in `src/content/skills.json`
- [ ] Update experience in `src/content/experience.json`
- [ ] Update i18n strings in `src/i18n/en.json` and `src/i18n/id.json`

---

## Tina CMS Setup

Tina CMS lets you edit content from the browser — no code required.

### 1. Create Tina Cloud Account

1. Go to [app.tina.io](https://app.tina.io) and sign up with GitHub
2. Click **"Create Project"**
3. Connect your GitHub repository
4. Copy the **Client ID** and **Token**

### 2. Add Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```env
TINA_CLIENT_ID=your_client_id_from_tina_cloud
TINA_TOKEN=your_token_from_tina_cloud
PUBLIC_SITE_URL=https://yourname.dev
```

### 3. Local CMS Preview

```bash
npm run tinacms
```

Then visit `http://localhost:9000/`. You'll see the Tina editor sidebar while developing.

### 4. Edit Content

In production, visit [app.tina.io](https://app.tina.io), select your project, and edit. Changes are committed directly to GitHub and trigger auto-deploy.

---

## Deployment to Vercel

### Option A: Vercel CLI (Recommended)

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts. Set environment variables in Vercel dashboard:
- `TINA_CLIENT_ID`
- `TINA_TOKEN`

### Option B: GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variables in Vercel settings
5. Deploy!

**Build Command:** `npm run build`
**Output Directory:** `dist`

---

## Adding Content

### Add a New Project

Create `src/content/projects/your-project.en.md`:

```markdown
---
title: "My New Project"
description: "A brief description of what you built."
year: 2025
tags: ["React", "TypeScript", "Next.js"]
featured: true
image: "https://images.unsplash.com/..."
liveUrl: "https://your-project.com"
repoUrl: "https://github.com/you/project"
order: 1
---

## The Challenge

Write your case study here in Markdown...

## The Solution

More content...
```

Duplicate with `.id.md` suffix for Indonesian version.

### Update About / Skills / Experience

Edit the JSON files directly:
- `src/content/about/about.en.md` — your bio
- `src/content/skills.json` — your skills list
- `src/content/experience.json` — your work history

---

## Multi-Language

The site supports **English** (`/`) and **Indonesian** (`/id/`).

- Content files: `.en.md` and `.id.md` suffixes
- UI strings: `src/i18n/en.json` and `src/i18n/id.json`
- Toggle: language switcher in navbar

---

## Performance

- **Lighthouse target:** 100/100/100/100
- **Zero JavaScript** on static pages (Astro islands only where needed)
- **Static HTML output** — maximum SEO and speed
- **Font preloading** — Syne + DM Sans with `display=swap`
- **Lazy-loaded images** with WebP conversion
- **Sitemap** auto-generated at `/sitemap-index.xml`

---

## Tech Details

| | |
|---|---|
| Framework | Astro 6 (static output) |
| CMS | Tina CMS v3 (Git-based) |
| Styling | Tailwind CSS 4 (via Vite plugin) |
| Language | TypeScript (strict) |
| Hosting | Vercel / Netlify (static) |
| Fonts | Syne + DM Sans + JetBrains Mono |
| Icons | Inline SVG (Lucide-style) |
