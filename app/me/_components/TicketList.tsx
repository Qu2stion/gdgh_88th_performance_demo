// app/me/_components/TicketList.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
// [수정] 헷갈리는 @ 별칭 대신, 가장 확실한 상대 경로로 변경했습니다.
import { TicketDetail } from "../../_types"; 

export default function TicketList({ tickets }: { tickets: TicketDetail[] }) {
  
  const handleCancel = (ticketId: string, seatNum: string) => {
    // 좌석 단위 취소임을 명확히 알림
    if (confirm(`[${seatNum}] 좌석 예매를 취소하시겠습니까?\n취소 후에는 복구할 수 없습니다.`)) {
      // [TODO] 실제로는 여기서 API 호출 (PATCH /api/tickets/{id} -> status: CANCELLED)
      alert("해당 좌석의 예매가 취소되었습니다.");
      window.location.reload(); 
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="mb-4 text-4xl">🎫</div>
        <p className="text-white/50 mb-6">아직 예매한 공연이 없어요.</p>
        <Link 
          href="/reservation" 
          className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black hover:bg-emerald-400 transition"
        >
          공연 예매하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {tickets.map((ticket) => {
        const { session, performance } = ticket;
        const isCancelled = ticket.status === "CANCELLED";

        return (
          <div 
            key={ticket.id}
            className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white/5 transition sm:flex-row ${
              isCancelled ? "border-white/5 opacity-50 grayscale" : "border-white/10 hover:border-white/20"
            }`}
          >
            {/* 포스터 영역 */}
            <div className="relative h-32 w-full sm:h-auto sm:w-28 flex-shrink-0 bg-black/50">
              <Image
                src={performance.posterUrl}
                alt={performance.title}
                fill
                className="object-cover"
              />
            </div>

            {/* 티켓 정보 (좌석 단위) */}
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div className="flex justify-between items-start">
                <div>
                   {/* 상태 배지 */}
                   <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold border mb-2 ${
                      isCancelled 
                        ? "bg-white/10 text-white/50 border-white/10" 
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                   }`}>
                     {isCancelled ? "취소 완료" : "예매 완료"}
                   </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight mb-1">
                    {performance.title}
                  </h3>
                  <div className="text-sm text-white/60">
                     {session.date} {session.time}
                  </div>
                </div>

                {/* 개별 좌석 취소 버튼 */}
                {!isCancelled && (
                  <button 
                    onClick={() => handleCancel(ticket.id, ticket.seatNumber)}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition"
                  >
                    예매 취소
                  </button>
                )}
              </div>

              <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-white/40">좌석 번호</span>
                  <span className={`text-lg font-bold ${isCancelled ? "text-white/50 strike-through" : "text-emerald-400"}`}>
                    {ticket.seatNumber}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-white/30 block">예매일</span>
                  <span className="text-xs text-white/50">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}