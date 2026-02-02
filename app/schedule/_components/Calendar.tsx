"use client";

import React, { useMemo } from "react";
import type { CalendarCell } from "../../_types";
import { addMonths, buildCalendarCells } from "../_domain/calendar";

type Props = {
  monthCursor: Date;
  onMonthChange: (next: Date) => void;

  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (ymd: string) => void;

  showDates: Set<string>; // 공연 있는 날짜들(점 표시)
};

export default function Calendar({
  monthCursor,
  onMonthChange,
  selectedDate,
  onSelectDate,
  showDates,
}: Props) {
  const cells: CalendarCell[] = useMemo(() => buildCalendarCells(monthCursor), [monthCursor]);

  const monthLabel = useMemo(() => {
    const y = monthCursor.getFullYear();
    const m = monthCursor.getMonth() + 1;
    return `${y}.${m}월`;
  }, [monthCursor]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <button
          className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 hover:bg-black/40"
          onClick={() => onMonthChange(addMonths(monthCursor, -1))}
          aria-label="이전 달"
        >
          ◀
        </button>

        <div className="text-lg font-semibold text-white">{monthLabel}</div>

        <button
          className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80 hover:bg-black/40"
          onClick={() => onMonthChange(addMonths(monthCursor, 1))}
          aria-label="다음 달"
        >
          ▶
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 text-center text-xs text-white/50">
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((c, idx) => {
          const isSelected = c.inMonth && c.ymd === selectedDate;
          const isShowDay = c.inMonth && showDates.has(c.ymd);

          return (
            <button
              key={idx}
              disabled={!c.inMonth}
              onClick={() => c.inMonth && onSelectDate(c.ymd)}
              className={[
                "relative h-11 rounded-xl text-sm",
                c.inMonth ? "text-white/90 hover:bg-white/10" : "text-white/20 cursor-default",
                isSelected ? "bg-emerald-500/90 text-black hover:bg-emerald-500" : "bg-black/20",
              ].join(" ")}
            >
              {c.inMonth ? c.day : ""}

              {isShowDay && (
                <span
                  className={[
                    "absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
                    isSelected ? "bg-black/70" : "bg-emerald-400",
                  ].join(" ")}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-white/60">
        <div className="flex items-center justify-between">
          <span>선택 날짜</span>
          <span className="text-white/90">{selectedDate}</span>
        </div>
      </div>
    </div>
  );
}
