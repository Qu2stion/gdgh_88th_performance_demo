// relations/_domain/graphModel.ts

import type { CharacterNode, CharacterEdge, CharacterId } from "./types";
import type { RelationsState } from "./state";

export type GraphNode = CharacterNode & {
  graphRole: "idle" | "center" | "outer";
};

export type GraphEdge = {
  a: CharacterId;
  b: CharacterId;
  courtLabel: string;
  personalLabel: string;
  weight?: number;
};

export function buildGraphModel(params: {
  state: RelationsState;
  characters: CharacterNode[];
  relations: CharacterEdge[];
}): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const { state, characters, relations } = params;

  const mainCharacters = characters.filter((c) => c.kind === "main");
  const extraCharacters = characters.filter((c) => c.kind === "extra");

  // ✅ idle: 7명 모두를 가로배치 대상으로 노출(그래프에 항상 존재)
  if (state.mode === "idle") {
    return {
      nodes: [...mainCharacters, ...extraCharacters].map((c) => ({ ...c, graphRole: "idle" })),
      edges: [],
    };
  }

  // ✅ special(남/여 선택): 관계도 정렬 없이 "idle 배치 유지" + 우측 패널만 갱신
  if (state.mode === "special") {
    return {
      nodes: [...mainCharacters, ...extraCharacters].map((c) => ({ ...c, graphRole: "idle" })),
      edges: [],
    };
  }

  // focused: 중심 기반 (메인만)
  const centerId = state.selectedId;
  if (!centerId) {
    return { nodes: [], edges: [] };
  }

  const center = mainCharacters.find((c) => c.id === centerId);
  if (!center) {
    // main이 아닌 id로 focused가 된 경우 방어
    return {
      nodes: [...mainCharacters, ...extraCharacters].map((c) => ({ ...c, graphRole: "idle" })),
      edges: [],
    };
  }

  const outers = mainCharacters.filter((c) => c.id !== centerId);

  const nodes: GraphNode[] = [
    { ...center, graphRole: "center" },
    ...outers.map((c) => ({ ...c, graphRole: "outer" as const })),
    // focused 상태에서도 남/여는 좌측 상단으로 “따로” 배치할 거라 여기엔 넣지 않음(필요시 넣어도 됨)
    ...extraCharacters.map((c) => ({ ...c, graphRole: "idle" as const })), // ← 유지해도 무방. layout에서 pin 처리 가능
  ];

  const edges: GraphEdge[] = relations
    .filter((r) => r.a === centerId || r.b === centerId)
    .map((r) => ({
      a: r.a,
      b: r.b,
      courtLabel: r.courtLabel,
      personalLabel: r.personalLabel,
      weight: r.weight,
    }));

  return { nodes, edges };
}
