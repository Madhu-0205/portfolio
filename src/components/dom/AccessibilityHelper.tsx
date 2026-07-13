"use client";

import React, { useMemo, useState } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { useGitHubData } from "@/hooks/useGitHubData";

export default function AccessibilityHelper() {
  const githubData = useGitHubData();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFocus = (index: number, scrollPercent: number) => {
    setFocusedIndex(index);
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = scrollPercent * totalScrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  // Helper to extract repo data or use fallbacks
  const getRepoStats = (repoName: string, defaultStats: any) => {
    if (!githubData) return defaultStats;
    const repo = githubData.find((r: any) => r.name.toLowerCase() === repoName.toLowerCase());
    return repo ? repo : { ...defaultStats, ...repo };
  };

  const repos = useMemo(() => {
    const campusConnect = getRepoStats("campusconnect", { stars: 38, forks: 7, size: 14200, language: "TypeScript", commits: 142, updatedAt: "2026-07-11T12:00:00Z" });
    const railwayAi = getRepoStats("railway-ai", { stars: 84, forks: 12, size: 28900, language: "Python", commits: 268, updatedAt: "2026-07-12T08:30:00Z" });
    const jobNest = getRepoStats("jobnest", { stars: 42, forks: 8, size: 18400, language: "Python", commits: 112, updatedAt: "2026-07-12T16:45:00Z" });
    const madhuOs = getRepoStats("madhu-os", { stars: 256, forks: 32, size: 11800, language: "TypeScript", commits: 165, updatedAt: "2026-07-12T19:20:00Z" });

    return [
      {
        id: "campusconnect",
        title: "Exhibition 01: CampusConnect Monolith",
        description: "A network node grid floating inside a frosted glass monument. Built to unify student directories and opportunity.",
        stats: campusConnect,
        scroll: 0.20
      },
      {
        id: "railway-ai",
        title: "Exhibition 02: Railway AI Monument",
        description: "Spinning titanium rings representing autonomous spatial deadlock resolution. Built as a living railway flow system.",
        stats: railwayAi,
        scroll: 0.40
      },
      {
        id: "jobnest",
        title: "Exhibition 03: JobNest Monument",
        description: "An active concrete reactor cage representing modular proximity gig matchmaking. Geometry slowly assembles itself.",
        stats: jobNest,
        scroll: 0.60
      },
      {
        id: "madhu-os",
        title: "Exhibition 04: MADHU//OS Shrine",
        description: "A basalt shrine with a mirrored titanium core, symbolizing continuous operating system design.",
        stats: madhuOs,
        scroll: 0.80
      },
      {
        id: "manifesto",
        title: "Exhibition 05: The Founder's Vision",
        description: "Rising above all monuments into an open horizon, where the core life chapters unfold as floating crystal fragments.",
        stats: { language: "Ecosystems", size: 0, commits: 0, stars: 999, forks: 0, updatedAt: new Date().toISOString() },
        scroll: 1.00
      }
    ];
  }, [githubData]);

  // Derive energy level helper
  const getEnergy = (updatedAt: string) => {
    try {
      const lastUpdate = new Date(updatedAt).getTime();
      const now = new Date("2026-07-13T10:24:57+05:30").getTime();
      const diffMs = now - lastUpdate;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      return Math.max(10, Math.min(100, Math.round(100 - (diffDays / 365) * 90)));
    } catch (e) {
      return 50;
    }
  };

  return (
    <>
      {/* 1. Visually Hidden (Focusable) Screen-Reader Navigation Menu */}
      <div 
        aria-label="Engineering Observatory & Portfolio monuments"
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
                  href={`#chapter-${repo.id === "campusconnect" ? "light" : repo.id === "railway-ai" ? "vision" : repo.id === "jobnest" ? "world" : repo.id === "madhu-os" ? "journey" : "manifesto"}`}
                  onFocus={() => handleFocus(idx, repo.scroll)}
                  onBlur={() => setFocusedIndex(null)}
                >
                  {repo.id === "manifesto" 
                    ? `${repo.title}. ${repo.description} Open horizon. Press Enter to view.`
                    : `${repo.title}. ${repo.description} Primary language is ${repo.stats.language}, Stars: ${repo.stats.stars}, Forks: ${repo.stats.forks}, Commits: ${repo.stats.commits}.`
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
          <p>3. A product's elegance is measured by the complexity it prevents.</p>
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
                <span>[{repos[focusedIndex].stats.language.toUpperCase()}]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>GRAVITY_MASS:</span>
                <span>[{repos[focusedIndex].stats.size} KB]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>MOMENTUM_COMM:</span>
                <span>[{repos[focusedIndex].stats.commits} PTS]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>LUMINESCENCE:</span>
                <span>[{repos[focusedIndex].stats.stars} LM]</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span>ENERGY_FLUX:</span>
                <span>[{getEnergy(repos[focusedIndex].stats.updatedAt)}%]</span>
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
