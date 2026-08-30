"use client";

import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FolderKanban } from "lucide-react";
import Link from "next/link";
import ProjectLayout from "./ProjectLayout";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const ProjectList = ({ projects }) => {
  const featuredProject =
    projects.find((project) => project.name.toLowerCase().includes("pakbooking")) ||
    projects[0];

  const remainingProjects = projects.filter(
    (project) => project.id !== featuredProject?.id
  );

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 md:pt-14 lg:px-8"
    >
      <motion.header
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-10 md:mb-12"
      >
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-accent">
              <FolderKanban size={16} />
              <span>Selected work</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Projects that turn ideas into products.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              A focused collection of web applications, platforms, and
              experiments built with modern engineering, practical UX, and a
              strong attention to detail.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
          >
            <BriefcaseBusiness size={17} />
            Start a project
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.header>

      {featuredProject && (
        <section className="space-y-6">
          <ProjectLayout {...featuredProject} featured />

          {remainingProjects.length > 0 && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {remainingProjects.map((project) => (
                <ProjectLayout key={project.id ?? project.name} {...project} />
              ))}
            </div>
          )}
        </section>
      )}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.55 }}
        className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl md:p-8"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-semibold text-foreground md:text-xl">
              Have an idea worth building?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Tell me what you are working on and let&apos;s shape it into a
              polished, production-ready experience.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Let&apos;s talk
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>
    </motion.main>
  );
};

export default ProjectList;
