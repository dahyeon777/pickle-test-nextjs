import "./globals.css";
import Header from "../components/Header"; // Header 컴포넌트 경로에 맞게 수정

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {/* 모든 페이지 상단에 헤더가 고정됩니다 */}
        <Header />

        {/* 각 페이지의 내용(page.js)이 이 위치에 들어옵니다 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
