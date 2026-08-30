"use client";
import React, { useEffect, useState } from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  // Add a cache-buster after hydration so GitHub cards can refresh
  // without causing a server/client hydration mismatch.
  const [cacheBust, setCacheBust] = useState("");

  useEffect(() => {
    setCacheBust(Date.now());
  }, []);

  const statsQuery = `&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&cache_seconds=3600&v=${cacheBust}`;

  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6 md:gap-8 w-full">
        <ItemLayout
          className={
            "col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            Architect of Enchantment
          </h2>
          <p className="font-light text-xs sm:text-sm md:text-base">
            My journey in web development is powered by an
            array of unique tools and languages, with JavaScript
            at the core of everything I build. With 4+ years of experience,
            I work closely with frameworks like React.js and Next.js to craft seamless,
            user-friendly websites. And strong design skills,
            I focus on building fast, secure, and visually striking web experiences.
            Alongside clean frontend development, I am also skilled
            in training Machine Learning models.
            I love exploring new tech and am eager to bring my skillset to a team,
            learn from experienced developers, and contribute to real-world projects.
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            100+ <sub className="font-semibold text-base">clients</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            5+ <sub className="font-semibold text-base">years of experience</sub>
          </p>
        </ItemLayout>

        {/* GitHub Top Languages */}
        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 p-0!"}
        >
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src={`https://github-readme-stats.vercel.app/api/top-langs?username=zainakramwork4&layout=compact&langs_count=8${statsQuery}`}
            alt="GitHub Top Languages"
            loading="lazy"
          />
        </ItemLayout>

        {/* GitHub Stats */}
        <ItemLayout className={"col-span-full md:col-span-8 p-0!"}>
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src={`https://github-readme-stats.vercel.app/api?username=zainakramwork4&show_icons=true&include_all_commits=true&count_private=false${statsQuery}`}
            alt="GitHub Stats"
            loading="lazy"
          />
        </ItemLayout>

        {/* Skills Icons */}
        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src="https://skillicons.dev/icons?i=bootstrap,css,docker,git,github,html,js,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,tailwind,threejs,vercel,vite,vscode,yarn"
            alt="Skills Icons"
            loading="lazy"
          />
        </ItemLayout>

        {/* GitHub Streak - Zain's own Vercel deployment */}
        <ItemLayout className={"col-span-full md:col-span-6 p-0!"}>
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src={`https://github-readme-streak-stats-rho-rust.vercel.app/?user=zainakramwork4&theme=dark&hide_border=true&type=svg&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B&v=${cacheBust}`}
            alt="GitHub Streak"
            loading="lazy"
          />
        </ItemLayout>

        {/* Pinned Repository: pakbooking */}
        <ItemLayout className={"col-span-full md:col-span-6 p-0!"}>
          <Link
            href="https://github.com/zainakramwork4/pakbooking"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              className="w-full h-auto object-contain min-h-37.5"
              src={`https://github-readme-stats.vercel.app/api/pin?username=zainakramwork4&repo=pakbooking${statsQuery}`}
              alt="Pinned Repo - pakbooking"
              loading="lazy"
            />
          </Link>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
