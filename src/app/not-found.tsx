"use client";

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      backgroundColor: "#050507",
      color: "#ffffff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "var(--font-family-mono), monospace",
      padding: "24px",
      textAlign: "center"
    }}>
      {/* 404 Telemetry Container */}
      <div style={{
        maxWidth: "500px",
        width: "100%",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "8px",
        backgroundColor: "rgba(10, 10, 12, 0.6)",
        padding: "32px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          fontSize: "0.75rem",
          color: "#ff3b30",
          letterSpacing: "0.15em",
          marginBottom: "16px",
          textTransform: "uppercase"
        }}>
          [ TELEMETRY_ALERT // ERROR_404 ]
        </div>

        <h1 style={{
          fontFamily: "var(--font-family-display), sans-serif",
          fontSize: "3.5rem",
          fontWeight: 300,
          margin: "0 0 16px 0",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "#ffffff"
        }}>
          Lost in Space.
        </h1>

        <div style={{
          fontSize: "0.8rem",
          color: "#86868b",
          lineHeight: 1.6,
          marginBottom: "24px",
          textAlign: "left",
          borderLeft: "2px solid #ff3b30",
          paddingLeft: "16px"
        }}>
          <div style={{ marginBottom: "6px" }}><strong>COORDINATES:</strong> UNRESOLVED_NODE</div>
          <div style={{ marginBottom: "6px" }}><strong>ENERGY_LEVEL:</strong> 0%</div>
          <div><strong>DIAGNOSTIC:</strong> The requested vector does not exist in the observatory grid.</div>
        </div>

        {/* Link back home */}
        <Link 
          href="/" 
          style={{
            display: "inline-block",
            fontSize: "0.75rem",
            color: "#00ffff",
            textDecoration: "none",
            border: "1px solid rgba(0, 255, 255, 0.3)",
            borderRadius: "4px",
            padding: "10px 20px",
            letterSpacing: "0.1em",
            transition: "all 0.2s ease",
            backgroundColor: "transparent",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 255, 255, 0.05)";
            e.currentTarget.style.borderColor = "#00ffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(0, 255, 255, 0.3)";
          }}
        >
          [ REENGAGE_CORE_OBSERVATORY ]
        </Link>
      </div>

      <div style={{
        marginTop: "24px",
        fontSize: "0.6rem",
        color: "#424245",
        letterSpacing: "0.05em"
      }}>
        MADHU//OS v2.06 • ALL SYSTEMS DEPLOYED
      </div>
    </div>
  );
}
