"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";
import { ArrowDown, Download } from "lucide-react";
import type { HeroContent } from "@/lib/content-types";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero({
  hero,
  location,
  avatarUrl,
  resumeUrl,
}: {
  hero: HeroContent;
  location: string;
  avatarUrl?: string;
  resumeUrl?: string;
}) {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col overflow-hidden pt-32 pb-10 px-6 md:px-10"
    >
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.15),transparent_60%)]" />

      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            {avatarUrl && (
              <motion.img
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                src={avatarUrl}
                alt=""
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-accent/40 shadow-[0_0_40px_rgba(205,255,76,0.2)] mb-6"
              />
            )}

            <div className="overflow-hidden mb-4">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="uppercase tracking-[0.3em] text-xs text-muted"
              >
                {hero.eyebrow}
              </motion.p>
            </div>

            <h1 className="font-display font-medium leading-[0.9] tracking-tight text-[clamp(2.5rem,min(9vw,13vh),7.5rem)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {hero.headingLine1}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-stroke"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {hero.headingLine2}
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-xs md:text-right"
          >
            <p className="text-muted text-sm md:text-base leading-relaxed">{hero.subtext}</p>
            <div className="mt-6 flex md:justify-end gap-3">
              <MagneticButton
                as="a"
                href="#work"
                className="flex items-center gap-2 text-sm uppercase tracking-widest border border-fg/30 rounded-full px-6 py-3 hover:bg-accent hover:border-accent hover:text-black transition-colors"
              >
                {hero.ctaLabel}
              </MagneticButton>
              {resumeUrl && (
                <MagneticButton
                  as="a"
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-widest border border-fg/30 rounded-full px-4 py-3 hover:bg-fg hover:text-bg transition-colors"
                  aria-label="Download resume"
                >
                  <Download size={14} />
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex items-center justify-between pt-6 border-t border-border text-xs uppercase tracking-widest text-muted"
      >
        {location ? <span>Based in {location}</span> : <span />}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          Scroll <ArrowDown size={14} />
        </motion.span>
        <span>2022 — Present</span>
      </motion.div>
    </section>
  );
}
