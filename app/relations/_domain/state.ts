// relations/_domain/state.ts

import type { Mode, Selection, CharacterId } from "./types";

export type RelationsState = {
  mode: Mode;
  selection: Selection | null;

  // 편의: UI에서 자주 쓰므로 바로 노출 (selection이 있으면 동기화)
  selectedId: CharacterId | null;
};

export type RelationsEvent =
  | { type: "CLICK_MAIN"; id: CharacterId }
  | { type: "CLICK_EXTRA"; id: CharacterId }
  | { type: "CLEAR" } // ESC / 전체보기 / 선택해제
  | { type: "HYDRATE"; selection?: Selection | null }; // (옵션) 초기값 세팅

export const initialRelationsState: RelationsState = {
  mode: "idle",
  selection: null,
  selectedId: null,
};

function setSelection(selection: Selection | null): Pick<RelationsState, "selection" | "selectedId"> {
  return {
    selection,
    selectedId: selection?.id ?? null,
  };
}

export function relationsReducer(state: RelationsState, event: RelationsEvent): RelationsState {
  switch (event.type) {
    case "HYDRATE": {
      const sel = event.selection ?? null;
      if (!sel) return initialRelationsState;

      if (sel.kind === "main") {
        return { mode: "focused", ...setSelection(sel) };
      }
      return { mode: "special", ...setSelection(sel) };
    }

    case "CLICK_MAIN": {
      const sel: Selection = { kind: "main", id: event.id };
      // idle → focused, focused → focused(교체), special → focused
      return { mode: "focused", ...setSelection(sel) };
    }

    case "CLICK_EXTRA": {
      const sel: Selection = { kind: "extra", id: event.id };
      // idle → special, focused → special(정렬 해제), special → special(교체)
      return { mode: "special", ...setSelection(sel) };
    }

    case "CLEAR": {
      return initialRelationsState;
    }

    default: {
      // 타입 안정성을 위해 exhaustive check
      const _exhaustive: never = event;
      return state;
    }
  }
}