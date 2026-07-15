"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={clsx("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden mr-[0.28em] pb-[0.1em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
