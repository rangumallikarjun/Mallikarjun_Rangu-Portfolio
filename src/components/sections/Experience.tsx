"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { ExperienceItem } from "@/lib/content-types";

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="flex items-end justify-between mb-16 md:mb-24">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">05 / Experience</span>
      </div>

      <div ref={ref} className="relative max-w-3xl">
        <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-border">
          <motion.div
            className="absolute top-0 left-0 w-full bg-accent origin-top"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        <div className="flex flex-col gap-14 md:gap-16">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative pl-10"
            >
              <span className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-bg border-2 border-accent" />
              <span className="text-muted text-xs uppercase tracking-widest">{item.year}</span>
              <h3 className="font-display text-2xl md:text-3xl mt-2">{item.role}</h3>
              <p className="text-accent text-sm mt-1">{item.company}</p>
              <p className="text-muted text-sm md:text-base mt-3 max-w-lg leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
