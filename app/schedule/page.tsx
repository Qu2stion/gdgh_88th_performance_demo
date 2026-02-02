import React from "react";
import ScheduleClient from "./_components/ScheduleClient";
import type { ShowSession } from "@/app/_types"; // [수정] 경로 alias(@) 권장

// [Server Action] DB 데이터 Fetching 시뮬레이션
async function getScheduleData(): Promise<ShowSession[]> {
  // 실제 DB 연동 전까지 Mock Data 사용
  await new Promise((resolve) => setTimeout(resolve, 0));

  const performance88 = {
    id: "perf-88",
    title: "제 88회 정기공연 <보도지침>",
    venue: "학생회관 무악극장",
    posterUrl: "/images/gdgh_logo_dark.png", // [수정] 포스터 없을 시 로고로 대체 (임시)
    runtimeMin: 120, // 이제 타입 에러 안 남
  };

  return [
    {
      id: "s-1",
      performanceId: "perf-88",
      date: "2026-03-13",
      time: "19:30",
      totalSeats: 100,
      remainingSeats: 42,
      performance: performance88,
    },
    {
      id: "s-2",
      performanceId: "perf-88",
      date: "2026-03-14",
      time: "14:00",
      totalSeats: 100,
      remainingSeats: 15,
      performance: performance88,
    },
    {
      id: "s-3",
      performanceId: "perf-88",
      date: "2026-03-14",
      time: "19:00",
      totalSeats: 100,
      remainingSeats: 0, // 매진
      performance: performance88,
    },
  ];
}

export default async function SchedulePage() {
  const sessions = await getScheduleData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">공연 일정</h1>
        <p className="mt-1 text-sm text-white/60">
          달력에서 날짜를 선택하면 해당 날짜의 공연 회차가 표시됩니다.
        </p>
      </div>

      <ScheduleClient initialSessions={sessions} />
    </div>
  );
}