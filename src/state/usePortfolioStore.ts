import { create } from "zustand";

interface PortfolioState {
  // Loading & Asset States
  loadingProgress: number;
  isLoaded: boolean;
  setLoadingProgress: (progress: number) => void;
  setLoaded: (loaded: boolean) => void;

  // Scroll & Phase Progression
  scrollProgress: number;
  activeStage: number;
  setScrollProgress: (progress: number) => void;
  setActiveStage: (stage: number) => void;

  // Settings & Navigation Controls
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  commandMenuOpen: boolean;
  setCommandMenuOpen: (open: boolean) => void;

  // Interaction State
  cursorState: "default" | "hover" | "drag";
  setCursorState: (state: "default" | "hover" | "drag") => void;

  // GitHub Data
  githubData: Record<string, unknown>[] | null;
  setGithubData: (data: Record<string, unknown>[]) => void;

  // Case Study Overlay Drawer
  caseStudyOpen: boolean;
  activeCaseStudyId: string;
  setCaseStudyOpen: (open: boolean) => void;
  setActiveCaseStudyId: (id: string) => void;

  // Digital HQ Ledger console
  hqLedgerOpen: boolean;
  setHqLedgerOpen: (open: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  // Initial states
  loadingProgress: 0,
  isLoaded: false,
  scrollProgress: 0,
  activeStage: 0,
  soundEnabled: false,
  commandMenuOpen: false,
  cursorState: "default",
  githubData: null,
  caseStudyOpen: false,
  activeCaseStudyId: "",
  hqLedgerOpen: false,

  // Actions
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveStage: (stage) => set({ activeStage: stage }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setCommandMenuOpen: (open) => set({ commandMenuOpen: open }),
  setCursorState: (state) => set({ cursorState: state }),
  setGithubData: (data) => set({ githubData: data }),
  setCaseStudyOpen: (open) => set({ caseStudyOpen: open }),
  setActiveCaseStudyId: (id) => set({ activeCaseStudyId: id }),
  setHqLedgerOpen: (open) => set({ hqLedgerOpen: open }),
}));
