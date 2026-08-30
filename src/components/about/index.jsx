"use client";

import React, { useEffect, useMemo, useState } from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const DEFAULT_USERNAME = "zainakramwork4";

const AboutDetails = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [streakError, setStreakError] = useState(false);

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || DEFAULT_USERNAME;

  useEffect(() => {
    let cancelled = false;

    const loadGithubData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/github", {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "GitHub API request failed");
        }

        if (!cancelled) {
          setProfile(data.profile || null);
          setRepos(Array.isArray(data.repos) ? data.repos : []);
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
    const stars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0
    );
    const forks = repos.reduce(
      (sum, repo) => sum + (repo.forks_count || 0),
      0
    );

    return {
      repos: profile?.public_repos ?? repos.length,
      stars,
      forks,
      followers: profile?.followers ?? 0,
    };
  }, [profile, repos]);

  const pakbooking = repos.find(
    (repo) => repo.name?.toLowerCase() === "pakbooking"
  );

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
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-accent">
                GitHub Top Languages
              </h3>
              <span className="text-xs opacity-60">{username}</span>
            </div>

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
                        className="h-full rounded-full bg-accent transition-all duration-500"
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
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-2xl md:text-3xl font-bold text-accent">
                    {value}
                  </p>
                  <p className="text-xs opacity-70 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-xs opacity-70 mt-4">{error}</p>
            )}
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

        {/* GitHub Streak */}
        <ItemLayout className="col-span-full md:col-span-6 p-0!">
          {streakError ? (
            <div className="w-full min-h-37.5 flex items-center justify-center p-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-accent">GitHub Streak</p>
                <p className="text-xs opacity-70 mt-2">
                  Streak service is temporarily unavailable.
                </p>
              </div>
            </div>
          ) : (
            <img
              className="w-full h-auto object-contain min-h-37.5"
              src="/api/github/streak"
              alt="GitHub Streak"
              loading="lazy"
              onError={() => setStreakError(true)}
            />
          )}
        </ItemLayout>

        {/* Pinned Repository: pakbooking */}
        <ItemLayout className="col-span-full md:col-span-6 flex-col items-start justify-center">
          <Link
            href={
              pakbooking?.html_url ||
              "https://github.com/zainakramwork4/pakbooking"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <div className="w-full rounded-xl border border-white/10 bg-black/20 p-5 hover:bg-black/30 transition-colors">
              <p className="text-xs uppercase tracking-wider opacity-60 mb-2">
                Pinned Project
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-accent">
                pakbooking
              </h3>
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
