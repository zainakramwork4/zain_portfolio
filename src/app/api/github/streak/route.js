const DEFAULT_STREAK_URL = "https://github-readme-streak-stats-rho-rust.vercel.app/";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username =
    process.env.GITHUB_USERNAME ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    "zainakramwork4";
  const baseUrl =
    process.env.GITHUB_STREAK_STATS_URL ||
    process.env.NEXT_PUBLIC_GITHUB_STREAK_STATS_URL ||
    DEFAULT_STREAK_URL;

  const url = new URL(baseUrl);
  url.searchParams.set("user", searchParams.get("user") || username);
  url.searchParams.set("theme", "dark");
  url.searchParams.set("hide_border", "true");
  url.searchParams.set("type", "svg");
  url.searchParams.set("background", "EB545400");
  url.searchParams.set("ring", "FEFE5B");
  url.searchParams.set("currStreakLabel", "FEFE5B");

  try {
    const response = await fetch(url, {
      next: { revalidate: 900 },
      headers: { Accept: "image/svg+xml,text/plain;q=0.9,*/*;q=0.8" },
    });

    if (!response.ok) {
      throw new Error(`Streak service returned ${response.status}`);
    }

    const svg = await response.text();

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("GitHub streak error:", error);
    return new Response("GitHub streak is temporarily unavailable.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
