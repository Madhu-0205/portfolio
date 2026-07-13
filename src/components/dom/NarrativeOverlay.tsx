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
      {/* ────────────────── CHAPTER 1: THE PROBLEM ────────────────── */}
      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.0, 0.02, 0.04),
      }}>
        Every great product begins with a problem.
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.04, 0.06, 0.08),
      }}>
        Mine began with a simple question.
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.4rem, 4vw, 2.3rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        maxWidth: "800px",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.08, 0.11, 0.13),
      }}>
        Why should students search across ten different platforms just to discover one opportunity?
      </div>

      <div style={{
        position: "absolute",
        fontFamily: "var(--font-family-display), sans-serif",
        fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
        fontWeight: 300,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.13, 0.16, 0.18),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px", letterSpacing: "0.15em" }}>CHAPTER 1 // INTRODUCTION</div>
        I'm Madhu Valurouthu. <br />
        <span style={{ fontSize: "0.75em", color: "var(--text-secondary)" }}>I build products that solve real problems.</span>
      </div>

      {/* ────────────────── CHAPTER 2: WHERE IT ALL STARTED ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.19, 0.22, 0.25),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>CHAPTER 2 // THE ORIGIN</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          It started with curiosity: how can technology improve people's lives?
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.25, 0.28, 0.31),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          I build because I enjoy solving difficult problems and creating real impact, not just writing software.
        </h2>
      </div>

      {/* ────────────────── CHAPTER 3: JOBNEST ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.32, 0.35, 0.38),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>CHAPTER 3 // JOBNEST</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          JobNest was my first idea. I wanted to help students find local gigs and internships near proximity.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.38, 0.41, 0.44),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          But jobs are only one part of the journey. Students also need communities, hackathons, and mentorship.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.44, 0.47, 0.49),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300, color: "var(--text-primary)" }}>
          Sometimes building the right product means letting go of your first idea.
        </h2>
      </div>

      {/* ────────────────── CHAPTER 4: CAMPUSCONNECT ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.50, 0.53, 0.56),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>CHAPTER 4 // CAMPUSCONNECT</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          That turning point led to CampusConnect: a single ecosystem combining internships, hackathons, and founder networks.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.56, 0.59, 0.62),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          I built it to connect student ambition directly with resources, ensuring talented students never miss life-changing paths.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.62, 0.65, 0.68),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          Our vision is to become the core digital ecosystem for students across India, and eventually globally.
        </h2>
      </div>

      {/* ────────────────── CHAPTER 5: SMART INDIA HACKATHON ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.70, 0.73, 0.76),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>CHAPTER 5 // SMART INDIA HACKATHON</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          The hackathon was not about the medal. It was a national-scale engineering challenge to optimize railway throughput.
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.76, 0.79, 0.82),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          Coordinating routing logic under intense pressure taught me how to scale systems and build collaboratively with a team.
        </h2>
      </div>

      {/* ────────────────── CHAPTER 6: HOW I BUILD ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.83, 0.86, 0.89),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>CHAPTER 6 // PHILOSOPHY</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          How I build: I design scalable full-stack platforms from the user's perspective, using data to make decisions.
        </h2>
      </div>

      {/* ────────────────── CHAPTER 7: THE FUTURE ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "850px",
        textAlign: "center",
        padding: "0 20px",
        opacity: getOpacity(scrollProgress, 0.89, 0.92, 0.95),
      }}>
        <div className="mono-tag" style={{ marginBottom: "12px" }}>CHAPTER 7 // THE FUTURE</div>
        <h2 className="title-display" style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 300 }}>
          Next: expanding CampusConnect, building local AI products, and launching companies that create long-term impact.
        </h2>
      </div>

      {/* ────────────────── CHAPTER 8: LET'S BUILD TOGETHER ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.95, 0.97, 0.985),
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
        opacity: getOpacity(scrollProgress, 0.985, 0.995, 1.0),
      }}>
        <h2 className="title-display" style={{ fontSize: "clamp(1.6rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2 }}>
          If you're building something meaningful... <br />
          <span style={{ fontSize: "0.8em", color: "var(--text-secondary)" }}>I'd love to build it with you.</span>
        </h2>
      </div>
    </div>
  );
}
