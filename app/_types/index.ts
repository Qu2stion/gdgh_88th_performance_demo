// app/_types/index.ts

/**
 * [DB] 공연 작품 정보 (Parent)
 */
export type Performance = {
  id: string;
  title: string;
  posterUrl: string;
  venue: string;
  period?: string; // 예약 페이지용 기간
  runtimeMin?: number; // [수정] 스케줄 페이지 오류 해결을 위해 추가 (선택적 속성)
  description?: string;
  sessions?: Session[]; // 예약 페이지용 (1:N 관계 포함 시)
};

/**
 * [DB] 공연 회차 정보 (Child)
 */
export type Session = {
  id: string;
  performanceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  totalSeats: number;
  remainingSeats: number;
};

/**
 * [UI] Schedule 페이지용 (Join된 형태)
 */
export type ShowSession = Session & {
  performance: Performance;
};

export type Ticket = {
  id: string;
  userId: string;
  sessionId: string;
  seatNumber: string; // "A-1"
  status: "RESERVED" | "CANCELLED" | "USED"; // 예약됨, 취소됨, 관람완료
  createdAt: string;
};

export type TicketDetail = Ticket & {
  session: Session;
  performance: Performance;
};