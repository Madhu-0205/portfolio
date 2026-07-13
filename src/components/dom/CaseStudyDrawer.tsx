"use client";

import React, { useState, useMemo } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { X, ExternalLink, Database, Code, Cpu, TrendingUp, Shield, FolderTree, Layout, ArrowRight } from "lucide-react";

interface CaseStudyData {
  title: string;
  subtitle: string;
  tag: string;
  recruiter: {
    problem: string;
    solution: string;
    impact: string;
    role: string;
    tech: string[];
    github: string;
    demo: string;
  };
  founder: {
    why: string;
    problemDetails: string;
    research: string;
    architectureFlow: string[];
    techChoice: string;
    tradeoffs: string;
    myContribution: string;
    lessons: string;
    schema: string;
    folder: string;
    api: string;
    perf: string;
    security: string;
  };
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  campusconnect: {
    title: "CampusConnect",
    subtitle: "Student Opportunity Graph",
    tag: "04 // SYSTEMS",
    recruiter: {
      problem: "Student opportunities (jobs, hackathons, groups) are scattered across dozens of channels, causing talented builders to miss key career milestones.",
      solution: "Consolidated internships, gigs, hackathons, and networks into a single graph database and skill recommendation engine.",
      impact: "Bridges campus networks to connect student ambition directly with resources and peer builders.",
      role: "Lead Systems Architect & Developer. Designed database schema, graph query pipelines, and frontend layouts.",
      tech: ["React.js", "TypeScript", "PostgreSQL", "GraphQL", "Next.js"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "Observed that while my peers had immense talent, they spent hours daily checking WhatsApp groups, LinkedIn, and bulletins just to find hackathons or projects.",
      problemDetails: "Information fragmentation is a high search-cost barrier. LinkedIn is designed for established professionals, and corporate boards ignore collegiate communities. This leaves student talent siloed.",
      research: "Polled 50+ students on campus. 90% checked 4+ channels daily for resources. Assumptions: consolidation would drive engagement. Iterated from a basic job directory to a peer builder network after realizing students prioritize building together.",
      architectureFlow: [
        "Student Profile Input (Skills, Interests) -> Graph Node Schema",
        "Opportunity Fetch (API/Scraper Gateways) -> Matching Classifier",
        "Skill-Match Matrix (Cosine Similarity on Vector Embeddings) -> Relevance Paths",
        "User Feed Assembly (Dynamic Client Render) -> Direct Application Pipeline"
      ],
      techChoice: "PostgreSQL for strongly-typed relational data, combined with JSON-LD metadata for graph recommendations. TypeScript ensures end-to-end type safety.",
      tradeoffs: "Opted for a relational DB with customized graph query views instead of a dedicated Neo4j instance to reduce deployment complexity in the MVP phase.",
      myContribution: "Architected the matching pipeline, PostgreSQL indexing strategies to minimize join latencies, and unified UI overlays.",
      lessons: "Consolidation is the first step, but personalization drives retention. Community features outperform generic listings.",
      schema: `CREATE TABLE student (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE,\n  skills TEXT[],\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE opportunity (\n  id UUID PRIMARY KEY,\n  title VARCHAR(255),\n  type VARCHAR(50), -- gig, hackathon, event\n  required_skills TEXT[]\n);\n\n-- Skill Match Vector Representation:\n-- Cosine Similarity formula:\n-- Similarity = (A • B) / (||A|| * ||B||)`,
      folder: `src/\n├── app/api/opportunity/     # Graph query endpoint\n├── components/dom/          # Frosted recommendation feeds\n└── state/                   # Opportunity matching store`,
      api: `GET /api/opportunity/recommend\nHeaders: Authorization: Bearer <token>\nQuery: ?limit=10\nResponse: { recommendations: [{ id, score, type }] }`,
      perf: "Implemented PostgreSQL composite indices on skills arrays and cached recommendations in-memory to keep response latencies under 45ms.",
      security: "Input sanitation on all search vectors to prevent SQL injection; JWT authentication for student account access.",
    }
  },
  "railway-ai": {
    title: "Railway AI Traffic Optimizer",
    subtitle: "Decision Support System",
    tag: "05 // ENGINEERING",
    recruiter: {
      problem: "High-density rail lines face complex scheduling bottlenecks. Human dispatchers struggle to predict cascading deadlocks in real-time.",
      solution: "A simulated spatial grid routing system applying A* search algorithm to predict conflict matrices and suggest routing options.",
      impact: "Smart India Hackathon 2025 Runner-Up. Proven to optimize throughput, strictly acting as an assistant while human controllers make final decisions.",
      role: "Core Algorithm Developer. Designed pathing algorithms, conflict-resolution grids, and simulator control loops.",
      tech: ["Python", "A* Algorithm", "React", "PostgreSQL", "FastAPI"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "Chosen as our problem statement for the Smart India Hackathon. Visited regional transit hubs and saw controllers using physical clipboards to resolve gridlocks.",
      problemDetails: "Cascade routing deadlocks are computationally hard. Existing railway control software is legacy and lacks dynamic pathing capabilities, forcing dispatchers to make guesses during disruptions.",
      research: "Interviewed railway engineers. Assumed AI should dictate routing. Learned that safety rules dictate that humans must remain the final authority. Redesigned system to act purely as a pathing suggestion assistant.",
      architectureFlow: [
        "Live Grid Coordinates Input -> Matrix Layout Parser",
        "A* Spatial Search Solver -> Path Optimization Loop",
        "Deadlock Conflict Predictor (Conflict Formula) -> Suggestion Matrix",
        "Controller HUD HUD -> Suggested Path Reveal -> Dispatcher Confirmation"
      ],
      techChoice: "Python was chosen for mathematical calculation and fast path solving; FastAPI provides a low-latency gateway to sync calculations with the React dashboard.",
      tradeoffs: "Used A* heuristics over heavy Reinforcement Learning to guarantee path safety, explainability, and predictable real-time execution speeds.",
      myContribution: "Architected the path solver loops, the state tracking matrices, and integrated safety checks preventing illegal signal patterns.",
      lessons: "Safety-critical systems require clear explanations. A dispatcher will ignore any optimizer recommendation if they cannot see the reason behind it.",
      schema: `CREATE TABLE signal_node (\n  id UUID PRIMARY KEY,\n  grid_x INT, grid_y INT,\n  status VARCHAR(20) -- green, yellow, red\n);\n\n-- Signal Conflict Formulation:\n-- Collision Set C = { t_i, t_j | P(t_i) ∩ P(t_j) ≠ Ø }\n-- Where P(t) represents the path vector of train t over time interval T.`,
      folder: `backend/\n├── main.py                  # Path solver entry\n├── core/routing.py          # A* Search Heuristics\n└── schemas/                 # Track coordinate definitions`,
      api: `POST /api/routing/solve\nBody: { train_positions, active_signals }\nResponse: { suggested_routes: [{ train_id, path: [] }], deadlocks_prevented: 3 }`,
      perf: "Optimized heuristic functions in python using list comprehensions and coordinate caching, reducing solver runtime to under 8ms.",
      security: "HTTPS communication; CORS restrictions preventing arbitrary API requests to backend path calculations.",
    }
  },
  jobnest: {
    title: "JobNest",
    subtitle: "Proximity Gig Matching Index",
    tag: "03 // SYSTEMS",
    recruiter: {
      problem: "Students face financial bottlenecks but lack access to local, flexible gig opportunities within near proximity to campus.",
      solution: "A hyperlocal opportunity map and proximity query system connecting students directly with verified local tasks.",
      impact: "Acted as our initial validation MVP. Taught us that simple job listing is insufficient, leading to the broader CampusConnect ecosystem.",
      role: "Solo Developer. Programmed location pipelines, PostGIS coordinates lookup, and core dashboard.",
      tech: ["Python", "PostgreSQL", "React.js", "PostGIS", "CSS Variables"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "Struggled to find flexible freelance work nearby that fits around a college timetable. Realized local businesses had short-term tasks but no way to reach students.",
      problemDetails: "Hyperlocal discovery is broken. LinkedIn is too formal for day-gigs, and general classifieds are riddled with spam. This isolates local opportunity.",
      research: "Built a basic prototype and watched 20 peers interact with it. Assumption: students just wanted money. Learning: students actually prioritized learning skills, collaborating, and peer referrals over simple gig labor.",
      architectureFlow: [
        "Employer Posts Task -> Proximity Coordinate Mapping",
        "PostGIS Radius Query -> Latitude/Longitude Matrix match",
        "Student Notification -> Direct Chat Gateway",
        "Milestone Verification -> Automated Payout Validation"
      ],
      techChoice: "Postgres with PostGIS extension was selected to allow high-performance radial queries (e.g. 'find gigs within 5km of campus').",
      tradeoffs: "Sacrificed global scalability features in the first build to prioritize highly optimized local queries and spatial accuracy.",
      myContribution: "Created the location indexes, mapped PostGIS spatial functions, and designed the local business dashboard.",
      lessons: "Building proximity matching is technically simple; building local business trust is the real friction.",
      schema: `CREATE TABLE gig_listing (\n  id UUID PRIMARY KEY,\n  employer_id UUID,\n  location GEOGRAPHY(Point, 4326),\n  reward DECIMAL(10,2),\n  required_skills VARCHAR[]\n);\n\n-- Hyperlocal PostGIS Query:\n-- SELECT * FROM gig_listing \n-- WHERE ST_DWithin(location, ST_MakePoint(lng, lat)::geography, radius_meters);`,
      folder: `src/\n├── server/db/               # PostGIS queries\n├── components/map/          # Leaflet matching map\n└── styles/                  # Operating system variables`,
      api: `GET /api/gigs/radius\nQuery: ?lat=17.0&lng=82.0&radius_meters=5000\nResponse: { gigs: [{ id, distance_meters, reward }] }`,
      perf: "Used spatial indexes (GIST) on geography columns, reducing query times for 10,000+ local points to under 12ms.",
      security: "Sanitized location inputs; coordinate obfuscation on public maps to protect student privacy.",
    }
  },
  "madhu-os": {
    title: "MADHU//OS Portfolio",
    subtitle: "Cinematic Founder Stage",
    tag: "06 // SYSTEMS",
    recruiter: {
      problem: "Standard flat developer portfolios fail to showcase a developer's real product thinking, architectural knowledge, or founder-minded drive.",
      solution: "A handcrafted 3D cinematic operating system environment synchronizing WebGL camera frames directly to scroll and technical case studies.",
      impact: "Creates an unforgettable first impression, highlighting engineering credentials and system architecture over visual complexity.",
      role: "Solo Architect. Programmed WebGL scenes, camera timelines, and custom Web Audio ambient sound layers.",
      tech: ["Three.js", "React Three Fiber", "GSAP", "Lenis", "Zustand"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "I wanted to prove that web development can bridge visual art with solid systems engineering, rejecting flat templates.",
      problemDetails: "Recruiters spend under two minutes on portfolios. If the portfolio looks like a generic card-grid template, they move on. If it's a generic flashy demo, they ignore the engineering. We must do both.",
      research: "Analyzed portfolios on Awwwards. Realized many have high visual quality but zero copy credibility. Designed this OS to tell a human story alongside deep folder structures.",
      architectureFlow: [
        "User Scrolls -> Lenis Smooth Scroll Interceptor",
        "GSAP ScrollTimeline Trigger -> Camera Position Lerp Loop",
        "Zustand State Update -> Navigation & Overlay Sync",
        "Sound Oscillator Frequency Shift -> Dynamic Lowpass Sweeps"
      ],
      techChoice: "React Three Fiber to bind Three.js into React's state loop; Lenis for smooth momentum scrolling; Zustand for global frame sync.",
      tradeoffs: "High GPU usage offset by implementing strict frame-loop pausing when the canvas is out of view or animation is idle.",
      myContribution: "Wrote custom shaders, camera path math, ambient audio synthesis loops, and accessibility screen-reader layers.",
      lessons: "3D visual design must remain submissive to readability. If a user cannot read the project details, the design has failed.",
      schema: `// Client-side Zustand Store Structure:\ninterface PortfolioState {\n  scrollProgress: number;\n  activeStage: number;\n  soundEnabled: boolean;\n  caseStudyOpen: boolean;\n  activeCaseStudyId: string;\n}`,
      folder: `src/\n├── components/canvas/       # WebGL Scenes & Lights\n│   └── Stage/               # Monument Geometry\n├── components/dom/          # Narrative Overlays & HUD\n└── state/                   # Zustand stores`,
      api: `// NextJS Client API Route (route.ts):\nexport async function GET() {\n  // Queries GitHub GraphQL API for live telemetry\n  return NextResponse.json(curatedRepos);\n}`,
      perf: "Disabled continuous render loops when scroll is idle; lazy loaded 3D geometries, maintaining 60FPS on mobile devices.",
      security: "Server-side masking of GitHub API tokens; strict Content Security Policies.",
    }
  }
};

export default function CaseStudyDrawer() {
  const isOpen = usePortfolioStore((state) => state.caseStudyOpen);
  const setOpen = usePortfolioStore((state) => state.setCaseStudyOpen);
  const activeId = usePortfolioStore((state) => state.activeCaseStudyId);
  const setActiveId = usePortfolioStore((state) => state.setActiveCaseStudyId);

  const [mode, setMode] = useState<"recruiter" | "founder">("recruiter");
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "code">("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const data = useMemo(() => CASE_STUDIES[activeId] || null, [activeId]);

  if (!isOpen || !data) return null;

  const milestones = [
    { id: "jobnest", label: "JobNest", index: 0 },
    { id: "campusconnect", label: "CampusConnect", index: 1 },
    { id: "railway-ai", label: "Railway AI", index: 2 },
    { id: "madhu-os", label: "MADHU//OS", index: 3 },
  ];

  return (
    <div className="interactive" style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "100%",
      maxWidth: "680px",
      height: "100vh",
      backgroundColor: "rgba(10, 10, 12, 0.85)",
      backdropFilter: "blur(24px)",
      borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
      zIndex: "var(--z-cmd-menu)",
      display: "flex",
      flexDirection: "column",
      color: "var(--text-primary)",
      boxShadow: "-12px 0 48px rgba(0, 0, 0, 0.9)",
      animation: "modal-spring 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    }}>
      {/* ────────────────── HEADER AREA ────────────────── */}
      <div style={{
        padding: "24px 32px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div className="mono-tag" style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>
            {data.tag}
          </div>
          <h2 style={{
            fontFamily: "var(--font-family-display)",
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            marginTop: "4px"
          }}>
            {data.title}
          </h2>
          <p style={{
            fontFamily: "var(--font-family-serif)",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "var(--text-secondary)"
          }}>
            {data.subtitle}
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* ────────────────── MODE TOGGLE & TIMELINE NAV ────────────────── */}
      <div style={{
        padding: "16px 32px",
        backgroundColor: "rgba(255,255,255,0.01)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        {/* Recruiter vs Founder Mode */}
        <div style={{
          display: "flex",
          backgroundColor: "rgba(0,0,0,0.4)",
          borderRadius: "8px",
          padding: "3px",
          border: "1px solid rgba(255,255,255,0.04)"
        }}>
          <button
            onClick={() => setMode("recruiter")}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.65rem",
              fontFamily: "var(--font-family-mono)",
              textTransform: "uppercase",
              backgroundColor: mode === "recruiter" ? "rgba(255,255,255,0.06)" : "transparent",
              color: mode === "recruiter" ? "#ffffff" : "var(--text-secondary)",
              transition: "all 0.2s ease"
            }}
          >
            Recruiter Mode (2m)
          </button>
          <button
            onClick={() => setMode("founder")}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.65rem",
              fontFamily: "var(--font-family-mono)",
              textTransform: "uppercase",
              backgroundColor: mode === "founder" ? "rgba(255,255,255,0.06)" : "transparent",
              color: mode === "founder" ? "#ffffff" : "var(--text-secondary)",
              transition: "all 0.2s ease"
            }}
          >
            Founder Mode (Deep)
          </button>
        </div>

        {/* Milestone Hopper */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)" }}>HOP TO:</span>
          {milestones.map((mil, idx) => (
            <button
              key={mil.id}
              onClick={() => setActiveId(mil.id)}
              style={{
                background: "none",
                color: activeId === mil.id ? "#ffffff" : "var(--text-secondary)",
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.6rem",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "4px",
                backgroundColor: activeId === mil.id ? "rgba(6, 182, 212, 0.15)" : "transparent",
                border: activeId === mil.id ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid transparent",
                transition: "all 0.2s ease"
              }}
            >
              {mil.label}
            </button>
          ))}
        </div>
      </div>

      {/* ────────────────── MAIN DRAW PANEL CONTENT ────────────────── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px 32px 48px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {mode === "recruiter" ? (
          /* =========================================================
             RECRUITER MODE VIEW
             ========================================================= */
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* The problem */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-purple)" }}><TrendingUp size={20} /></div>
              <div>
                <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>The Problem</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "6px" }}>{data.recruiter.problem}</p>
              </div>
            </div>

            {/* The solution */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-cyan)" }}><Cpu size={20} /></div>
              <div>
                <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>The Solution</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "6px" }}>{data.recruiter.solution}</p>
              </div>
            </div>

            {/* The Impact */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-green)" }}><Shield size={20} /></div>
              <div>
                <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Impact & Validation</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "6px" }}>{data.recruiter.impact}</p>
              </div>
            </div>

            {/* The Role */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-gold)" }}><Code size={20} /></div>
              <div>
                <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>My Contribution</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "6px" }}>{data.recruiter.role}</p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "12px" }}>Technologies Used</h4>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {data.recruiter.tech.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-family-mono)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "4px 10px",
                    borderRadius: "4px"
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Proof Buttons */}
            <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
              <a href={data.recruiter.github} target="_blank" className="interactive" style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                transition: "all 0.2s ease"
              }}>
                <Code size={14} /> Repository
              </a>
              <a href={data.recruiter.demo} target="_blank" className="interactive" style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                backgroundColor: "rgba(6, 182, 212, 0.1)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                borderRadius: "8px",
                color: "#22d3ee",
                textDecoration: "none",
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                transition: "all 0.2s ease"
              }}>
                <ExternalLink size={14} /> Live System
              </a>
            </div>

            {/* Direct Recruiter CTA */}
            <div style={{
              backgroundColor: "rgba(6, 182, 212, 0.04)",
              border: "1px solid rgba(6, 182, 212, 0.15)",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginTop: "8px"
            }}>
              <div>
                <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-family-mono)", color: "var(--color-cyan)" }}>RECRUITER QUICK CHANNEL</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>Download resume or start direct email.</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href="https://github.com/Madhu-0205/portfolio/raw/main/resume.pdf" target="_blank" style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-family-mono)",
                  color: "#ffffff",
                  textDecoration: "none"
                }}>RESUME</a>
                <a href="mailto:madhuvalurouthu@gmail.com" style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  backgroundColor: "var(--color-cyan)",
                  fontSize: "0.6rem",
                  fontFamily: "var(--font-family-mono)",
                  color: "#000000",
                  fontWeight: 600,
                  textDecoration: "none"
                }}>EMAIL</a>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================
             FOUNDER MODE VIEW
             ========================================================= */
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Custom Tab Navigation inside Founder Mode */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              gap: "24px"
            }}>
              {(["overview", "architecture", "code"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: "none",
                    border: "none",
                    paddingBottom: "12px",
                    color: activeTab === tab ? "#ffffff" : "var(--text-secondary)",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    borderBottom: activeTab === tab ? "2px solid var(--color-cyan)" : "2px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>01 / Origin & Why</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.why}</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>02 / Market Friction</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.problemDetails}</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>03 / User Observation</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.research}</p>
                </div>
              </div>
            )}

            {activeTab === "architecture" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "16px" }}>04 / Data Flow Pipeline</h4>
                  <div style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "8px",
                    padding: "20px",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "0.7rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    {data.founder.architectureFlow.map((step, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ color: "var(--color-cyan)" }}>[{idx + 1}]</span>
                        <span>{step}</span>
                        {idx < data.founder.architectureFlow.length - 1 && <ArrowRight size={12} style={{ marginLeft: "auto", color: "var(--text-tertiary)" }} />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>05 / Technology Rationalization</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.techChoice}</p>
                </div>

                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>06 / Engineering Trade-offs</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.tradeoffs}</p>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* 1. Database Schema */}
                <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === "schema" ? null : "schema")}
                    style={{
                      width: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      border: "none",
                      color: "#ffffff",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Database size={14} /> Database Schema</span>
                    <span>{expandedSection === "schema" ? "-" : "+"}</span>
                  </button>
                  {expandedSection === "schema" && (
                    <pre style={{
                      margin: 0,
                      padding: "16px",
                      backgroundColor: "#050507",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.65rem",
                      lineHeight: 1.4,
                      color: "#a1a1aa",
                      overflowX: "auto"
                    }}>{data.founder.schema}</pre>
                  )}
                </div>

                {/* 2. Folder Structure */}
                <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === "folder" ? null : "folder")}
                    style={{
                      width: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      border: "none",
                      color: "#ffffff",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><FolderTree size={14} /> File Directory Map</span>
                    <span>{expandedSection === "folder" ? "-" : "+"}</span>
                  </button>
                  {expandedSection === "folder" && (
                    <pre style={{
                      margin: 0,
                      padding: "16px",
                      backgroundColor: "#050507",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.65rem",
                      lineHeight: 1.4,
                      color: "#a1a1aa",
                      overflowX: "auto"
                    }}>{data.founder.folder}</pre>
                  )}
                </div>

                {/* 3. API endpoints */}
                <div style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", overflow: "hidden" }}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === "api" ? null : "api")}
                    style={{
                      width: "100%",
                      padding: "16px",
                      backgroundColor: "rgba(255,255,255,0.02)",
                      border: "none",
                      color: "#ffffff",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Layout size={14} /> API Endpoint Architecture</span>
                    <span>{expandedSection === "api" ? "-" : "+"}</span>
                  </button>
                  {expandedSection === "api" && (
                    <pre style={{
                      margin: 0,
                      padding: "16px",
                      backgroundColor: "#050507",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "0.65rem",
                      lineHeight: 1.4,
                      color: "#a1a1aa",
                      overflowX: "auto"
                    }}>{data.founder.api}</pre>
                  )}
                </div>

                {/* 4. Optimizations */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Performance Measures</h4>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.5, marginTop: "6px" }}>{data.founder.perf}</p>
                </div>

                {/* 5. Security */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Security Safeguards</h4>
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.5, marginTop: "6px" }}>{data.founder.security}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
