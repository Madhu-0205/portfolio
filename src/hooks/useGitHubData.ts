"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/state/usePortfolioStore";

export function useGitHubData() {
  const githubData = usePortfolioStore((state) => state.githubData);
  const setGithubData = usePortfolioStore((state) => state.setGithubData);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useEffect(() => {
    // If already loaded, skip refetching
    if (githubData) return;

    // LAZY LOADING STRATEGY:
    // Only trigger the GitHub Observatory fetch after the user engages (starts scrolling).
    // This allows all WebGL shaders to compile and critical visual structures to render first,
    // maintaining a rock-solid 60 FPS initial load without network blockages.
    if (scrollProgress < 0.01) return;

    let active = true;

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
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [githubData, setGithubData, scrollProgress]);

  return githubData;
}
