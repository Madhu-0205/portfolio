"use client";

import React, { useState, useMemo } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { X, ExternalLink, Database, Code, Cpu, TrendingUp, FolderTree, Layout, ArrowRight } from "lucide-react";

interface CaseStudyData {
  title: string;
  subtitle: string;
  tag: string;
  readingTime: string;
  recruiter: {
    summary: string;
    problem: string;
    solution: string;
    role: string;
    tech: string[];
    github: string;
    demo: string;
  };
  founder: {
    why: string;
    problemDetails: string;
    approach: string;
    architectureFlow: string[];
    techChoice: string;
    tradeoffs: string;
    limitations: string[];
    doDifferently: string;
    logbook: string[];
    userInsight: string;
    productEvolution: string;
    marketAssumptions: string;
    growthOpportunities: string;
    businessRisks: string;
    competitivePositioning: string;
    schema: string;
    folder: string;
    api: string;
    perf: string;
    security: string;
    aiDecisionFlow?: {
      dataReceived: string;
      assistedDecision: string;
      humanControl: string;
      modelAssumptions: string;
    };
  };
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  campusconnect: {
    title: "CampusConnect",
    subtitle: "Student Opportunity Graph",
    tag: "04 // SYSTEMS",
    readingTime: "3 min read",
    recruiter: {
      summary: "A collegiate opportunity and skill recommendation network indexing fragmented student events, hackathons, and local gigs into a unified graph.",
      problem: "Student opportunities are scattered across WhatsApp, Slack, and bullet boards, raising information search costs and siloing talented builders.",
      solution: "Consolidated hackathons, gigs, and communities into a PostgreSQL graph mapping model powered by cosine similarity skill scoring.",
      role: "Lead Systems Architect & Developer. Programmed Postgres database schemas, skill recommendation APIs, and Next.js frontends.",
      tech: ["React.js", "TypeScript", "PostgreSQL", "Next.js", "REST APIs"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "I noticed my classmates spent hours daily scanning group messages and bulletins just to find hackathon partners or gig work. The opportunity pipeline was fractured.",
      problemDetails: "Who suffers: Undergraduate builders. Existing networks (like LinkedIn) target corporate careers, ignoring micro-gigs, events, and student-level partner matching. Solving this connects latent talent directly to resources.",
      approach: "Instead of a static directory bulletin, I designed a relational graph database mapping student skill profiles to opportunity nodes using array-comparison weights.",
      architectureFlow: [
        "Student Input: Skills list and interest tags saved as strongly typed array sets",
        "Gateway Scrapers: Opportunities fetched, filtered, and saved as event structures",
        "Vector Evaluation: Cosine similarity comparison matrix scores match relevance",
        "HUD Render: Delivers matches in under 45ms using optimized indices"
      ],
      techChoice: "PostgreSQL was chosen for its strict data constraints and relational joins. REST API endpoints in Next.js were chosen over GraphQL to reduce caching complexity and query overhead in our initial production launch.",
      tradeoffs: "Opted for a relational database with matching views rather than a dedicated graph database (like Neo4j) to keep server hosting costs low during validation.",
      limitations: [
        "GIN indexing arrays on PG becomes slower to query if students list more than 30 distinct skills.",
        "Missing automated validation for third-party scraper pipelines (currently requires manual moderation).",
        "No real-time matching sync (requires client refresh)."
      ],
      doDifferently: "If I started again today, I would use an adapter pattern to isolate the matching engine from the primary datastore, allowing us to swap the relational DB for a dedicated graph store (Neo4j) without altering frontend logic.",
      logbook: [
        "Observation (Dec 2025) // Witnessed peers missing local hackathon registrations due to fragmented channels.",
        "Research (Jan 2026) // Surveyed 50 students; 90% logged into 4+ apps daily to seek gigs/events.",
        "Prototype (Feb 2026) // Built local opportunity listing pages in React.",
        "Architecture (Mar 2026) // Designed the Postgres relational matches schema.",
        "Implementation (Apr 2026) // Coded Next.js APIs and cosine matching rules.",
        "Testing (May 2026) // Ran local load testing on matching queries.",
        "Deployment (Jun 2026) // Shipped initially to Vercel with mock datasets.",
        "Iteration (Jul 2026) // Tuned matching queries based on initial telemetry feedback."
      ],
      userInsight: "Students prioritize peer-to-peer building and hackathons over formal corporate job search. They want a community hub first, and a gig board second.",
      productEvolution: "Evolved from a simple job directory board into an integrated collegiate growth network combining hackathons, projects, and peers.",
      marketAssumptions: "India has 40M+ collegiate enrollments. Assuming a SAM of 15M professional degrees, and a low customer acquisition cost via local campus lead partnerships.",
      growthOpportunities: "Direct integrations with university administrative portals to verify student enrollment records automatically.",
      businessRisks: "High user churn post-graduation as students transition out of the campus ecosystem.",
      competitivePositioning: "Fills the gap between massive corporate directories (LinkedIn) and localized campus boards (bulletins).",
      schema: `CREATE TABLE student (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE,\n  skills TEXT[],\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE opportunity (\n  id UUID PRIMARY KEY,\n  title VARCHAR(255),\n  type VARCHAR(50), -- gig, hackathon, event\n  required_skills TEXT[]\n);\n\n-- Cosine Similarity formula:\n-- Similarity = (A • B) / (||A|| * ||B||)`,
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
    readingTime: "4 min read",
    recruiter: {
      summary: "A simulated spatial grid routing system applying A* pathfinding search to resolve train routing signal deadlocks on high-density grids.",
      problem: "Signal congestion on national rail lines causes downstream delays. Human dispatchers struggle to calculate cascading gridlock impacts during signal anomalies.",
      solution: "Calculates signal deadlock possibilities on a simulated track layout using spatial A* search and suggestions for alternate pathing options.",
      role: "Core Algorithm Architect. Designed the path-solving logic, track conflict matrices, and integrated FastAPI simulation gateways.",
      tech: ["Python", "FastAPI", "React", "PostgreSQL", "A* Heuristics"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "Chosen for the Smart India Hackathon. Visited regional transit hubs and saw dispatchers resolving high-stress gridlocks manually using chalk boards.",
      problemDetails: "Who suffers: Regional controllers. Legacy software calculates offline schedule plans but cannot dynamically re-route trains on active, broken lines.",
      approach: "Built a simulated routing coordinate space representing tracks as nodes. The optimizer solves path conflicts and reports alternatives to the dispatcher.",
      architectureFlow: [
        "Track Parsing: Track segments mapped as coordinate vectors",
        "Anomaly Detection: Signal shifts/train delays reported to FastAPI backend",
        "A* Search Solver: Path optimizer searches for alternative, conflict-free routes",
        "Human Confirmation: Suggestions sent to the dispatcher console HUD for sign-off"
      ],
      techChoice: "Python was chosen for its mathematical search libraries. FastAPI provides low overhead for REST syncs to the React simulator dashboard.",
      tradeoffs: "Used deterministic A* search heuristics instead of reinforcement learning models to guarantee explainability and safe, repeatable paths.",
      limitations: [
        "In dense networks (>50 trains), A* search scaling causes solver runtimes to swell to 150ms.",
        "Model assumes track layouts are static and cannot handle dynamically altering routes mid-block.",
        "No direct PLC sensor hardware integration (currently relies on simulator triggers)."
      ],
      doDifferently: "If I started again today, I would write the track conflict engine in Rust using multi-threaded loops to calculate the A* search matrix in parallel, keeping latency under 5ms.",
      logbook: [
        "Observation (Nov 2024) // Watched dispatchers manage scheduling conflicts manually.",
        "Research (Dec 2024) // Studied train signal safety rules and deadlock models.",
        "Prototype (Jan 2025) // Coded a basic Python-based path solver.",
        "Architecture (Feb 2025) // Modeled tracks as nodes in a spatial graph.",
        "Implementation (Mar 2025) // Connected FastAPI to React simulator UI.",
        "Testing (Apr 2025) // Validated routing models under simulated signal failure load.",
        "Deployment (May 2025) // Presented at SIH 2025 Grand Finale.",
        "Iteration (Jun 2025) // Re-tuned heuristic weight bounds for multi-track lines."
      ],
      userInsight: "Safety critical dispatchers will reject any recommendation if the system cannot explicitly explain the routing logic behind it.",
      productEvolution: "Evolved from a basic scheduling display tool into a real-time reactive path solver with visual dispatcher controls.",
      marketAssumptions: "Government systems prioritize reliability and audit logs. A path solver must prove safety via strict math constraint checks.",
      growthOpportunities: "Direct data-feed bindings to railway transponder networks for live telemetry routing.",
      businessRisks: "Integrating with legacy government networks is extremely slow and subject to strict regulatory barriers.",
      competitivePositioning: "Unlike legacy offline schedulers, this system provides real-time, explainable path routing alternatives during signals failures.",
      schema: `CREATE TABLE signal_node (\n  id UUID PRIMARY KEY,\n  grid_x INT, grid_y INT,\n  status VARCHAR(20) -- green, yellow, red\n);\n\n-- Collision Set C = { t_i, t_j | P(t_i) ∩ P(t_j) ≠ Ø }\n-- Where P(t) represents the path vector of train t over time interval T.`,
      folder: `backend/\n├── main.py                  # Path solver entry\n├── core/routing.py          # A* Search Heuristics\n└── schemas/                 # Track coordinate definitions`,
      api: `POST /api/routing/solve\nBody: { train_positions, active_signals }\nResponse: { suggested_routes: [{ train_id, path: [] }], deadlocks_prevented: 3 }`,
      perf: "Optimized heuristic functions in python using list comprehensions and coordinate caching, reducing solver runtime to under 8ms.",
      security: "HTTPS communication; CORS restrictions preventing arbitrary API requests to backend path calculations.",
      aiDecisionFlow: {
        dataReceived: "Train ID, speed vector, path destination, track coordinates, and current signal states (green/yellow/red).",
        assistedDecision: "Computes alternative track sequences to bypass blocked tracks while preventing collision deadlocks.",
        humanControl: "The dispatcher has absolute authority. Suggestions are only executed when clicked and confirmed on the console HUD.",
        modelAssumptions: "Assumes train speed remains uniform along track segments and that track switch delays are negligible (under 3s)."
      }
    }
  },
  jobnest: {
    title: "JobNest",
    subtitle: "Proximity Gig Matching Index",
    tag: "03 // SYSTEMS",
    readingTime: "2 min read",
    recruiter: {
      summary: "A hyperlocal location-based gig-matching network utilizing PostgreSQL PostGIS coordinates lookup for collegiate micro-opportunities.",
      problem: "Local businesses fail to reach college students for short-term work, while students lack quick access to flexible, local gigs.",
      solution: "Mapped local business geolocations directly to student campus coordinates using radial PostGIS queries.",
      role: "Solo Developer. Programmed spatial geography lookups, business dashboard pipelines, and Leaflet map feeds.",
      tech: ["Python", "PostgreSQL", "PostGIS", "React.js", "Leaflet"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "I struggled to find flexible gigs that could fit around my class timetable, while local shops near college were posting signs seeking temporary help.",
      problemDetails: "Who suffers: Students and local shops. Corporate sites are too heavy for 4-hour tasks, and general forums are full of spam, leaving local demand unlinked.",
      approach: "Used PostgreSQL's PostGIS extension to run radial geography lookups, displaying tasks directly on a student dashboard based on proximity metrics.",
      architectureFlow: [
        "Business Posting: Employer submits gig coordinates (latitude/longitude)",
        "PostGIS Query: Matches listings using geography distance radius rules",
        "Student Feed: Displays local opportunities sorted by distance and reward values",
        "Milestone Signoff: Logs completion triggers to enable payout authorizations"
      ],
      techChoice: "PostgreSQL with PostGIS was chosen over generic database indexes to ensure that radial coordinate lookups (e.g. ST_DWithin) ran natively and efficiently.",
      tradeoffs: "Prioritized local precision and query speeds over global clustering features in the initial database version.",
      limitations: [
        "IP geolocations degrade in accuracy when students use ad-blockers or VPN networks.",
        "No native escrow integration (payout validation is currently handled via manual moderation).",
        "Currently limited to a single campus geolocation bounds."
      ],
      doDifferently: "If I started again today, I would use device-level GPS inputs via the Web Geolocation API as the primary coordinates source, instead of relying on IP-lookup fallbacks.",
      logbook: [
        "Observation (Jul 2025) // Noticed local shops had help wanted signs while peers were seeking part-time work.",
        "Research (Aug 2025) // Checked existing listings; found they were flooded with spam and corporate listings.",
        "Prototype (Sep 2025) // Programmed a simple Google Maps React dashboard.",
        "Architecture (Oct 2025) // Set up Postgres schemas and loaded PostGIS spatial libraries.",
        "Implementation (Nov 2025) // Finished Leaflet map coordinates routing.",
        "Testing (Dec 2025) // Ran queries testing radial lookups for 1,000+ points.",
        "Deployment (Jan 2026) // Released validation prototype to 20 local peers.",
        "Iteration (Feb 2026) // Shipped changes shifting focus to CampusConnect as peers sought builder communities."
      ],
      userInsight: "Simple gig listings are insufficient; students prioritize work that matches their fields of study or includes peer referrals.",
      productEvolution: "Learned from user tests that students sought projects and peer learning over simple manual labor, leading to the CampusConnect graph.",
      marketAssumptions: "Local campus economies are self-contained. Proximity matching can capture local business budgets if the student channel is exclusive.",
      growthOpportunities: "Partnering with campus commerce groups to aggregate task listings automatically.",
      businessRisks: "Seasonal drops in gig postings during student vacation cycles.",
      competitivePositioning: "Focuses strictly on the student-to-local-business micro-radius, avoiding heavy corporate recruitment cycles.",
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
    readingTime: "2 min read",
    recruiter: {
      summary: "An interactive, scroll-linked WebGL 3D observatory showcase presenting code architectures as physical structures.",
      problem: "Recruiters spend under two minutes on developer portfolios. Flat grids and templates fail to convey architectural understanding or builder passion.",
      solution: "Built a 3D WebGL observatory using React Three Fiber that locks camera frames directly to scroll progress and interactive code drawer steps.",
      role: "Solo Architect. Programmed WebGL scene setups, camera timeline pathing, and Web Audio oscillator layers.",
      tech: ["Three.js", "React Three Fiber", "GSAP", "Lenis", "Zustand"],
      github: "https://github.com/Madhu-0205/portfolio",
      demo: "https://github.com/Madhu-0205/portfolio",
    },
    founder: {
      why: "I wanted to prove that interactive design can bridge visual art with solid engineering, rejecting flat and generic templates.",
      problemDetails: "Who suffers: Hiring teams and founders. Reviewing identical portfolio sites is exhausting. A builder must prove technical scale and design intent in under 10 seconds.",
      approach: "Used React Three Fiber to bind WebGL frames to GSAP scroll timelines, keeping the main narrative in accessible DOM layers so it remains readable.",
      architectureFlow: [
        "Scroll Event: Lenis smooth scroll catches scroll progress",
        "GSAP Timeline: Maps scroll value to WebGL camera coordinates",
        "Zustand Update: Updates active stage values globally",
        "Synth Sweep: Aligns audio oscillators to active stages"
      ],
      techChoice: "React Three Fiber was selected to bind Three.js scenes into React's state loop, while Zustand synchronizes frame updates across DOM elements and canvas layers.",
      tradeoffs: "High initial GPU render load offset by implementing strict frame pausing when the scroll is idle or canvas is out of view.",
      limitations: [
        "Increased initial load times on older mobile devices when WebGL textures compilation occurs.",
        "Web Audio context initialization requires user interaction before sounds can unmute.",
        "High memory overhead if multiple browser tabs run WebGL instances concurrently."
      ],
      doDifferently: "If I started again today, I would implement dynamic chunk loading, fetching 3D assets only as the scroll approaches their specific stage, reducing initial loads.",
      logbook: [
        "Observation (Mar 2026) // Portfolio templates feel identical and fail to explain software details.",
        "Research (Apr 2026) // Audited Awwwards sites to study camera paths and performance bottlenecks.",
        "Prototype (May 2026) // Built basic Three.js scenes with camera track loops.",
        "Architecture (Jun 2026) // Bound WebGL frames to React components using Zustand.",
        "Implementation (Jul 2026) // Finished DOM overlays, case studies drawer, and audio synths.",
        "Testing (Jul 2026) // Run lighthouse audits to verify fast page rendering.",
        "Deployment (Jul 2026) // Shipped to production Vercel and pushed code to GitHub."
      ],
      userInsight: "Hiring managers look for a clear balance of visual excellence and technical substance. Visuals grab attention; code schemas retain it.",
      productEvolution: "Evolved from a basic 3D project showcase into a structured founder logbook documenting real technical trade-offs.",
      marketAssumptions: "A premium first-impression dramatically elevates candidate recall rates in highly competitive recruitment pools.",
      growthOpportunities: "Integrating live GitHub commit feeds and test-runner telemetry directly into the HUD.",
      businessRisks: "WebGL performance issues on legacy mobile hardware.",
      competitivePositioning: "Avoids the flat template patterns of standard developer portfolios by showcasing interactive spatial environments.",
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="mono-tag" style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>
              {data.tag}
            </div>
            <span style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-family-mono)",
              backgroundColor: "rgba(255,255,255,0.04)",
              padding: "2px 6px",
              borderRadius: "3px",
              color: "var(--text-secondary)"
            }}>{data.readingTime}</span>
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
            Recruiter Mode
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
            Founder Mode
          </button>
        </div>

        {/* Milestone Hopper */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)" }}>LOGBOOK TIMELINE:</span>
          {milestones.map((mil) => (
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
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* One Sentence Summary */}
            <div style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "0.95rem",
              lineHeight: 1.5,
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-primary)"
            }}>
              “{data.recruiter.summary}”
            </div>

            {/* The problem */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-purple)", marginTop: "2px" }}><TrendingUp size={18} /></div>
              <div>
                <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>The Problem</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "6px" }}>{data.recruiter.problem}</p>
              </div>
            </div>

            {/* The solution */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-cyan)", marginTop: "2px" }}><Cpu size={18} /></div>
              <div>
                <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>The Solution</h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "6px" }}>{data.recruiter.solution}</p>
              </div>
            </div>

            {/* The Role */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ color: "var(--color-gold)", marginTop: "2px" }}><Code size={18} /></div>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* Why This Exists */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Why This Exists</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.why}</p>
                </div>

                {/* The Problem */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>The Problem Space</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.problemDetails}</p>
                </div>

                {/* My Approach */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>My Approach</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.approach}</p>
                </div>

                {/* System Limitations */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Current Limitations</h4>
                  <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {data.founder.limitations.map((lim, idx) => (
                      <li key={idx} style={{ fontSize: "0.9rem", lineHeight: 1.4, color: "var(--text-secondary)" }}>{lim}</li>
                    ))}
                  </ul>
                </div>

                {/* What I Would Do Differently */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", textTransform: "uppercase", color: "var(--color-gold)" }}>If I Started Again Today...</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px", fontStyle: "italic" }}>{data.founder.doDifferently}</p>
                </div>

                {/* AI specific logic if applicable */}
                {data.founder.aiDecisionFlow && (
                  <div style={{
                    backgroundColor: "rgba(6, 182, 212, 0.03)",
                    border: "1px solid rgba(6, 182, 212, 0.1)",
                    borderRadius: "8px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                  }}>
                    <div className="mono-tag" style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }}>AI DECISION ASSIST BOUNDARIES</div>
                    <div>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>DATA RECEIVED</span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.aiDecisionFlow.dataReceived}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>ASSISTED DECISIONS</span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.aiDecisionFlow.assistedDecision}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>HUMAN RETAINED CONTROL</span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.aiDecisionFlow.humanControl}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>MODEL ASSUMPTIONS</span>
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.aiDecisionFlow.modelAssumptions}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "architecture" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {/* 1. Dynamic Flow Pipeline */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "16px" }}>Data Flow Pipeline</h4>
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

                {/* 2. Engineering logbook */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "16px" }}>Engineering Logbook Timeline</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "16px", marginLeft: "8px" }}>
                    {data.founder.logbook.map((log, idx) => (
                      <div key={idx} style={{ position: "relative" }}>
                        <span style={{
                          position: "absolute",
                          left: "-21px",
                          top: "4px",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-cyan)"
                        }} />
                        <span style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Tech choices */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Technology Rationalization</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.techChoice}</p>
                </div>

                {/* 4. Trade-offs */}
                <div>
                  <h4 style={{ fontFamily: "var(--font-family-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Engineering Trade-offs</h4>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.5, marginTop: "8px" }}>{data.founder.tradeoffs}</p>
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Founder insights */}
                <div style={{
                  backgroundColor: "rgba(255, 179, 0, 0.03)",
                  border: "1px solid rgba(255, 179, 0, 0.15)",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>
                  <div className="mono-tag" style={{ fontSize: "0.6rem", color: "var(--color-gold)" }}>PRODUCT FOUNDER INSIGHTS</div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>USER INSIGHT</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.userInsight}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>PRODUCT EVOLUTION</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.productEvolution}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>MARKET ASSUMPTIONS</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.marketAssumptions}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>GROWTH OPPORTUNITIES</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.growthOpportunities}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>BUSINESS RISKS</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.businessRisks}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-family-mono)", color: "var(--text-secondary)", display: "block" }}>COMPETITIVE POSITIONING</span>
                    <span style={{ fontSize: "0.85rem", lineHeight: 1.4, marginTop: "2px", display: "block" }}>{data.founder.competitivePositioning}</span>
                  </div>
                </div>

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
