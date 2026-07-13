# MADHU//OS
### Cinematic Web Observatory & Interactive Stage

[![MIT License](https://img.shields.io/badge/License-MIT-00ffff.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.10-black.svg)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r185-lightgrey.svg)](https://threejs.org)

MADHU//OS is a handcrafted, immersive 3D web experience that functions as an interactive observatory of a founder's journey. Abandoning traditional 2D cards, grids, and resume layouts, it translates software projects and telemetry into dynamic, reactive architectural monuments floating in a reflective spatial gallery.

---

## 🌌 Storytelling Philosophy
Built on the premise of **"discover, do not navigate,"** visitors do not click generic buttons. Instead, approaching an engineering monument causes it to awaken—triggering localized spot lighting, opening frosted glass materials, spinning metallic cores, and streaming commit particles from repository satellites. 

As the journey completes, the camera rises above the columns into a wide sky, revealing the **Crystalline Archive** (defining life chapters: Education, Core Skills, Hackathons, Leadership) and the **Architectural Portal** (contact coordinates and canonical resume).

---

## 🛠️ Technology Stack
*   **Core Framework:** Next.js 16.2 (App Router) & React 19.2
*   **3D Rendering:** Three.js (r185), React Three Fiber (R3F), and `@react-three/drei`
*   **Motion & Easing:** GSAP (GreenSock) & Lenis smooth scroll
*   **State Management:** Zustand
*   **Audio Synthesis:** Web Audio API (real-time lowpass LFOs and ambient sine oscillators)
*   **Styling:** Vanilla CSS (custom variables and layout grids)

---

## 🏛️ Featured Monuments & Projects

### 1. Monument 01: CampusConnect (`THE GRID`)
*   **Concept:** Represents opportunity.
*   **Visuals:** An organic network of student and opportunity node splines floating inside a high-transmission frosted glass prism.
*   **Narrative:** *"Talent is distributed evenly, but access to opportunity is not."*

### 2. Monument 02: Railway Traffic Optimizer (`THE REACTOR`)
*   **Concept:** Smart India Hackathon 2025 Grand Finale Runner-Up.
*   **Visuals:** Spinning titanium rings representing autonomous spatial deadlock resolution, intersecting spline tracks, and synchronized flashing green/cyan signals.
*   **Narrative:** *"Real-world constraints are not barriers; they are the parameters that define the solution."*

### 3. Monument 03: JobNest (`THE SCAFFOLD`)
*   **Concept:** Proximity-based local job/gig matching platform.
*   **Visuals:** An unfinished concrete and wireframe scaffolding cage surrounded by flying construction drones and assembling modules.
*   **Narrative:** *"Software is never finished; it is a living organism in continuous assembly."*

### 4. Monument 04: MADHU//OS (`THE SHRINE`)
*   **Concept:** Handcrafted cinematic operating system environment.
*   **Visuals:** Symmetrical basalt columns, light pillars, and a floating mirror-like titanium core reflecting environment light.
*   **Narrative:** *"Beautiful code is not a vanity metric; it creates a direct emotional bond with the user."*

---

## 📂 Directory Structure
```
portfolio/
├── public/                 # Static assets, sitemaps, and manifest.json
└── src/
    ├── app/                # Next.js page layouts, styles, and API routes
    │   ├── api/github      # GraphQL Edge cache endpoint
    │   ├── globals.css     # Global reset and typography styles
    │   ├── layout.tsx      # Head metadata, OG cards, and JSON-LD profile script
    │   └── not-found.tsx   # Handcrafted Client 404 Telemetry console
    ├── components/
    │   ├── canvas/         # WebGL components (Scene, Atmosphere, Materials)
    │   │   └── Stage/      # 3D Monuments and Satellite Systems
    │   └── dom/            # Narrative overlays, Navigation HUD, and AccessibilityHelper
    ├── hooks/              # Audio synthesis controllers and scroll progress hooks
    └── state/              # Zustand global store variables
```

---

## 🚀 Installation & Running

### Prerequisites
*   Node.js (v18.x or higher)
*   npm or pnpm

### Local Development Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Madhu-0205/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run dev server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view in the browser.

### Environment Configuration
To enable live GitHub telemetry streaming on the satellites, create a `.env.local` file at the root:
```env
GITHUB_TOKEN=your_personal_access_token
GITHUB_USERNAME=Madhu-0205
```
*If no token is provided, the system gracefully falls back to structured local JSON data, preventing runtime breaks.*

---

## ⚡ Optimizations & Accessibility
*   **Performance:** Frame loop pacing uses Three.js delta calculations, maintaining consistent animation speeds across standard $60\text{Hz}$ and high-refresh $120\text{Hz}$ displays.
*   **Accessibility:** Integrates a visually hidden keyboard navigation menu linked to landmarks. Focusing on a link activates a visual **Telemetry HUD** showing stats and snaps the camera to the focused monument.
*   **Reduced Motion:** Detects `prefers-reduced-motion` at initialization and dampens WebGL rotations, orbit speeds, and oscillator frequencies to $5\%$ of normal values.

---

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author Information
*   **Author:** Madhu Valurouthu
*   **GitHub:** [@Madhu-0205](https://github.com/Madhu-0205)
*   **LinkedIn:** [Madhu Valurouthu](https://linkedin.com/in/madhu-valurouthu)
*   **Email:** [madhu.valurouthu@gmail.com](mailto:madhu.valurouthu@gmail.com)
