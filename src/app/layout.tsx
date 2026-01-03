/* src/app/layout.tsx */
import "./globals.css";
import React from "react";
import { Metadata } from "next";
import Script from "next/script"; // 1. Script 컴포넌트 추가

export const metadata: Metadata = {
  title: "피클테스트",
  description: "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!",
  keywords: [
    "심리테스트",
    "피클테스트",
    "나폴리탄",
    "mbti",
    "테스트",
    "공포테스트",
    "공포게임",
    "게임",
  ],
  openGraph: {
    title: "피클테스트 pickletest.com",
    description: "당신은 어떤 피클일까요?",
    url: "https://pickletest.com",
    siteName: "Pickle Test",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 2. 구글 애드센스 스크립트 삽입 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6955061481766922"
          crossOrigin="anonymous"
          strategy="afterInteractive" // 페이지 로드 후 부드럽게 실행
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
