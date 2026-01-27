// lib/api.ts
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!; // 예: https://your-render.onrender.com/api/v1

export async function apiFetch(path: string, accessToken?: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  // 에러 표준 포맷을 가정하고 텍스트도 대비
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res;
}