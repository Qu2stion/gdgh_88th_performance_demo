"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Performance } from "@/app/_types";

export default function ReservationClient({ performances }: { performances: Performance[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid gap-6">
      {performances.map((perf) => {
        const isOpen = expandedId === perf.id;
        // [수정 포인트 1] sessions가 undefined일 경우를 대비해 빈 배열 할당
        const sessions = perf.sessions || [];

        return (
          <div
            key={perf.id}
            className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-emerald-500/30 bg-white/5 ring-1 ring-emerald-500/30"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            {/* ... 헤더 부분 (변경 없음) ... */}
            <div
              onClick={() => toggleAccordion(perf.id)}
              className="flex cursor-pointer items-stretch"
            >
              <div className="relative w-28 sm:w-36 bg-black/50 flex-shrink-0">
                <Image
                  src={perf.posterUrl}
                  alt={perf.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>

              <div className="flex flex-1 flex-col justify-center p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="mb-2 inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      예매 진행중
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight pr-4">
                      {perf.title}
                    </h2>
                    <p className="text-sm text-white/60">{perf.venue}</p>
                  </div>
                  
                  <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="mt-auto pt-3">
                   {!isOpen && (
                     <p className="text-xs font-medium text-white/40 group-hover:text-emerald-400 transition-colors animate-pulse">
                       눌러서 회차 선택하기
                     </p>
                   )}
                </div>
              </div>
            </div>

            {/* ... 리스트 부분 ... */}
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-white/10 bg-black/20 p-4 sm:p-6">
                <p className="mb-4 text-sm text-white/50 pl-1">
                  관람하실 회차를 선택해주세요.
                </p>

                <div className="space-y-3">
                  {/* [수정 포인트 2] 위에서 정의한 safe한 sessions 배열 사용 */}
                  {sessions.map((session) => {
                    const isSoldOut = session.remainingSeats === 0;
                    const d = new Date(session.date);
                    const dateStr = `${d.getMonth() + 1}.${d.getDate()}`;
                    const dayName = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];

                    return (
                      <Link
                        key={session.id}
                        href={isSoldOut ? "#" : `/reservation/book/${session.id}`}
                        onClick={(e) => isSoldOut && e.preventDefault()}
                        className={`flex items-center justify-between rounded-xl border p-3 sm:p-4 transition-all active:scale-[0.98] ${
                          isSoldOut
                            ? "border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed"
                            : "border-white/10 bg-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10"
                        }`}
                      >
                         <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center justify-center rounded-lg bg-black/40 border border-white/10 w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                            <span className="text-xs text-white/60">{dateStr}</span>
                            <span className="text-sm font-bold text-white">{dayName}</span>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-white mb-0.5">
                              {session.time}
                            </div>
                            <div className="text-xs">
                              {isSoldOut ? (
                                <span className="text-red-500 font-bold">매진</span>
                              ) : (
                                <span className="text-emerald-400 font-medium">
                                  잔여 {session.remainingSeats}석
                                </span>
                              )}
                              <span className="text-white/20 ml-1 hidden sm:inline">/ 총 {session.totalSeats}석</span>
                            </div>
                          </div>
                        </div>

                        {!isSoldOut && (
                          <div className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-black sm:text-sm hover:bg-gray-200">
                            좌석 선택
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}