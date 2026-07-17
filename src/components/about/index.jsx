import React from "react";
import ItemLayout from "./ItemLayout";
import Link from "next/link";

const AboutDetails = () => {
  return (
    <section className="py-20 w-full">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 className="  text-xl md:text-2xl text-left w-full capitalize">
            Full-Stack Engineer
          </h2>
          <p className="font-light  text-xs sm:text-sm md:text-base   ">
             My journey in web development is powered by an
            array of unique tools and languages, with JavaScript
            at the core of everything I build. With 2+ years of experience,
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
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            10+ <sub className="font-semibold text-base">clients</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            2+{" "}
            <sub className="font-semibold text-base">years of experience</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 !p-0"}
        >
          <img
            className="w-full h-auto rounded-lg"
            src="https://github-readme-stats.vercel.app/api/top-langs?username=zainakramwork4&layout=compact&theme=tokyonight&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&langs_count=8&cache_seconds=3600"
            alt="CodeByZain - Top Languages"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop";
            }}
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 !p-0"}>
          <img
            className="w-full h-auto rounded-lg"
            src="https://github-readme-stats.vercel.app/api?username=zainakramwork4&show_icons=true&theme=tokyonight&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&count_private=true&cache_seconds=3600"
            alt="CodeByZain - GitHub Stats"
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=300&fit=crop";
            }}
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full"}>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=ts,js,react,nextjs,html,css,tailwind,bootstrap,threejs,nodejs,postgresql,mongodb,sqlite,docker,git,github,vercel,netlify`}
         alt="Tech Stack"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <img
            className="w-full h-auto"
            src="https://github-readme-streak-stats.herokuapp.com?user=zainakramwork4&theme=dark&hide_border=true&type=svg&background=EB545400&ring=FEFE5B&currStreakLabel=FEFE5B"
            alt="CodeByZain - GitHub Streak"
            loading="lazy"
          />
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
          <Link
            href="https://github.com/zainakramwork4"
            target="_blank"
            className="w-full"
          >
            <img
              className="w-full h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
              alt="My Projects"
              loading="lazy"
            />
          </Link>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
