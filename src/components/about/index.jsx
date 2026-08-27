"use client";

import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  const githubUsername = "zainakramwork4";

  const githubStatsUrl =
    "https://github-readme-stats-fkr2.vercel.app";

  const githubStreakUrl =
    "https://github-readme-streak-stats-nu-kohl.vercel.app";

  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6 md:gap-8 w-full">

        {/* =========================================
            ABOUT / INTRODUCTION
        ========================================= */}
        <ItemLayout
          className={
            "col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            Architect of Enchantment
          </h2>

          <p className="font-light text-xs sm:text-sm md:text-base">
            My journey in web development is powered by an array of unique
            tools and languages, with JavaScript at the core of everything I
            build. With 4+ years of experience, I work closely with frameworks
            like React.js and Next.js to craft seamless, user-friendly
            websites. With strong design skills, I focus on building fast,
            secure, and visually striking web experiences. Alongside clean
            frontend development, I am also skilled in training Machine
            Learning models. I love exploring new tech and am eager to bring
            my skillset to a team, learn from experienced developers, and
            contribute to real-world projects.
          </p>
        </ItemLayout>

        {/* =========================================
            CLIENTS
        ========================================= */}
        <ItemLayout
          className={
            "col-span-full xs:col-span-6 lg:col-span-4 text-accent"
          }
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            100+{" "}
            <sub className="font-semibold text-base">
              clients
            </sub>
          </p>
        </ItemLayout>

        {/* =========================================
            EXPERIENCE
        ========================================= */}
        <ItemLayout
          className={
            "col-span-full xs:col-span-6 lg:col-span-4 text-accent"
          }
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            5+{" "}
            <sub className="font-semibold text-base">
              years of experience
            </sub>
          </p>
        </ItemLayout>

        {/* =========================================
            GITHUB TOP LANGUAGES
        ========================================= */}
        <ItemLayout
          className={
            "col-span-full sm:col-span-6 md:col-span-4 p-0!"
          }
        >
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src={`${githubStatsUrl}/api/top-langs?username=${githubUsername}&layout=compact&langs_count=8&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&cache_seconds=3600`}
            alt="GitHub Top Languages"
            loading="lazy"
          />
        </ItemLayout>

        {/* =========================================
            GITHUB OVERALL STATS
        ========================================= */}
        <ItemLayout
          className={"col-span-full md:col-span-8 p-0!"}
        >
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src={`${githubStatsUrl}/api?username=${githubUsername}&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&show_icons=true&cache_seconds=3600`}
            alt="GitHub Statistics"
            loading="lazy"
          />
        </ItemLayout>

        {/* =========================================
            SKILLS ICONS
        ========================================= */}
        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src="https://skillicons.dev/icons?i=bootstrap,css,docker,git,github,html,js,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,tailwind,threejs,vercel,vite,vscode,yarn"
            alt="Skills and Technologies"
            loading="lazy"
          />
        </ItemLayout>

        {/* =========================================
            GITHUB STREAK
        ========================================= */}
        <ItemLayout
          className={"col-span-full md:col-span-6 p-0!"}
        >
          <img
            className="w-full h-auto object-contain min-h-37.5"
            src={`${githubStreakUrl}?user=${githubUsername}&theme=dark&hide_border=true&type=svg&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B`}
            alt="GitHub Contribution Streak"
            loading="lazy"
          />
        </ItemLayout>

        {/* =========================================
            PINNED PROJECT - PAKBOOKING
        ========================================= */}
        <ItemLayout
          className={"col-span-full md:col-span-6 p-0!"}
        >
          <Link
            href={`https://github.com/${githubUsername}/pakbooking`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
          >
            <img
              className="w-full h-auto object-contain min-h-37.5"
              src={`${githubStatsUrl}/api/pin?username=${githubUsername}&repo=pakbooking&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false&description_lines_count=2&cache_seconds=3600`}
              alt="PakBooking GitHub Repository"
              loading="lazy"
            />
          </Link>
        </ItemLayout>

      </div>
    </section>
  );
};

export default AboutDetails;