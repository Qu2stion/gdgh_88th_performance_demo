import React from "react";
import SeatSelectionClient from "./_components/SeatSelectionClient";
import { ShowSession } from "@/app/_types";

// [Mock]
async function getSessionDetail(id: string): Promise<ShowSession> {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return {
    id: id,
    performanceId: "perf-88",
    date: "2026-03-13",
    time: "19:30",
    totalSeats: 100,
    remainingSeats: 42,
    performance: {
      id: "perf-88",
      title: "제 88회 정기공연 <보도지침>",
      venue: "학생회관 무악극장",
      posterUrl: "/images/posters/main.jpg",
      runtimeMin: 120,
    },
  };
}

async function getReservedSeats(sessionId: string): Promise<string[]> {
  return ["A-1", "A-2", "B-5", "C-8", "C-9"]; 
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const session = await getSessionDetail(id);
  const reservedSeats = await getReservedSeats(id);

  // 헤더 div 제거하고 클라이언트 컴포넌트만 렌더링
  return (
    <SeatSelectionClient 
      session={session} 
      initialReservedSeats={reservedSeats} 
    />
  );
}