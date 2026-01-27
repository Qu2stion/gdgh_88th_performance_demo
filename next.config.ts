import type { NextConfig } from "next";

const repo = "gdgh_88th_performance_demo";

// GitHub Pages 배포일 때만 true로 켜기
const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  ...(isGhPages
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {
        // Vercel 모드
        trailingSlash: false,
      }),

  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? `/${repo}` : "",
  },
};

export default nextConfig;
