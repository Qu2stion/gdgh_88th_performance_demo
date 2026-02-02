"use client";

import React, { useMemo, useState } from "react";
import Calendar from "./Calendar";
import ScheduleList from "./ScheduleList";
import type { ShowSession } from "../../_types";
import { startOfMonth, ymdToDate } from "../_domain/calendar";

type Props = {
  initialSessions: ShowSession[];
};

export default function ScheduleClient({ initialSessions }: Props) {
  // 1. 날짜별 세션 그룹화
  const sessionsByDate = useMemo(() => {
    const map = new Map<string, ShowSession[]>();
    for (const s of initialSessions) {
      const arr = map.get(s.date) ?? [];
      arr.push(s);
      map.set(s.date, arr);
    }
    // 시간순 정렬
    for (const [k, v] of map.entries()) {
      v.sort((a, b) => a.time.localeCompare(b.time));
      map.set(k, v);
    }
    return map;
  }, [initialSessions]);

  const showDates = useMemo(() => new Set(sessionsByDate.keys()), [sessionsByDate]);
  const allShowDatesSorted = useMemo(() => Array.from(showDates).sort(), [showDates]);

  // 2. 상태 관리 (초기값: 가장 빠른 공연일 or 오늘)
  const initialSelected = allShowDatesSorted[0] ?? new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(initialSelected);
  const [monthCursor, setMonthCursor] = useState<Date>(() => startOfMonth(ymdToDate(initialSelected)));

  const selectedSessions = sessionsByDate.get(selectedDate) ?? [];

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Calendar
          monthCursor={monthCursor}
          onMonthChange={setMonthCursor}
          selectedDate={selectedDate}
          onSelectDate={(d) => {
            setSelectedDate(d);
            // 날짜 선택 시 해당 월로 이동하고 싶다면 아래 주석 해제
            // setMonthCursor(startOfMonth(ymdToDate(d))); 
          }}
          showDates={showDates}
        />

        <ScheduleList selectedDate={selectedDate} sessions={selectedSessions} />
      </div>

      {/* 빠른 날짜 선택 (공연일이 적을 때 유용) */}
      {allShowDatesSorted.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-2 text-xs text-white/50">공연일 빠른 선택</div>
          <div className="flex flex-wrap gap-2">
            {allShowDatesSorted.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDate(d);
                  setMonthCursor(startOfMonth(ymdToDate(d)));
                }}
                className={`rounded-xl px-3 py-2 text-xs transition-colors ${
                  d === selectedDate
                    ? "bg-emerald-500 text-black font-bold"
                    : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}