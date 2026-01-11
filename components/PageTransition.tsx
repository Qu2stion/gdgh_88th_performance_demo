"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

/**
 * 전역 페이지 진입 트랜지션(약하게).
 * - Navbar/고정 레이아웃은 유지
 * - 본문(children)만 pathname 변경 시마다 fade-in 재생
 * - prefers-reduced-motion 존중
 */
export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
