"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  /** CSS selector of children to stagger; default animates the wrapper itself. */
  stagger?: string;
  as?: "div" | "section" | "ul";
  id?: string;
};

/** Fade-up on scroll (400ms, 60ms stagger). Content stays visible without JS or with reduced motion. */
export function Reveal({ children, className, stagger, as = "div", id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const targets = stagger ? el.querySelectorAll(stagger) : [el];
      gsap.from(targets, {
        y: 28,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger]);
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
