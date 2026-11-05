import type { Metadata } from "next";
import { copy, site } from "@/content/site";
import { defaultLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: copy.meta.title[defaultLocale],
  description: copy.meta.description[defaultLocale],
  alternates: { canonical: `${site.url}/${defaultLocale}/` },
  robots: { index: false, follow: true },
};

/** Static export has no server redirect: send every visitor to the default language (English) in the browser. */
const pick = `location.replace('/${defaultLocale}/'+location.hash);`;

export default function Root() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: pick }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </noscript>
      <main className="flex min-h-screen items-center justify-center gap-6 p-8">
        {/* Plain anchors: "/" and "/[locale]" use different root layouts, so a full page load is required. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/en/" className="underline">English</a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/id/" className="underline">Bahasa Indonesia</a>
      </main>
    </>
  );
}
