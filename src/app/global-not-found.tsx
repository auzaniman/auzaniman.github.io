import type { Metadata } from "next";
import "./globals.css";
import { fontVars } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404 — Page not found · Halaman tidak ditemukan",
  robots: { index: false },
};

// Exported as out/404.html; GitHub Pages serves it for unknown paths.
export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${fontVars} antialiased`}>
        <main className="dots flex min-h-screen items-center">
          <div className="container-pf flex flex-col gap-6 py-24">
            <span className="label text-xs text-accent">Error 404 · SYS-404</span>
            <h1 className="display m-0 text-[clamp(44px,8vw,88px)] leading-[0.98]">
              This page doesn&apos;t exist<span className="text-accent">.</span>
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-text-2">
              The link may have changed. Halaman ini tidak ada — mungkin tautannya sudah berubah.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/en/" className="rounded-[var(--radius-md)] bg-accent px-6 py-3.5 font-semibold text-on-accent hover:bg-accent-hover">Go to home</a>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/id/" className="rounded-[var(--radius-md)] border border-line-strong px-6 py-3.5 hover:bg-surface-2">Ke beranda (ID)</a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
