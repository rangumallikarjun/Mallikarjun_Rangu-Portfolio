"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const SECRET_CLICK_COUNT = 5;
const SECRET_CLICK_WINDOW_MS = 800;

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ brand = "MR" }: { brand?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const brandClickCount = useRef(0);
  const brandClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBrandClick = () => {
    brandClickCount.current += 1;
    if (brandClickTimer.current) clearTimeout(brandClickTimer.current);

    if (brandClickCount.current >= SECRET_CLICK_COUNT) {
      brandClickCount.current = 0;
      router.push("/admin/login");
      return;
    }

    brandClickTimer.current = setTimeout(() => {
      brandClickCount.current = 0;
    }, SECRET_CLICK_WINDOW_MS);

    handleNav("#top");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between px-6 md:px-10 py-6 mix-blend-difference text-fg">
        <a
          href="#top"
          data-cursor="link"
          className="font-display text-lg tracking-tight font-medium select-none"
          onClick={(e) => {
            e.preventDefault();
            handleBrandClick();
          }}
        >
          {brand}
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <MagneticButton
              key={link.href}
              as="a"
              href={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm uppercase tracking-widest text-fg/80 hover:text-fg transition-colors"
            >
              {link.label}
            </MagneticButton>
          ))}
        </nav>

        <button
          data-cursor="link"
          onClick={() => setOpen((o) => !o)}
          className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
            className="w-6 h-[1.5px] bg-fg block"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
            className="w-6 h-[1.5px] bg-fg block"
          />
        </button>

        <div className="hidden md:block">
          <MagneticButton
            as="a"
            href="#contact"
            onClick={() => handleNav("#contact")}
            className="text-sm uppercase tracking-widest border border-fg/30 rounded-full px-5 py-2.5 hover:bg-fg hover:text-bg transition-colors"
          >
            Let&apos;s Talk
          </MagneticButton>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] bg-bg flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="font-display text-4xl"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
