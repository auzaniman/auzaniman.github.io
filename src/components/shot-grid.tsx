"use client";

import { getProject } from "@/lib/projects";
import { t, type Locale } from "@/lib/i18n";
import { useProjectModal } from "./project-modal";

/** All screens of a project; each opens the swipeable modal at that screen. */
export function ShotGrid({ slug, locale: l }: { slug: string; locale: Locale }) {
  const { open } = useProjectModal();
  const p = getProject(slug);
  if (!p) return null;
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {p.shots.map((s, i) => (
        <li key={s.src}>
          <button type="button" onClick={() => open(slug, i)} className="group flex w-full flex-col gap-3 text-left">
            <span className={`block w-full overflow-hidden rounded-[var(--radius-md)] border border-line bg-sunken ${s.portrait ? "aspect-[3/4]" : "aspect-[16/10]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.thumb} alt={t(s.title, l)} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            </span>
            <span className="font-semibold">{t(s.title, l)}</span>
            <span className="text-sm leading-normal text-muted">{t(s.caption, l)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
