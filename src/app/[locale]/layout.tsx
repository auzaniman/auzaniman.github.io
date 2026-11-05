import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVars } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { copy, site } from "@/content/site";
import { defaultLocale, isLocale, locales, t, type Locale } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c100f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : defaultLocale) as Locale;
  return {
    metadataBase: new URL(site.url),
    title: { default: t(copy.meta.title, l), template: `%s — Auzan` },
    description: t(copy.meta.description, l),
    authors: [{ name: site.fullName, url: site.url }],
    creator: site.fullName,
    keywords: ["Full-Stack Engineer", "Laravel", "Vue", "React", "Next.js", "Go", "Yogyakarta", "Tech Lead", "portofolio", "sistem informasi"],
    alternates: { canonical: `/${l}/`, languages: { id: "/id/", en: "/en/", "x-default": "/en/" } },
    openGraph: {
      type: "website",
      siteName: "Auzan",
      locale: l === "id" ? "id_ID" : "en_US",
      url: `/${l}/`,
      title: t(copy.meta.title, l),
      description: t(copy.meta.description, l),
      images: [{ url: l === "en" ? "/og.png" : "/og-id.png", width: 1200, height: 630, alt: t(copy.meta.title, l) }],
    },
    twitter: { card: "summary_large_image", title: t(copy.meta.title, l), description: t(copy.meta.description, l), images: [l === "en" ? "/og.png" : "/og-id.png"] },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <body className={`${fontVars} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
