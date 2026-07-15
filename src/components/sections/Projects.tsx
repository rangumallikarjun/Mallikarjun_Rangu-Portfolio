"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content-types";

export default function Projects({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const active = projects.find((p) => p.id === hovered);

  return (
    <section
      id="work"
      className="relative px-6 md:px-10 py-32 md:py-48"
      onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
    >
      <div className="flex items-end justify-between mb-16 md:mb-24">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted">02 / Selected Work</span>
          <h2 className="font-display font-medium text-[clamp(2.5rem,7vw,5.5rem)] leading-none mt-4">
            Featured Projects
          </h2>
        </div>
        <span className="hidden md:block text-muted text-sm">
          {String(projects.length).padStart(2, "0")} Projects
        </span>
      </div>

      <div className="border-t border-border">
        {projects.map((project, i) => (
          <a
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            key={project.id}
            data-cursor="link"
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex items-center justify-between gap-6 border-b border-border py-8 md:py-10"
          >
            <div className="flex items-center gap-6 md:gap-12">
              <span className="text-muted text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display font-medium text-2xl md:text-5xl transition-transform duration-500 group-hover:translate-x-4">
                {project.title}
              </h3>
            </div>

            <div className="hidden md:flex items-center gap-10 text-sm text-muted">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>

            <motion.div
              className="w-10 h-10 rounded-full border border-fg/30 flex items-center justify-center shrink-0"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </motion.div>

            <motion.div
              className="absolute left-0 bottom-0 h-[1px] bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: hovered === project.id ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </a>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="hidden md:block fixed pointer-events-none z-[60] w-72 h-48 rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center"
            style={{
              left: coords.x + 24,
              top: coords.y - 96,
              background: active.imageUrl
                ? `url(${active.imageUrl}) center/cover`
                : active.gradient,
            }}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wide bg-black/30 backdrop-blur-sm text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
