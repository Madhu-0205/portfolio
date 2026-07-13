"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { Search, CornerDownLeft, Volume2, Move, Terminal, Activity } from "lucide-react";

export default function CmdMenu() {
  const isOpen = usePortfolioStore((state) => state.commandMenuOpen);
  const setIsOpen = usePortfolioStore((state) => state.setCommandMenuOpen);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const setSoundEnabled = usePortfolioStore((state) => state.setSoundEnabled);
  const setCaseStudyOpen = usePortfolioStore((state) => state.setCaseStudyOpen);
  const setActiveCaseStudyId = usePortfolioStore((state) => state.setActiveCaseStudyId);
  const setHqLedgerOpen = usePortfolioStore((state) => state.setHqLedgerOpen);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // List of command actions
  const commands = [
    {
      id: "stage-0",
      title: "Navigate to Home",
      subtitle: "Jump to the starting cinematic boot sequence",
      icon: <Move size={16} />,
      action: () => scrollToSection("chapter-boot"),
    },
    {
      id: "stage-1",
      title: "Navigate to Identity",
      subtitle: "View student opportunity nodes and directories",
      icon: <Move size={16} />,
      action: () => scrollToSection("chapter-light"),
    },
    {
      id: "stage-2",
      title: "Navigate to Philosophy",
      subtitle: "Inspect spatial deadlock routing conflict maps",
      icon: <Move size={16} />,
      action: () => scrollToSection("chapter-vision"),
    },
    {
      id: "stage-3",
      title: "Navigate to Systems",
      subtitle: "Explore JobNest location matching nodes",
      icon: <Move size={16} />,
      action: () => scrollToSection("chapter-world"),
    },
    {
      id: "stage-4",
      title: "Navigate to Future",
      subtitle: "Access contact nodes and future roadmap details",
      icon: <Move size={16} />,
      action: () => scrollToSection("chapter-journey"),
    },
    {
      id: "case-study-cc",
      title: "Case Study: CampusConnect Graph",
      subtitle: "Open matching and recommendation schema details",
      icon: <Terminal size={16} />,
      action: () => {
        setActiveCaseStudyId("campusconnect");
        setCaseStudyOpen(true);
      }
    },
    {
      id: "case-study-railway",
      title: "Case Study: Railway AI Optimizer",
      subtitle: "Open A* search and decision safety logic details",
      icon: <Terminal size={16} />,
      action: () => {
        setActiveCaseStudyId("railway-ai");
        setCaseStudyOpen(true);
      }
    },
    {
      id: "case-study-jobnest",
      title: "Case Study: JobNest Proximity Index",
      subtitle: "Open PostGIS geo-query and matching schemas",
      icon: <Terminal size={16} />,
      action: () => {
        setActiveCaseStudyId("jobnest");
        setCaseStudyOpen(true);
      }
    },
    {
      id: "case-study-os",
      title: "Case Study: MADHU//OS Engine",
      subtitle: "Open WebGL camera rendering state pipeline",
      icon: <Terminal size={16} />,
      action: () => {
        setActiveCaseStudyId("madhu-os");
        setCaseStudyOpen(true);
      }
    },
    {
      id: "hq-ledger-toggle",
      title: "Open HQ Logbook",
      subtitle: "Open the digital headquarters engineering ledger console",
      icon: <Activity size={16} />,
      action: () => {
        setHqLedgerOpen(true);
      }
    },
    {
      id: "audio-toggle",
      title: soundEnabled ? "Disable Ambient Sounds" : "Enable Ambient Sounds",
      subtitle: "Toggle atmospheric background sounds",
      icon: <Volume2 size={16} />,
      action: () => setSoundEnabled(!soundEnabled),
    },
  ];

  // Helper to scroll to targets
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter commands by search
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      const timer = setTimeout(() => {
        setSelectedIndex(0);
        setSearchQuery("");
      }, 0);
      document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Bind key listeners (Cmd+K, Escape, Arrows, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle modal on Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }

      if (!isOpen) return;

      // Close modal on Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }

      // Navigate options
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }

      // Trigger command
      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen, filteredCommands, selectedIndex]);

  // Close when clicking outside the panel
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className="interactive"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "var(--z-cmd-menu)",
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: "100%",
          maxWidth: "540px",
          backgroundColor: "#0d0d0f",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "modal-spring 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Search Input Box */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          gap: "12px",
        }}>
          <Search size={18} color="var(--text-secondary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              fontFamily: "var(--font-family-body)",
              fontSize: "0.95rem",
              outline: "none",
            }}
          />
          <span style={{
            fontFamily: "var(--font-family-mono)",
            fontSize: "0.65rem",
            color: "var(--text-tertiary)",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            padding: "2px 6px",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}>ESC</span>
        </div>

        {/* Action List */}
        <div style={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "8px",
        }}>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setIsOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: isSelected ? "rgba(255, 255, 255, 0.05)" : "transparent",
                    transition: "background-color 0.15s ease",
                    gap: "12px",
                  }}
                >
                  <div style={{
                    color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    {cmd.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                    }}>
                      {cmd.title}
                    </div>
                    <div style={{
                      fontSize: "0.7rem",
                      color: "var(--text-tertiary)",
                      marginTop: "2px",
                    }}>
                      {cmd.subtitle}
                    </div>
                  </div>
                  {isSelected && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--text-tertiary)",
                    }}>
                      <CornerDownLeft size={12} />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{
              padding: "24px 16px",
              textAlign: "center",
              color: "var(--text-tertiary)",
              fontSize: "0.8rem",
            }}>
              No actions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
