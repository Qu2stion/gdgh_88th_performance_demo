// app/_types/index.ts

/** [DB] 공연 작품 정보 (Parent) */
export type Performance = {
  id: string;
  title: string;
  posterUrl: string;
  venue: string;
  period?: string;
  runtimeMin?: number;
  description?: string;
};

/** [DB] 공연 회차 정보 (Child) */
export type Session = {
  id: string;
  performanceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  totalSeats: number;
  remainingSeats: number;
  isSoldOut?: boolean; // [추가] 이게 없어서 에러가 났던 겁니다!
};

/** [UI] Schedule 페이지용 (Join된 형태) */
export type ShowSession = Session & {
  performance: Performance;
};

/** [UI] 달력 그리드용 타입 (누락되었던 부분) */
export type CalendarCell = {
  ymd: string;
  day: number;
  inMonth: boolean;
};

export type Ticket = {
  id: string;
  userId: string;
  sessionId: string;
  seatNumber: string;
  status: "RESERVED" | "CANCELLED" | "USED";
  createdAt: string;
};

// ... (Ticket 관련 타입은 아래에 유지)

export type TicketDetail = Ticket & {
  session: Session;
  performance: Performance;
};