"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, copy } from "@/content/site";
import { projects, type Project } from "@/lib/projects";
import { t, type Locale } from "@/lib/i18n";
import { useProjectModal } from "./project-modal";
import { Reveal } from "./reveal";

const PAGE = 12;

export function Gallery({ locale: l }: { locale: Locale }) {
  const g = copy.gallery;
  const { open } = useProjectModal();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const query = useDeferredValue(q.trim().toLowerCase());

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of projects) m.set(p.category, (m.get(p.category) || 0) + 1);
    return m;
  }, []);

  const list = useMemo(() => {
    return projects.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!query) return true;
      const hay = [p.name, p.tagline.id, p.tagline.en, p.stack.join(" "), p.repos.map((r) => r.name).join(" ")].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [cat, query]);

  const shown = list.slice(0, limit);
  const pick = (c: string) => {
    setCat(c);
    setLimit(PAGE);
  };

  return (
    <section id="galeri" className="scroll-mt-20">
      <Reveal className="container-pf flex flex-col gap-8 pt-28 pb-8" stagger="[data-r]">
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <span data-r className="label text-xs text-accent">{t(g.kicker, l)}</span>
          <h2 data-r className="display m-0 text-[clamp(36px,5vw,56px)] leading-none">{t(g.title, l)}</h2>
          <p data-r className="m-0 text-[17px] leading-relaxed text-text-2">{t(g.lead, l)}</p>
        </div>
        <div data-r className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div role="group" aria-label={t(copy.nav.gallery, l)} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            <Chip on={cat === "all"} onClick={() => pick("all")} label={t(g.all, l)} n={projects.length} />
            {categories.filter((c) => counts.get(c.key)).map((c) => (
              <Chip key={c.key} on={cat === c.key} onClick={() => pick(c.key)} label={t(c.label, l)} n={counts.get(c.key)!} />
            ))}
          </div>
          <label className="flex min-w-[260px] flex-col gap-1.5">
            <span className="label text-[11px] text-muted">{t(g.searchLabel, l)}</span>
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setLimit(PAGE);
              }}
              placeholder={t(g.search, l)}
              className="h-12 rounded-[var(--radius-md)] border border-line-strong bg-surface px-4 text-base text-text placeholder:text-label"
            />
          </label>
        </div>
      </Reveal>

      <div className="container-pf">
        <p className="sr-only" aria-live="polite">{list.length}</p>
        {shown.length ? (
          <motion.ul layout className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card p={p} l={l} onOpen={() => open(p.slug)} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="display m-0 text-2xl">{t(g.empty, l)}</p>
            <button type="button" onClick={() => { setQ(""); pick("all"); }} className="h-11 rounded-[var(--radius-md)] border border-line-strong px-5 hover:bg-surface-2">
              {t(g.reset, l)}
            </button>
          </div>
        )}
        {list.length > limit && (
          <div className="flex justify-center pt-8">
            <button type="button" onClick={() => setLimit((n) => n + PAGE)} className="h-[52px] rounded-[var(--radius-md)] border border-line-strong px-7 hover:bg-surface-2">
              {t(g.more, l)} <span className="label ml-2 text-xs text-muted">+{Math.min(PAGE, list.length - limit)}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Chip({ on, onClick, label, n }: { on: boolean; onClick: () => void; label: string; n: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`h-11 shrink-0 rounded-full border px-4 text-sm transition-colors ${on ? "border-text bg-text text-bg" : "border-line-strong text-text-2 hover:border-text"}`}
    >
      {label} <span className="label ml-1 text-[11px] opacity-70">{n}</span>
    </button>
  );
}

function Card({ p, l, onOpen }: { p: Project; l: Locale; onOpen: () => void }) {
  const g = copy.gallery;
  const cover = p.shots.find((s) => !s.portrait) || p.shots[0];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col gap-3 rounded-[18px] border border-line bg-surface p-3.5 text-left transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent"
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-sunken">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.thumb} alt="" loading="lazy" width={760} height={475} className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]" />
        )}
      </span>
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-[17px] font-semibold">{p.name}</span>
        <span className="label shrink-0 text-[11px] text-muted">
          {p.repos.length > 1 ? `${p.repos.length} ${t(g.reposN, l)} · ` : ""}{p.shots.length} {t(g.screensN, l)}
        </span>
      </span>
      <span className="text-sm leading-normal text-muted">{t(p.tagline, l)}</span>
      <span className="label mt-auto pt-1 text-[11px] text-label">{p.year} · {p.stack.slice(0, 3).join(" · ")}</span>
    </button>
  );
}
