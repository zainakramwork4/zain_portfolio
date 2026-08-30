"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Send } from "lucide-react";

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Form() {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    setIsSending(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      toast.success("Message sent successfully. Thank you for reaching out!", {
        id: toastId,
      });
      reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error.message || "Unable to send your message. Please try again.",
        { id: toastId }
      );
    } finally {
      setIsSending(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none backdrop-blur-md transition-all duration-200 placeholder:text-white/35 focus:bg-white/[0.09] focus:ring-2 focus:ring-accent/30 ${
      hasError
        ? "border-red-400/70 focus:border-red-400"
        : "border-white/15 focus:border-accent/60"
    }`;

  return (
    <>
      <Toaster richColors position="top-right" />

      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl backdrop-blur-xl sm:p-7 md:p-8"
      >
        <div className="mb-7 border-b border-white/10 pb-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Send a message
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Let&apos;s talk about your project.
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/55">
            Tell me what you&apos;re building, what you need, or how I can help.
            I&apos;ll get back to you by email.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <motion.div variants={item}>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/80">
              Your name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Muhammad Zain"
              {...register("name", {
                required: "Please enter your name.",
                minLength: { value: 2, message: "Name is too short." },
                maxLength: { value: 100, message: "Name is too long." },
              })}
              className={inputClass(errors.name)}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-300">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div variants={item}>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Please enter your email.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-300">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div variants={item} className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">
              Message
            </label>
            <textarea
              id="message"
              rows={7}
              placeholder="Tell me a little about your project..."
              {...register("message", {
                required: "Please enter a message.",
                minLength: { value: 20, message: "Please provide a little more detail." },
                maxLength: { value: 5000, message: "Message must be under 5000 characters." },
              })}
              className={`${inputClass(errors.message)} resize-y min-h-40`}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-300">{errors.message.message}</p>
            )}
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            Your message is sent securely through SMTP.
          </p>

          <button
            type="submit"
            disabled={isSending}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-accent/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </>
  );
}
