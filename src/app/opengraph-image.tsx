import { ImageResponse } from "next/og";

export const alt = "Madhu Valurouthu — Creative Developer & AI Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050507",
          color: "#f5f4f0",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#ff4d2e",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#a8a8ad",
              display: "flex",
            }}
          >
            Engineering Logbook
          </div>
        </div>

        {/* Center identity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Madhu Valurouthu
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#22d3ee",
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            I turn ambitious ideas into working products.
          </div>
        </div>

        {/* Bottom meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#56565c",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Creative Developer</div>
          <div style={{ display: "flex" }}>AI Product Builder</div>
          <div style={{ display: "flex" }}>github.com/Madhu-0205</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
