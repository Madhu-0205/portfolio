import { NextResponse } from "next/server";

// Fallback curated mock data representing Madhu Valurouthu's real portfolio projects
const MOCK_GITHUB_DATA = [
  {
    name: "campusconnect",
    description: "Decentralized collegiate opportunity and professional resource alignment graph.",
    stars: 38,
    forks: 7,
    size: 14200, // diskUsage in KB
    language: "TypeScript",
    updatedAt: "2026-07-11T12:00:00Z",
    commits: 142,
    topics: ["react", "graphql", "collaboration", "networking"],
    url: "https://github.com/madhu/campusconnect",
    homepageUrl: "https://campusconnect-demo.vercel.app"
  },
  {
    name: "railway-ai",
    description: "Decision support system optimizing high-density traffic deadlocks and signal synchronization.",
    stars: 84,
    forks: 12,
    size: 28900,
    language: "Python",
    updatedAt: "2026-07-12T08:30:00Z",
    commits: 268,
    topics: ["reinforcement-learning", "a-star-search", "traffic-simulation", "sih-2025"],
    url: "https://github.com/madhu/railway-ai",
    homepageUrl: "https://railway-ai-demo.vercel.app"
  },
  {
    name: "jobnest",
    description: "AI-powered proximity matching network connecting local gig workers with micro-opportunities.",
    stars: 42,
    forks: 8,
    size: 18400,
    language: "Python",
    updatedAt: "2026-07-12T16:45:00Z",
    commits: 112,
    topics: ["python", "postgresql", "ai-matching", "gig-economy", "react"],
    url: "https://github.com/madhu/jobnest",
    homepageUrl: "https://jobnest-demo.vercel.app"
  },
  {
    name: "madhu-os",
    description: "Handcrafted 3D cinematic operating system environment and founder observatory.",
    stars: 256,
    forks: 32,
    size: 11800,
    language: "TypeScript",
    updatedAt: "2026-07-12T19:20:00Z",
    commits: 165,
    topics: ["threejs", "react-three-fiber", "gsap", "webgl"],
    url: "https://github.com/madhu/madhu-os",
    homepageUrl: "https://madhu-os-portfolio.vercel.app"
  },
];

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "madhu";

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
