"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch } from "react";

import type { RelationsState, RelationsEvent } from "../_domain/state";
import { CHARACTERS, RELATIONS } from "../_data/relations";
import { buildGraphModel } from "../_domain/graphModel";
import { computeLayout, lerpPoint } from "../_domain/layoutPresets";
import { withBasePath } from "@/lib/withBasePath";

type Props = {
  state: RelationsState;
  dispatch: Dispatch<RelationsEvent>;
  showEdgeLabels?: boolean;
};

function measureLabelWidth(text: string) {
  const perChar = 12;
  const padding = 5;
  const max = 150;
  const min = 50;
  const w = text.length * perChar + padding * 2;
  return Math.max(min, Math.min(max, w));
}

function useResizeObserver<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 900, height: 540 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      setSize({
        width: Math.max(320, Math.floor(cr.width)),
        height: Math.max(360, Math.floor(cr.height)),
      });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

function isExtra(id: string) {
  return id === "man" || id === "woman";
}

function clipId(id: string) {
  return `clip-${id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

type Phase = "steady" | "hiding" | "moving" | "showing" | "leaving";

export default function GraphStage({ state, dispatch, showEdgeLabels = true }: Props) {
  const { ref, size } = useResizeObserver<HTMLDivElement>();

  const [phase, setPhase] = useState<Phase>("steady");
  const [edgesMounted, setEdgesMounted] = useState(false);

  const [enableNodeTransition, setEnableNodeTransition] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setEnableNodeTransition(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const sig = `${state.mode}:${state.selectedId ?? "none"}`;

  const EDGE_FADE_OUT_MS = 120;
  const NODE_MOVE_MS = 650;
  const EDGE_FADE_IN_MS = 260;

  const timersRef = useRef<number[]>([]);
  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const targetFocused = state.mode === "focused" && !!state.selectedId;

  useEffect(() => {
    clearTimers();

    if (targetFocused) {
      setEdgesMounted(true);

      setPhase("hiding");
      timersRef.current.push(window.setTimeout(() => setPhase("moving"), EDGE_FADE_OUT_MS));
      timersRef.current.push(
        window.setTimeout(() => setPhase("showing"), EDGE_FADE_OUT_MS + NODE_MOVE_MS - 140)
      );
      timersRef.current.push(
        window.setTimeout(() => setPhase("steady"), EDGE_FADE_OUT_MS + NODE_MOVE_MS + EDGE_FADE_IN_MS)
      );
      return;
    }

    if (edgesMounted) {
      setPhase("leaving");
      timersRef.current.push(
        window.setTimeout(() => {
          setEdgesMounted(false);
          setPhase("steady");
        }, EDGE_FADE_OUT_MS + 40)
      );
    } else {
      setPhase("steady");
    }

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  const model = useMemo(() => {
    return buildGraphModel({
      state,
      characters: CHARACTERS,
      relations: RELATIONS,
    });
  }, [state]);

  const layout = useMemo(() => {
    return computeLayout({
      mode: state.mode,
      selectedId: state.selectedId,
      nodes: model.nodes,
      widthPx: size.width,
      heightPx: size.height,
      insetsPx: { left: 24, right: 24, top: 0, bottom: 72 },
    });
  }, [state.mode, state.selectedId, model.nodes, size.width, size.height]);

  const posById = layout.posById;

  const onNodeClick = (id: string) => {
    if (isExtra(id)) dispatch({ type: "CLICK_EXTRA", id });
    else dispatch({ type: "CLICK_MAIN", id });
  };

  const edgeOpacity = phase === "showing" || phase === "steady" ? 1 : 0;

  const edgeTransition = `opacity ${phase === "showing" ? EDGE_FADE_IN_MS : EDGE_FADE_OUT_MS}ms ease`;

  const shouldRenderEdges =
    edgesMounted && showEdgeLabels !== undefined
      ? targetFocused ||
        phase === "leaving" ||
        phase === "hiding" ||
        phase === "moving" ||
        phase === "showing"
      : edgesMounted;

  const nodeTransition = enableNodeTransition
    ? `transform ${NODE_MOVE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
    : "none";

  return (
    <div ref={ref} className="relative w-full h-[70vh] min-h-[620px]">
      <svg width={size.width} height={size.height} className="block">
        {shouldRenderEdges ? (
          <g style={{ opacity: edgeOpacity, transition: edgeTransition }}>
            {model.edges.map((e, idx) => {
              const a = posById.get(e.a);
              const b = posById.get(e.b);
              if (!a || !b) return null;

              const centerId = state.selectedId ?? "";
              const isCenterA = e.a === centerId;
              const isCenterB = e.b === centerId;

              const tCourt = isCenterA ? 0.35 : isCenterB ? 0.65 : 0.5;
              const tPersonal = isCenterA ? 0.65 : isCenterB ? 0.35 : 0.5;

              const pCourt = lerpPoint(a, b, tCourt);
              const pPersonal = lerpPoint(a, b, tPersonal);

              const wLine = Math.max(1.2, (e.weight ?? 1) * 1.4);

              const courtW = measureLabelWidth(e.courtLabel);
              const personalW = measureLabelWidth(e.personalLabel);

              return (
                <g key={`${e.a}-${e.b}-${idx}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="white"
                    strokeWidth={wLine}
                    opacity={0.65}
                  />

                  {showEdgeLabels ? (
                    <>
                      <g transform={`translate(${pCourt.x}, ${pCourt.y})`}>
                        <rect
                          x={-courtW / 2}
                          y={-12}
                          width={courtW}
                          height={24}
                          rx={10}
                          fill="rgba(0,0,0,0.65)"
                          stroke="rgba(255,255,255,0.18)"
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={11}
                          fill="white"
                          stroke="rgba(0,0,0,0.75)"
                          strokeWidth={3}
                          style={{ paintOrder: "stroke" as const }}
                        >
                          {e.courtLabel}
                        </text>
                      </g>

                      <g transform={`translate(${pPersonal.x}, ${pPersonal.y + 18})`}>
                        <rect
                          x={-personalW / 2}
                          y={-12}
                          width={personalW}
                          height={24}
                          rx={10}
                          fill="rgba(0,0,0,0.55)"
                          stroke="rgba(255,255,255,0.14)"
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={11}
                          fill="white"
                          stroke="rgba(0,0,0,0.75)"
                          strokeWidth={3}
                          style={{ paintOrder: "stroke" as const }}
                        >
                          {e.personalLabel}
                        </text>
                      </g>
                    </>
                  ) : null}
                </g>
              );
            })}
          </g>
        ) : null}

        {model.nodes.map((n) => {
          const p = posById.get(n.id);
          if (!p) return null;

          const isCenter = n.graphRole === "center";
          const r = isCenter ? 36 : 28;
          const cId = clipId(n.id);

          const nameText = `${n.label}${n.role ? ` · ${n.role}` : ""}`;

          return (
            <g
              key={n.id}
              onClick={() => onNodeClick(n.id)}
              className="cursor-pointer"
              style={{
                transform: `translate(${p.x}px, ${p.y}px)`,
                transition: nodeTransition,
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              <circle
                r={r}
                fill="rgba(0,0,0,0.55)"
                stroke="white"
                strokeWidth={isCenter ? 1.6 : 1.2}
                opacity={0.95}
              />

              {n.img ? (
                <>
                  <defs>
                    <clipPath id={cId}>
                      <circle r={r - 2} />
                    </clipPath>
                  </defs>
                  <image
                    href={withBasePath(n.img)}
                    x={-(r - 2)}
                    y={-(r - 2)}
                    width={(r - 2) * 2}
                    height={(r - 2) * 2}
                    clipPath={`url(#${cId})`}
                    preserveAspectRatio="xMidYMid slice"
                    opacity={0.98}
                  />
                </>
              ) : (
                <text textAnchor="middle" dominantBaseline="central" fontSize={12} fill="white">
                  {n.label}
                </text>
              )}

              {state.mode === "focused" ? (
                <g transform={`translate(0, ${r + 18})`}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={12}
                    fill="white"
                    stroke="rgba(0,0,0,0.75)"
                    strokeWidth={3}
                    style={{ paintOrder: "stroke" as const }}
                  >
                    {nameText}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
