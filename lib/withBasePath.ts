const REPO = "gdgh_88th_performance_demo";

export const withBasePath = (path: string) => {
  const base = process.env.NODE_ENV === "production" ? `/${REPO}` : "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
};
