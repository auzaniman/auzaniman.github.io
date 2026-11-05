"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { getProject, type Project } from "@/lib/projects";
import { copy, categories } from "@/content/site";
import { href, t, type Locale } from "@/lib/i18n";

type Ctx = { open: (slug: string, shot?: number) => void };
const ModalCtx = createContext<Ctx>({ open: () => {} });
export const useProjectModal = () => useContext(ModalCtx);

export function ProjectModalProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [state, setState] = useState<{ slug: string; shot: number } | null>(null);
  const open = useCallback((slug: string, shot = 0) => {
    if (getProject(slug)) setState({ slug, shot });
  }, []);
  const project = state ? getProject(state.slug) : undefined;

  // deep link: #karya=<slug>
  useEffect(() => {
    const m = location.hash.match(/^#karya=([\w-]+)/);
    if (m) open(m[1]);
  }, [open]);

  return (
    <ModalCtx.Provider value={{ open }}>
      {children}
      <Dialog.Root open={!!project} onOpenChange={(o) => !o && setState(null)}>
        <AnimatePresence>
          {project && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-50 bg-[var(--overlay)] backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby="pm-desc">
                <motion.div
                  className="fixed inset-0 z-50 m-auto flex h-[100dvh] w-full flex-col overflow-hidden bg-surface md:h-[min(860px,calc(100dvh-48px))] md:w-[min(1340px,calc(100vw-48px))] md:rounded-[var(--radius-xl)] md:border md:border-line lg:flex-row"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
                >
                  <ModalBody project={project} locale={locale} start={state!.shot} />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </ModalCtx.Provider>
  );
}

function ModalBody({ project: p, locale: l, start }: { project: Project; locale: Locale; start: number }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: p.shots.length > 1, startIndex: start });
  const [i, setI] = useState(start);
  useEffect(() => {
    if (!embla) return;
    const on = () => setI(embla.selectedScrollSnap());
    embla.on("select", on);
    return () => void embla.off("select", on);
  }, [embla]);
  // arrow keys while the dialog has focus
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") embla?.scrollNext();
    if (e.key === "ArrowLeft") embla?.scrollPrev();
  };
  const g = copy.gallery;
  const cat = categories.find((c) => c.key === p.category);
  const shot = p.shots[i];
  const features = p.features[l].length ? p.features[l] : p.features.id;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row" onKeyDown={onKey}>
      {/* phones: close button always reachable without scrolling the details panel */}
      <Dialog.Close
        className="absolute top-3 right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface/95 lg:hidden"
        aria-label={t(copy.nav.close, l)}
      >
        <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </Dialog.Close>
      {/* carousel */}
      <div className="flex min-h-0 min-w-0 flex-col gap-3 bg-sunken p-3 md:p-5 lg:flex-1">
        <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-[var(--radius-md)] border border-line bg-bg">
          {p.shots.length ? (
            <div className="h-full" ref={emblaRef}>
              <div className="flex h-full">
                {p.shots.map((s, k) => (
                  <div key={s.src} className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={t(s.title, l) || `${p.name} ${k + 1}`}
                      width={s.w}
                      height={s.h}
                      loading={k === start ? "eager" : "lazy"}
                      className="max-h-full max-w-full object-contain select-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="label flex h-full items-center justify-center text-xs text-label">—</div>
          )}
          {p.shots.length > 1 && (
            <>
              <NavBtn side="left" label={t(g.prev, l)} onClick={() => embla?.scrollPrev()} />
              <NavBtn side="right" label={t(g.next, l)} onClick={() => embla?.scrollNext()} />
              <span className="label absolute bottom-3 left-3 rounded-[var(--radius-sm)] bg-bg/90 px-2.5 py-1.5 text-[11px] text-text-2">
                {i + 1} / {p.shots.length}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0" aria-live="polite">
            <p className="text-[15px] font-semibold">{shot ? t(shot.title, l) : ""}</p>
            <p className="text-sm text-muted">{shot ? t(shot.caption, l) : ""}</p>
          </div>
          {p.shots.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t(copy.work.screens, l)}>
              {p.shots.map((s, k) => (
                <button
                  key={s.thumb}
                  type="button"
                  onClick={() => embla?.scrollTo(k)}
                  aria-label={`${t(s.title, l) || k + 1}`}
                  aria-current={k === i}
                  className={`h-11 w-[68px] shrink-0 overflow-hidden rounded-lg border-2 bg-bg transition-colors ${k === i ? "border-accent" : "border-line hover:border-line-strong"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.thumb} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* details */}
      <aside className="flex max-h-[45dvh] min-w-0 flex-col gap-5 overflow-y-auto border-t border-line p-5 md:p-7 lg:max-h-none lg:w-[400px] lg:shrink-0 lg:border-t-0 lg:border-l">
        <div className="flex items-start justify-between gap-4">
          <span className="label text-[11px] text-muted">
            {cat ? t(cat.label, l) : p.category} · {p.yearFrom && p.yearFrom !== p.year ? `${p.yearFrom}–${p.year}` : p.year}
          </span>
          <Dialog.Close className="-mt-2 -mr-2 hidden h-11 w-11 shrink-0 lg:inline-flex items-center justify-center rounded-full border border-line-strong hover:bg-surface-2" aria-label={t(copy.nav.close, l)}>
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </Dialog.Close>
        </div>
        <Dialog.Title className="display text-[40px] leading-none">{p.name}</Dialog.Title>
        <p id="pm-desc" className="leading-relaxed text-text-2">{t(p.summary, l) || t(p.tagline, l)}</p>
        {p.role && <Meta label={t(g.role, l)}>{t(p.role, l)}</Meta>}
        {p.users && <Meta label={t(g.users, l)}>{t(p.users, l)}</Meta>}
        {features.length > 0 && (
          <Meta label={t(g.features, l)}>
            <ul className="flex list-none flex-col gap-1.5 p-0 text-sm leading-relaxed text-text-2">
              {features.slice(0, 6).map((f) => (
                <li key={f} className="flex gap-2"><span aria-hidden className="text-accent">›</span>{f}</li>
              ))}
            </ul>
          </Meta>
        )}
        <ul className="flex list-none flex-wrap gap-2 p-0" aria-label={t(g.stack, l)}>
          {p.stack.map((s) => (
            <li key={s} className="label rounded-[var(--radius-sm)] border border-line-strong px-2.5 py-1.5 text-[11px] text-text-2">{s}</li>
          ))}
        </ul>
        <p className="text-xs text-label">{t(g.sample, l)}</p>
        <div className="mt-auto flex flex-col gap-2.5">
          {p.link && (
            <a href={p.link} target="_blank" rel="noopener" className="flex justify-center rounded-[var(--radius-md)] bg-accent px-4 py-3.5 font-semibold text-on-accent hover:bg-accent-hover">
              {t(g.visit, l)} ↗
            </a>
          )}
          <Link href={href(l, `work/${p.slug}`)} className="flex justify-center rounded-[var(--radius-md)] border border-line-strong px-4 py-3.5 hover:bg-surface-2">
            {t(g.detail, l)}
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="label text-[11px] text-label">{label}</span>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

function NavBtn({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 ${side === "left" ? "left-3" : "right-3"} inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/90 transition-transform hover:scale-105 active:scale-95`}
    >
      <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
