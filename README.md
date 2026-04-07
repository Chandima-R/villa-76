# Chandima Rathnayake — Premium Portfolio v2

Quixo-inspired cinematic portfolio built with **Next.js 15**, **Tailwind CSS v4**, **GSAP 3 + ScrollTrigger**, **Framer Motion 11**, and **Lenis** smooth scroll.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 (@tailwindcss/postcss) |
| Scroll Animation | GSAP 3 + ScrollTrigger |
| Micro-interactions | Framer Motion 11 |
| Smooth Scroll | Lenis 1.1 |
| Language | TypeScript 5 |

---

## Get Started

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build && npm start   # production
```

---

## Structure

```
portfolio-v2/
├── app/
│   ├── globals.css              # Full design system (tokens, typography, cursor, marquee…)
│   ├── layout.tsx               # Root layout + Google Fonts (Playfair Display, Plus Jakarta Sans)
│   ├── page.tsx                 # Home — assembles all sections
│   ├── not-found.tsx
│   └── work/[slug]/page.tsx     # Case study pages
├── components/
│   ├── Preloader.tsx            # Giant italic counter → clip-path wipe exit
│   ├── CustomCursor.tsx         # Dot + lagging ring, hover expand
│   ├── layout/
│   │   ├── Navbar.tsx           # Sticky nav, mobile overlay menu
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx             # Full-screen, 3-line massive headline, parallax
│       ├── Marquee.tsx          # Dual-row opposite-direction ticker
│       ├── Projects.tsx         # GSAP horizontal scroll pin, tilt cards
│       ├── About.tsx            # Clip-path portrait reveal, stat counters
│       ├── Process.tsx          # Scroll-driven step highlight (active/dim)
│       ├── Services.tsx         # Framer Motion accordion rows
│       ├── Testimonials.tsx     # Large quote carousel with slide transitions
│       └── Contact.tsx          # Giant email CTA + contact form
├── hooks/
│   └── useLenis.ts              # Lenis + GSAP ticker sync
└── lib/
    └── data.ts                  # Projects, services, testimonials, stats
```

---

## Design Language

- **Background** — `#080808` (near-pure black)
- **Typography** — Playfair Display italic for all display text; Plus Jakarta Sans for UI
- **Scale** — Headlines at `clamp(5.5rem, 13vw, 16rem)` — genuinely massive
- **Whitespace** — Sections breathe at `clamp(7rem, 12vw, 14rem)` top/bottom padding
- **Motion** — GSAP `power4.out` for text reveals; Lenis `duration:1.6` for scroll feel

---

## Customise

**Content** → Edit `lib/data.ts` for projects, services, testimonials and stats.

**Personal info** → Search/replace `chandimarathnayake` and `Chandima` sitewide.

**Real images** → In `Projects.tsx`, replace the gradient div inside `ProjectCard` with:
```tsx
import Image from "next/image";
<Image src={p.image} alt={p.title} fill className="object-cover" />
```

---

## Deploy

```bash
# Vercel (recommended)
npx vercel

# Or build and export
npm run build
```

---

© 2025 Chandima Rathnayake
