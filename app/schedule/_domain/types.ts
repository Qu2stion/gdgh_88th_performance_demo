export type ShowSession = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  title: string;
  venue?: string;
  runtimeMin?: number;
  ticketUrl?: string;
  poster?: string; // "/images/....jpg" (public 아래)
  note?: string;
};

export type CalendarCell = {
  ymd: string;      // inMonth일 때만 유효. 빈칸이면 ""
  day: number;      // 1..31 (빈칸이면 0)
  inMonth: boolean; // 이번 달 여부
};
