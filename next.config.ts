import type { NextConfig } from "next";

const repo = "gdgh_88th_performance_demo";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // GitHub Pages(레포 하위 경로) 대응
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}/` : "",
};

export default nextConfig;
