"use client";

import React, { useMemo } from "react";
import { CHARACTERS, RELATIONS } from "../_data/relations";
import { withBasePath } from "@/lib/withBasePath";

type Props = {
  id: string;
  onClose: () => void;
  onShowVideo: () => void;
};

function isExtraId(id: string) {
  return id === "male" || id === "female";
}

export default function CharacterPanel({ id, onClose, onShowVideo }: Props) {
  const character = useMemo(() => CHARACTERS.find((c) => c.id === id) ?? null, [id]);

  const relations = useMemo(() => {
    if (!character || character.kind !== "main") return [];

    // 중심 인물과 연결된 모든 관계(여기서는 main 5명이 서로 모두 연결되어 있음)
    const edges = RELATIONS.filter((r) => r.a === id || r.b === id);

    return edges
      .map((e) => {
        const otherId = e.a === id ? e.b : e.a;
        const other = CHARACTERS.find((c) => c.id === otherId) ?? null;
        if (!other) return null;

        return {
          otherId,
          otherLabel: other.label,
          otherRole: other.role,
          courtLabel: e.courtLabel,
          personalLabel: e.personalLabel,
          weight: e.weight,
        };
      })
      .filter(Boolean) as Array<{
      otherId: string;
      otherLabel: string;
      otherRole?: string;
      courtLabel: string;
      personalLabel: string;
      weight?: number;
    }>;
  }, [character, id]);

  if (!character) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/50 p-5 text-white">
        <div className="text-sm font-semibold">인물을 찾을 수 없습니다</div>
        <div className="mt-2 text-sm text-white/60">데이터(id)가 일치하는지 확인하세요.</div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white/85 hover:bg-white/10 transition"
        >
          닫기
        </button>
      </div>
    );
  }

  const isExtra = character.kind === "extra" || isExtraId(character.id);
  const hasVideo = !!character.monologueUrl;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/50 p-5 text-white">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-lg font-semibold">
            {character.label}
            {character.role ? <span className="ml-2 text-sm text-white/70">· {character.role}</span> : null}
          </div>
          <div className="mt-1 text-xs text-white/50">ID: {character.id}</div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
        >
          닫기
        </button>
      </div>

      <div className="mt-4 flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30">
          {character.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={character.img} alt={character.label} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/60">NO IMG</div>
          )}
        </div>

        <div className="min-w-0">
          <div className="text-sm text-white/80 leading-relaxed">
            {character.bio ?? "설명이 아직 등록되지 않았습니다."}
          </div>

          {isExtra ? (
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/70">
              이 인물은 다역/내레이션 성격이 강해 관계도 정렬(링크)에는 포함되지 않습니다.
            </div>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-sm text-white/85 hover:bg-white/10 transition"
        >
          선택 해제
        </button>

        <button
          type="button"
          onClick={() => {
            if (!hasVideo) return;
            onShowVideo();
          }}
          disabled={!hasVideo}
          className={[
            "w-full rounded-xl border px-3 py-3 text-sm transition",
            hasVideo
              ? "border-white/15 bg-white/5 text-white/85 hover:bg-white/10"
              : "border-white/10 bg-white/0 text-white/35 cursor-not-allowed",
          ].join(" ")}
        >
          영상 보기
        </button>
      </div>

      {/* Relations summary (main only) */}
      {!isExtra ? (
        <div className="mt-5">
          <div className="text-sm font-semibold text-white/85">관계 요약</div>
          <div className="mt-2 text-xs text-white/55">
            링크의 중심 쪽은 법정 관계, 상대 쪽은 개인 관계로 표시됩니다.
          </div>

          <div className="mt-3 space-y-2">
            {relations.map((r) => (
              <div
                key={r.otherId}
                className="rounded-xl border border-white/10 bg-black/25 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm text-white/85">
                    {r.otherLabel}
                    {r.otherRole ? <span className="ml-2 text-xs text-white/60">· {r.otherRole}</span> : null}
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/75">
                    법정: {r.courtLabel}
                  </span>
                  <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-xs text-white/70">
                    개인: {r.personalLabel}
                  </span>
                </div>
              </div>
            ))}

            {relations.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-sm text-white/60">
                관계 정보가 없습니다.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
