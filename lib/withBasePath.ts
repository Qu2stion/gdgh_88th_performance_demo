const REPO = "gdgh_88th_performance_demo";

export const withBasePath = (path: string) => {
  if (!path) return path;

  // 외부 URL은 그대로
  if (/^https?:\/\//i.test(path)) return path;

  const base = process.env.NODE_ENV === "production" ? `/${REPO}` : "";
  const p = path.startsWith("/") ? path : `/${path}`;

  // ✅ 이미 basePath가 붙어있으면 중복 방지
  if (base && (p === base || p.startsWith(`${base}/`))) return p;

  return `${base}${p}`;
};
