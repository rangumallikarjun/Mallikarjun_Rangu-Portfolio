"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";

const variants = {
  div: motion.div,
  a: motion.a,
  button: motion.button,
};

export default function MagneticButton({
  children,
  className,
  as = "div",
  strength = 0.4,
  href,
  target,
  rel,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a" | "button";
  strength?: number;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = variants[as];

  return (
    <MotionComponent
      ref={ref as never}
      data-cursor="link"
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={clsx("inline-block", className)}
    >
      {children}
    </MotionComponent>
  );
}
