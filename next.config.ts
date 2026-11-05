import type { NextConfig } from "next";

// Static export for GitHub Pages (user site, served from the domain root).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Two root layouts ("/" and "/[locale]") need a global 404 page for the static export.
  experimental: { globalNotFound: true },
};

export default nextConfig;
