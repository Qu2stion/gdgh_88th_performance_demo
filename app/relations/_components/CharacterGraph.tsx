"use client";

import React, { useMemo, useReducer, useRef } from "react";
import GraphStage from "./GraphStage";
import CharacterPanel from "./CharacterPanel";
import VideoSection from "./VideoSection";
import RevealSection from "./RevealSection";

import { CHARACTERS } from "../_data/relations";
import { initialRelationsState, relationsReducer } from "../_domain/state";
import { shouldShowRightInfo } from "../_domain/selectors";

export default function CharacterGraph() {
  const [state, dispatch] = useReducer(relationsReducer, initialRelationsState);
  const [showEdgeLabels, setShowEdgeLabels] = React.useState(true);

  const videoRef = useRef<HTMLDivElement | null>(null);

  const selectedNode = useMemo(() => {
    if (!state.selectedId) return null;
    return CHARACTERS.find((c) => c.id === state.selectedId) ?? null;
  }, [state.selectedId]);

  const showInfo = shouldShowRightInfo(state);

  const handleShowVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full pt-40">
      <RevealSection>
      {/* Main (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-4 items-start">
        {/* Left: Graph */}
        <div className="relative rounded-2xl border border-white/10 bg-black/25 p-2">
          {/* ✅ floating controls */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEdgeLabels((v) => !v)}
              className="rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              관계 라벨 {showEdgeLabels ? "끄기" : "켜기"}
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "CLEAR" })}
              className="rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-white/85 hover:bg-white/10 transition"
            >
              전체 보기
            </button>
          </div>

          <GraphStage state={state} dispatch={dispatch} showEdgeLabels={showEdgeLabels} />
        </div>

        {/* Right: Panel */}
        <div className="rounded-2xl border border-white/10 bg-black/25 p-2">
          {showInfo && selectedNode ? (
            <CharacterPanel
              id={selectedNode.id}
              onClose={() => dispatch({ type: "CLEAR" })}
              onShowVideo={handleShowVideo}
            />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/50 p-5 text-white/70">
              그래프에서 인물을 클릭해 선택하세요.
            </div>
          )}
        </div>
      </div>
      </RevealSection>


      {/* Video (scroll section) */}
      {selectedNode ? (
        <RevealSection delayMs={80}>
          <div ref={videoRef} className="mt-10">
            <VideoSection selected={selectedNode} />
          </div>
        </RevealSection>
      ) : null}
    </div>
  );
}
