"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import type { Certification } from "@/lib/content-types";

export default function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  if (!certifications.length) return null;

  return (
    <section id="certifications" className="relative px-6 md:px-10 py-32 md:py-40">
      <div className="flex items-end justify-between mb-16 md:mb-20">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">04 / Certifications</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.a
            key={cert.id}
            href={cert.credentialUrl || undefined}
            target={cert.credentialUrl ? "_blank" : undefined}
            rel={cert.credentialUrl ? "noopener noreferrer" : undefined}
            data-cursor={cert.credentialUrl ? "link" : undefined}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group border border-border rounded-2xl p-6 flex items-start gap-4 transition-colors ${
              cert.credentialUrl ? "hover:border-accent/50" : "cursor-default"
            }`}
          >
            <span className="shrink-0 w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <ShieldCheck size={18} />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg leading-snug">{cert.name}</h3>
              <p className="text-muted text-sm mt-1">
                {cert.issuer} · {cert.year}
              </p>
            </div>
            {cert.credentialUrl && (
              <ArrowUpRight
                size={16}
                className="text-muted shrink-0 transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent"
              />
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
