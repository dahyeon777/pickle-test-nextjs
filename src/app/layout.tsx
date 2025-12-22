import "./globals.css";
import Header from "../components/Header";

// ReactNode 타입을 사용하기 위해 상단에 import가 필요합니다.
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
