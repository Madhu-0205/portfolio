"use client";

import React, { useState } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { X, BookOpen, Cpu } from "lucide-react";

interface LogEntry {
  date: string;
  title: string;
  category: string;
  body: string;
}

const JOURNAL_ENTRIES: LogEntry[] = [
  {
    date: "Jul 13, 2026",
    title: "Launching the Digital HQ Ledger Architecture",
    category: "JOURNAL",
    body: "Integrated a central, permanent digital headquarters console (MADHU//OS HQ) directly into our DOM overlay. This system separates static marketing features from active logbooks, timelines, and research notes. Reorganized data variables to prioritize raw engineering logs and architectural calculations over plain descriptions."
  },
  {
    date: "Jun 28, 2026",
    title: "Transitioning to Cosine Similarity for Skill Matches",
    category: "RESEARCH",
    body: "Replaced simple B-Tree text queries in CampusConnect with vector-space matching. Formulated the matching logic using Cosine Similarity (A • B / ||A|| * ||B||), computing match relevance scores natively. This will allow the matching pipeline to scale across multi-dimensional student skill sets."
  },
  {
    date: "May 14, 2026",
    title: "Post-Mortem: Shifting Focus from JobNest to CampusConnect",
    category: "FOUNDER",
    body: "Conducted user surveys on 50+ students. 90% logged into multiple disparate platforms daily to seek gigs, events, or hackathons. Discovered that students prioritize building together and participating in hackathons over generic classified listings. Pivot decision: restructure JobNest's proximity gig index into CampusConnect's unified opportunity graph."
  },
  {
    date: "Apr 02, 2026",
    title: "Optimizing PostgreSQL Spatial Geography Queries",
    category: "JOURNAL",
    body: "Added composite indices on PostGIS geography columns in JobNest. Used GIST indexing to optimize radius lookup queries (ST_DWithin), reducing coordinate search response latencies for 10,000+ points to under 12ms."
  }
];

const TIMELINE_LOGS = [
  {
    date: "ACTIVE",
    milestone: "Rust Refactoring (Matching Engine)",
    detail: "Refactoring the backend vector matching logic to Rust to leverage parallel processing threads and decrease response times under 5ms."
  },
  {
    date: "Jul 2026",
    milestone: "Digital HQ Console Release",
    detail: "Deployed the MADHU//OS HQ ledger layer to Vercel, integrating live engineering logs, roadmaps, and schema blueprints."
  },
  {
    date: "Jun 2026",
    milestone: "Cosine Similarity Query Integration",
    detail: "Pushed PostgreSQL vector matching updates, adding array comparison calculations for student profiles."
  },
  {
    date: "May 2026",
    milestone: "CampusConnect Beta Release",
    detail: "Shipped the initial opportunity recommendation engine prototype to student test groups."
  }
];

const RESEARCH_EXPERIMENTS = [
  {
    title: "Model Context Protocol (MCP) Node Networks",
    tech: "LLM Orchestration / TypeScript",
    detail: "Building custom MCP server nodes to securely connect generative agents with local file, database, and transponder networks using structured JSON-RPC gateways."
  },
  {
    title: "Multi-Agent System Deadlock Solvers",
    tech: "Python / Reinforcement Learning",
    detail: "Experimenting with multi-agent coordination frameworks (LangGraph/AutoGen) to automate scheduling collision resolution on complex, dynamic transit grids."
  }
];

const ROADMAPS = [
  {
    name: "CampusConnect Graph",
    progress: 75,
    details: "Integrating OAuth college registry validations; building real-time websocket messaging corridors."
  },
  {
    name: "Railway AI Optimizer",
    progress: 85,
    details: "Adding WebGL 3D layout coordinates mapping; building live coordinate streams integrations."
  },
  {
    name: "JobNest Proximity Index",
    progress: 100,
    details: "PostGIS radial lookup indexes deployed and optimized; coordinates obfuscation active."
  }
];

export default function HQLedger() {
  const isOpen = usePortfolioStore((state) => state.hqLedgerOpen);
  const setOpen = usePortfolioStore((state) => state.setHqLedgerOpen);
  const [activeTab, setActiveTab] = useState<"journal" | "timeline" | "research" | "roadmaps">("journal");

  if (!isOpen) return null;

  return (
    <div className="interactive" style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "100%",
      maxWidth: "680px",
      height: "100vh",
      backgroundColor: "rgba(8, 8, 10, 0.88)",
      backdropFilter: "blur(28px)",
      borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
      zIndex: "var(--z-cmd-menu)",
      display: "flex",
      flexDirection: "column",
      color: "var(--text-primary)",
      boxShadow: "-16px 0 64px rgba(0, 0, 0, 0.95)",
      animation: "modal-spring 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
    }}>
      {/* ────────────────── HEADER ────────────────── */}
      <div style={{
        padding: "24px 32px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <div className="mono-tag" style={{ fontSize: "0.6rem", color: "var(--color-cyan)" }}>
            SYSTEM // DIGITAL_HEADQUARTERS
          </div>
          <h2 style={{
            fontFamily: "var(--font-family-display)",
            fontSize: "1.6rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            marginTop: "4px"
          }}>
            HQ Logbook
          </h2>
          <p style={{
            fontFamily: "var(--font-family-serif)",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "var(--text-secondary)"
          }}>
            Continuous engineering logs and system roadmaps
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

      {/* ────────────────── TABS ────────────────── */}
      <div style={{
        padding: "0 32px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        display: "flex",
        gap: "24px",
        backgroundColor: "rgba(255,255,255,0.01)"
      }}>
        {(["journal", "timeline", "research", "roadmaps"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "16px 0",
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

      {/* ────────────────── MAIN CONTENT ────────────────── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px 32px 48px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {activeTab === "journal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {JOURNAL_ENTRIES.map((entry, idx) => (
              <div key={idx} style={{
                border: "1px solid rgba(255,255,255,0.05)",
                backgroundColor: "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-family-mono)", color: "var(--color-cyan)" }}>
                    {entry.category} {"//"} {entry.date}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}><BookOpen size={14} /></span>
                </div>
                <h4 style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#ffffff"
                }}>{entry.title}</h4>
                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.45,
                  color: "var(--text-secondary)",
                  marginTop: "4px"
                }}>{entry.body}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "20px", marginLeft: "8px" }}>
              {TIMELINE_LOGS.map((log, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute",
                    left: "-25px",
                    top: "4px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: log.date === "ACTIVE" ? "var(--color-cyan)" : "var(--text-secondary)",
                    boxShadow: log.date === "ACTIVE" ? "0 0 8px var(--color-cyan)" : "none"
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-family-mono)",
                      color: log.date === "ACTIVE" ? "var(--color-cyan)" : "var(--text-secondary)"
                    }}>{log.date}</span>
                    <span style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#ffffff"
                    }}>{log.milestone}</span>
                  </div>
                  <p style={{
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "var(--text-secondary)",
                    marginTop: "4px"
                  }}>{log.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "research" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {RESEARCH_EXPERIMENTS.map((exp, idx) => (
              <div key={idx} style={{
                border: "1px solid rgba(255,255,255,0.05)",
                backgroundColor: "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-family-mono)", color: "var(--color-cyan)" }}>
                    {exp.tech}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}><Cpu size={14} /></span>
                </div>
                <h4 style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "#ffffff"
                }}>{exp.title}</h4>
                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.45,
                  color: "var(--text-secondary)",
                  marginTop: "4px"
                }}>{exp.detail}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "roadmaps" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {ROADMAPS.map((road, idx) => (
              <div key={idx} style={{
                border: "1px solid rgba(255,255,255,0.05)",
                backgroundColor: "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#ffffff"
                  }}>{road.name}</h4>
                  <span style={{
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-family-mono)",
                    color: "var(--color-cyan)"
                  }}>{road.progress}% COMPLETE</span>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  margin: "6px 0"
                }}>
                  <div style={{
                    width: `${road.progress}%`,
                    height: "100%",
                    backgroundColor: "var(--color-cyan)",
                    borderRadius: "2px"
                  }} />
                </div>

                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.45,
                  color: "var(--text-secondary)",
                  marginTop: "4px"
                }}>{road.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
