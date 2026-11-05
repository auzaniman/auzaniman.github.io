"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { copy } from "@/content/site";
import { locales, t, type Locale } from "@/lib/i18n";

const sections = [
  ["sorotan", copy.nav.highlights],
  ["galeri", copy.nav.gallery],
  ["cara-dibangun", copy.nav.build],
  ["perjalanan", copy.nav.journey],
  ["kontak", copy.nav.contact],
] as const;

export function Nav({ locale: l, home = true }: { locale: Locale; home?: boolean }) {
  const path = usePathname() || `/${l}/`;
  const other: Locale = l === "id" ? "en" : "id";
  const otherPath = path.replace(/^\/(id|en)(?=\/|$)/, `/${other}`);
  const [open, setOpen] = useState(false);
  const base = home ? "" : `/${l}/`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-[var(--nav-bg)] backdrop-blur-md">
      <a href="#isi" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-on-accent">
        {t(copy.nav.skip, l)}
      </a>
      <div className="container-pf flex h-[72px] items-center justify-between gap-4">
        <Link href={`/${l}/`} className="flex items-center gap-2.5" aria-label="Auzan — beranda">
          <span className="label inline-flex h-9 w-9 items-center justify-center rounded-lg border-[1.5px] border-accent text-[13px] text-accent">AZ</span>
          <span className="display text-[21px]">auzan<span className="text-accent">.</span></span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex list-none items-center gap-1 p-0">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a href={`${base}#${id}`} className="rounded-lg px-3.5 py-2.5 text-[15px] text-muted transition-colors hover:text-text">
                  {t(label, l)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <div role="group" aria-label={t(copy.nav.language, l)} className="flex rounded-full border border-line p-[3px]">
            {locales.map((x) => (
              <Link
                key={x}
                href={x === l ? path : otherPath}
                hrefLang={x}
                aria-current={x === l ? "true" : undefined}
                className={`label rounded-full px-3 py-2 text-xs transition-colors ${x === l ? "bg-text text-bg" : "text-muted hover:text-text"}`}
              >
                {x.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeToggle label={t(copy.nav.theme, l)} />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={t(open ? copy.nav.close : copy.nav.menu, l)}
            onClick={() => setOpen((v) => !v)}
          >
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Navigasi utama" className="border-t border-line-soft bg-bg lg:hidden">
          <ul className="container-pf flex list-none flex-col py-3">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a href={`${base}#${id}`} onClick={() => setOpen(false)} className="display flex py-3 text-2xl">
                  {t(label, l)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = !mounted || resolvedTheme !== "light";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-surface-2"
    >
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
