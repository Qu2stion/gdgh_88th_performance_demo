import LocationMap from "./LocationMap";

export default function LocationPage() {
  return (
    <main className="mx-auto px-6 pt-32 pb-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">오시는 길</h1>

        <LocationMap />
      </div>

      <div className="max-w-5xl mx-auto mt-6 px-6">
        <a
          href="https://map.kakao.com/link/map/연세대학교학생회관,37.5634406,126.938375"
          target="_blank"
          className="px-3 py-2 rounded-md bg-yellow-500/90 text-black"
        >
          카카오맵에서 열기
        </a>

        <a
          href="https://map.naver.com/v5/search/연세대학교%20학생회관"
          target="_blank"
          className="px-3 py-2 rounded-md bg-green-500/90 text-black"
        >
          네이버지도에서 열기
        </a>
      </div>
      <div className="mt-6 text-sm text-white/70 space-y-1">
        <div>📍 서울특별시 서대문구 연세로 50 연세대학교 신촌캠퍼스 학생회관 무악극장</div>
        <div>🚇 2호선 신촌역 2/3번 출구 도보 15분 </div>
        <div>🅿️ 학교 주차장은 주차료가 매우 비쌉니다. 인근 공영주차장을 이용하세요.</div>
      </div>
    </main>
  );
}
