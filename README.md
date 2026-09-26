# MADHU//OS
### The Engineering Logbook of Madhu Valurouthu

[![MIT License](https://img.shields.io/badge/License-MIT-00ffff.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.10-black.svg)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r185-lightgrey.svg)](https://threejs.org)

MADHU//OS is a handcrafted, immersive 3D web experience — a cinematic engineering
logbook. Instead of static cards and resume layouts, projects are presented as
reactive monuments floating in a reflective spatial gallery, narrated by a
scroll-driven story.

The first viewport is a **server-rendered hero** (name, positioning, and calls to
action) so the site communicates instantly — with or before JavaScript. Scrolling
hands off to the interactive 3D narrative: a scroll-progress value from `0 → 1`
drives camera choreography, lighting, monuments, and typography in sync.

> **Design system:** warm near-black canvas (`#050507`), off-white typography,
> a single cyan signal accent, and three typefaces — Space Grotesk (display),
> Fraunces (editorial serif), Geist Mono (telemetry/labels).

---

## 🌌 Storytelling Philosophy

Built on the premise of **"discover, do not navigate."** Approaching an
engineering monument causes it to awaken — localized spot lighting, frosted glass
materials, spinning metallic cores, and commit particles streaming from repository
satellites. As the journey completes, the camera rises above the columns to reveal
the **Crystalline Archive** (principles and chapters) and the **Architectural
Portal** (contact coordinates).

Key structural pieces:

*   **StaticHero (`src/app/page.tsx`)** — server-rendered first viewport; sticky
    within the boot chapter so the scroll→progress mapping is unchanged.
*   **NarrativeOverlay** — scroll-progress-keyed typographic acts over the canvas.
*   **Camera choreography (`src/components/canvas/Camera.tsx`)** — 6-keyframe
    trajectory blended against scroll progress with mouse parallax.
*   **Repository satellites** — live GitHub data wakes them: size → scale,
    language → color, commits/energy → particle urgency.

---

## 🛠️ Technology Stack

*   **Core Framework:** Next.js 16.2 (App Router, Turbopack) & React 19.2
*   **3D Rendering:** Three.js (r185), React Three Fiber, `@react-three/drei`
*   **Post-processing:** `@react-three/postprocessing` (Bloom, Vignette, film grain)
*   **Motion & Easing:** GSAP & Lenis smooth scroll
*   **State Management:** Zustand (single `scrollProgress` store drives everything)
*   **Audio Synthesis:** Web Audio API (ambient drones, opt-in)
*   **Fonts:** `next/font` self-hosting — Space Grotesk, Fraunces, Geist Mono
*   **Styling:** Vanilla CSS design tokens (`src/styles/variables.css`)

---

## 🏛️ Featured Monuments & Projects

| Monument | Project | Concept |
| --- | --- | --- |
| `THE GRID` | **CampusConnect** | Collegiate opportunity graph unifying hackathons, gigs, and peers |
| `THE REACTOR` | **Railway Traffic Optimizer** | Smart India Hackathon 2025 Grand Finale Runner-Up — A* deadlock decision support |
| `THE SCAFFOLD` | **JobNest** | Hyperlocal gig matching with PostGIS proximity queries (foundation of CampusConnect) |
| `THE SHRINE` | **MADHU//OS** | This site — the portfolio as a product case study |

Every case study is reachable via the **command menu (⌘K / Ctrl+K)** and each
monument's HUD. Metrics shown in the 3D scene come from the live GitHub API when
a token is configured; **no stats are invented** — unknown values render as
neutral placeholders.

---

## 📂 Directory Structure

```
portfolio/
├── public/                 # Static assets, manifest.json, robots.txt
└── src/
    ├── app/
    │   ├── api/github/     # GraphQL endpoint w/ 1h cache + neutral fallback
    │   ├── globals.css     # Reset, utilities, motion-reduction, focus styles
    │   ├── layout.tsx      # Metadata, fonts (next/font), JSON-LD profile
    │   ├── opengraph-image.tsx  # Dynamically generated 1200×630 social card
    │   ├── page.tsx        # StaticHero + HUD + scroll chapters
    │   └── not-found.tsx   # Handcrafted 404 telemetry console
    ├── components/
    │   ├── canvas/         # WebGL: Scene, Camera choreography, Atmosphere
    │   │   └── Stage/      # 3D monuments + repository satellites
    │   └── dom/            # Narrative overlay, Navigation, CmdMenu (⌘K),
    │                       # CaseStudyDrawer, HQLedger, AccessibilityHelper
    ├── hooks/              # useGitHubData (deduped fetch), useAmbientAudio
    ├── state/              # Zustand store (scrollProgress is the single source of truth)
    └── styles/             # variables.css — design tokens
```

---

## 🚀 Installation & Running

### Prerequisites
*   Node.js **18.18+** (Next.js 16 requirement; tested on Node 22)
*   npm

### Local Development

```bash
# 1. Clone
git clone https://github.com/Madhu-0205/portfolio.git
cd portfolio

# 2. Install
npm install

# 3. Develop (http://localhost:3000)
npm run dev

# 4. Production
npm run build
npm start
```

### Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build (also runs TypeScript checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |

### Environment Configuration

Optional — enables live GitHub telemetry on the repository satellites.
Create `.env.local` at the root:

```env
# GitHub Personal Access Token (classic, no scopes needed for public repos)
GITHUB_TOKEN=your_personal_access_token
GITHUB_USERNAME=Madhu-0205
```

**Without a token the site still works**: `/api/github` returns neutral profile
data (no fabricated stars/forks/commits) and satellites render placeholder HUDs
until real data is available. `UNKNOWN ≠ ZERO` is a deliberate product rule —
missing data is never displayed as `0`.

> ⚠️ Keep `GITHUB_TOKEN` server-side only. It is read exclusively in
> `src/app/api/github/route.ts` and never shipped to the browser.

---

## ⚡ Performance & Accessibility

*   **First view:** server-rendered hero — identity is visible with zero JS and
    zero scrolling; the canvas initializes asynchronously after it.
*   **No runtime CDN dependencies:** fonts are self-hosted via `next/font`; the
    environment lighting uses `<Lightformer>` elements instead of a remote HDR.
*   **Deduped network:** GitHub data is fetched once per session (lazy, after
    first scroll) and shared by every consumer via the Zustand store.
*   **Frame pacing:** animation speeds derive from Three.js delta time, so motion
    is consistent at 60 Hz and 120 Hz.
*   **Keyboard access:** a visually-hidden navigation menu lists every chapter;
    focusing an item snaps the camera and opens a telemetry HUD.
*   **Focus visibility:** global `:focus-visible` outlines; selection colors.
*   **Reduced motion:** CSS `prefers-reduced-motion` kills animations globally;
    in-canvas, `matchMedia` checks dampen rotation and particle speeds to ~5%.
*   **Command menu:** ⌘K / Ctrl+K opens a searchable palette (navigation, case
    studies, logbook, audio) with full arrow-key + Escape handling.

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

*   **Madhu Valurouthu** — Creative Developer · AI Product Builder · Data Science Student
*   **GitHub:** [@Madhu-0205](https://github.com/Madhu-0205)
*   **LinkedIn:** [Madhu Valurouthu](https://linkedin.com/in/madhu-valurouthu)
*   **Email:** [madhu.valurouthu@gmail.com](mailto:madhu.valurouthu@gmail.com)
