"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { approach, buildLayers, copy, journey, site } from "@/content/site";
import { getProject } from "@/lib/projects";
import { t, type Locale } from "@/lib/i18n";
import { useProjectModal } from "./project-modal";
import { Reveal } from "./reveal";
import { Ticks } from "./ticks";

const STACK = ["Laravel", "Vue 3 + Inertia", "React", "Next.js", "TypeScript", "Go", "Tailwind CSS", "shadcn/ui", "Electron", "Capacitor", "Apache Airflow", "MySQL / MariaDB", "Docker", "Traefik", "Prometheus"];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-track]", { xPercent: -50, ease: "none", duration: 40, repeat: -1 });
    }, ref);
    return () => ctx.revert();
  }, []);
  const row = STACK.flatMap((s, i) => [<span key={`s${i}`}>{s}</span>, <span key={`d${i}`} aria-hidden className="text-accent">✦</span>]);
  return (
    <div ref={ref} className="overflow-hidden border-b border-line-soft" aria-label="Stack">
      <div data-track className="label flex w-max gap-10 py-[18px] text-[13px] whitespace-nowrap text-label">
        {row}
        <span aria-hidden className="contents">{row}</span>
      </div>
    </div>
  );
}

export function BuildLayers({ locale: l }: { locale: Locale }) {
  const b = copy.build;
  const { open } = useProjectModal();
  const App = ({ slug, name, desc }: { slug: string; name: string; desc: { id: string; en: string } }) => {
    const exists = !!getProject(slug);
    const body = (
      <>
        <b className="font-semibold text-text">{name}</b> — {t(desc, l)}
      </>
    );
    return exists ? (
      <button type="button" onClick={() => open(slug)} className="text-left text-[13px] leading-relaxed text-muted underline-offset-4 hover:text-text hover:underline">
        {body}
      </button>
    ) : (
      <span className="text-[13px] leading-relaxed text-muted">{body}</span>
    );
  };
  return (
    <section id="cara-dibangun" className="dots mt-28 scroll-mt-20 border-y border-line-soft">
      <div className="container-pf flex flex-col gap-10 py-24">
        <Reveal className="flex max-w-[760px] flex-col gap-3.5" stagger="[data-r]">
          <span data-r className="label text-xs text-accent">{t(b.kicker, l)}</span>
          <h2 data-r className="display m-0 text-[clamp(36px,5vw,56px)] leading-none">{t(b.title, l)}</h2>
          <p data-r className="m-0 text-[17px] leading-relaxed text-text-2">{t(b.lead, l)}</p>
        </Reveal>

        <Reveal className="flex flex-col gap-3" stagger="[data-c]">
          <span className="label text-[11px] text-muted">{t(b.l3, l)}</span>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {buildLayers.apps.map((g) => (
              <div key={g.group.id} data-c className="flex flex-col gap-2.5 rounded-[14px] border border-line bg-surface p-4">
                <span className="text-[15px] font-semibold">{t(g.group, l)}</span>
                {g.items.map((it) => <App key={it.slug} {...it} />)}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          <span className="label text-[11px] text-muted">{t(b.l2, l)}</span>
          <div className="relative grid gap-4 rounded-[var(--radius-lg)] bg-accent p-6 text-on-accent sm:grid-cols-2 lg:grid-cols-5">
            <Ticks />
            {buildLayers.framework.map((f) => (
              <div key={f.name.id} className="flex flex-col gap-1">
                <span className="text-[15px] font-bold">{t(f.name, l)}</span>
                <span className="text-[13px] leading-normal">{t(f.desc, l)}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-3" stagger="[data-c]">
          <span className="label text-[11px] text-muted">{t(b.l1, l)}</span>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {buildLayers.services.map((s) => {
              const inner = (
                <>
                  <span className="block text-[15px] font-semibold">{t(s.name, l)}</span>
                  <span className="mt-1 block text-[13px] leading-normal text-muted">{t(s.desc, l)}</span>
                </>
              );
              return getProject(s.slug) ? (
                <button key={s.slug} data-c type="button" onClick={() => open(s.slug)} className="rounded-[14px] border border-dashed border-line-strong p-4 text-left hover:border-accent">
                  {inner}
                </button>
              ) : (
                <div key={s.slug} data-c className="rounded-[14px] border border-dashed border-line-strong p-4">{inner}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Journey({ locale: l }: { locale: Locale }) {
  return (
    <section id="perjalanan" className="scroll-mt-20">
      <div className="container-pf flex flex-col gap-12 py-28">
        <Reveal className="flex flex-col gap-3.5" stagger="[data-r]">
          <span data-r className="label text-xs text-accent">{t(copy.journey.kicker, l)}</span>
          <h2 data-r className="display m-0 max-w-[760px] text-[clamp(36px,5vw,56px)] leading-none">{t(copy.journey.title, l)}</h2>
        </Reveal>
        <Reveal as="ul" className="m-0 grid list-none grid-cols-1 border-l border-line-strong p-0 md:grid-cols-4 md:border-t md:border-l-0" stagger="li">
          {journey.map((j) => (
            <li key={j.years} className="relative flex flex-col gap-2.5 pb-8 pl-6 md:pt-6 md:pr-6 md:pb-0 md:pl-0">
              <span aria-hidden className={`absolute top-1 -left-[6.5px] h-3 w-3 rounded-full md:-top-[6.5px] md:left-0 ${j.current ? "bg-accent" : "bg-line-strong"}`} />
              <span className={`label text-xs ${j.current ? "text-accent" : "text-muted"}`}>{l === "en" && j.yearsEn ? j.yearsEn : j.years}</span>
              <h3 className="display m-0 text-2xl">{t(j.title, l)}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-text-2">{t(j.body, l)}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Approach({ locale: l }: { locale: Locale }) {
  return (
    <section className="border-t border-line-soft">
      <div className="container-pf flex flex-wrap gap-12 py-28">
        <Reveal className="flex flex-[1_1_340px] flex-col gap-3.5" stagger="[data-r]">
          <span data-r className="label text-xs text-accent">{t(copy.approach.kicker, l)}</span>
          <h2 data-r className="display m-0 text-[clamp(36px,5vw,56px)] leading-none">{t(copy.approach.title, l)}</h2>
        </Reveal>
        <Reveal as="ul" className="m-0 flex min-w-0 flex-[999_1_520px] list-none flex-col p-0" stagger="li">
          {approach.map((a, i) => (
            <li key={a.title.id} className="flex gap-6 border-t border-line py-6 last:border-b">
              <span className="label w-8 shrink-0 pt-1 text-[13px] text-accent">0{i + 1}</span>
              <div>
                <h3 className="m-0 text-xl font-semibold">{t(a.title, l)}</h3>
                <p className="mt-1.5 mb-0 leading-relaxed text-text-2">{t(a.body, l)}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Contact({ locale: l }: { locale: Locale }) {
  const c = copy.contact;
  return (
    <section id="kontak" className="dots scroll-mt-20 border-t border-line-soft">
      <Reveal className="container-pf flex flex-col gap-8 pt-32 pb-24" stagger="[data-r]">
        <span data-r className="label text-xs text-accent">{t(c.kicker, l)}</span>
        <h2 data-r className="display m-0 max-w-[1000px] text-[clamp(44px,8vw,92px)] leading-[0.96]">{t(c.title, l)}</h2>
        <p data-r className="m-0 max-w-[620px] text-lg leading-relaxed text-text-2">{t(c.lead, l)}</p>
        <div data-r className="flex flex-wrap gap-3">
          {site.email && (
            <a href={`mailto:${site.email}`} className="inline-flex items-center rounded-[var(--radius-md)] bg-accent px-6 py-4 text-lg font-semibold text-on-accent hover:bg-accent-hover">
              {site.email}
            </a>
          )}
          <a href={site.github} target="_blank" rel="me noopener" className="inline-flex items-center rounded-[var(--radius-md)] border border-line-strong px-6 py-4 hover:bg-surface-2">
            GitHub ↗
          </a>
          {site.linkedin && (
            <a href={site.linkedin} target="_blank" rel="me noopener" className="inline-flex items-center rounded-[var(--radius-md)] border border-line-strong px-6 py-4 hover:bg-surface-2">
              LinkedIn ↗
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer({ locale: l }: { locale: Locale }) {
  return (
    <footer className="container-pf">
      <div className="flex flex-wrap justify-between gap-4 border-t border-line-soft pt-6 pb-10">
        <span className="label text-xs text-label">© {new Date().getFullYear()} Auzan · {site.city}</span>
        <span className="label text-xs text-label">{t(copy.footer.built, l)}</span>
      </div>
    </footer>
  );
}
