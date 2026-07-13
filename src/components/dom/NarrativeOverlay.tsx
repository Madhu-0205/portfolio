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
      {/* ────────────────── CHAPTER 1: BOOT ────────────────── */}
      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-mono)",
        fontSize: "clamp(0.85rem, 2.5vw, 1.15rem)",
        color: "var(--text-secondary)",
        letterSpacing: "0.2em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.0, 0.05, 0.10),
      }}>
        INITIALIZING_SYSTEM...
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-mono)",
        fontSize: "clamp(0.9rem, 2.8vw, 1.25rem)",
        color: "var(--text-primary)",
        letterSpacing: "0.25em",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        opacity: getOpacity(scrollProgress, 0.10, 0.14, 0.18),
      }}>
        <span style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#34c759",
          borderRadius: "50%",
        }} />
        SYSTEM_READY.
      </div>

      {/* ────────────────── CHAPTER 3: VISION ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.32, 0.35, 0.38),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
          Design is the start of alignment.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.38, 0.41, 0.44),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
          Engineering is the execution of utility.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.44, 0.47, 0.50),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
          Ecosystems are the space where they meet.
        </h2>
      </div>

      {/* Identity Reveal (Stage Transition) */}
      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.50, 0.54, 0.58),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>FOUNDER // BUILDER // ENGINEER</div>
        <h1 className="title-display" style={{ fontSize: "clamp(2.2rem, 7vw, 5.0rem)" }}>
          Madhu Valurouthu
        </h1>
      </div>

      {/* ────────────────── CHAPTER 5: THE OBSERVED PORTFOLIO ────────────────── */}
      {/* Monument Indicators Fading Into History */}
      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.70, 0.73, 0.76),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MONUMENT_01</div>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 5.5vw, 4.0rem)" }}>THE GRID</h2>
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.75, 0.78, 0.80),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MONUMENT_02</div>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 5.5vw, 4.0rem)" }}>THE REACTOR</h2>
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.79, 0.81, 0.83),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MONUMENT_03</div>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 5.5vw, 4.0rem)" }}>THE SCAFFOLD</h2>
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.82, 0.85, 0.88),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>MONUMENT_04</div>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 5.5vw, 4.0rem)" }}>THE SHRINE</h2>
      </div>

      {/* ────────────────── CHAPTER 6: THE FOUNDER'S VISION ────────────────── */}
      {/* Principle 1: Technology leverage */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.88, 0.90, 0.92),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          Technology is leverage, not the destination.
        </h2>
      </div>

      {/* Principle 2: Empathy and product impact */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.92, 0.94, 0.96),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          Products should speak through the lives they improve.
        </h2>
      </div>

      {/* Principle 3: Long-term thinking / Systems */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.96, 0.98, 1.0),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(2.0rem, 6vw, 4.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          We owe the future systems that endure.
        </h2>
      </div>
    </div>
  );
}
