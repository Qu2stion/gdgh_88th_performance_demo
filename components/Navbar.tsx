"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const TICKET_URL = "https://forms.gle/여기에_구글폼_URL";
const INSTAGRAM_URL =
  "https://www.instagram.com/gdgh_yonsei?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Drawer 열려 있을 때 뒤 페이지 스크롤 막기
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-black/40 backdrop-blur-md px-4 py-3">
          {/* 로고 클릭하면 홈으로 */}
          <Link
            href="/"
            className="flex items-center rounded-md bg-black/90 px-2 py-1"
            >
            <Image
              src="/images/gdgh_logo_dark.png"
              alt="공대극회 로고"
              width={80}
              height={80}
              className="opacity-90"
            />
          </Link>

          {/* 가운데 메뉴: 내부 페이지 (데스크톱 전용) */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/75">
            <Link href="/about" className="hover:text-white transition">
              연극 소개
            </Link>
            <Link href="/cast" className="hover:text-white transition">
              Cast·Staff
            </Link>
            <Link href="/video" className="hover:text-white transition">
              홍보영상
            </Link>
            <Link href="/schedule" className="hover:text-white transition">
              공연 일정
            </Link>
            <Link href="/club" className="hover:text-white transition">
              공대극회 소개
            </Link>
            <Link href="/location" className="hover:text-white transition">
              오시는 길
            </Link>
          </nav>

          {/* 우측: 외부 링크 (데스크톱 전용: 모바일에서는 drawer로 이동) */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Instagram
            </a>
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white font-medium text-black hover:bg-neutral-200 transition px-4 py-2 text-sm whitespace-nowrap"
            >
              예매하기
            </a>
          </div>

          {/* 모바일 메뉴 버튼 (모바일 전용) */}
          <button
            className="md:hidden rounded-md p-2 text-white/80 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
          >
            ☰
          </button>
        </div>
      </div>

      {/* =========================
          Mobile Drawer (항상 렌더)
          ========================= */}

      {/* Overlay (페이드) */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-200",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel (슬라이드) */}
      <aside
        className={[
          "fixed top-0 right-0 z-50 h-full w-[78vw] max-w-sm",
          "border-l border-white/10 bg-neutral-950/95 backdrop-blur-md p-6",
          "transform transition-transform duration-200 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">메뉴</span>
          <button
            className="rounded-md p-2 text-white/80 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 text-base">
          <Link
            href="/about"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
          >
            연극 소개
          </Link>
          <Link
            href="/cast"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
          >
            Cast · Staff
          </Link>
          <Link
            href="/video"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
          >
            홍보영상
          </Link>
          <Link
            href="/schedule"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
          >
            공연 일정
          </Link>
          <Link
            href="/club"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
          >
            공대극회 소개
          </Link>
          <Link
            href="/location"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
            onClick={() => setMobileOpen(false)}
          >
            오시는 길
          </Link>

          <div className="my-3 border-t border-white/10" />

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
          >
            Instagram
          </a>

          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white px-3 py-3 text-center font-medium text-black hover:bg-neutral-200 transition"
          >
            예매하기
          </a>
        </nav>
      </aside>
    </header>
  );
}