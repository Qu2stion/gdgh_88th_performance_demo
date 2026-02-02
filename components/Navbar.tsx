"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MENU_LINKS = [
  { href: "/about", label: "연극 소개" },
  { href: "/cast", label: "Cast · Staff" },
  { href: "/relations", label: "등장인물" },
  { href: "/schedule", label: "공연 일정" },
  { href: "/club", label: "공대극회 소개" },
  { href: "/location", label: "오시는 길" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // 로그인 상태 (Supabase 연동 전 임시)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  const handleLogin = () => {
    router.push(`/login?next=${pathname}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 h-14 flex items-center">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8">
        <div className="flex items-center justify-between">
          
          {/* 좌측 로고 */}
          <Link href="/" className="flex-shrink-0 relative z-50" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/gdgh_logo_dark.png"
              alt="공대극회"
              width={70}
              height={35}
              priority
              className="opacity-90 w-auto h-[30px]" 
            />
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-medium transition-colors ${
                  pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 데스크톱 우측 액션 */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5 text-[14px]">
              {!isLoggedIn ? (
                <button 
                  onClick={handleLogin}
                  className="text-white/60 hover:text-white transition"
                >
                  로그인
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/me" className="text-white/60 hover:text-white transition">
                    마이페이지
                  </Link>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="text-white/30 hover:text-red-400 transition text-xs"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>

            {/* 수정됨: href="/reservation" */}
            <Link
              href="/reservation"
              className="rounded-lg bg-white px-4 py-2 text-[14px] font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              예매하기
            </Link>
          </div>

          {/* 모바일 우측 (아이콘 + 햄버거) */}
          <div className="flex items-center gap-4 lg:hidden">
            
            {/* 수정됨: 모바일 예매 아이콘 href="/reservation" */}
            <Link 
              href="/reservation" 
              className="relative z-50 p-2 text-white/90 hover:text-white transition-colors"
              aria-label="예매하기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v9.632c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
              </svg>
            </Link>

            {/* 햄버거 메뉴 버튼 */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 p-2 text-white focus:outline-none"
            >
              <div className="flex flex-col justify-center items-center w-6 h-6 gap-1.5">
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      <div 
        className={`fixed inset-0 z-40 bg-black transition-all duration-300 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className={`flex flex-col h-full px-8 pt-28 pb-10 transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-10"}`}>
          <nav className="flex flex-col gap-6">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-3xl font-bold tracking-tight transition-colors ${
                  pathname === link.href ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-6">
            {!isLoggedIn ? (
              <button onClick={() => { handleLogin(); setMobileOpen(false); }} className="text-xl font-medium text-white/60 text-left">
                로그인
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <Link href="/me" onClick={() => setMobileOpen(false)} className="text-xl font-medium text-white">마이페이지</Link>
                <button onClick={() => { setIsLoggedIn(false); setMobileOpen(false); }} className="text-xl font-medium text-white/30 text-left">로그아웃</button>
              </div>
            )}
            
            {/* 수정됨: href="/reservation" */}
            <Link 
              href="/reservation" 
              onClick={() => setMobileOpen(false)} 
              className="flex h-14 items-center justify-center rounded-xl bg-white text-lg font-bold text-black active:scale-[0.98] transition-transform"
            >
              지금 예매하기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}