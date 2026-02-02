"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

function LoginContent() {
  const router = useRouter();
  
  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 시작");
  };

  return (
    /**
     * [핵심 수정 사항]
     * 1. -mt-16 (또는 -mt-[navbar높이]): RootLayout의 padding을 상쇄하여 배경을 화면 꼭대기까지 끌어올립니다.
     * 2. pt-16: 배경은 올라갔지만, 내용은 Navbar에 가려지지 않도록 다시 내부 여백을 줍니다.
     * 3. min-h-screen: 화면 전체 높이를 확보하여 검은색이 끊기지 않게 합니다.
     * 4. z-0: Navbar(z-50)보다 아래에 위치하게 합니다.
     */
    <div className="relative z-0 flex w-full min-h-[100svh] flex-col items-center justify-center bg-black -mt-16 pt-16">
      
      <div className="w-full max-w-[380px] px-6 text-center animate-fade-in">
        
        {/* 로고 영역 */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/images/gdgh_logo_dark.png"
            alt="공대극회"
            width={100}
            height={50}
            priority
            className="h-auto w-auto opacity-90"
          />
        </div>

        {/* 안내 텍스트 */}
        <div className="mb-12 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            로그인
          </h1>
          <p className="text-white/50 text-[15px] font-medium leading-relaxed">
            예매를 진행하려면 로그인이 필요해요.<br/>
            카카오로 3초 만에 시작해보세요.
          </p>
        </div>

        {/* 카카오 버튼 */}
        <button
          onClick={handleKakaoLogin}
          className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-[#FEE500] py-4 text-[16px] font-bold text-black shadow-lg transition-all hover:bg-[#FDE500] active:scale-[0.98]"
        >
          {/* 카카오 아이콘 SVG */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.558 1.712 4.8 4.312 6.111l-.817 3.01c-.04.15.064.302.211.302.07 0 .139-.024.191-.07l3.556-2.352c.503.07 1.017.106 1.547.106 4.97 0 9-3.186 9-7.115S16.97 3 12 3z" />
          </svg>
          카카오로 시작하기
        </button>

        {/* 뒤로 가기 */}
        <button 
          onClick={() => router.back()}
          className="mt-8 text-sm text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
        >
          이전 페이지로 돌아가기
        </button>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LoginContent />
    </Suspense>
  );
}