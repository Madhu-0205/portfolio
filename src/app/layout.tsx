import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

// ─── Typography system ───────────────────────────────────────────────
// Space Grotesk  → display / identity (technical warmth)
// Fraunces       → editorial narrative voice (serif, optical sizing)
// Geist Mono     → telemetry labels, code, metadata
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/Madhu-0205/portfolio"),
  title: {
    default: "Madhu Valurouthu — Creative Developer & AI Product Builder",
    template: "%s — Madhu Valurouthu",
  },
  description:
    "I turn ambitious ideas into working products. Madhu Valurouthu builds AI-first software — campus opportunity platforms, decision-support systems, and immersive web experiences.",
  keywords: [
    "Madhu Valurouthu",
    "Creative Developer",
    "AI Product Builder",
    "Data Science",
    "Full Stack Engineer",
    "Next.js",
    "Three.js",
    "WebGL Portfolio",
  ],
  authors: [{ name: "Madhu Valurouthu", url: "https://github.com/Madhu-0205" }],
  creator: "Madhu Valurouthu",
  openGraph: {
    title: "Madhu Valurouthu — Creative Developer & AI Product Builder",
    description:
      "I turn ambitious ideas into working products. Explore the engineering logbook: CampusConnect, Railway AI, JobNest, and this site.",
    url: "https://github.com/Madhu-0205/portfolio",
    siteName: "Madhu Valurouthu — Portfolio",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhu Valurouthu — Creative Developer & AI Product Builder",
    description: "I turn ambitious ideas into working products. Explore the engineering logbook.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable} ${geistMono.variable}`}>
      <body>
        {/* Structured Data — verified facts only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Madhu Valurouthu",
                jobTitle: ["Creative Developer", "AI Product Builder"],
                description: "Data science student building AI-first products and immersive web experiences.",
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "Pragati Engineering College",
                },
                url: "https://github.com/Madhu-0205",
                sameAs: [
                  "https://github.com/Madhu-0205",
                  "https://linkedin.com/in/madhu-valurouthu",
                ],
                email: "mailto:madhu.valurouthu@gmail.com",
                knowsAbout: [
                  "Full Stack Engineering",
                  "AI Product Development",
                  "Data Science",
                  "WebGL & Interactive Design",
                ],
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
