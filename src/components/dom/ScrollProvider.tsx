"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioStore } from "@/state/usePortfolioStore";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface ScrollProviderProps {
  children: React.ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setScrollProgress = usePortfolioStore((state) => state.setScrollProgress);
  const setActiveStage = usePortfolioStore((state) => state.setActiveStage);

  // Initialize interactive Web Audio synthesizers
  useAmbientAudio();

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom Apple-style exponential ease
      infinite: false,
    });

    // 2. Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      
      // Calculate scroll progress (0 to 1)
      const progress = e.progress;
      setScrollProgress(progress);

      // Determine active stage based on scroll progress (6 stages: 0 to 5)
      // Boot (0): [0, 0.15)
      // CampusConnect (1): [0.15, 0.35)
      // Railway AI (2): [0.35, 0.55)
      // AI SaaS (3): [0.55, 0.72)
      // MADHU//OS (4): [0.72, 0.88)
      // Founder's Vision (5): [0.88, 1.0]
      if (progress < 0.15) {
        setActiveStage(0);
      } else if (progress < 0.35) {
        setActiveStage(1);
      } else if (progress < 0.55) {
        setActiveStage(2);
      } else if (progress < 0.72) {
        setActiveStage(3);
      } else if (progress < 0.88) {
        setActiveStage(4);
      } else {
        setActiveStage(5);
      }
    });

    // 3. Drive Lenis updates using GSAP's central requestAnimationFrame ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000); // Lenis expects milliseconds
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing to prevent visual jumps on initial load

    // 4. Setup ScrollTrigger default scroller
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value ?? 0, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // Refresh ScrollTrigger when Lenis scrolls
    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", () => lenis.resize());
    };
  }, [setScrollProgress, setActiveStage]);

  return (
    <div ref={containerRef} id="dom-scrolling-container">
      {children}
    </div>
  );
}
