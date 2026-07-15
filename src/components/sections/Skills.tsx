"use client";

import { motion } from "framer-motion";
import type { SkillGroup } from "@/lib/content-types";

export default function Skills({
  marqueeSkills,
  skillGroups,
}: {
  marqueeSkills: string[];
  skillGroups: SkillGroup[];
}) {
  const loop = [...marqueeSkills, ...marqueeSkills];

  return (
    <section id="skills" className="relative py-32 md:py-40 overflow-hidden">
      <div className="border-y border-border py-8 -rotate-1 bg-surface">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {loop.map((skill, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-5xl mx-6 flex items-center gap-6 text-muted/70"
            >
              {skill}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 mt-24 md:mt-32">
        <div className="flex items-end justify-between mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">03 / Capabilities</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors"
            >
              <h3 className="font-display text-xl mb-6">{group.title}</h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-muted text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
