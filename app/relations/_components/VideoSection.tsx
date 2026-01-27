"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CharacterNode } from "../_domain/types";

type Props = {
  selected: CharacterNode | null;
};

function getYouTubeEmbedUrl(url: string) {
  // 최소 대응: 이미 embed URL이면 그대로
  if (url.includes("youtube.com/embed/")) return url;

  // watch?v=...
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  // youtu.be/...
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  // 그 외는 그냥 반환(브라우저가 처리하도록)
  return url;
}

export default function VideoSection({ selected }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const videoUrl = selected?.monologueUrl ?? "";
  const embedUrl = useMemo(() => (videoUrl ? getYouTubeEmbedUrl(videoUrl) : ""), [videoUrl]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { root: null, threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={wrapRef}
      className={[
        "rounded-2xl border border-white/10 bg-black/25 p-5",
        "transition duration-700 will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xl font-semibold text-white">독백영상</div>
          <div className="mt-1 text-sm text-white/60">
            선택한 인물의 독백(또는 관련 영상)을 확인할 수 있습니다.
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
        {!selected ? (
          <div className="text-sm text-white/65 leading-relaxed">
            아직 선택된 인물이 없습니다. 상단에서 인물을 선택한 뒤 “영상 보기”를 눌러주세요.
          </div>
        ) : !embedUrl ? (
          <div className="text-sm text-white/65 leading-relaxed">
            <span className="text-white/85 font-semibold">{selected.label}</span>의 영상이 아직 등록되지 않았습니다.
          </div>
        ) : (
          <>
            <div className="text-sm text-white/80">
              현재 선택: <span className="font-semibold">{selected.label}</span>
              {selected.role ? <span className="text-white/60"> · {selected.role}</span> : null}
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              {/* 16:9 */}
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={embedUrl}
                  title={`${selected.label} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {selected.bio ? (
              <div className="mt-3 text-sm text-white/60 leading-relaxed">{selected.bio}</div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
