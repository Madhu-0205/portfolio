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
        “Every product I build starts with a problem I’ve lived.”
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
        “For me, it began with a simple question.”
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
        “Why are student opportunities scattered across ten different platforms, while talent goes unnoticed?”
      </div>

      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.13, 0.16, 0.18),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px", letterSpacing: "0.15em" }}>CHAPTER 1 // INTRODUCTION</div>
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
          I build tools to connect ambition with opportunity.
        </p>
      </div>

      {/* ────────────────── CHAPTER 2: WHERE IT ALL STARTED ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.19, 0.22, 0.25),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>CHAPTER 2 // THE ORIGIN</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I’ve always been driven by a restless curiosity to understand how things work under the surface.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.25, 0.28, 0.31),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “Writing code is just a means. My goal is translating complex friction into simple, useful tools that improve lives.”
        </h2>
      </div>

      {/* ────────────────── CHAPTER 3: JOBNEST ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.32, 0.35, 0.38),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>CHAPTER 3 // JOBNEST</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “JobNest was my first attempt. It started as a proximity network to help students find local gigs and internships.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.38, 0.41, 0.44),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “But as I watched peers use it, I realized jobs are only a fraction of their journey. They needed peers, events, and mentorship.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.44, 0.47, 0.49),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “It was a hard lesson: sometimes the best product decision is knowing when to let go of your initial idea.”
        </h2>
      </div>

      {/* ────────────────── CHAPTER 4: CAMPUSCONNECT ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.50, 0.53, 0.56),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>CHAPTER 4 // CAMPUSCONNECT</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “That turning point became the blueprint for CampusConnect: a single ecosystem integrating opportunities, events, and networks.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.56, 0.59, 0.62),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I architected it to align student ambition directly with resources, preventing talent from slipping through the cracks.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.62, 0.65, 0.68),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “Our goal is to build the default digital ecosystem for student communities across India—and eventually, globally.”
        </h2>
      </div>

      {/* ────────────────── CHAPTER 5: SMART INDIA HACKATHON ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.70, 0.73, 0.76),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>CHAPTER 5 // SMART INDIA HACKATHON</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “At the hackathon Grand Finale, we were handed a national-scale problem: optimizing railway throughput on congested grids.”
        </h2>
      </div>

      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.76, 0.79, 0.82),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I coded the spatial A* routing and deadlock prediction matrices. Working under pressure taught me how to scale systems with a team.”
        </h2>
      </div>

      {/* ────────────────── CHAPTER 6: HOW I BUILD ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.83, 0.86, 0.89),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>CHAPTER 6 // PHILOSOPHY</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “I don’t believe in coding for the sake of technology. I build systems that scale, starting from user friction back to the database.”
        </h2>
      </div>

      {/* ────────────────── CHAPTER 7: THE FUTURE ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.89, 0.92, 0.95),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>CHAPTER 7 // THE FUTURE</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.25,
          color: "var(--text-primary)"
        }}>
          “Right now, I am expanding CampusConnect's graph, exploring local AI matching networks, and building companies that solve human problems.”
        </h2>
      </div>

      {/* ────────────────── CHAPTER 8: LET'S BUILD TOGETHER ────────────────── */}
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
