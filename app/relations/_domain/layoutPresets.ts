// relations/_domain/layoutPresets.ts

import type { CharacterId, Mode } from "./types";
import type { GraphNode } from "./graphModel";

export type Vec2N = { x: number; y: number };
export type Vec2P = { x: number; y: number };

export type InsetsPx = { left?: number; right?: number; top?: number; bottom?: number };

export type LayoutInput = {
  mode: Mode;
  selectedId: CharacterId | null;
  nodes: GraphNode[];
  widthPx: number;
  heightPx: number;
  insetsPx?: InsetsPx;
};

export type LayoutOutput = {
  posById: Map<CharacterId, Vec2P>;
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const add = (a: Vec2N, b: Vec2N): Vec2N => ({ x: a.x + b.x, y: a.y + b.y });

function toUsableRect(widthPx: number, heightPx: number, insets?: InsetsPx) {
  const left = insets?.left ?? 0;
  const right = insets?.right ?? 0;
  const top = insets?.top ?? 0;
  const bottom = insets?.bottom ?? 0;

  const usableW = Math.max(1, widthPx - left - right);
  const usableH = Math.max(1, heightPx - top - bottom);

  return { left, top, usableW, usableH };
}

function normToPx(p: Vec2N, rect: { left: number; top: number; usableW: number; usableH: number }): Vec2P {
  return {
    x: rect.left + clamp01(p.x) * rect.usableW,
    y: rect.top + clamp01(p.y) * rect.usableH,
  };
}

/**
 * focused 중심(anchor)
 * - 우측 패널을 고려하여 x는 왼쪽
 * - 겹침을 줄이기 위해 y를 살짝 올림
 */
export const ANCHOR_FOCUSED: Vec2N = { x: 0.38, y: 0.52 };

/**
 * focused에서 남/여(extra) 고정 핀 (좌측 상단)
 */
export const EXTRA_PINS_N: Record<CharacterId, Vec2N> = {
  man: { x: 0.10, y: 0.18 },
  woman: { x: 0.18, y: 0.18 },
};

/**
 * 중심별 주변 4명 오프셋 프리셋(명시형)
 * - 값은 "중심" 대비 상대 오프셋
 * - computeLayout에서 OUTER_SCALE로 일괄 확대 가능
 */
export const OUTER_OFFSETS_BY_CENTER: Record<CharacterId, Partial<Record<CharacterId, Vec2N>>> = {
  juhyeok: {
    jeongbae: { x: 0.24, y: -0.20 },
    seungwook: { x: 0.32, y: 0.00 },
    dongyeol: { x: 0.24, y: 0.22 },
    wondal: { x: 0.12, y: 0.36 },
  },
  jeongbae: {
    juhyeok: { x: 0.22, y: -0.22 },
    seungwook: { x: 0.32, y: -0.02 },
    dongyeol: { x: 0.24, y: 0.20 },
    wondal: { x: 0.12, y: 0.36 },
  },
  seungwook: {
    wondal: { x: 0.22, y: -0.24 },
    juhyeok: { x: 0.32, y: -0.04 },
    jeongbae: { x: 0.28, y: 0.16 },
    dongyeol: { x: 0.14, y: 0.34 },
  },
  dongyeol: {
    wondal: { x: 0.20, y: -0.22 },
    juhyeok: { x: 0.32, y: -0.02 },
    jeongbae: { x: 0.24, y: 0.18 },
    seungwook: { x: 0.12, y: 0.36 },
  },
  wondal: {
    seungwook: { x: 0.26, y: -0.22 },
    dongyeol: { x: 0.32, y: -0.02 },
    juhyeok: { x: 0.26, y: 0.20 },
    jeongbae: { x: 0.12, y: 0.36 },
  },
};

/**
 * ✅ 노드 간 거리 확대(라벨 겹침 감소)
 * - 1.15~1.35에서 취향대로 튜닝
 */
export const OUTER_SCALE = 1.22;

export function computeLayout(input: LayoutInput): LayoutOutput {
  const rect = toUsableRect(input.widthPx, input.heightPx, input.insetsPx);
  const posById = new Map<CharacterId, Vec2P>();

  // idle/special: 7명 가로 일렬 (그래프 영역 상단)
  if (input.mode !== "focused" || !input.selectedId) {
    const nodes = input.nodes;
    const n = Math.max(1, nodes.length);

    const left = 0.06;
    const right = 0.94;
    const y = 0.18;

    nodes.forEach((node, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const x = left + (right - left) * t;
      posById.set(node.id, normToPx({ x, y }, rect));
    });

    return { posById };
  }

  // focused
  const centerId = input.selectedId;
  const centerN = ANCHOR_FOCUSED;

  // center
  posById.set(centerId, normToPx(centerN, rect));

  // extra pins
  for (const [id, pN] of Object.entries(EXTRA_PINS_N)) {
    posById.set(id, normToPx(pN, rect));
  }

  // outers
  const preset = OUTER_OFFSETS_BY_CENTER[centerId] ?? {};
  const outers = input.nodes.filter((n) => n.graphRole === "outer");

  outers.forEach((outer) => {
    const base = preset[outer.id] ?? { x: 0.26, y: 0.20 };

    // ✅ 거리 스케일 업
    const off = { x: base.x * OUTER_SCALE, y: base.y * OUTER_SCALE };

    const pN = add(centerN, off);
    posById.set(outer.id, normToPx({ x: clamp01(pN.x), y: clamp01(pN.y) }, rect));
  });

  return { posById };
}

export function lerpPoint(a: Vec2P, b: Vec2P, t: number): Vec2P {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}
