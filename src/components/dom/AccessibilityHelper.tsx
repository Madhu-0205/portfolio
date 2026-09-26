"use client";

import React, { useMemo, useState, useCallback } from "react";
import { useGitHubData } from "@/hooks/useGitHubData";

interface RepoStats {
  stars: number;
  forks: number;
  size: number;
  language: string;
  commits: number;
  updatedAt: string;
}

// Neutral placeholder while live GitHub data loads (no invented metrics)
const NEUTRAL_STATS: RepoStats = {
  stars: 0,
  forks: 0,
  size: 0,
  language: "—",
  commits: 0,
  updatedAt: "",
};

// Derive energy level from a repo's last update (null when unknown).
// Module-scope so it is only ever invoked from event handlers, never render.
const getEnergy = (updatedAt: string): number | null => {
  if (!updatedAt) return null;
  try {
    const lastUpdate = new Date(updatedAt).getTime();
    const diffMs = Date.now() - lastUpdate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return Math.max(10, Math.min(100, Math.round(100 - (diffDays / 365) * 90)));
  } catch {
    return null;
  }
};

export default function AccessibilityHelper() {
  const githubData = useGitHubData();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [focusedEnergy, setFocusedEnergy] = useState<number | null>(null);

  const handleFocus = (index: number, scrollPercent: number, updatedAt: string) => {
    setFocusedIndex(index);
    // Compute activity energy at focus time (event handlers may call Date.now)
    setFocusedEnergy(getEnergy(updatedAt));

    // Check if user prefers reduced motion
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = scrollPercent * totalScrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // Helper to extract repo data or use neutral placeholders
  const getRepoStats = useCallback((repoName: string): RepoStats => {
    if (!githubData) return NEUTRAL_STATS;
    const repo = (githubData as Record<string, unknown>[]).find(
      (r) => typeof r.name === "string" && r.name.toLowerCase() === repoName.toLowerCase()
    );
    return repo ? (repo as unknown as RepoStats) : NEUTRAL_STATS;
  }, [githubData]);

  const repos = useMemo(() => {
    const jobNest = getRepoStats("jobnest");
    const campusConnect = getRepoStats("campusconnect");
    const railwayAi = getRepoStats("railway-ai");
    const portfolio = getRepoStats("portfolio");

    return [
      {
        id: "jobnest",
        title: "Chapter 3: JobNest",
        description: "Case Study: JobNest. WHY: Bridging the gap in local gig economies. PROBLEM: Proximity micro-jobs are hard to discover. SOLUTION: Local gig discovery network. ARCHITECTURE: Hyperlocal geo-indexing pipeline matching skills with gigs. LESSONS: Finding that students need peers, hackathons, and mentorship, not just jobs.",
        stats: jobNest,
        scroll: 0.20
      },
      {
        id: "campusconnect",
        title: "Chapter 4: CampusConnect",
        description: "Case Study: CampusConnect. WHY: Talent is everywhere, but access is fragmented. PROBLEM: Students miss milestones because opportunities are scattered. SOLUTION: A unified recommendation engine. ARCHITECTURE: Graph-based skill aligning platform. TECHNOLOGY: React, TypeScript, GraphQL. LESSONS: User friction is solved by directory consolidation.",
        stats: campusConnect,
        scroll: 0.40
      },
      {
        id: "railway-ai",
        title: "Chapter 5: Railway Traffic Optimizer",
        description: "Case Study: Railway AI. WHY: High-density rail congestion causes national delays. PROBLEM: Grid routing deadlocks are computationally hard to resolve. SOLUTION: Simulator suggesting deadlock solutions to human controllers. ARCHITECTURE: Spatial A* routing conflict matrices. SAFETY: AI assists; the human controller retains final operational decision. TECHNOLOGY: Python, A* Search.",
        stats: railwayAi,
        scroll: 0.60
      },
      {
        id: "madhu-os",
        title: "Chapter 6: How I Build",
        description: "Case Study: MADHU//OS. WHY: Traditional portfolios fail to tell the builder's story. PROBLEM: Resume cards hide engineering passion. SOLUTION: Immersive 3D gallery. ARCHITECTURE: WebGL canvas, smooth GSAP camera paths, and ambient Web Audio synths. TECHNOLOGY: Next.js, React Three Fiber, Three.js, GSAP, Zustand.",
        stats: portfolio,
        scroll: 0.80
      },
      {
        id: "manifesto",
        title: "Chapters 7 & 8: The Future & Collaboration",
        description: "The horizon where floating crystal milestones and contact coordinates unfold.",
        stats: { language: "Ecosystems", size: 0, commits: 0, stars: 0, forks: 0, updatedAt: "" },
        scroll: 1.00
      }
    ];
  }, [getRepoStats]);

  return (
    <>
      {/* 1. Visually Hidden (Focusable) Screen-Reader Navigation Menu */}
      <div 
        aria-label="My Work & Portfolio monuments"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <nav>
          <h2>Keyboard Portfolio Navigation</h2>
          <ul>
            {repos.map((repo, idx) => (
              <li key={repo.id}>
                <a 
                  href={`#chapter-${repo.id === "jobnest" ? "light" : repo.id === "campusconnect" ? "vision" : repo.id === "railway-ai" ? "world" : repo.id === "madhu-os" ? "journey" : "manifesto"}`}
                  onFocus={() => handleFocus(idx, repo.scroll, repo.stats.updatedAt)}
                  onBlur={() => setFocusedIndex(null)}
                >
                  {repo.id === "manifesto" 
                    ? `${repo.title}. ${repo.description} Open horizon. Press Enter to view.`
                    : `${repo.title}. ${repo.description}${repo.stats.updatedAt ? ` Last updated ${new Date(repo.stats.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}.` : ""}`
                  }
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label="Engineering Philosophy Wall">
          <h3>Engineering Philosophy Statements</h3>
          <p>1. The most resilient systems are those shaped by quiet, intentional simplicity.</p>
          <p>2. Software should not demand attention; it should clear paths for human progress.</p>
          <p>{"3. A product's elegance is measured by the complexity it prevents."}</p>
          <p>4. We build for decades, not for demos. Durability is the ultimate design.</p>
        </section>
      </div>

      {/* 2. Visual Keyboard Telemetry HUD (Shown only when keyboard users focus on the links) */}
      {focusedIndex !== null && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "24px",
            width: "320px",
            backgroundColor: "rgba(10, 10, 12, 0.96)",
            border: "1px solid #00ffff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.8)",
            zIndex: 10000,
            fontFamily: "monospace",
            color: "#ffffff",
          }}
        >
          <div style={{
            fontSize: "0.8rem",
            fontWeight: "bold",
            color: "#00ffff",
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            paddingBottom: "6px",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}>
            [ TELEMETRY_HUD // ACTIVE ]
          </div>
          
          <div style={{ fontSize: "0.75rem", fontWeight: "bold", marginBottom: "4px" }}>
            {repos[focusedIndex].title}
          </div>
          
          <div style={{ fontSize: "0.65rem", color: "#86868b", lineHeight: "1.3", marginBottom: "12px" }}>
            {repos[focusedIndex].description}
          </div>

          {repos[focusedIndex].id === "manifesto" ? (
            <div style={{ fontSize: "0.65rem", color: "#00ffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>SPECTRAL_CLASS:</span>
                <span>[ECOSYSTEMS]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>GRAVITY_MASS:</span>
                <span>[INFINITE]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>MOMENTUM_COMM:</span>
                <span>[CONTINUOUS]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>LUMINESCENCE:</span>
                <span>[HORIZON]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>STATUS:</span>
                <span>[UNFOLDING]</span>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "0.65rem", color: "#00ffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>SPECTRAL_CLASS:</span>
                <span>[{repos[focusedIndex].stats.language}]</span>
              </div>
              {repos[focusedIndex].stats.size > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>GRAVITY_MASS:</span>
                  <span>[{(repos[focusedIndex].stats.size / 1024).toFixed(1)} MB]</span>
                </div>
              )}
              {repos[focusedIndex].stats.commits > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>MOMENTUM_COMM:</span>
                  <span>[{repos[focusedIndex].stats.commits} COMMITS]</span>
                </div>
              )}
              {repos[focusedIndex].stats.stars > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span>LUMINESCENCE:</span>
                  <span>[{repos[focusedIndex].stats.stars} STARS]</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>ENERGY_FLUX:</span>
                <span>[{focusedEnergy !== null ? `${focusedEnergy}%` : "—"}]</span>
              </div>
            </div>
          )}
          
          <div style={{
            fontSize: "0.55rem",
            color: "#86868b",
            textAlign: "center",
            marginTop: "12px",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "6px"
          }}>
            PRESS ENTER TO ENGAGE CORE CAMERA VIEW
          </div>
        </div>
      )}
    </>
  );
}
