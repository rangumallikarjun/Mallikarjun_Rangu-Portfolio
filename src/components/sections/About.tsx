"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "../Counter";
import type { AboutContent } from "@/lib/content-types";

gsap.registerPlugin(ScrollTrigger);

export default function About({ about }: { about: AboutContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = textRef.current?.querySelectorAll("span.word");
    if (!words || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.15 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [about.paragraph]);

  return (
    <section id="about" ref={containerRef} className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
        <span className="text-xs uppercase tracking-[0.3em] text-muted">01 / About</span>

        <p
          ref={textRef}
          className="font-display font-light text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.25] max-w-4xl"
        >
          {about.paragraph.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mt-24 md:mt-32 border-t border-border pt-10">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-4xl md:text-5xl text-gradient">
              <Counter to={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-muted text-xs md:text-sm uppercase tracking-widest mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
