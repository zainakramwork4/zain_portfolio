"use client";
import React from "react";
import { Mail, MessageCircle, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "zainakram.work4@gmail.com",
      href: "mailto:zainakram.work4@gmail.com",
      color: "from-red-400 to-pink-400",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+92 304 6164257",
      href: "https://wa.me/923046164257",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Muhammad Zain Akram",
      href: "https://linkedin.com/in/muhammad-zain-akram-",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "zainakramwork4",
      href: "https://github.com/zainakramwork4",
      color: "from-gray-600 to-gray-800",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
    >
      {contactMethods.map((method, index) => {
        const Icon = method.icon;
        return (
          <motion.div key={index} variants={item}>
            <Link href={method.href} target="_blank" rel="noopener noreferrer">
              <div className="group relative backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 cursor-pointer overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <div
                    className={`bg-gradient-to-br ${method.color} p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                      {method.label}
                    </h3>
                    <p className="text-base font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all duration-300">
                      {method.value}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
