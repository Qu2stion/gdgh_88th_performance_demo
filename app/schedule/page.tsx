"use client";

import React, { useMemo, useState } from "react";
import Calendar from "./_components/Calendar";
import ScheduleList from "./_components/ScheduleList";
import { SESSIONS } from "./_data/sessions";
import type { ShowSession } from "./_domain/types";
import { startOfMonth, ymdToDate } from "./_domain/calendar";

export default function SchedulePage() {
  // 날짜별 세션 맵 구성(정렬 포함)
  const sessionsByDate = useMemo(() => {
    const map = new Map<string, ShowSession[]>();
    for (const s of SESSIONS) {
      const arr = map.get(s.date) ?? [];
      arr.push(s);
      map.set(s.date, arr);
    }
    for (const [k, v] of map.entries()) {
      v.sort((a, b) => a.time.localeCompare(b.time));
      map.set(k, v);
    }
    return map;
  }, []);

  const showDates = useMemo(() => new Set<string>(Array.from(sessionsByDate.keys())), [sessionsByDate]);
  const allShowDatesSorted = useMemo(() => Array.from(showDates).sort(), [showDates]);

  // 초기 선택 날짜: 가장 빠른 공연일(없으면 오늘)
  const initialSelected = allShowDatesSorted[0] ?? new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(initialSelected);

  // 초기 달력 월: 선택 날짜가 속한 달
  const [monthCursor, setMonthCursor] = useState<Date>(() => startOfMonth(ymdToDate(initialSelected)));

  // 선택 날짜가 월 이동으로 인해 공연월과 동떨어질 수 있으므로,
  // “빠른 선택”이 필요하면 아래를 유지(지금은 달력으로 충분)
  const selectedSessions = sessionsByDate.get(selectedDate) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">공연 일정</h1>
        <p className="mt-1 text-sm text-white/60">
          달력에서 날짜를 선택하면 해당 날짜의 공연 회차가 표시됩니다.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Calendar
          monthCursor={monthCursor}
          onMonthChange={setMonthCursor}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          showDates={showDates}
        />

        <ScheduleList selectedDate={selectedDate} sessions={selectedSessions} />
      </div>

      {/* 공연일이 2일뿐이라면 아래 “빠른 선택”은 UX 보강용으로 꽤 유용합니다 */}
      {allShowDatesSorted.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-2 text-xs text-white/50">공연일 빠른 선택</div>
          <div className="flex flex-wrap gap-2">
            {allShowDatesSorted.map((d) => {
              const active = d === selectedDate;
              return (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDate(d);
                    setMonthCursor(startOfMonth(ymdToDate(d)));
                  }}
                  className={[
                    "rounded-xl px-3 py-2 text-xs",
                    active
                      ? "bg-emerald-500 text-black"
                      : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
                  ].join(" ")}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
