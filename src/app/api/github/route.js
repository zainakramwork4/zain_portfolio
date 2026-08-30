const DEFAULT_USERNAME = "zainakramwork4";

export async function GET() {
  const username =
    process.env.GITHUB_USERNAME ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    DEFAULT_USERNAME;

  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 900 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
        {
          headers,
          next: { revalidate: 900 },
        }
      ),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      const profileStatus = profileResponse.status;
      const reposStatus = reposResponse.status;
      throw new Error(
        `GitHub API failed (profile ${profileStatus}, repos ${reposStatus})`
      );
    }

    const [profile, repos] = await Promise.all([
      profileResponse.json(),
      reposResponse.json(),
    ]);

    return Response.json(
      {
        username,
        profile,
        repos: Array.isArray(repos) ? repos : [],
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("GitHub API error:", error);

    return Response.json(
      {
        username,
        profile: null,
        repos: [],
        error: "GitHub data could not be loaded right now.",
      },
      { status: 503 }
    );
  }
}
