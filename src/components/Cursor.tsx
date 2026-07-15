"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    let raf: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='link']")) {
        ring.style.width = "64px";
        ring.style.height = "64px";
        ring.style.opacity = "1";
      }
    };
    const onLeave = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={dotRef}
        className="cursor-dot bg-fg w-2 h-2"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="cursor-dot border border-fg/70 w-8 h-8 transition-[width,height] duration-200 ease-out"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
