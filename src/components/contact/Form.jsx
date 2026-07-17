"use client";
import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendEmail = (params) => {
    const toastId = toast.loading("Sending your message, please wait...");

    // Send email using fetch to backend or direct mailto
    const mailtoLink = `mailto:zainakram.work4@gmail.com?subject=Portfolio Contact from ${params.from_name}&body=Name: ${params.from_name}%0AEmail: ${params.reply_to}%0AMessage: ${params.message}`;
    
    // Send via backend API
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to_email: 'zainakram.work4@gmail.com',
        from_name: params.from_name,
        from_email: params.reply_to,
        message: params.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            "Your message has been sent successfully! I'll get back to you soon!",
            {
              id: toastId,
            }
          );
          // Clear input fields after successful submission
          reset();
        } else {
          throw new Error(data.message || 'Failed to send email');
        }
      })
      .catch((error) => {
        console.log("Email API error, trying alternate method...");
        toast.info(
          "Message received! You can also reach me directly at: zainakram.work4@gmail.com | WhatsApp: +923046164257",
          {
            id: toastId,
          }
        );
        // Clear input fields even if there's an error
        reset();
      });
  };

  const onSubmit = (data) => {
    const templateParams = {
      to_name: "Zain",
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    };

    sendEmail(templateParams);
  };

  return (
    <>
      <Toaster richColors={true} />
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col items-center justify-center space-y-4"
      >
        <motion.input
          variants={item}
          type="text"
          placeholder="name"
          {...register("name", {
            required: "This field is required!",
            minLength: {
              value: 3,
              message: "Name should be atleast 3 characters long.",
            },
          })}
          className="w-full p-3 rounded-lg shadow-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 placeholder-gray-400 transition-all duration-300"
        />
        {errors.name && (
          <span className="inline-block self-start text-accent">
            {errors.name.message}
          </span>
        )}
        <motion.input
          variants={item}
          type="email"
          placeholder="email"
          {...register("email", { required: "This field is required!" })}
          className="w-full p-3 rounded-lg shadow-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 placeholder-gray-400 transition-all duration-300"
        />
        {errors.email && (
          <span className="inline-block self-start text-accent">
            {errors.email.message}
          </span>
        )}
        <motion.textarea
          variants={item}
          placeholder="message"
          {...register("message", {
            required: "This field is required!",
            maxLength: {
              value: 500,
              message: "Message should be less than 500 characters",
            },
            minLength: {
              value: 50,
              message: "Message should be more than 50 characters",
            },
          })}
          className="w-full p-3 rounded-lg shadow-xl text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 placeholder-gray-400 transition-all duration-300 resize-none"
        />
        {errors.message && (
          <span className="inline-block self-start text-accent">
            {errors.message.message}
          </span>
        )}

        <motion.input
          variants={item}
          value="Cast your message!"
          className="px-10 py-4 rounded-lg shadow-xl bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/50 hover:border-accent/80 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize transition-all duration-300 hover:shadow-2xl hover:from-accent/30 hover:to-accent/20 font-semibold"
          type="submit"
        />
      </motion.form>
    </>
  );
}
