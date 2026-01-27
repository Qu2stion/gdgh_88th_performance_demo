// relations/_data/relations.ts
import type { CharacterNode, CharacterEdge } from "../_domain/types";


export const CHARACTERS: CharacterNode[] = [
  {
    id: "juhyeok",
    label: "주혁",
    role: "기자",
    img: "/cast/juhyeok.jpeg",
    bio: "진실을 좇는 기자. 사건의 핵심을 파고들수록 더 큰 압력과 마주한다.",
    monologueUrl: "https://www.youtube.com/embed/85NtvAH20YA",
    kind: "main",
  },
  { id: "jeongbae", label: "정배", role: "편집장", img: "/cast/jeongbae.jpg", kind: "main",
    monologueUrl: "https://youtu.be/zyrjsaeA8zs?si=raCO-zUhzYRhJw1H"
  },
  { id: "seungwook", label: "승욱", role: "변호사", img: "/cast/seungwook.jpg", kind: "main",
    monologueUrl: "https://youtu.be/tgAEJZH7QPs?si=9C-FfrqErY-YL7tL"
  },
  { id: "dongyeol", label: "돈결", role: "검사", img: "/cast/donkyeol.jpg", kind: "main",
    monologueUrl: "https://youtu.be/K6UPetn7ZHs?si=klpOZ4vR6McfCN8d"
  },
  { id: "wondal", label: "원달", role: "판사", img: "/cast/wondal.jpg", kind: "main",
    monologueUrl: "https://youtu.be/fE9EadYytWo?si=CHp9nFrP3uWR4KET"
  },

  // extra (관계도 정렬 제외)
  { id: "man", label: "남자", role: "목소리", kind: "extra",
    monologueUrl: "https://youtu.be/0_vBuSGR4jQ?si=rG8HWyfdL3lgI5ye"
  },
  { id: "woman", label: "여자", role: "목소리", kind: "extra",
    monologueUrl: "https://youtu.be/MLdQeImpPFI?si=qYbIXDZxhy1SOhTd"
  },
];

function courtLabelFromType(type?: "ally" | "conflict" | "court" | "pressure") {
  switch (type) {
    case "court":
      return "법정: 심리/증언";
    case "conflict":
      return "법정: 공방/대립";
    case "pressure":
      return "법정: 압박";
    case "ally":
    default:
      return "법정: 연계";
  }
}

export const RELATIONS: CharacterEdge[] = [
  // 주혁-정배
  { a: "juhyeok", b: "jeongbae", courtLabel: courtLabelFromType("ally"), personalLabel: "동기", weight: 3 },

  // 승욱-주혁 / 승욱-정배
  { a: "seungwook", b: "juhyeok", courtLabel: courtLabelFromType("court"), personalLabel: "동기", weight: 3 },
  { a: "seungwook", b: "jeongbae", courtLabel: courtLabelFromType("court"), personalLabel: "동기", weight: 3 },

  // 돈결-주혁 / 돈결-정배
  { a: "dongyeol", b: "juhyeok", courtLabel: courtLabelFromType("conflict"), personalLabel: "동기", weight: 3 },
  { a: "dongyeol", b: "jeongbae", courtLabel: courtLabelFromType("conflict"), personalLabel: "동기", weight: 3 },
  { a: "dongyeol", b: "seungwook", courtLabel: courtLabelFromType("conflict"), personalLabel: "동기", weight: 3 },

  // 원달-전원
  { a: "wondal", b: "seungwook", courtLabel: courtLabelFromType("court"), personalLabel: "선후배/사제", weight: 2 },
  { a: "wondal", b: "dongyeol", courtLabel: courtLabelFromType("court"), personalLabel: "선후배/사제", weight: 2 },
  { a: "wondal", b: "juhyeok", courtLabel: courtLabelFromType("court"), personalLabel: "선후배/사제", weight: 2 },
  { a: "wondal", b: "jeongbae", courtLabel: courtLabelFromType("court"), personalLabel: "선후배/사제", weight: 2 },
];
