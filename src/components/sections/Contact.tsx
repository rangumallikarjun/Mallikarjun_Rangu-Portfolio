"use client";

import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";
import { ArrowUpRight } from "lucide-react";
import type { SocialLink } from "@/lib/content-types";

export default function Contact({
  email,
  socialLinks,
}: {
  email: string;
  socialLinks: SocialLink[];
}) {
  return (
    <section id="contact" className="relative px-6 md:px-10 pt-32 md:pt-48 pb-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_rgba(205,255,76,0.1),transparent_60%)]" />

      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">06 / Contact</span>

        <h2 className="font-display font-medium leading-[1.05] text-[clamp(2.2rem,min(7.5vw,10vh),5.75rem)] mt-6 max-w-4xl mx-auto">
          Let&apos;s build something{" "}
          <span className="text-gradient">secure &amp; extraordinary.</span>
        </h2>

        <div className="mt-12 flex justify-center">
          <MagneticButton
            as="a"
            href={`mailto:${email}`}
            strength={0.5}
            className="group flex items-center gap-3 font-display text-xl md:text-2xl border border-fg/30 rounded-full pl-8 pr-6 py-4 hover:bg-fg hover:text-bg transition-colors"
          >
            {email}
            <ArrowUpRight
              size={22}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </MagneticButton>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-24">
        {socialLinks.map((social, i) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="text-sm uppercase tracking-widest text-muted hover:text-fg transition-colors"
          >
            {social.label}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
