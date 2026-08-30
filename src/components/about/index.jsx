"use client";

import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  return (
    <section className="w-full py-16 sm:py-20">
      <div className="grid w-full grid-cols-12 gap-4 xs:gap-6 md:gap-8">
        <ItemLayout className="col-span-full lg:col-span-8 row-span-2 flex-col items-start justify-center">
          <div className="w-full max-w-3xl text-left">
            <h2 className="w-full text-left text-xl font-semibold capitalize leading-tight tracking-tight md:text-2xl">
              Architect of Enchantment
            </h2>
            <p className="mt-4 w-full text-left text-xs font-light leading-6 sm:text-sm md:text-base md:leading-7">
              My journey in web development is powered by an array of unique
              tools and languages, with JavaScript at the core of everything I
              build. With 4+ years of experience, I work closely with frameworks
              like React.js and Next.js to craft seamless, user-friendly
              websites. With strong design skills, I focus on building fast,
              secure, and visually striking web experiences. Alongside clean
              frontend development, I am also skilled in training Machine
              Learning models. I love exploring new technology and bringing
              practical ideas to life through thoughtful engineering.
            </p>
          </div>
        </ItemLayout>

        <ItemLayout className="col-span-full xs:col-span-6 lg:col-span-4 text-accent">
          <p className="flex w-full items-baseline gap-2 text-left text-2xl font-semibold leading-none sm:text-5xl">
            100+
            <sub className="font-semibold text-base leading-none">clients</sub>
          </p>
        </ItemLayout>

        <ItemLayout className="col-span-full xs:col-span-6 lg:col-span-4 text-accent">
          <p className="flex w-full items-baseline gap-2 text-left text-2xl font-semibold leading-none sm:text-5xl">
            5+
            <sub className="font-semibold text-base leading-none">
              years of experience
            </sub>
          </p>
        </ItemLayout>

        {/* GitHub Top Languages */}
        <ItemLayout className="col-span-full p-0! sm:col-span-6 md:col-span-4">
          <img
            className="min-h-37.5 w-full object-contain"
            src="/api/github/cards?type=languages"
            alt="GitHub Top Languages"
            loading="lazy"
          />
        </ItemLayout>

        {/* GitHub Overall Stats */}
        <ItemLayout className="col-span-full p-0! md:col-span-8">
          <img
            className="min-h-37.5 w-full object-contain"
            src="/api/github/cards?type=stats"
            alt="GitHub Stats"
            loading="lazy"
          />
        </ItemLayout>

        {/* Skills Icons */}
        <ItemLayout className="col-span-full">
          <img
            className="w-full"
            src="https://skillicons.dev/icons?i=bootstrap,css,docker,git,github,html,js,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,tailwind,threejs,vercel,vite,vscode,yarn"
            alt="Skills Icons"
            loading="lazy"
          />
        </ItemLayout>

        {/* GitHub Streak */}
        <ItemLayout className="col-span-full p-0! md:col-span-6">
          <img
            className="min-h-37.5 w-full object-contain"
            src="https://github-readme-streak-stats-rho-rust.vercel.app/?user=zainakramwork4&theme=dark&hide_border=true&type=svg&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B"
            alt="GitHub Streak"
            loading="lazy"
          />
        </ItemLayout>

        {/* Pinned Repository - PakBooking */}
        <ItemLayout className="col-span-full p-0! md:col-span-6">
          <Link
            href="https://github.com/zainakramwork4/pakbooking"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              className="min-h-37.5 w-full object-contain"
              src="/api/github/cards?type=pin"
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
