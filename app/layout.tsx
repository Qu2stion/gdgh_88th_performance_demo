import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="relative min-h-[100svh] text-white overflow-x-hidden">
        {/* 공통 배경 */}
        <div
          className="fixed left-0 top-0 -z-10 w-full h-[100svh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${"/images/poster2.jpg"})` }}
        />

        {/* 공통 오버레이 */}
        <div className="fixed left-0 top-0 -z-10 w-full h-[100svh] bg-gradient-to-b from-black/85 via-black/70 to-black/95" />

        {/* 공통 네비게이션 */}
        <Navbar />

        {/* 각 페이지 내용 */}
        <PageTransition>
          <main className="pt-navbar">
          {children}
          </main>
        </PageTransition>
      </body>
    </html>
  );
}
