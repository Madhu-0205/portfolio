"use client";

import React from "react";
import dynamic from "next/dynamic";

// Load WebGL Scene client-side only
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#050505",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "var(--font-family-mono)",
      fontSize: "0.75rem",
      color: "var(--text-secondary)",
      zIndex: 1000,
    }}>
      INITIALIZING_WEBGL_SYSTEM...
    </div>
  )
});

export default function CanvasWrapper() {
  return <Scene />;
}
