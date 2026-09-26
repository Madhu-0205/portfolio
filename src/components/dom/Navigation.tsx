"use client";

import React from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { Volume2, VolumeX, Terminal, FileText, Activity } from "lucide-react";

export default function Navigation() {
  const activeStage = usePortfolioStore((state) => state.activeStage);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const setSoundEnabled = usePortfolioStore((state) => state.setSoundEnabled);
  const setCommandMenuOpen = usePortfolioStore((state) => state.setCommandMenuOpen);
  const hqLedgerOpen = usePortfolioStore((state) => state.hqLedgerOpen);
  const setHqLedgerOpen = usePortfolioStore((state) => state.setHqLedgerOpen);

  const sections = ["JobNest", "CampusConnect", "Railway AI", "MADHU//OS"];

  const handleScrollTo = (index: number) => {
    const sectionIds = ["chapter-light", "chapter-vision", "chapter-world", "chapter-journey"];
    const element = document.getElementById(sectionIds[index]);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="glass-card interactive" style={{
      position: "fixed",
      top: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "18px",
      padding: "10px 20px",
      zIndex: "var(--z-overlay-ui)",
      opacity: 1,
      transition: "transform 0.3s ease",
      maxWidth: "calc(100vw - 32px)",
    }}>
      {/* Brand logo/dot */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <div style={{
          width: "8px",
          height: "8px",
          backgroundColor: "var(--accent-dot)",
          borderRadius: "50%",
        }} />
        <span style={{
          fontFamily: "var(--font-family-mono)",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
        }}>MADHU//OS</span>
      </div>

      <div className="nav-divider" style={{
        width: "1px",
        height: "16px",
        backgroundColor: "var(--glass-border)",
      }} />

      {/* Nav Links */}
      <div className="nav-links" style={{
        display: "flex",
        gap: "14px",
      }}>
        {sections.map((label, index) => {
          const isActive = activeStage === index;
          return (
            <button
              key={label}
              onClick={() => handleScrollTo(index)}
              style={{
                background: "none",
                border: "none",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                fontFamily: "var(--font-family-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "color var(--duration-default) var(--transition-smooth)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: "0.55rem", opacity: 0.4 }}>0{index + 1}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-divider" style={{
        width: "1px",
        height: "16px",
        backgroundColor: "var(--glass-border)",
      }} />

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        {/* GitHub profile shortcut (resume.pdf placeholder removed until asset exists) */}
        <a
          href="https://github.com/Madhu-0205"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.6rem",
            fontFamily: "var(--font-family-mono)",
            textDecoration: "none",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            transition: "all 0.2s ease",
          }}
          title="Open GitHub Profile"
          className="interactive"
        >
          <FileText size={12} />
          <span>GITHUB</span>
        </a>

        {/* HQ Ledger Console shortcut */}
        <button
          onClick={() => setHqLedgerOpen(!hqLedgerOpen)}
          style={{
            color: hqLedgerOpen ? "var(--color-cyan)" : "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.6rem",
            fontFamily: "var(--font-family-mono)",
            background: "none",
            border: hqLedgerOpen ? "1px solid rgba(6, 182, 212, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)",
            backgroundColor: hqLedgerOpen ? "rgba(6, 182, 212, 0.05)" : "rgba(255, 255, 255, 0.02)",
            transition: "all 0.2s ease",
          }}
          title="Open HQ Logbook"
          className="interactive"
        >
          <Activity size={12} />
          <span>HQ_LOG</span>
        </button>

        {/* Command Menu button */}
        <button
          onClick={() => setCommandMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "4px",
            borderRadius: "4px",
            transition: "color 0.2s ease",
          }}
          title="Open Actions (Cmd+K)"
        >
          <Terminal size={14} />
        </button>

        {/* Audio control */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          style={{
            background: "none",
            border: "none",
            color: soundEnabled ? "var(--text-primary)" : "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px",
            borderRadius: "4px",
            transition: "color 0.2s ease",
          }}
          title={soundEnabled ? "Mute Ambient Sounds" : "Enable Ambient Sounds"}
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          
          {/* Custom Animated Sound wave bars */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "2px",
            height: "9px",
            width: "10px",
          }}>
            <span style={{
              width: "2px",
              height: soundEnabled ? "100%" : "30%",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              animation: soundEnabled ? "wave-bounce 0.8s ease-in-out infinite alternate" : "none",
            }} />
            <span style={{
              width: "2px",
              height: soundEnabled ? "100%" : "40%",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              animation: soundEnabled ? "wave-bounce 0.6s ease-in-out infinite alternate" : "none",
              animationDelay: "0.15s",
            }} />
            <span style={{
              width: "2px",
              height: soundEnabled ? "100%" : "20%",
              backgroundColor: "currentColor",
              borderRadius: "1px",
              animation: soundEnabled ? "wave-bounce 0.7s ease-in-out infinite alternate" : "none",
              animationDelay: "0.3s",
            }} />
          </div>
        </button>
      </div>
    </nav>
  );
}
