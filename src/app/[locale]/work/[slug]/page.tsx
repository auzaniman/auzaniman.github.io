import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections";
import { ProjectModalProvider } from "@/components/project-modal";
import { ShotGrid } from "@/components/shot-grid";
import { Ticks } from "@/components/ticks";
import { categories, copy, site } from "@/content/site";
import { getProject, projects } from "@/lib/projects";
import { href, locales, t, type Locale } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

type P = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = p.shots.find((s) => !s.portrait) || p.shots[0];
  const desc = t(p.tagline, l);
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `/${l}/work/${slug}/`, languages: { en: `/en/work/${slug}/`, id: `/id/work/${slug}/`, "x-default": `/en/work/${slug}/` } },
    openGraph: { type: "article", title: `${p.name} — Auzan`, description: desc, url: `/${l}/work/${slug}/`, images: cover ? [{ url: cover.src, width: cover.w, height: cover.h }] : [l === "en" ? "/og.png" : "/og-id.png"] },
  };
}

export default async function WorkPage({ params }: P) {
  const { locale: l, slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const cat = categories.find((c) => c.key === p.category);
  const g = copy.gallery;
  const w = copy.work;
  const features = p.features[l].length ? p.features[l] : p.features.id;
  const hero = p.shots.find((s) => !s.portrait) || p.shots[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: t(p.summary, l) || t(p.tagline, l),
    inLanguage: l,
    dateCreated: p.yearFrom || p.year,
    keywords: p.stack.join(", "),
    url: `${site.url}/${l}/work/${p.slug}/`,
    image: hero ? `${site.url}${hero.src}` : undefined,
    creator: { "@type": "Person", name: site.fullName, url: site.url },
    ...(p.link ? { sameAs: p.link } : {}),
  };

  return (
    <ProjectModalProvider locale={l}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav locale={l} home={false} />
      <main id="isi">
        <section className="dots border-b border-line-soft">
          <div className="container-pf flex flex-col gap-7 pt-10 pb-14 md:pt-14">
            <Link href={`${href(l)}#galeri`} className="inline-flex items-center gap-2 self-start py-2 text-[15px] text-muted hover:text-text">
              <span aria-hidden>←</span> {t(w.back, l)}
            </Link>
            <span className="label text-xs text-accent">{cat ? t(cat.label, l) : p.category}{p.org ? ` · ${t(p.org, l)}` : ""}</span>
            <h1 className="display m-0 text-[clamp(48px,9vw,104px)] leading-[0.95]">{p.name}</h1>
            <p className="m-0 max-w-[860px] text-[clamp(18px,2vw,22px)] leading-normal text-text-2">{t(p.summary, l) || t(p.tagline, l)}</p>
            <dl className="m-0 grid grid-cols-2 gap-4 pt-3 md:grid-cols-4">
              <Fact label={t(w.year, l)} value={p.yearFrom && p.yearFrom !== p.year ? `${p.yearFrom} — ${p.year}` : p.year} />
              <Fact label={t(g.role, l)} value={p.role ? t(p.role, l) : "Full-stack developer"} />
              <Fact label={t(g.users, l)} value={p.users ? t(p.users, l) : "—"} />
              <Fact label={t(g.stack, l)} value={p.stack.slice(0, 5).join(" · ")} />
            </dl>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener" className="inline-flex self-start rounded-[var(--radius-md)] bg-accent px-6 py-3.5 font-semibold text-on-accent hover:bg-accent-hover">
                {t(g.visit, l)} ↗
              </a>
            )}
          </div>
        </section>

        {hero && (
          <section className="container-pf py-12">
            <figure className="relative m-0">
              <Ticks />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.src} alt={t(hero.title, l) || p.name} width={hero.w} height={hero.h} className="block h-auto w-full rounded-[18px] border border-line" fetchPriority="high" />
              <figcaption className="label pt-3 text-xs text-label">{t(hero.caption, l)} {t(g.sample, l)}</figcaption>
            </figure>
          </section>
        )}

        {features.length > 0 && (
          <section className="container-pf flex flex-wrap gap-12 py-12">
            <div className="flex flex-[1_1_280px] flex-col gap-3">
              <span className="label text-xs text-accent">01 — {t(w.solution, l)}</span>
              <h2 className="display m-0 text-4xl leading-tight">{t(p.tagline, l)}</h2>
            </div>
            <ul className="m-0 grid min-w-0 flex-[999_1_560px] list-none gap-x-8 gap-y-4 p-0 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex gap-3 border-t border-line pt-4 leading-relaxed text-text-2">
                  <span aria-hidden className="text-accent">›</span>{f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {p.shots.length > 1 && (
          <section className="border-t border-line-soft bg-surface">
            <div className="container-pf flex flex-col gap-8 py-16">
              <span className="label text-xs text-accent">02 — {t(w.screens, l)}</span>
              <ShotGrid slug={p.slug} locale={l} />
            </div>
          </section>
        )}

        <nav aria-label={t(w.prevNext, l)} className="dots border-t border-line-soft">
          <div className="container-pf grid gap-4 py-14 sm:grid-cols-2">
            <Link href={href(l, `work/${prev.slug}`)} className="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-line bg-bg p-6 hover:border-accent">
              <span className="label text-[11px] text-label">←</span>
              <span className="display text-[26px]">{prev.name}</span>
            </Link>
            <Link href={href(l, `work/${next.slug}`)} className="flex flex-col items-end gap-2 rounded-[var(--radius-lg)] border border-line bg-bg p-6 text-right hover:border-accent">
              <span className="label text-[11px] text-label">→</span>
              <span className="display text-[26px]">{next.name}</span>
            </Link>
          </div>
        </nav>
      </main>
      <Footer locale={l} />
    </ProjectModalProvider>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col-reverse border-t border-line-strong pt-3.5">
      <dd className="m-0 mt-1.5 text-[15px] leading-normal">{value}</dd>
      <dt className="label text-[11px] text-label">{label}</dt>
    </div>
  );
}
