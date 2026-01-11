export function withBasePath(src: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!src.startsWith("/")) return src;
  return `${basePath}${src}`;
}
