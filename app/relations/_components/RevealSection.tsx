"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export default function RevealSection({ children, className, delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
      },
      {
        threshold: 0.18,        // 조금 더 안쪽에서 트리거
        rootMargin: "0px 0px -10% 0px", // 바닥 근처에서 미리 켜지는 것 방지
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "will-change-transform will-change-opacity",
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className ?? "",
      ].join(" ")}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "900ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
