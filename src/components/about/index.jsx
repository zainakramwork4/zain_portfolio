"use client";
import React, { useEffect, useMemo, useState } from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const GITHUB_USERNAME = "zainakramwork4";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const AboutDetails = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadGithubData = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileResponse, reposResponse] = await Promise.all([
          fetch(GITHUB_API, { headers: { Accept: "application/vnd.github+json" } }),
          fetch(GITHUB_REPOS_API, { headers: { Accept: "application/vnd.github+json" } }),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub API request failed");
        }

        const [profileData, reposData] = await Promise.all([
          profileResponse.json(),
          reposResponse.json(),
        ]);

        if (!cancelled) {
          setProfile(profileData);
          setRepos(Array.isArray(reposData) ? reposData : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError("GitHub data could not be loaded right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadGithubData();

    return () => {
      cancelled = true;
    };
  }, []);

  const languages = useMemo(() => {
    const counts = {};

    repos.forEach((repo) => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
      }
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const total = sorted.reduce((sum, [, count]) => sum + count, 0) || 1;

    return sorted.slice(0, 6).map(([name, count]) => ({
      name,
      count,
      percentage: Math.max(8, Math.round((count / total) * 100)),
    }));
  }, [repos]);

  const stats = useMemo(() => {
    const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    const forks = repos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

    return {
      repos: profile?.public_repos ?? repos.length,
      stars,
      forks,
      followers: profile?.followers ?? 0,
    };
  }, [profile, repos]);

  const pakbooking = repos.find((repo) => repo.name.toLowerCase() === "pakbooking");

  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6 md:gap-8 w-full">
        <ItemLayout className="col-span-full lg:col-span-8 row-span-2 flex-col items-start">
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            Architect of Enchantment
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base">
            My journey in web development is powered by an array of unique tools
            and languages, with JavaScript at the core of everything I build.
            With 4+ years of experience, I work closely with React.js and Next.js
            to craft seamless, user-friendly websites.
          </p>
        </ItemLayout>

        <ItemLayout className="col-span-full xs:col-span-6 lg:col-span-4 text-accent">
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            100+ <sub className="font-semibold text-base">clients</sub>
          </p>
        </ItemLayout>

        <ItemLayout className="col-span-full xs:col-span-6 lg:col-span-4 text-accent">
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            5+ <sub className="font-semibold text-base">years of experience</sub>
          </p>
        </ItemLayout>

        {/* GitHub Top Languages */}
        <ItemLayout className="col-span-full sm:col-span-6 md:col-span-4 flex-col items-start justify-center">
          <div className="w-full">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-accent">
              GitHub Top Languages
            </h3>
            {loading ? (
              <p className="text-sm opacity-70">Loading GitHub data...</p>
            ) : languages.length ? (
              <div className="space-y-3">
                {languages.map((language) => (
                  <div key={language.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{language.name}</span>
                      <span>{language.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${language.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm opacity-70">No language data available.</p>
            )}
          </div>
        </ItemLayout>

        {/* GitHub Stats */}
        <ItemLayout className="col-span-full md:col-span-8 flex-col items-start justify-center">
          <div className="w-full">
            <h3 className="text-lg md:text-xl font-semibold mb-5 text-accent">
              GitHub Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                [stats.repos, "Public Repos"],
                [stats.stars, "Total Stars"],
                [stats.forks, "Total Forks"],
                [stats.followers, "Followers"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-2xl md:text-3xl font-bold text-accent">{value}</p>
                  <p className="text-xs opacity-70 mt-1">{label}</p>
                </div>
              ))}
            </div>
            {error && <p className="text-xs opacity-70 mt-4">{error}</p>}
          </div>
        </ItemLayout>

        {/* Skills Icons */}
        <ItemLayout className="col-span-full">
          <img
            className="w-full h-auto"
            src="https://skillicons.dev/icons?i=bootstrap,css,docker,git,github,html,js,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,tailwind,threejs,vercel,vite,vscode,yarn"
            alt="Skills Icons"
            loading="lazy"
          />
        </ItemLayout>

        {/* GitHub Streak - verified working Vercel deployment */}
        <ItemLayout className="col-span-full md:col-span-6 p-0!">
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src="https://github-readme-streak-stats-rho-rust.vercel.app/?user=zainakramwork4&theme=dark&hide_border=true&type=svg&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B"
            alt="GitHub Streak"
            loading="lazy"
          />
        </ItemLayout>

        {/* Pinned Repository - pakbooking */}
        <ItemLayout className="col-span-full md:col-span-6 flex-col items-start justify-center">
          <Link
            href="https://github.com/zainakramwork4/pakbooking"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <div className="w-full rounded-xl border border-white/10 bg-black/20 p-5 hover:bg-black/30 transition-colors">
              <p className="text-xs uppercase tracking-wider opacity-60 mb-2">Pinned Project</p>
              <h3 className="text-xl md:text-2xl font-semibold text-accent">pakbooking</h3>
              <p className="text-sm opacity-75 mt-2 line-clamp-2">
                {pakbooking?.description || "PakBooking project repository"}
              </p>
              <div className="flex flex-wrap gap-4 mt-5 text-xs opacity-80">
                <span>★ {pakbooking?.stargazers_count ?? 0}</span>
                <span>⑂ {pakbooking?.forks_count ?? 0}</span>
                <span>{pakbooking?.language || "JavaScript"}</span>
              </div>
              <p className="text-xs text-accent mt-4">View repository →</p>
            </div>
          </Link>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
