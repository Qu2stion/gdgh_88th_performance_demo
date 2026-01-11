// relations/_domain/types.ts

export type Mode = "idle" | "focused" | "special";
export type CharacterKind = "main" | "extra";

export type CharacterId = string;

export type CharacterNode = {
  id: CharacterId;
  label: string;
  img?: string;
  role?: string;
  bio?: string;
  monologueUrl?: string;

  kind: CharacterKind; // main(5) / extra(남자,여자)
};

export type CharacterEdge = {
  a: CharacterId;
  b: CharacterId;

  // “법정(현재 시점)” 관계 라벨
  courtLabel: string;

  // “개인적/서사적” 관계 라벨
  personalLabel: string;

  weight?: number;
};

// UI에서 선택 상태가 의미를 가지므로, 선택도 타입으로 강하게 관리
export type Selection =
  | { kind: "main"; id: CharacterId }
  | { kind: "extra"; id: CharacterId };