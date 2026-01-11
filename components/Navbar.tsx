"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "@/lib/withBasePath";

const TICKET_URL = "https://forms.gle/여기에_구글폼_URL";
const INSTAGRAM_URL =
  "https://www.instagram.com/gdgh_yonsei?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const compute = () => setIsMobile(window.innerWidth < breakpointPx);
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, [breakpointPx]);

  return isMobile;
}

function IconMenu({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClose({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 예매 아이콘: Ticket stub (가장 직관적) */
function IconTicket({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 7h12v3a2 2 0 0 0 0 4v3H8v-3a2 2 0 0 1 0-4V7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 7H6a2 2 0 0 0-2 2v1a2 2 0 0 1 0 4v1a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isMobile = useIsMobile(768);

  const menuLinks = useMemo(
    () => [
      { href: "/about", label: "연극 소개" },
      { href: "/cast", label: "Cast · Staff" },
      { href: "/relations", label: "등장인물 관계도" },
      { href: "/video", label: "홍보영상" },
      { href: "/schedule", label: "공연 일정" },
      { href: "/club", label: "공대극회 소개" },
      { href: "/location", label: "오시는 길" },
    ],
    []
  );

  // 데스크톱에서만: 아래 스크롤 시 Navbar 숨김
  useEffect(() => {
    if (isMobile) return;

    let lastY = window.scrollY;
    let ticking = false;
    const DELTA = 8;

    const onScroll = () => {
      if (ticking || mobileOpen) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY;

        if (y <= 0) {
          setHidden(false);
          lastY = y;
          ticking = false;
          return;
        }

        if (Math.abs(diff) >= DELTA) {
          if (diff > 0) setHidden(true);
          else setHidden(false);
          lastY = y;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, mobileOpen]);

  // Drawer 열려 있을 때 뒤 페이지 스크롤 막기
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      setHidden(false); // Drawer 열리면 항상 보이게(데스크톱 포함)
    } else {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
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

  const headerTransform = !isMobile && hidden ? "-translate-y-full" : "translate-y-0";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-transform duration-200 ease-out",
        headerTransform,
      ].join(" ")}
    >
      {/* =========================
          Mobile Topbar
          ========================= */}
      <div className="md:hidden h-12 bg-black border-b border-white/10">
        <div className="h-full px-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={withBasePath("/images/gdgh_logo_dark.png")}
              alt="공대극회 로고"
              width={44}
              height={22}
              className="opacity-95"
              priority
            />
          </Link>

          <div className="flex items-center gap-1">
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-white/85 hover:bg-white/10 transition"
              aria-label="예매하기"
              title="예매하기"
            >
              <IconTicket />
            </a>

            <button
              className="rounded-md p-2 text-white/85 hover:bg-white/10 transition"
              onClick={() => setMobileOpen(true)}
              aria-label="메뉴 열기"
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          Desktop Navbar (상단 여백/박스 제거: 풀폭 바 형태)
          ========================= */}
      <div className="hidden md:block bg-black border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-16 flex items-center justify-between">
            {/* 로고 클릭하면 홈으로 */}
            <Link href="/" className="flex items-center">
              <Image
                src={withBasePath("/images/gdgh_logo_dark.png")}
                alt="공대극회 로고"
                width={84}
                height={42}
                className="opacity-90"
                priority
              />
            </Link>

            {/* 가운데 메뉴: 내부 페이지 */}
            <nav className="flex items-center gap-8 text-sm text-white/75">
              {menuLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-white transition whitespace-nowrap"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* 우측: 외부 링크 */}
            <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>

      {/* =========================
          Mobile Drawer
          ========================= */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/70",
          "transition-opacity duration-200 ease-out",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={[
          "fixed top-0 right-0 z-50 h-[100svh] w-[82vw] max-w-sm",
          "border-l border-white/10 bg-black/95 p-6 shadow-2xl",
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
            <IconClose />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 text-base">
          {menuLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-white/85 hover:bg-white/10 transition"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

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
