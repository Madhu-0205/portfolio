import React from "react";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";
import ScrollProvider from "@/components/dom/ScrollProvider";
import Navigation from "@/components/dom/Navigation";
import GridOverlay from "@/components/dom/GridOverlay";
import CmdMenu from "@/components/dom/CmdMenu";
import CaseStudyDrawer from "@/components/dom/CaseStudyDrawer";
import NarrativeOverlay from "@/components/dom/NarrativeOverlay";
import AccessibilityHelper from "@/components/dom/AccessibilityHelper";

export const metadata = {
  title: "Madhu Valurouthu // MADHU//OS",
  description: "An immersive, continuous cinematic experience and founder stage inspired by Apple, Linear, and Nothing.",
};

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

      {/* Fixed Narrative Typography Layer (Fixed Midground) */}
      <NarrativeOverlay />

      {/* Scroll Spacers to drive the interactive timeline (Foreground) */}
      <ScrollProvider>
        {/* Chapter 1: Boot (0.00 - 0.15) */}
        <div id="chapter-boot" style={{ height: "120vh" }} />

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
