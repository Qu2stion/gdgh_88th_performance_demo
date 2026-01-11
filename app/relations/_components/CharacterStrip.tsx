"use client";

import React from "react";
import type { Dispatch } from "react";

import type { CharacterNode } from "../_domain/types";
import type { RelationsEvent, RelationsState } from "../_domain/state";

type Props = {
  characters: CharacterNode[]; // 7명 (main 5 + extra 2)
  state: RelationsState;
  dispatch: Dispatch<RelationsEvent>;
};

function isSelected(state: RelationsState, id: string) {
  return state.selectedId === id && state.mode !== "idle";
}

export default function CharacterStrip({ characters, state, dispatch }: Props) {
  // UX 요구: S0에서 오른쪽 정보가 없으니 7명을 한 줄로 여유롭게
  // 화면이 더 작으면 자연스럽게 줄어들 수는 있으나 기본 목표는 1줄 유지
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="text-xs text-white/70 shrink-0">인물 선택</div>

        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mt-3 flex items-center gap-3">
        {characters.map((c) => {
          const selected = isSelected(state, c.id);
          const isExtra = c.kind === "extra";

          const onClick = () => {
            if (isExtra) dispatch({ type: "CLICK_EXTRA", id: c.id });
            else dispatch({ type: "CLICK_MAIN", id: c.id });
          };

          return (
            <button
              key={c.id}
              type="button"
              onClick={onClick}
              className={[
                "group relative h-12 w-12 rounded-full overflow-hidden border transition",
                selected ? "border-white/60" : "border-white/15 hover:border-white/35",
              ].join(" ")}
              title={c.label}
            >
              {c.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.img} alt={c.label} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-white/70 bg-black/40">
                  {c.label}
                </div>
              )}

              {/* 선택 링 */}
              <div
                className={[
                  "pointer-events-none absolute inset-0 rounded-full transition",
                  selected ? "ring-2 ring-white/70" : "ring-0 ring-transparent",
                ].join(" ")}
              />

              {/* extra(남/여) 약한 표시 */}
              {isExtra ? (
                <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] text-white/75 border border-white/10">
                  다역
                </div>
              ) : null}
            </button>
          );
        })}

        {/* 전체보기 */}
        <button
          type="button"
          onClick={() => dispatch({ type: "CLEAR" })}
          className="ml-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
        >
          전체 보기
        </button>

        {/* 상태 텍스트(선택 사항) */}
        {state.mode !== "idle" && state.selectedId ? (
          <div className="ml-2 text-xs text-white/60">
            선택: <span className="text-white/80">{state.selectedId}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
