export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Pick the string for a locale from a {id, en} pair; falls back to the other language when one is empty. */
export type L10n = { id: string; en: string };
export const t = (v: L10n | undefined, l: Locale) => (v ? v[l] || v[l === "en" ? "id" : "en"] : "");

/** Path helper: "/en/work/arunika/". trailingSlash is on in next.config. */
export const href = (l: Locale, path = "") => `/${l}/${path.replace(/^\/|\/$/g, "")}${path ? "/" : ""}`;
