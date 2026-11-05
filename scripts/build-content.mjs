// Build portfolio content from the asset workspace.
// Reads  D:/Auzan/Project/portfolio-assets/{catalog.json, screens/*/about.json, captions.json, *.png}
// Writes src/content/projects.json and public/work/<slug>/*.webp
// Usage: node scripts/build-content.mjs [--assets <dir>] [--force]
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const ASSETS = args.includes("--assets") ? args[args.indexOf("--assets") + 1] : "D:/Auzan/Project/portfolio-assets";
const FORCE = args.includes("--force");
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_IMG = path.join(ROOT, "public", "work");
const OUT_JSON = path.join(ROOT, "src", "content", "projects.json");
const SCREENS = path.join(ASSETS, "screens");

const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
const exists = (p) => fs.existsSync(p);
const slugify = (s) =>
  s.toLowerCase().replace(/-asateam(-v\d)?$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Curated decisions that the data cannot express on its own.
const HIGHLIGHTS = ["arunika", "clipper", "niratrace"];
const MERGE = { "posting-station-desktop": "posting-station" }; // slug -> parent slug
const PUBLIC_ORG = {
  "Asa-Tech-Development": { id: "Perusahaan D2C herbal", en: "Herbal D2C company" },
  "GCMF-Foundation": { id: "GCMF Foundation", en: "GCMF Foundation" },
  "Real-Engineer1453": { id: "Real Engineer (agensi)", en: "Real Engineer (agency)" },
  "rawit-umkm-university": { id: "Rawit UMKM University", en: "Rawit UMKM University" },
  auzaniman: { id: "Proyek pribadi & klien", en: "Personal & client work" },
};

// Public URL slugs without internal brand names.
const SLUG_OVERRIDE = {
  "asateam-id": "website-perusahaan",
  "adanu-adhinata-semesta": "audit-biaya-iklan",
  "base-layout-asatech-v2": "kerangka-erp",
  "birawa-service-api": "waapi",
};
// Public names: internal brand names mean nothing to visitors.
const NAME_OVERRIDE = {
  "executive-dashboard": "Executive Dashboard",
  "audit-biaya-iklan": "Audit Biaya Iklan",
  "kerangka-erp": "Kerangka Aplikasi ERP",
  waapi: "Layanan WhatsApp (Go)",
  dms: "DMS — Data Penjualan",
  "adanu-adhinata-semesta": "Audit Biaya Iklan",
  "base-layout-asatech-v2": "Kerangka Aplikasi ERP",
  aksara: "Aksara",
};
const BRAND = /\b(PT\.?\s*)?(Adanu Adhinata Semesta|Asa-?Tech(?: Development)?|Asateam(?: Indonesia)?|ASA Indonesia)\b/gi;
const unbrand = (v, l) => (typeof v === "string" ? v.replace(BRAND, l === "en" ? "the company" : "perusahaan") : v);
const unbrandL = (o) => (o ? { id: unbrand(o.id, "id"), en: unbrand(o.en, "en") } : o);
const ORG_OVERRIDE = { niratrace: { id: "Kolaborasi startup", en: "Startup collaboration" } };
// The portfolio repo itself (old template) is not a work item.
// Also hidden: repos whose only screens are a bare header or a login page.
const SKIP_REPOS = new Set(["auzaniman.github.io", "react_project", "palestra-experiment"]);
// Copies of another app are shown inside that app's card.
const FAMILY_OVERRIDE = { si_kelas_bangsa: "pksmuda", "base-layout-asatech-v2": "starter" };
// Families that grouped distinct apps only because they share a template: split them back out.
const SPLIT_FAMILIES = new Set(["starter-v2"]);

const catalog = readJSON(path.join(ASSETS, "catalog.json"))
  .filter((r) => r.include && !SKIP_REPOS.has(r.repo))
  .map((r) => (FAMILY_OVERRIDE[r.repo] ? { ...r, family: FAMILY_OVERRIDE[r.repo] } : SPLIT_FAMILIES.has(r.family) ? { ...r, family: null } : r));

// 1) index screens folders by repo and by folder name
const dirs = fs.readdirSync(SCREENS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const byRepo = new Map(); // "repo" (no owner) -> {dir, about, prefix}
for (const d of dirs) {
  const dp = path.join(SCREENS, d);
  for (const f of fs.readdirSync(dp)) {
    const m = f.match(/^about(?:-(.+))?\.json$/);
    if (!m) continue;
    const about = readJSON(path.join(dp, f));
    const repo = String(about.repo || "").split("/").pop();
    if (repo) byRepo.set(repo, { dir: d, about, prefix: m[1] || null });
  }
}

// 2) group catalog entries into projects (family = one project)
const groups = new Map();
for (const r of catalog) {
  const key = r.family || r.repo;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(r);
}

const shotsFor = (dir, prefix) => {
  const dp = path.join(SCREENS, dir);
  const caps = exists(path.join(dp, prefix ? `captions-${prefix}.json` : "captions.json"))
    ? readJSON(path.join(dp, prefix ? `captions-${prefix}.json` : "captions.json"))
    : [];
  const capBy = new Map(caps.map((c) => [c.file, c]));
  let files = fs.readdirSync(dp).filter((f) => f.endsWith(".png") && !f.startsWith("probe") && !f.startsWith("_") && !f.includes("-full"));
  if (prefix) files = files.filter((f) => f.startsWith(prefix + "-"));
  // captions order first, then the rest alphabetically
  const ordered = [...caps.map((c) => c.file).filter((f) => files.includes(f)), ...files.filter((f) => !capBy.has(f)).sort()];
  return ordered.map((f) => ({ file: path.join(dp, f), name: f, cap: capBy.get(f) }));
};

async function toWebp(src, slug, name) {
  const base = name.replace(/\.png$/, "");
  const dir = path.join(OUT_IMG, slug);
  fs.mkdirSync(dir, { recursive: true });
  const full = path.join(dir, `${base}.webp`);
  const thumb = path.join(dir, `${base}-t.webp`);
  const meta = await sharp(src).metadata();
  const portrait = meta.height > meta.width;
  const W = portrait ? 780 : 1920;
  const TW = portrait ? 360 : 760;
  const fresh = (p) => !FORCE && exists(p) && fs.statSync(p).mtimeMs > fs.statSync(src).mtimeMs;
  if (!fresh(full)) await sharp(src).resize({ width: W, withoutEnlargement: true }).webp({ quality: 80 }).toFile(full);
  if (!fresh(thumb)) await sharp(src).resize({ width: TW, withoutEnlargement: true }).webp({ quality: 74 }).toFile(thumb);
  const m2 = await sharp(full).metadata();
  return { src: `/work/${slug}/${base}.webp`, thumb: `/work/${slug}/${base}-t.webp`, w: m2.width, h: m2.height, portrait };
}

const projects = [];
const usedSlugs = new Set();
for (const [key, members] of groups) {
  // pick the screens source: family folder, else first member with an about.json
  const famDir = dirs.includes(key) ? key : null;
  // every member's screens folder; a family folder (e.g. "yni") wins, then web apps before desktop clients
  const hits = [...new Map(members.map((m) => byRepo.get(m.repo)).filter(Boolean).map((h) => [`${h.dir}|${h.prefix}`, h])).values()]
    .sort((a, b) => Number(/desktop/.test(a.dir)) - Number(/desktop/.test(b.dir)) || Number(b.about.year || 0) - Number(a.about.year || 0) || Number(/v2/.test(b.dir)) - Number(/v2/.test(a.dir)));
  const famSrc = famDir ? { dir: famDir, about: exists(path.join(SCREENS, famDir, "about.json")) ? readJSON(path.join(SCREENS, famDir, "about.json")) : {}, prefix: null } : null;
  const sources = famSrc ? [famSrc, ...hits.filter((h) => h.dir !== famDir)] : hits;
  const src = sources[0] || null;
  const lead = members.find((m) => src && byRepo.get(m.repo) === src) || members.find((m) => byRepo.has(m.repo)) || members[0];
  const about = src?.about || {};
  let slug = slugify(about.slug || src?.prefix || src?.dir || (members.length > 1 ? key : lead.repo));
  slug = SLUG_OVERRIDE[slug] || slug;
  if (usedSlugs.has(slug)) slug = `${slug}-${usedSlugs.size}`;
  usedSlugs.add(slug);
  const raw = sources.flatMap((s) => shotsFor(s.dir, s.prefix));
  const shots = [];
  for (const s of raw) {
    let img;
    try {
      img = await toWebp(s.file, slug, s.name);
    } catch (e) {
      console.warn(`skip ${path.relative(SCREENS, s.file)}: ${e.message}`);
      continue;
    }
    shots.push({
      ...img,
      title: unbrandL({ id: s.cap?.title_id || "", en: s.cap?.title_en || s.cap?.title_id || "" }),
      caption: unbrandL({ id: s.cap?.caption_id || "", en: s.cap?.caption_en || s.cap?.caption_id || "" }),
    });
  }
  const years = members.map((m) => Number(m.year)).filter(Boolean);
  projects.push({
    slug,
    name: NAME_OVERRIDE[slug] || about.name || lead.name,
    category: about.category || lead.category,
    year: String(Math.max(...years, 0) || about.year || ""),
    yearFrom: String(Math.min(...years) || ""),
    org: ORG_OVERRIDE[slug] || PUBLIC_ORG[lead.owner] || null,
    tagline: unbrandL({ id: about.tagline_id || lead.tagline_id, en: about.tagline_en || lead.tagline_en }),
    summary: unbrandL({ id: about.summary_id || "", en: about.summary_en || "" }),
    users: about.users_id ? unbrandL({ id: about.users_id, en: about.users_en || "" }) : null,
    role: about.role_id ? unbrandL({ id: about.role_id, en: about.role_en || "" }) : null,
    features: { id: (about.features_id || []).map((f) => unbrand(f, "id")), en: (about.features_en || []).map((f) => unbrand(f, "en")) },
    stack: [...new Set([...(about.stack || []), ...members.flatMap((m) => m.stack || [])])].slice(0, 10),
    repos: members.map((m) => ({ name: m.repo, public: m.visibility === "public", url: m.visibility === "public" ? `https://github.com/${m.owner}/${m.repo}` : null })),
    link: about.link || null,
    highlight: HIGHLIGHTS.includes(slug),
    shots,
  });
}

// 3) merge child projects (e.g. desktop client into its web app)
for (const [child, parent] of Object.entries(MERGE)) {
  const c = projects.find((p) => p.slug === child);
  const p = projects.find((x) => x.slug === parent);
  if (c && p) {
    p.shots.push(...c.shots);
    p.repos.push(...c.repos);
    p.stack = [...new Set([...p.stack, ...c.stack])].slice(0, 12);
    projects.splice(projects.indexOf(c), 1);
  }
}

const catOrder = ["Operasional", "Produk", "Website", "Pendidikan", "Infrastruktur", "Latihan"];
projects.sort(
  (a, b) =>
    Number(b.highlight) - Number(a.highlight) ||
    catOrder.indexOf(a.category) - catOrder.indexOf(b.category) ||
    Number(b.year) - Number(a.year) ||
    b.shots.length - a.shots.length,
);

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(projects, null, 1));
const noShots = projects.filter((p) => !p.shots.length).map((p) => p.slug);
console.log(`projects: ${projects.length}, shots: ${projects.reduce((n, p) => n + p.shots.length, 0)}`);
console.log(`without screenshots (${noShots.length}): ${noShots.join(", ")}`);
