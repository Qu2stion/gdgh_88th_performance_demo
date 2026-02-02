"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShowSession } from "../../_types";
import { withBasePath } from "../_lib/withBasePath";

type Props = {
  selectedDate: string;
  sessions: ShowSession[];
};

export default function ScheduleList({ selectedDate, sessions }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-full">
      <div className="mb-5 border-b border-white/10 pb-4">
        <div className="text-sm text-white/50 mb-1">Schedule</div>
        <div className="text-2xl font-bold text-white tracking-tight">{selectedDate}</div>
      </div>

      {sessions.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/40">
          <p>해당 날짜에는 공연이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-black/20 p-5 sm:flex-row transition hover:bg-white/[0.02]"
            >
              {/* 포스터 (Performance 정보 사용) */}
              <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:h-32 sm:w-24">
                <Image
                  src={withBasePath(s.performance.posterUrl)}
                  alt={s.performance.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold text-emerald-400 font-mono tracking-tight">
                      {s.time}
                    </span>
                    {s.isSoldOut && (
                      <span className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-500">
                        SOLD OUT
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                    {s.performance.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <span>{s.performance.venue}</span>
                    <span className="h-3 w-[1px] bg-white/20"></span>
                    <span>{s.performance.runtimeMin}분</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {/* 예매 버튼 -> /reservation/book/[id] 로 연결 */}
                  {/* 매진이 아닐 때만 활성화 */}
                  {!s.isSoldOut ? (
                    <Link
                      href={`/reservation/book/${s.id}`}
                      className="flex-1 rounded-lg bg-emerald-500 px-4 py-2.5 text-center text-sm font-bold text-black hover:bg-emerald-400 transition sm:flex-none"
                    >
                      좌석 예매
                    </Link>
                  ) : (
                    <button disabled className="flex-1 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-bold text-white/30 cursor-not-allowed sm:flex-none">
                      매진됨
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      const txt = `${s.date} ${s.time} | ${s.performance.title} @ ${s.performance.venue}`;
                      navigator.clipboard.writeText(txt);
                      alert("공연 정보가 복사되었습니다.");
                    }}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/60 hover:bg-white/10 transition"
                  >
                    복사
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}