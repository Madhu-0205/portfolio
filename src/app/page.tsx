import React from "react";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";
import ScrollProvider from "@/components/dom/ScrollProvider";
import Navigation from "@/components/dom/Navigation";
import GridOverlay from "@/components/dom/GridOverlay";
import CmdMenu from "@/components/dom/CmdMenu";
import CaseStudyDrawer from "@/components/dom/CaseStudyDrawer";
import HQLedger from "@/components/dom/HQLedger";
import NarrativeOverlay from "@/components/dom/NarrativeOverlay";
import AccessibilityHelper from "@/components/dom/AccessibilityHelper";

export const metadata = {
  title: "Madhu Valurouthu // MADHU//OS",
  description: "An immersive, continuous cinematic experience and founder stage inspired by Apple, Linear, and Nothing.",
};

/**
 * Static first-view hero.
 * Server-rendered so the first viewport communicates identity with zero JS,
 * zero scrolling, and even if WebGL never initializes. Once the visitor scrolls,
 * it hands off to the cinematic narrative overlay (progress 0.09 - 0.13).
 */
function StaticHero() {
  return (
    <section
      id="static-hero"
      aria-label="Introduction"
      style={{
        position: "relative",
        height: "120vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 var(--space-md)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <div className="mono-tag" style={{ fontSize: "0.65rem", marginBottom: "22px" }}>
          Engineering Logbook // 2026
        </div>
        <h1
          style={{
            fontFamily: "var(--font-family-display)",
            fontSize: "var(--text-display)",
            fontWeight: 700,
            textTransform: "uppercase",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          Madhu
          <br />
          Valurouthu
        </h1>
        <p
          style={{
            fontFamily: "var(--font-family-serif)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.15rem, 3vw, 1.7rem)",
            color: "var(--text-primary)",
            marginTop: "22px",
          }}
        >
          I turn ambitious ideas into working products.
        </p>
        <p
          style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "clamp(0.68rem, 1.8vw, 0.85rem)",
            color: "var(--text-secondary)",
            marginTop: "14px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Creative Developer · AI Product Builder · Data Science Student
        </p>
        <div
          style={{
            display: "flex",
            gap: "28px",
            marginTop: "34px",
            pointerEvents: "auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="https://github.com/Madhu-0205"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive"
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-primary)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "6px",
              padding: "11px 22px",
              backgroundColor: "rgba(255,255,255,0.03)",
              transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            View GitHub
          </a>
          <a
            href="#chapter-light"
            className="interactive"
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "6px",
              padding: "11px 22px",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
          >
            Enter the Gallery ↓
          </a>
        </div>
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "64px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            className="mono-tag"
            style={{ fontSize: "0.62rem", color: "var(--text-tertiary)" }}
          >
            Scroll to explore
          </span>
          <div
            style={{
              width: "1px",
              height: "34px",
              background: "linear-gradient(180deg, var(--accent), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100%", minHeight: "100%" }}>
      {/* Visually hidden semantic accessibility helper for screen readers & tabbing */}
      <AccessibilityHelper />

      {/* 3D WebGL Canvas Layer (Fixed Background) */}
      <CanvasWrapper />

      {/* Persistent HUD & Navigation UI */}
      <GridOverlay />
      <Navigation />
      <CmdMenu />
      <CaseStudyDrawer />
      <HQLedger />

      {/* Fixed Narrative Typography Layer (Fixed Midground) */}
      <NarrativeOverlay />

      {/* Scroll Spacers to drive the interactive timeline (Foreground) */}
      <ScrollProvider>
        {/* Static server-rendered identity — visible at scroll 0 with zero JS */}
        <StaticHero />

        {/* Chapter 2: CampusConnect (0.15 - 0.35) */}
        <div id="chapter-light" style={{ height: "150vh" }} />

        {/* Chapter 3: Railway AI (0.35 - 0.55) */}
        <div id="chapter-vision" style={{ height: "160vh" }} />

        {/* Chapter 4: AI SaaS (0.55 - 0.72) */}
        <div id="chapter-world" style={{ height: "150vh" }} />

        {/* Chapter 5: MADHU//OS Shrine (0.72 - 0.88) */}
        <div id="chapter-journey" style={{ height: "160vh" }} />

        {/* Chapter 6: The Founder's Vision (0.88 - 1.00) */}
        <div id="chapter-manifesto" style={{ height: "220vh" }} />
      </ScrollProvider>
    </main>
  );
}
