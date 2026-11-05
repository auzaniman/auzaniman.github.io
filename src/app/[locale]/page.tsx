import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { Gallery } from "@/components/gallery";
import { Approach, BuildLayers, Contact, Footer, Journey, Marquee } from "@/components/sections";
import { ProjectModalProvider } from "@/components/project-modal";
import { copy, site } from "@/content/site";
import { projects } from "@/lib/projects";
import { t, type Locale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale: l } = await params;

  // Structured data: who Auzan is and which works exist (helps search engines show a rich result).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.fullName,
        url: site.url,
        jobTitle: "Full-Stack Engineer & Tech Lead",
        address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "ID" },
        knowsAbout: ["Laravel", "Vue.js", "React", "Next.js", "Go", "TypeScript", "System design"],
        sameAs: [site.github, site.linkedin].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: "Auzan",
        inLanguage: l,
        description: t(copy.meta.description, l),
        author: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "ItemList",
        name: t(copy.gallery.title, l),
        itemListElement: projects.slice(0, 30).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site.url}/${l}/work/${p.slug}/`,
          name: p.name,
        })),
      },
    ],
  };

  return (
    <ProjectModalProvider locale={l}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Nav locale={l} />
      <main id="isi">
        <Hero locale={l} />
        <Marquee />
        <Highlights locale={l} />
        <Gallery locale={l} />
        <BuildLayers locale={l} />
        <Journey locale={l} />
        <Approach locale={l} />
        <Contact locale={l} />
      </main>
      <Footer locale={l} />
    </ProjectModalProvider>
  );
}
