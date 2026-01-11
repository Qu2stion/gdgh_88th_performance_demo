// relations/_domain/selectors.ts

import type { RelationsState } from "./state";

export function isIdle(state: RelationsState) {
  return state.mode === "idle";
}

export function isFocused(state: RelationsState) {
  return state.mode === "focused";
}

export function isSpecial(state: RelationsState) {
  return state.mode === "special";
}

export function shouldRenderEdges(state: RelationsState) {
  // UX: 링크는 중심 인물 선택(focused)에서만 생성/표시
  return state.mode === "focused" && !!state.selectedId;
}

export function shouldShowRightInfo(state: RelationsState) {
  // UX: idle에서는 오른쪽 설명 없음
  return state.mode !== "idle" && !!state.selectedId;
}