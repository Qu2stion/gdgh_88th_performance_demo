// app/_types/index.ts

/** [DB] 공연 작품 정보 */
export type Performance = {
  id: string;
  title: string;
  posterUrl: string; // /me와 /schedule 모두 posterUrl로 통일
  venue: string;
  period?: string;
  runtimeMin?: number;
  description?: string;
};

/** [DB] 공연 회차 정보 */
export type Session = {
  id: string;
  performanceId: string;
  date: string;
  time: string;
  totalSeats: number;
  remainingSeats: number;
  // [중요] /me의 Mock 데이터에는 이 값이 없으므로 반드시 '선택적(?)'이어야 에러가 안 납니다.
  isSoldOut?: boolean; 
};

/** [UI] Schedule 페이지용 (Join된 형태) */
export type ShowSession = Session & {
  performance: Performance;
};

/** [UI] 달력 그리드용 타입 */
export type CalendarCell = {
  ymd: string;
  day: number;
  inMonth: boolean;
};

/** [DB] 티켓 정보 */
export type Ticket = {
  id: string;
  userId: string;
  sessionId: string;
  seatNumber: string;
  status: "RESERVED" | "CANCELLED" | "USED";
  createdAt: string;
};

/** [UI] 마이페이지(/me)용 티켓 정보 */
export type TicketDetail = Ticket & {
  session: Session;
  performance: Performance;
};