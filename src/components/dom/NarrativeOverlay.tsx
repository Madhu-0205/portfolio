"use client";

import React, { useMemo } from "react";
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

  // Divide Act 7 principles
  const principles = useMemo(() => [
    { text: "I begin with the problem.", range: [0.880, 0.885, 0.890] as [number, number, number] },
    { text: "I design for people.", range: [0.890, 0.895, 0.900] as [number, number, number] },
    { text: "I iterate continuously.", range: [0.900, 0.903, 0.907] as [number, number, number] },
    { text: "I value simplicity over complexity.", range: [0.907, 0.910, 0.914] as [number, number, number] },
    { text: "AI should amplify people.", range: [0.914, 0.917, 0.921] as [number, number, number] },
    { text: "Technology should remove friction.", range: [0.921, 0.924, 0.927] as [number, number, number] },
    { text: "Products should earn trust.", range: [0.927, 0.930, 0.933] as [number, number, number] },
  ], []);

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
      {/* ────────────────── ACT 1: EVERY GREAT PRODUCT BEGINS WITH A QUESTION (0.00 - 0.12) ────────────────── */}
      {/* Part 1 */}
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
        opacity: getOpacity(scrollProgress, 0.0, 0.015, 0.03),
      }}>
        “Every great product begins with a question.”
      </div>

      {/* Part 2 */}
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
        opacity: getOpacity(scrollProgress, 0.03, 0.045, 0.06),
      }}>
        “What if this could be better?”
      </div>

      {/* Part 3 */}
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
        opacity: getOpacity(scrollProgress, 0.06, 0.075, 0.09),
      }}>
        “I've been asking that question since I started building.”
      </div>

      {/* Part 4: Identity Reveal */}
      <div style={{
        position: "absolute",
        textAlign: "center",
        opacity: getOpacity(scrollProgress, 0.09, 0.11, 0.13),
      }}>
        <h1 style={{
          fontFamily: "var(--font-family-display)",
          fontSize: "clamp(2.4rem, 8vw, 4.8rem)",
          fontWeight: 700,
          textTransform: "uppercase",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          margin: 0
        }}>
          Madhu Valurouthu
        </h1>
        <p style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
          color: "var(--text-secondary)",
          marginTop: "16px",
          letterSpacing: "0.2em",
          textTransform: "uppercase"
        }}>
          AI Engineer // Product Builder // Future Founder
        </p>
      </div>

      {/* ────────────────── ACT 2: THE CURIOUS STUDENT (0.13 - 0.18) ────────────────── */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.13, 0.155, 0.18),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px", letterSpacing: "0.15em" }}>ACT 02 // THE CURIOUS STUDENT</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “I didn't start with frameworks or architecture. I started with curiosity. Sitting in lecture halls, I wanted to understand how digital ideas become products. I chose to build instead of simply learning—discovering coding not as a classroom exercise, but as a medium to create.”
        </h2>
      </div>

      {/* ────────────────── ACT 3: JOBNEST (0.18 - 0.35) ────────────────── */}
      {/* Chapter 1: The Assumption */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.18, 0.205, 0.23),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>ACT 03 // JOBNEST // THE WRONG ASSUMPTION</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “JobNest was my first idea. A hyperlocal opportunity map connecting students to nearby gigs. I believed students only needed jobs.”
        </h2>
      </div>

      {/* Chapter 2: The Realization */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.23, 0.26, 0.29),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “But while building, I realized the wrong assumption. Opportunities were scattered across LinkedIn, WhatsApp, Telegram, and portals. Students didn't just need jobs—they needed an entire integrated ecosystem.”
        </h2>
      </div>

      {/* Chapter 3: Pivot Heuristic */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.29, 0.32, 0.35),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “Sometimes the best products begin when you're willing to rethink the first idea.”
        </h2>
      </div>

      {/* ────────────────── ACT 4: CAMPUSCONNECT (0.35 - 0.55) ────────────────── */}
      {/* Chapter 1: Problem */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.35, 0.38, 0.41),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>ACT 04 // CAMPUSCONNECT // UNIFYING DISCOVERY</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “Why does CampusConnect exist? Students don't lack talent. They lack visibility. They miss internships, hackathons, founder communities, and mentorship because resources are fragmented across a dozen silent silos.”
        </h2>
      </div>

      {/* Chapter 2: System Unification */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.41, 0.44, 0.47),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “I built CampusConnect to merge these channels into a single graph ecosystem. A digital home where student opportunities discover you instead of searching endlessly.”
        </h2>
      </div>

      {/* Chapter 3: Proof of Traction */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.47, 0.51, 0.55),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “Launched to real users. Verified through live college deployments, resolving the discovery friction that isolates builders.”
        </h2>
      </div>

      {/* ────────────────── ACT 5: RAILWAY AI (0.55 - 0.72) ────────────────── */}
      {/* Chapter 1: The Junction deadlock */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.55, 0.575, 0.60),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>ACT 05 // RAILWAY AI // HUMAN-IN-THE-LOOP</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “At high-density train junctions, grid congestion causes compounding delays. Two trains. One conflict. A grid deadlock.”
        </h2>
      </div>

      {/* Chapter 2: The Core Question */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.60, 0.63, 0.66),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “What if AI could help controllers make faster decisions without replacing them?”
        </h2>
      </div>

      {/* Chapter 3: Heuristic Resolution */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.66, 0.69, 0.72),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “I built the spatial routing logic and conflict matrices using deterministic A* search heuristics. The best AI doesn't replace people. It helps them make better decisions.”
        </h2>
      </div>

      {/* ────────────────── ACT 6: MADHU//OS (0.72 - 0.88) ────────────────── */}
      {/* Chapter 1: Motivation */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.72, 0.76, 0.80),
      }}>
        <div className="mono-tag" style={{ marginBottom: "16px" }}>ACT 06 // MADHU//OS // THE PORTFOLIO CASE STUDY</div>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “This portfolio does not exist to impress. It exists to communicate. It is a spatial case study in design wireframes, code commits, performance trade-offs, and building failures.”
        </h2>
      </div>

      {/* Chapter 2: Transparency */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.80, 0.84, 0.88),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 4.5vw, 2.4rem)",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--text-primary)"
        }}>
          “By treating the portfolio as a product, you see exactly how I think, write, and deploy. Every pixel, shader, and frame was crafted to tell an honest builder story.”
        </h2>
      </div>

      {/* ────────────────── ACT 7: HOW I BUILD (0.88 - 0.93) ────────────────── */}
      {/* Individual Principles */}
      {principles.map((p, idx) => (
        <div 
          key={idx}
          style={{
            position: "absolute",
            maxWidth: "800px",
            textAlign: "center",
            padding: "0 24px",
            opacity: getOpacity(scrollProgress, p.range[0], p.range[1], p.range[2]),
          }}
        >
          <div className="mono-tag" style={{ marginBottom: "16px" }}>ACT 07 // CORE PRINCIPLES // HOW I BUILD</div>
          <h2 style={{
            fontFamily: "var(--font-family-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.8rem, 5.5vw, 3.0rem)",
            fontWeight: 300,
            lineHeight: 1.3,
            color: "var(--text-primary)"
          }}>
            “{p.text}”
          </h2>
        </div>
      ))}

      {/* ────────────────── ACT 8: THE FUTURE (0.93 - 0.97) ────────────────── */}
      {/* Part 1: Visual roadmap direction */}
      <div style={{
        position: "absolute",
        width: "100%",
        maxWidth: "900px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.93, 0.942, 0.952),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div className="mono-tag" style={{ marginBottom: "24px" }}>ACT 08 // THE ROAD AHEAD // THE FUTURE</div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          fontFamily: "var(--font-family-mono)",
          fontSize: "clamp(0.85rem, 2.2vw, 1.1rem)",
          color: "var(--text-primary)",
          letterSpacing: "0.05em",
          textTransform: "uppercase"
        }}>
          <span>CampusConnect</span>
          <span style={{ color: "var(--accent-cyan)", opacity: 0.6 }}>→</span>
          <span>AI Products</span>
          <span style={{ color: "var(--accent-cyan)", opacity: 0.6 }}>→</span>
          <span>Automation</span>
          <span style={{ color: "var(--accent-cyan)", opacity: 0.6 }}>→</span>
          <span>Startup</span>
          <span style={{ color: "var(--accent-cyan)", opacity: 0.6 }}>→</span>
          <span style={{ color: "var(--accent-cyan)" }}>Global Impact</span>
        </div>
      </div>

      {/* Part 2: Dynamic Ending */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.952, 0.962, 0.970),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 6vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.3,
          color: "var(--text-primary)"
        }}>
          “I'm just getting started.”
        </h2>
      </div>

      {/* ────────────────── ACT 9: LET'S BUILD TOGETHER (0.97 - 1.00) ────────────────── */}
      {/* Sentence 1 */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.970, 0.974, 0.978),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
          fontWeight: 300,
          lineHeight: 1.3,
          color: "var(--text-primary)"
        }}>
          “Every project in this portfolio began with a problem worth solving.”
        </h2>
      </div>

      {/* Sentence 2 */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.978, 0.982, 0.986),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
          fontWeight: 300,
          lineHeight: 1.3,
          color: "var(--text-primary)"
        }}>
          “I'm still looking for the next one.”
        </h2>
      </div>

      {/* Sentence 3 */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.986, 0.990, 0.993),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
          fontWeight: 300,
          lineHeight: 1.3,
          color: "var(--text-primary)"
        }}>
          “If you're building something meaningful...”
        </h2>
      </div>

      {/* Sentence 4 */}
      <div style={{
        position: "absolute",
        maxWidth: "800px",
        textAlign: "center",
        padding: "0 24px",
        opacity: getOpacity(scrollProgress, 0.993, 0.997, 1.0),
      }}>
        <h2 style={{
          fontFamily: "var(--font-family-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.8rem, 5.5vw, 3.2rem)",
          fontWeight: 300,
          lineHeight: 1.3,
          color: "var(--text-primary)"
        }}>
          “Let's build it together.”
        </h2>
      </div>
    </div>
  );
}
