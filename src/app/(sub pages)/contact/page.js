import Image from "next/image";
import bg from "../../../../public/background/contact-background.png";
import Form from "@/components/contact/Form";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata = {
  title: "Contact | Muhammad Zain Akram",
};

export default function Contact() {
  return (
    <>
      <Image
        src={bg}
        alt=""
        priority
        sizes="100vw"
        aria-hidden="true"
        className="-z-50 fixed inset-0 h-full w-full object-cover object-center opacity-35"
      />

      <div className="fixed inset-0 -z-40 bg-black/25" aria-hidden="true" />

      <article className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <header className="w-full max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Get in touch
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let&apos;s build something great.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Have a project, collaboration, or opportunity in mind? Send me a
            message and I&apos;ll get back to you by email.
          </p>
        </header>

        <section className="mt-12 w-full" aria-label="Contact details">
          <ContactInfo />
        </section>

        <section className="mt-8 flex w-full justify-center" aria-label="Contact form">
          <Form />
        </section>
      </article>
    </>
  );
}
