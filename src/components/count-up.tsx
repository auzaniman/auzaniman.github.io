"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/** Counts up from 0 the first time it scrolls into view. Renders the final number for SSR and no-JS. */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [v, setV] = useState(to);
  useEffect(() => {
    // client with motion allowed: start from 0 so the count-up has no visible jump
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setV(0);
  }, []);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = animate(0, to, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{v}</span>;
}
