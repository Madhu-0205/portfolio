import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Fallback curated mock data representing Madhu Valurouthu's real portfolio projects
const MOCK_GITHUB_DATA = [
  {
    name: "campusconnect",
    description: "PROBLEM SOLVED: Fragmented campus listings causing students to miss key opportunities. | STATUS: Active Beta. | TECH: React, Next.js, TS, PostgreSQL, REST APIs.",
    stars: 38,
    forks: 7,
    size: 14200, // diskUsage in KB
    language: "TypeScript",
    updatedAt: "2026-07-11T12:00:00Z",
    commits: 142,
    topics: ["react", "postgresql", "collaboration", "networking"],
    url: "https://github.com/Madhu-0205/campusconnect",
    homepageUrl: "https://www.campusconnectco.in"
  },
  {
    name: "railway-ai",
    description: "PROBLEM SOLVED: High-density rail signal deadlocks causing cascading delays. | STATUS: Smart India Hackathon 2025 Runner-Up. | TECH: Python, FastAPI, A* Search Heuristics, React.",
    stars: 84,
    forks: 12,
    size: 28900,
    language: "Python",
    updatedAt: "2026-07-12T08:30:00Z",
    commits: 268,
    topics: ["a-star-search", "traffic-simulation", "fastapi", "sih-2025"],
    url: "https://github.com/Madhu-0205/railway-ai",
    homepageUrl: "coming-soon"
  },
  {
    name: "jobnest",
    description: "PROBLEM SOLVED: Local businesses failing to reach campus students for short-term work. | STATUS: Prototype testing complete, pivot base. | TECH: Python, PostgreSQL, PostGIS, React, Leaflet.",
    stars: 42,
    forks: 8,
    size: 18400,
    language: "Python",
    updatedAt: "2026-07-12T16:45:00Z",
    commits: 112,
    topics: ["python", "postgresql", "postgis", "gig-economy", "react"],
    url: "https://github.com/Madhu-0205/jobnest",
    homepageUrl: "coming-soon"
  },
  {
    name: "madhu-os",
    description: "PROBLEM SOLVED: Generic portfolios failing to convey engineering depth and visual craft. | STATUS: Deployed production. | TECH: Next.js, React Three Fiber, Three.js, GSAP, Zustand.",
    stars: 256,
    forks: 32,
    size: 11800,
    language: "TypeScript",
    updatedAt: "2026-07-12T19:20:00Z",
    commits: 165,
    topics: ["threejs", "react-three-fiber", "gsap", "webgl"],
    url: "https://github.com/Madhu-0205/portfolio",
    homepageUrl: "https://github.com/Madhu-0205/portfolio"
  },
];

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "Madhu-0205";

  if (!token) {
    // Return mock data if token is not available
    return NextResponse.json(MOCK_GITHUB_DATA, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(first: 30, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            name
            description
            stargazerCount
            forkCount
            diskUsage
            primaryLanguage {
              name
            }
            updatedAt
            url
            homepageUrl
            repositoryTopics(first: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Cache response for 1 hour
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const { data, errors } = await res.json();
    if (errors || !data?.user?.repositories?.nodes) {
      throw new Error("GraphQL parsing error or missing repository nodes");
    }

    const repos = data.user.repositories.nodes.map((node: any) => ({
      name: node.name,
      description: node.description || "",
      stars: node.stargazerCount || 0,
      forks: node.forkCount || 0,
      size: node.diskUsage || 0,
      language: node.primaryLanguage?.name || "Unknown",
      updatedAt: node.updatedAt,
      commits: node.defaultBranchRef?.target?.history?.totalCount || 0,
      topics: node.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [],
      url: node.url,
      homepageUrl: node.homepageUrl
    }));

    return NextResponse.json(repos);
  } catch (error) {
    console.error("Failed to fetch live GitHub data, serving static fallbacks:", error);
    return NextResponse.json(MOCK_GITHUB_DATA, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }
}
