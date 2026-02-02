import React from "react";
import ReservationClient from "./_components/ReservationClient";
import { Performance } from "@/app/_types";

async function getPerformances(): Promise<Performance[]> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  return [
    {
      id: "perf-88",
      title: "제 88회 정기공연 <보도지침>",
      // [중요] public/images/posters/main.jpg 파일이 없으면 깨집니다.
      // 우선 로고 파일로 대체해두었으니, 나중에 실제 포스터 파일을 넣고 경로를 바꿔주세요.
      posterUrl: "/images/gdgh_logo_dark.png", 
      venue: "학생회관 무악극장",
      period: "2026.03.13 - 2026.03.14",
      sessions: [
        { id: "s1", performanceId: "perf-88", date: "2026-03-13", time: "19:30", totalSeats: 100, remainingSeats: 42 },
        { id: "s2", performanceId: "perf-88", date: "2026-03-14", time: "14:00", totalSeats: 100, remainingSeats: 15 },
        { id: "s3", performanceId: "perf-88", date: "2026-03-14", time: "19:00", totalSeats: 100, remainingSeats: 0 },
      ],
    },
  ];
}

export default async function ReservationPage() {
  const performances = await getPerformances();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 pb-24 min-h-[80vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">예매하기</h1>
        <p className="text-white/50 text-sm">
          관람하실 공연을 선택하면 회차 정보가 표시됩니다.
        </p>
      </div>

      <ReservationClient performances={performances} />
    </div>
  );
}