import data from "@/content/projects.json";
import type { L10n } from "@/lib/i18n";

export type Shot = {
  src: string;
  thumb: string;
  w: number;
  h: number;
  portrait: boolean;
  title: L10n;
  caption: L10n;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  yearFrom: string;
  org: L10n | null;
  tagline: L10n;
  summary: L10n;
  users: L10n | null;
  role: L10n | null;
  features: { id: string[]; en: string[] };
  stack: string[];
  repos: { name: string; public: boolean; url: string | null }[];
  link: string | null;
  highlight: boolean;
  shots: Shot[];
};

// A work item is only published once it has at least one real screen.
export const projects = (data as Project[]).filter((p) => p.shots.length > 0);
export const bySlug = new Map(projects.map((p) => [p.slug, p]));
export const getProject = (slug: string) => bySlug.get(slug);

/** Impact lines for the highlight section. Numbers stay out until Auzan approves them. */
export const highlightImpact: Record<string, L10n> = {
  arunika: {
    id: "Pesanan dicatat sekali, kurir dan ongkir dipilih sistem, status paket terlihat semua tim.",
    en: "Orders are entered once, the system picks courier and shipping cost, and every team sees parcel status.",
  },
  clipper: {
    id: "Volume video naik tanpa menambah editor: klip ditandai AI, dirakit otomatis, lalu diunggah massal.",
    en: "More videos without more editors: AI tags clips, videos assemble themselves, then publish in bulk.",
  },
  niratrace: {
    id: "Bukti asal-usul siap untuk auditor, sertifikasi organik, dan pembeli ekspor.",
    en: "Proof of origin ready for auditors, organic certification and export buyers.",
  },
};
