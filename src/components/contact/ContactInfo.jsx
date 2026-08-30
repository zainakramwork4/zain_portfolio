"use client";

import React from "react";
import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "zainakram.work4@gmail.com",
    href: "mailto:zainakram.work4@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 304 6164257",
    href: "https://wa.me/923046164257",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Muhammad Zain Akram",
    href: "https://linkedin.com/in/muhammad-zain-akram-",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "zainakramwork4",
    href: "https://github.com/zainakramwork4",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function ContactInfo() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {contactMethods.map((method) => {
        const Icon = method.icon;

        return (
          <motion.div key={method.label} variants={item}>
            <Link
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-28 items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-black/35"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                  {method.label}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white/85">
                  {method.value}
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
