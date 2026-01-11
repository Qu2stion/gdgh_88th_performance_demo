"use client";

import React from "react";
import Image from "next/image";
import type { ShowSession } from "../_domain/types";
import { withBasePath } from "../_lib/withBasePath";

type Props = {
  selectedDate: string;
  sessions: ShowSession[];
};

export default function ScheduleList({ selectedDate, sessions }: Props) {
  const primaryTicket = sessions[0]?.ticketUrl;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-sm text-white/60">일정</div>
          <div className="text-xl font-semibold text-white">{selectedDate}</div>
        </div>

        {primaryTicket && (
          <a
            href={primaryTicket}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
          >
            예매하기
          </a>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center text-white/60">
          해당 날짜에는 공연이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="relative h-24 w-20 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                {s.poster ? (
                  <Image
                    src={withBasePath(s.poster)}
                    alt={`${s.title} 포스터`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-white/40">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="text-base font-semibold text-white">{s.title}</div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">
                    {s.time}
                  </div>
                  {typeof s.runtimeMin === "number" && (
                    <div className="text-xs text-white/50">{s.runtimeMin}분</div>
                  )}
                </div>

                {s.venue && <div className="mt-1 text-sm text-white/70">{s.venue}</div>}
                {s.note && <div className="mt-2 text-xs text-white/50">{s.note}</div>}

                <div className="mt-3 flex gap-2">
                  {s.ticketUrl && (
                    <a
                      href={s.ticketUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                    >
                      예매 링크
                    </a>
                  )}

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${s.date} ${s.time} | ${s.title}${s.venue ? ` @ ${s.venue}` : ""}`
                      )
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
                  >
                    일정 복사
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
