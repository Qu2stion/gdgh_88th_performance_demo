// app/schedule/_data/sessions.ts
import type { ShowSession } from "../../_types";

// 공통 공연 정보 (반복되니까 변수로 뺌)
const PERF_INFO = {
  id: "perf-88",
  title: "제 88회 정기공연 <보도지침>",
  posterUrl: "/images/posters/main.jpg", // poster -> posterUrl로 이름 통일
  venue: "학생회관 무악극장",
  runtimeMin: 120,
};

export const SESSIONS: ShowSession[] = [
  {
    id: "day1-1",
    performanceId: "perf-88",
    date: "2026-03-13",
    time: "19:30",
    totalSeats: 100,
    remainingSeats: 50,
    isSoldOut: false, // 타입 에러 해결용
    performance: PERF_INFO, // [중요] 이렇게 안으로 넣어야 합니다!
  },
  {
    id: "day2-1",
    performanceId: "perf-88",
    date: "2026-03-14",
    time: "19:30",
    totalSeats: 100,
    remainingSeats: 0,
    isSoldOut: true,
    performance: PERF_INFO,
  },
];