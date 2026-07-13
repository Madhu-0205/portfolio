"use client";

import React, { useState, useEffect } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";

export default function GridOverlay() {
  const [coords, setCoords] = useState({ x: 0.0, y: 0.0 });
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values to 0.00 - 1.00 format
      const nx = (e.clientX / window.innerWidth).toFixed(2);
      const ny = (e.clientY / window.innerHeight).toFixed(2);
      setCoords({ x: parseFloat(nx), y: parseFloat(ny) });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const visible = scrollProgress >= 0.09;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none", // Let interaction pass through
      zIndex: "var(--z-overlay-ui)",
      opacity: visible ? 1 : 0,
      transition: "opacity 1.2s ease-in-out",
    }}>
      {/* Background Dot-Matrix Overlay */}
      <div className="dot-grid" style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
      }} />

      {/* Grid Border Lines */}
      <div style={{
        position: "absolute",
        top: "44px",
        bottom: "44px",
        left: "44px",
        right: "44px",
        border: "1px solid rgba(255, 255, 255, 0.03)",
      }} />

      {/* Telemetry Scanning Laser Line */}
      <div style={{
        position: "absolute",
        left: "44px",
        right: "44px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.18), transparent)",
        animation: "scanline 10s linear infinite",
      }} />

      {/* Dynamic Telemetry Accents */}
      {/* Top Left: System Status */}
      <div style={{
        position: "absolute",
        top: "48px",
        left: "48px",
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.6rem",
        color: "var(--text-secondary)",
        letterSpacing: "0.15em",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{
          width: "4px",
          height: "4px",
          backgroundColor: "#10b981", // Active green
          borderRadius: "50%",
          boxShadow: "0 0 8px #10b981",
        }} />
        MADHU//OS // ACTIVE
      </div>

      {/* Top Right: Render pipeline */}
      <div style={{
        position: "absolute",
        top: "48px",
        right: "48px",
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.6rem",
        color: "var(--text-secondary)",
        letterSpacing: "0.15em",
      }}>
        SELECTED_WORK // INDEX_2026
      </div>

      {/* Bottom Left: Mouse coordinates */}
      <div style={{
        position: "absolute",
        bottom: "48px",
        left: "48px",
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.6rem",
        color: "var(--text-secondary)",
        letterSpacing: "0.15em",
      }}>
        COORD_INDEX: X_{coords.x.toFixed(2)} Y_{coords.y.toFixed(2)}
      </div>

      {/* Bottom Right: Frame metrics */}
      <div style={{
        position: "absolute",
        bottom: "48px",
        right: "48px",
        fontFamily: "var(--font-family-mono)",
        fontSize: "0.6rem",
        color: "var(--text-secondary)",
        letterSpacing: "0.15em",
      }}>
        CHAPTER_FLOW // SMOOTH_LENIS
      </div>
    </div>
  );
}
