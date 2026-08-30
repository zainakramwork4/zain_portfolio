"use client";

import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import Link from "next/link";
import ProjectLayout from "./ProjectLayout";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const ProjectList = ({ projects }) => {
  const featuredProject =
    projects.find((project) => project.name.toLowerCase().includes("pakbooking")) ||
    projects[0];

  const remainingProjects = projects.filter((project) => project.id !== featuredProject.id);

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 md:pt-12"
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-10"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3 text-accent/90 text-sm font-medium">
              <Sparkles size={16} />
              <span>Selected work</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
              Projects built to create real business value.
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-7 text-muted max-w-xl">
              A curated collection of products, platforms, and experiments. Each
              project is focused on solving a real problem with thoughtful UX,
              modern engineering, and a clear path from idea to launch.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-accent/15"
          >
            <BriefcaseBusiness size={17} />
            Start a project
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.section>

      <section className="space-y-5 md:space-y-6">
        <ProjectLayout {...featuredProject} featured />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {remainingProjects.map((project) => (
            <ProjectLayout key={project.id ?? project.name} {...project} />
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.55 }}
        className="mt-8 md:mt-10 rounded-3xl border border-white/10 bg-black/20 p-6 md:p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg md:text-xl font-semibold text-foreground">
              Have a product idea that needs to ship?
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Let&apos;s turn the problem into a polished, production-ready experience.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-background transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
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
