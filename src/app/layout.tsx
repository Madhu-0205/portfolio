import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// Load Google Fonts using optimized next/font loaders
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport = {
  themeColor: "#050507",
  colorScheme: "dark" as const,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/madhu"),
  title: "Madhu Valurouthu // MADHU//OS",
  description: "A handcrafted 3D interactive cinematic operating system environment and founder engineering observatory.",
  keywords: ["Madhu Valurouthu", "Founder", "Full Stack Engineer", "AI Product Builder", "Three.js", "React Three Fiber", "WebGL Portfolio"],
  authors: [{ name: "Madhu Valurouthu", url: "https://github.com/madhu" }],
  openGraph: {
    title: "Madhu Valurouthu // MADHU//OS",
    description: "A handcrafted 3D interactive cinematic operating system environment and founder engineering observatory.",
    url: "https://github.com/madhu",
    siteName: "MADHU//OS",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MADHU//OS Cinematic Observatory"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhu Valurouthu // MADHU//OS",
    description: "A handcrafted 3D interactive cinematic operating system environment and founder engineering observatory.",
    images: ["/og-image.png"],
    creator: "@madhu",
  },
  alternates: {
    canonical: "https://github.com/madhu"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${geistMono.variable} ${cormorantGaramond.variable}`}
      style={{
        // Set fonts variables dynamically mapping back to variables.css definitions
        "--font-family-body": "var(--font-inter)",
        "--font-family-display": "var(--font-outfit)",
        "--font-family-serif": "var(--font-cormorant-garamond)",
        "--font-family-mono": "var(--font-geist-mono)",
      } as React.CSSProperties}
    >
      <body>
        {/* Structured Data for Search Engine Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Madhu Valurouthu",
                "alternateName": "madhu",
                "jobTitle": ["Founder", "Full Stack Engineer", "AI Product Builder", "Entrepreneur"],
                "url": "https://github.com/madhu",
                "sameAs": [
                  "https://github.com/madhu",
                  "https://linkedin.com/in/madhu-valurouthu"
                ],
                "knowsAbout": [
                  "Full Stack Engineering",
                  "AI Product Development",
                  "System Architecture",
                  "WebGL & 3D Interactive Design"
                ]
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
