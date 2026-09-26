"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";

/**
 * Shared GitHub data loader.
 *
 * Several components mount this hook (repo satellites + accessibility helper).
 * A module-level flag dedupes the network request so the API is hit once per
 * session, not once per mounting component (StrictMode remounts included).
 * The fetch itself starts only after the visitor begins scrolling, so WebGL
 * boot is never blocked by the network.
 */
let fetchStarted = false;

export function useGitHubData() {
  const githubData = usePortfolioStore((state) => state.githubData);
  const setGithubData = usePortfolioStore((state) => state.setGithubData);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // If already loaded, skip refetching
    if (githubData) return;

    // LAZY LOADING STRATEGY:
    // Only trigger the GitHub Observatory fetch after the user engages (starts scrolling).
    // This allows all WebGL shaders to compile and critical visual structures to render first,
    // maintaining a rock-solid 60 FPS initial load without network blockages.
    if (scrollProgress < 0.01) return;

    // One request per session, no matter how many components use this hook
    if (fetchStarted) return;
    fetchStarted = true;

    let active = true;
    cleanupRef.current = () => {
      active = false;
    };

    async function loadData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("API route returned an error status");
        const data = await res.json();
        if (active) {
          setGithubData(data);
        }
      } catch (err) {
        console.error("Failed to load GitHub observatory data:", err);
        // Allow a later retry (e.g. next scroll interaction) after a failure
        fetchStarted = false;
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [githubData, setGithubData, scrollProgress]);

  return githubData;
}
