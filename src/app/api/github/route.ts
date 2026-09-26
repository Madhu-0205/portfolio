import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Fallback profile data used only when GITHUB_TOKEN is not configured.
// No stars/forks/commits are invented here: the UI renders live GitHub data,
// or neutral non-numeric placeholders until real data is available.
const FALLBACK_GITHUB_DATA = [
  {
    name: "campusconnect",
    description: "Unified collegiate opportunity graph connecting students to hackathons, gigs, and peer projects. TECH: React, Next.js, TypeScript, PostgreSQL.",
    language: "TypeScript",
    topics: ["react", "postgresql", "collaboration", "networking"],
    url: "https://github.com/Madhu-0205/campusconnect",
    homepageUrl: "https://www.campusconnectco.in"
  },
  {
    name: "railway-ai",
    description: "Decision-support optimizer resolving simulated rail signal deadlocks with A* search. Smart India Hackathon 2025 Grand Finale Runner-Up. TECH: Python, FastAPI, A* Heuristics, React.",
    language: "Python",
    topics: ["a-star-search", "traffic-simulation", "fastapi", "sih-2025"],
    url: "https://github.com/Madhu-0205/railway-ai",
    homepageUrl: null
  },
  {
    name: "jobnest",
    description: "Hyperlocal gig-matching index using PostGIS proximity queries. Prototype validated with student peers; foundation for CampusConnect. TECH: Python, PostgreSQL, PostGIS, React, Leaflet.",
    language: "Python",
    topics: ["python", "postgresql", "postgis", "gig-economy", "react"],
    url: "https://github.com/Madhu-0205/jobnest",
    homepageUrl: null
  },
  {
    name: "portfolio",
    description: "This site: an immersive WebGL engineering logbook built with Next.js, React Three Fiber, GSAP, and Zustand.",
    language: "TypeScript",
    topics: ["threejs", "react-three-fiber", "gsap", "webgl"],
    url: "https://github.com/Madhu-0205/portfolio",
    homepageUrl: null
  },
];

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "Madhu-0205";

  if (!token) {
    // Return neutral profile data (no invented metrics) when no token is available
    return NextResponse.json(FALLBACK_GITHUB_DATA, {
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
    console.error("Failed to fetch live GitHub data, serving neutral fallbacks:", error);
    return NextResponse.json(FALLBACK_GITHUB_DATA, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  }
}
