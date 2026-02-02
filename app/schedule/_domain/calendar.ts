import type { CalendarCell } from "../../_types";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function toYMD(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function ymdToDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function daysInMonth(date: Date) {
  // 다음 달 0일 = 이번 달 마지막 날
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * 7열 달력 그리드용 셀(42칸, 6주 고정)을 생성.
 * - 앞쪽은 이번 달 시작 요일만큼 빈칸
 * - 1..말일까지 채움
 * - 42칸이 될 때까지 뒤쪽 빈칸
 */
export function buildCalendarCells(monthCursor: Date): CalendarCell[] {
  const first = startOfMonth(monthCursor);
  const offset = first.getDay(); // 0=일..6=토
  const total = daysInMonth(monthCursor);

  const cells: CalendarCell[] = [];

  // 앞쪽 빈칸
  for (let i = 0; i < offset; i++) {
    cells.push({ ymd: "", day: 0, inMonth: false });
  }

  // 이번 달 날짜
  for (let day = 1; day <= total; day++) {
    const d = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day);
    cells.push({ ymd: toYMD(d), day, inMonth: true });
  }

  // 7의 배수로만 맞춤 (줄 깨짐 방지)
  while (cells.length % 7 !== 0) {
    cells.push({ ymd: "", day: 0, inMonth: false });
  }

  // 마지막 줄이 전부 빈칸이면 제거
  while (cells.length >= 7) {
    const lastRow = cells.slice(-7);
    const allEmpty = lastRow.every((c) => !c.inMonth);
    if (!allEmpty) break;
    cells.splice(-7, 7);
  }

  return cells;
}
