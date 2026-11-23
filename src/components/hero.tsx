"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { copy, site } from "@/content/site";
import { projects } from "@/lib/projects";
import { t, type Locale } from "@/lib/i18n";
import { useProjectModal } from "./project-modal";
import { Ticks } from "./ticks";
import { CountUp } from "./count-up";

const PANEL = ["arunika", "santika", "posting-station", "naraya", "niratrace"];

export function Hero({ locale: l }: { locale: Locale }) {
  const h = copy.hero;
  const { open } = useProjectModal();
  const ref = useRef<HTMLElement>(null);
  const panel = PANEL.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);
  // company apps people actually use (server configs and services are not "apps")
  const internal = projects.filter((p) => p.org?.id.startsWith("Perusahaan") && p.category !== "Infrastruktur").length;
  const years = new Date().getFullYear() - site.since;

  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-h='w']", { yPercent: 110, duration: 0.8, stagger: 0.035 })
        .from("[data-h='f']", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .from("[data-h='row']", { x: 16, opacity: 0, duration: 0.45, stagger: 0.06 }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  // split the headline into words that slide up through a mask
  const words = (s: string, accent = false) =>
    s.split(/(\s+)/).map((w, i) =>
      /^\s+$/.test(w) ? w : (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-h="w" className={`inline-block ${accent ? "text-accent" : ""}`}>{w}</span>
        </span>
      ),
    );

  return (
    <section ref={ref} id="top" className="dots border-b border-line-soft">
      <div className="container-pf flex flex-wrap items-center gap-12 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
          <span data-h="f" className="label inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-bg px-3.5 py-2 text-[11px] text-muted md:text-xs">
            <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
            {t(h.badge, l)}
          </span>
          <h1 className="display text-[clamp(40px,5.6vw,72px)] leading-[1.02]">
            {words(t(h.titleA, l))}
            {words(t(h.titleB, l), true)}
            {words(t(h.titleC, l))}
            {words(t(h.titleD, l), true)}
          </h1>
          <p data-h="f" className="max-w-[640px] text-[17px] leading-relaxed text-text-2 md:text-[19px]">{t(h.lead, l)}</p>
          <div data-h="f" className="flex flex-wrap gap-3">
            <a href="#galeri" className="group inline-flex items-center gap-2.5 rounded-[var(--radius-md)] bg-accent px-6 py-3.5 font-semibold text-on-accent transition-transform hover:bg-accent-hover active:scale-[0.98]">
              {t(h.ctaWork, l)}
              <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            {site.cv && (
              <a href={site.cv} download className="inline-flex items-center rounded-[var(--radius-md)] border border-line-strong px-6 py-3.5 font-medium hover:bg-surface-2">
                {t(h.ctaCv, l)}
              </a>
            )}
          </div>
        </div>

        <div data-h="f" className="relative min-w-0 flex-[1_1_360px] rounded-[var(--radius-lg)] border border-line bg-surface p-5">
          <Ticks all />
          <div className="flex items-center justify-between border-b border-dashed border-line pb-3.5">
            <span className="label text-xs text-muted">{t(h.panel, l)}</span>
            <span className="label text-xs text-live">● {t(h.running, l)}</span>
          </div>
          <ul className="m-0 list-none p-0">
            {panel.map((p, i) => (
              <li key={p!.slug} data-h="row" className="border-b border-line-soft last:border-0">
                <button type="button" onClick={() => open(p!.slug)} className="group flex w-full items-center gap-3 py-3 text-left">
                  <span className="label w-[52px] text-[11px] text-label">SYS-0{i + 1}</span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[15px] font-semibold group-hover:text-accent">{p!.name}</span>
                    <span className="truncate text-[13px] text-muted">{t(p!.tagline, l)}</span>
                  </span>
                  <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${p!.highlight ? "bg-accent" : "bg-live"}`} />
                </button>
              </li>
            ))}
          </ul>
          <p className="label mt-2 border-t border-dashed border-line pt-3.5 text-[11px] text-label">› {t(h.panelHint, l)}</p>
        </div>
      </div>

      <dl className="container-pf my-0 grid grid-cols-2 gap-x-4 gap-y-6 pb-16 md:grid-cols-4">
        <Stat n={projects.length} label={t(copy.stats.projects, l)} />
        <Stat n={internal} label={t(copy.stats.internal, l)} />
        <Stat n={30} suffix="+" label={t(copy.stats.portals, l)} />
        <Stat n={years} suffix="+" label={t(copy.stats.years, l)} />
      </dl>
    </section>
  );
}

function Stat({ n, label, suffix = "" }: { n: number; label: string; suffix?: string }) {
  return (
    <div className="flex flex-col-reverse border-t border-line-strong pt-4">
      <dt className="mt-2 text-sm text-muted">{label}</dt>
      <dd className="display m-0 text-[clamp(36px,4vw,46px)] leading-none">
        <CountUp to={n} />{suffix}
      </dd>
    </div>
  );
}
