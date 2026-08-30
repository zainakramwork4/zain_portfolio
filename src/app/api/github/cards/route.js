const USERNAME = "zainakramwork4";

const headers = () => ({
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
});

const escapeXml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const svg = (body, width = 495, height = 195) =>
  `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" rx="12" fill="#111827" fill-opacity="0.72" stroke="#FEFE5B" stroke-opacity="0.28"/>${body}</svg>`;

const text = (x, y, value, size = 14, weight = 400, fill = "#FFFFFF", anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="Segoe UI, Ubuntu, sans-serif" font-size="${size}px" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${escapeXml(value)}</text>`;

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: headers(),
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`GitHub ${response.status}`);
  return response.json();
}

async function getData() {
  const profile = await github(`/users/${USERNAME}`);
  const repos = await github(`/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`);
  return { profile, repos: Array.isArray(repos) ? repos : [] };
}

async function getLanguages(repos) {
  const totals = {};
  const candidates = repos.filter((repo) => !repo.fork && !repo.archived).slice(0, 30);

  await Promise.all(
    candidates.map(async (repo) => {
      try {
        const languages = await github(`/repos/${USERNAME}/${repo.name}/languages`);
        for (const [language, bytes] of Object.entries(languages)) {
          totals[language] = (totals[language] || 0) + Number(bytes || 0);
        }
      } catch {
        // Ignore a single repository failure and keep the card usable.
      }
    })
  );

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

function statsCard(profile, repos) {
  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  const body = [
    text(28, 36, "GitHub Stats", 20, 700, "#FEFE5B"),
    text(28, 72, `${profile.public_repos || 0} Public Repositories`, 14),
    text(28, 105, `${profile.followers || 0} Followers`, 14),
    text(28, 138, `${stars} Stars`, 14),
    text(28, 171, `${forks} Forks`, 14),
    text(300, 72, "Profile", 14, 600, "#FEFE5B"),
    text(300, 105, profile.name || USERNAME, 14),
    text(300, 138, "github.com/zainakramwork4", 12, 400, "#D1D5DB"),
  ].join("");
  return svg(body);
}

function topLanguagesCard(languages) {
  const total = languages.reduce((sum, [, bytes]) => sum + bytes, 0) || 1;
  const body = [text(28, 36, "Top Languages", 20, 700, "#FEFE5B")];
  languages.forEach(([language, bytes], index) => {
    const y = 68 + index * 20;
    const percent = (bytes / total) * 100;
    const bar = Math.max(2, Math.round(percent * 2.2));
    body.push(text(28, y, language, 12, 500));
    body.push(`<rect x="150" y="${y - 10}" width="220" height="8" rx="4" fill="#374151"/><rect x="150" y="${y - 10}" width="${bar}" height="8" rx="4" fill="#FEFE5B"/>`);
    body.push(text(388, y, `${percent.toFixed(1)}%`, 11, 400, "#D1D5DB"));
  });
  return svg(body.join(""));
}

function pinnedCard(repo) {
  const description = repo?.description || "PakBooking project";
  const body = [
    text(28, 38, "pakbooking", 21, 700, "#FEFE5B"),
    text(28, 72, description.slice(0, 62), 13),
    text(28, 104, `${repo?.language || "JavaScript"}`, 13, 600, "#FEFE5B"),
    text(28, 140, `${repo?.stargazers_count || 0} Stars`, 13),
    text(145, 140, `${repo?.forks_count || 0} Forks`, 13),
    text(28, 174, "github.com/zainakramwork4/pakbooking", 11, 400, "#D1D5DB"),
  ].join("");
  return svg(body);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "stats";

  try {
    const { profile, repos } = await getData();

    let image;
    if (type === "languages") {
      const languages = await getLanguages(repos);
      image = topLanguagesCard(languages);
    } else if (type === "pin") {
      const repo = repos.find((item) => item.name.toLowerCase() === "pakbooking");
      image = pinnedCard(repo);
    } else {
      image = statsCard(profile, repos);
    }

    return new Response(image, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub cards error:", error);
    const fallback = svg(
      text(28, 48, "GitHub data temporarily unavailable", 16, 600, "#FEFE5B") +
        text(28, 82, "Please refresh in a moment.", 13, 400, "#FFFFFF")
    );
    return new Response(fallback, {
      status: 200,
      headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
    });
  }
}

// Keep this route on a dedicated commit so the connected Vercel deployment is retriggered.
