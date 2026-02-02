import React from "react";
import TicketList from "./_components/TicketList";
import { TicketDetail } from "@/app/_types";

// [Server Action] 내 예매 내역 가져오기 (Mock)
async function getMyTickets(): Promise<TicketDetail[]> {
  await new Promise((resolve) => setTimeout(resolve, 0));

  // 가상의 공연 데이터
  const performance88 = {
    id: "perf-88",
    title: "제 88회 정기공연 <보도지침>",
    posterUrl: "/images/gdgh_logo_dark.png", // [체크] 실제 포스터 경로로 변경 필요
    venue: "학생회관 무악극장",
    runtimeMin: 120,
  };

  return [
    {
      id: "t-1",
      userId: "user-1",
      sessionId: "s-1",
      seatNumber: "B-5",
      status: "RESERVED",
      createdAt: "2026-01-27T10:00:00Z",
      session: {
        id: "s-1",
        performanceId: "perf-88",
        date: "2026-03-13",
        time: "19:30",
        totalSeats: 100,
        remainingSeats: 42,
      },
      performance: performance88,
    },
    {
      id: "t-2",
      userId: "user-1",
      sessionId: "s-1",
      seatNumber: "B-6",
      status: "CANCELLED", // 취소된 티켓 테스트
      createdAt: "2026-01-26T09:00:00Z",
      session: {
        id: "s-1",
        performanceId: "perf-88",
        date: "2026-03-13",
        time: "19:30",
        totalSeats: 100,
        remainingSeats: 42,
      },
      performance: performance88,
    },
  ];
}

export default async function MyPage() {
  const tickets = await getMyTickets();
  const userName = "김공대"; // Mock User Name

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 pb-24 min-h-[80vh]">
      {/* 프로필 헤더 */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">마이페이지</h1>
          <p className="text-white/50">
            반가워요, <span className="text-white font-bold">{userName}</span>님!
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xl">
          🙂
        </div>
      </div>

      {/* 탭 구분 (UI만 존재, 추후 기능 구현) */}
      <div className="mb-6 flex gap-6 border-b border-white/10 pb-1 text-sm">
        <button className="border-b-2 border-white pb-3 font-bold text-white">
          예매 내역
        </button>
        <button className="pb-3 text-white/40 hover:text-white/70">
          회원 정보
        </button>
      </div>

      {/* 티켓 리스트 컴포넌트 */}
      <TicketList tickets={tickets} />
      
      {/* 로그아웃 등 추가 액션 */}
      <div className="mt-16 border-t border-white/10 pt-6 text-center">
        <button className="text-xs text-white/30 underline hover:text-red-400 transition">
          로그아웃
        </button>
      </div>
    </div>
  );
}