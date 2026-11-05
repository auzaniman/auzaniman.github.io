"use client";

import Link from "next/link";
import { copy } from "@/content/site";
import { highlightImpact, projects } from "@/lib/projects";
import { href, t, type Locale } from "@/lib/i18n";
import { useProjectModal } from "./project-modal";
import { Reveal } from "./reveal";
import { Ticks } from "./ticks";

const ORDER = ["arunika", "clipper", "niratrace"];

export function Highlights({ locale: l }: { locale: Locale }) {
  const c = copy.highlights;
  const { open } = useProjectModal();
  const items = ORDER.map((s) => projects.find((p) => p.slug === s)).filter((p) => !!p);
  if (!items.length) return null;
  const [first, ...rest] = items;

  const Shot = ({ p, big }: { p: (typeof items)[number]; big?: boolean }) => {
    const s = p.shots.find((x) => !x.portrait) || p.shots[0];
    return (
      <button
        type="button"
        onClick={() => open(p.slug)}
        aria-label={`${t(c.screens, l)}: ${p.name}`}
        className={`group relative block w-full overflow-hidden rounded-[var(--radius-md)] border border-line bg-sunken ${big ? "aspect-[16/10]" : "aspect-[16/10]"}`}
      >
        {s ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={s.src} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
        ) : null}
        <span className="label absolute right-3 bottom-3 rounded-[var(--radius-sm)] bg-bg/90 px-2.5 py-1.5 text-[11px] text-text opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {t(c.screens, l)} · {p.shots.length}
        </span>
      </button>
    );
  };

  const Body = ({ p, big }: { p: (typeof items)[number]; big?: boolean }) => (
    <>
      <span className="label text-xs text-muted">{p.org ? t(p.org, l) : p.category}</span>
      <h3 className={`display m-0 leading-none ${big ? "text-[40px]" : "text-[34px]"}`}>{p.slug === "clipper" ? "Clipper & Posting Station" : p.name}</h3>
      <p className="m-0 leading-relaxed text-text-2">{t(p.tagline, l)}</p>
      <div className="flex gap-3 border-t border-dashed border-line pt-4">
        <span className="label w-[72px] shrink-0 pt-0.5 text-[11px] text-accent">{t(c.impact, l)}</span>
        <span className="text-[15px] leading-normal">{t(highlightImpact[p.slug], l)}</span>
      </div>
      <Link href={href(l, `work/${p.slug}`)} className="inline-flex items-center gap-2 self-start py-2 font-semibold text-accent hover:text-accent-hover">
        {t(c.read, l)} <span aria-hidden>→</span>
      </Link>
    </>
  );

  return (
    <section id="sorotan" className="scroll-mt-20">
      <Reveal className="container-pf flex flex-col gap-3.5 pt-28 pb-10" stagger="[data-r]">
        <span data-r className="label text-xs text-accent">{t(c.kicker, l)}</span>
        <h2 data-r className="display m-0 max-w-[820px] text-[clamp(36px,5vw,56px)] leading-none">{t(c.title, l)}</h2>
        <p data-r className="m-0 max-w-[680px] text-[17px] leading-relaxed text-text-2">{t(c.lead, l)}</p>
      </Reveal>
      <Reveal className="container-pf flex flex-col gap-6" stagger="article">
        <article className="relative flex flex-wrap items-center gap-10 rounded-[var(--radius-xl)] border border-line bg-surface p-5 md:p-8">
          <div className="relative min-w-0 flex-[999_1_520px]">
            <Ticks />
            <Shot p={first} big />
          </div>
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-4">
            <Body p={first} big />
          </div>
        </article>
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <article key={p.slug} className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-line bg-surface p-5 md:p-7">
              <Shot p={p} />
              <Body p={p} />
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
