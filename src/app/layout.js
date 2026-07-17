import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import FireFliesBackground from "@/components/FireFliesBackground";
import Sound from "@/components/Sound";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: {
    template:
      "Next.js Portfolio Created with Three.js and Tailwind CSS | %s | Muhammad Zain Akram",
    default:
      "Next.js Portfolio Created with Three.js and Tailwind CSS by Muhammad Zain Akram",
  },
  description:
    "A unique creative portfolio designed by Muhammad Zain Akram with cutting-edge technologies like Next.js, Tailwind CSS, Three.js, and Framer Motion. Full-Stack Engineer with expertise in React, Next.js, Node.js, and Machine Learning. Email: zainakram.work4@gmail.com | WhatsApp: +923046164257",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "bg-background text-foreground font-inter"
        )}
      >
        {children}
        <FireFliesBackground />
        <Sound />
        <div id="my-modal" />
      </body>
    </html>
  );
}
