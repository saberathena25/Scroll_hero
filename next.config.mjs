// Static export so the site can be hosted on GitHub Pages.
// BASE_PATH is set by the deploy workflow (e.g. "/scroll-hero").
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
