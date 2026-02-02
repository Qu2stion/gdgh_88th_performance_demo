"use client";

import React, { useState } from "react";
import { ShowSession } from "@/app/_types";
import { useRouter } from "next/navigation";

type Props = {
  session: ShowSession;
  initialReservedSeats: string[];
};

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const COLS = 10;

export default function SeatSelectionClient({ session, initialReservedSeats }: Props) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // [수정 포인트 1] 최대 선택 가능 수량을 2로 제한
  const MAX_SELECTION = 2;

  const toggleSeat = (seatId: string) => {
    if (initialReservedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      // 이미 선택된 좌석이면 해제
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
    } else {
      // [수정 포인트 2] 2자리 이상 선택 시도 시 차단
      if (selectedSeats.length >= MAX_SELECTION) {
        alert("1인 최대 2자리까지 예매 가능합니다.");
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;
    
    const confirmMsg = 
      `${session.performance.title}\n` +
      `일시: ${session.date} ${session.time}\n` +
      `좌석: ${selectedSeats.join(", ")}\n\n` +
      `위 내용으로 예매하시겠습니까?`;
    
    if (confirm(confirmMsg)) {
      // 실제 API 호출 로직 (추후 구현)
      alert("예매가 완료되었습니다!");
      router.push("/me");
    }
  };

  return (
    <div className="min-h-[100svh] bg-black pb-32 animate-fade-in">
      
      {/* 상단 헤더 */}
      <div className="sticky top-14 z-20 flex items-center justify-between bg-black/90 px-5 py-4 backdrop-blur-md border-b border-white/10">
        <div>
          <h1 className="text-lg font-bold text-white">{session.performance.title}</h1>
          <p className="text-sm text-white/50">
            {session.date} {session.time} @ {session.performance.venue}
          </p>
        </div>
        <button 
          onClick={() => router.back()}
          className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
          aria-label="닫기"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center px-4 pt-10">
        {/* STAGE */}
        <div className="mb-12 w-full max-w-md text-center">
          <div className="mx-auto mb-2 h-2 w-full max-w-[80%] rounded-full bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
          <span className="text-xs font-bold tracking-[0.3em] text-white/30">STAGE</span>
        </div>

        {/* 좌석 그리드 */}
        <div className="mb-10 w-full overflow-x-auto pb-4">
          <div className="mx-auto w-fit px-4">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
              {ROWS.map((row) =>
                Array.from({ length: COLS }).map((_, i) => {
                  const colNum = i + 1;
                  const seatId = `${row}-${colNum}`;
                  const isReserved = initialReservedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      disabled={isReserved}
                      onClick={() => toggleSeat(seatId)}
                      className={`
                        relative flex h-8 w-8 items-center justify-center rounded-t-md border-t-2 text-[10px] font-bold transition-all sm:h-10 sm:w-10 sm:text-xs
                        ${isReserved 
                          ? "cursor-not-allowed border-white/5 bg-white/5 text-white/10"
                          : isSelected
                            ? "scale-110 border-emerald-400 bg-emerald-500 text-black shadow-[0_0_10px_#34d399]"
                            : "border-white/20 bg-white/10 text-white/60 hover:border-white/50 hover:bg-white/20"
                        }
                      `}
                    >
                      {isReserved ? "X" : colNum}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* 범례 */}
        <div className="flex gap-6 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-t-md border-t-2 border-white/20 bg-white/10" />
            <span>선택가능</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-t-md border-t-2 border-emerald-400 bg-emerald-500" />
            <span>선택됨</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-t-md border-t-2 border-white/5 bg-white/5" />
            <span>예약완료</span>
          </div>
        </div>
        
        {/* 안내 문구 추가 */}
        <p className="mt-8 text-xs text-white/30">
          * 1인당 최대 2매까지 예매 가능합니다.
        </p>
      </div>

      {/* 하단 바 */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#111] px-5 py-4 pb-8 md:pb-4 z-30">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <div className="text-xs text-white/50">선택 좌석 ({selectedSeats.length}/2)</div>
            <div className="text-lg font-bold text-white">
              {selectedSeats.length > 0 ? (
                <span className="text-emerald-400">{selectedSeats.join(", ")}</span>
              ) : (
                <span className="text-white/30">-</span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className={`
              rounded-xl px-8 py-3 text-sm font-bold transition-all
              ${selectedSeats.length > 0
                ? "bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95"
                : "bg-white/10 text-white/30 cursor-not-allowed"
              }
            `}
          >
            예매하기
          </button>
        </div>
      </div>
    </div>
  );
}