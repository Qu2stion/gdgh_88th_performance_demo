import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="relative min-h-screen text-white">
        {/* 공통 배경 */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('images/poster2.jpg')" }}
        />

        {/* 공통 오버레이 */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/70 to-black/95" />

        {/* 공통 네비게이션 */}
        <Navbar />

        {/* 각 페이지 내용 */}
        {children}
      </body>
    </html>
  );
}
