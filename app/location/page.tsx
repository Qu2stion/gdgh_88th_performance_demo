import LocationMap from "./LocationMap";

export default function LocationPage() {
  return (
    <main className="mx-auto px-5 sm:px-6 pb-24 pt-10 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          오시는 길
        </h1>

        <LocationMap />

        {/* 지도 버튼 섹션 */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <a
            href="https://map.kakao.com/link/map/연세대학교학생회관,37.5634406,126.938375"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-4 rounded-xl bg-[#FAE100] text-[#3C1E1E] font-bold text-sm 
                       transition-all duration-200 shadow-lg 
                       hover:-translate-y-1 hover:brightness-105 hover:shadow-xl active:scale-95"
          >
            카카오맵
          </a>

          <a
            href="https://map.naver.com/v5/search/연세대학교%20학생회관"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-4 rounded-xl bg-[#03C75A] text-white font-bold text-sm 
                       transition-all duration-200 shadow-lg 
                       hover:-translate-y-1 hover:brightness-110 hover:shadow-xl active:scale-95"
          >
            네이버지도
          </a>
        </div>

        {/* 하단 상세 정보 */}
        <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10 space-y-6">
          <div>
            <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Address</h3>
            <p className="text-lg font-medium">
              서울특별시 서대문구 연세로 50 <br />
              연세대학교 학생회관 4층 무악극장
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
            <div>
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Subway</h3>
              <p className="text-white/80 text-sm">2호선 신촌역 2/3번 출구 (도보 15분)</p>
            </div>
            <div>
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Parking</h3>
              <p className="text-orange-200/70 text-sm">교내 주차 가능 (유료)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}