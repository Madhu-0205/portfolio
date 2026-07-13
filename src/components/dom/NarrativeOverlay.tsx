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
      {/* ────────────────── ACT 1: A BEGINNING ────────────────── */}
      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.0, 0.03, 0.06),
      }}>
        My name is Madhu.
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.06, 0.09, 0.12),
      }}>
        I believe technology should create opportunity.
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.12, 0.14, 0.17),
      }}>
        I build products that solve real problems.
      </div>

      {/* ────────────────── ACT 2: WHY I BUILD ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.32, 0.35, 0.38),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.8rem)", fontWeight: 300 }}>
          I build because I love solving difficult problems.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.38, 0.41, 0.44),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.8rem)", fontWeight: 300 }}>
          I build because AI lets us scale human impact.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.44, 0.47, 0.50),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.5rem, 4.5vw, 2.8rem)", fontWeight: 300 }}>
          I build because I want to create companies, not just write code.
        </h2>
      </div>

      {/* Identity Reveal (Stage Transition) */}
      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.50, 0.54, 0.58),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px", letterSpacing: "0.15em" }}>FOUNDER // BUILDER</div>
        <h1 className="title-display" style={{ fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}>
          Madhu Valurouthu
        </h1>
      </div>

      {/* ────────────────── ACT 3: MY JOURNEY ────────────────── */}
      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.70, 0.73, 0.75),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MOMENT_01</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 300 }}>LEARNING TO BUILD</h2>
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.75, 0.78, 0.80),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MOMENT_02</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 300 }}>SMART INDIA HACKATHON</h2>
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.80, 0.82, 0.84),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MOMENT_03</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 300 }}>CAMPUSCONNECT</h2>
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.84, 0.86, 0.88),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MOMENT_04</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 300 }}>THE FUTURE</h2>
      </div>

      {/* ────────────────── ACT 4: THE ENDING ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.88, 0.90, 0.92),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          I'm just getting started.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.92, 0.94, 0.96),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          If you're building something meaningful...
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.96, 0.98, 1.0),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          Let's build it together.
        </h2>
      </div>
    </div>
  );
}
