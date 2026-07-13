"use client";

import React from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";

// Smooth opacity curves [start, peak, end]
function getOpacity(scroll: number, start: number, peak: number, end: number) {
  if (scroll < start || scroll > end) return 0;
  if (scroll < peak) {
    return (scroll - start) / (peak - start);
  } else {
    return 1 - (scroll - peak) / (end - peak);
  }
}

export default function NarrativeOverlay() {
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "var(--z-dom-scroll)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "var(--space-md)",
    }}>
      {/* ────────────────── 00 // BOOT SEQUENCE ────────────────── */}
      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-serif)",
        fontStyle: "italic",
        fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "0.01em",
        textAlign: "center",
        maxWidth: "900px",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.0, 0.02, 0.04),
      }}>
        “Every great product begins with a problem.”
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-serif)",
        fontStyle: "italic",
        fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "0.01em",
        textAlign: "center",
        maxWidth: "900px",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.04, 0.06, 0.08),
      }}>
        “Mine began with a simple question.”
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-serif)",
        fontStyle: "italic",
        fontSize: "clamp(1.6rem, 5.5vw, 3.0rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "0.01em",
        textAlign: "center",
        maxWidth: "900px",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.08, 0.11, 0.13),
      }}>
        “Why should students search across ten different platforms just to discover one opportunity?”
      </div>

      {/* ────────────────── 01 // IDENTITY ────────────────── */}
      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.13, 0.16, 0.18),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px", letterSpacing: "0.15em" }}>01 // IDENTITY</div>
        <h1 style={{
          fontFamily: "var(--font-family-display)",
          fontSize: "clamp(2.0rem, 7vw, 4.0rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          lineHeight: 1.0,
          letterSpacing: "-0.03em"
        }}>
          I'm Madhu Valurouthu.
        </h1>
        <p style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
          color: "var(--text-secondary)",
          marginTop: "12px",
          fontWeight: 300
        }}>
          I build products that connect student ambition with opportunity.
        </p>
      </div>

      {/* ────────────────── 02 // PHILOSOPHY ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.19, 0.22, 0.25),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>02 // PHILOSOPHY</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I believe technology should reduce friction, improve decisions, and empower people. Writing code is just the medium.”
        </h2>
      </div>

      {/* ────────────────── 03 // MISSION ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.26, 0.29, 0.32),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>03 // MISSION</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “My mission is to build the default digital ecosystem for student growth—bridging the gap between talent and real resources.”
        </h2>
      </div>

      {/* ────────────────── 04 // SYSTEMS I'VE BUILT ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.35, 0.39, 0.43),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>04 // SYSTEMS I'VE BUILT // JOBNEST</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “JobNest was my first idea. A hyperlocal opportunity map connecting students to nearby gigs and part-time work.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.43, 0.47, 0.51),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “But building it taught me that students need more than jobs. They need peers, hackathons, skill exchanges, and mentorship.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.53, 0.57, 0.61),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>04 // SYSTEMS I'VE BUILT // CAMPUSCONNECT</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “That led to CampusConnect: a single recommendation engine unifying directories, hackathons, events, and founder networks.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.61, 0.65, 0.69),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I architected it to index fragmented opportunities and ensure that student talent never goes unnoticed.”
        </h2>
      </div>

      {/* ────────────────── 05 // ENGINEERING JOURNEY ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.71, 0.75, 0.79),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>05 // ENGINEERING JOURNEY // SIH 2025</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “At the Smart India Hackathon Grand Finale, we optimized railway throughput on high-density routing grids.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.79, 0.83, 0.87),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I coded the spatial routing logic and conflict matrices. It taught me how to scale systems and build collaboratively.”
        </h2>
      </div>

      {/* ────────────────── 06 // FUTURE VISION ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.88, 0.92, 0.95),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>06 // FUTURE VISION</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “Right now, I am expanding CampusConnect, exploring local AI matching networks, and building companies that solve human problems.”
        </h2>
      </div>

      {/* ────────────────── 07 // CONNECT ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.95, 0.975, 0.985),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
          fontWeight: 300,
          lineHeight: 1.2,
          color: "var(--text-primary)"
        }}>
          “I'm just getting started.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.985, 0.995, 1.0),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
          fontWeight: 300,
          lineHeight: 1.2,
          color: "var(--text-primary)"
        }}>
          “If you're building something meaningful... <br />
          I'd love to build it with you.”
        </h2>
      </div>
    </div>
  );
}
