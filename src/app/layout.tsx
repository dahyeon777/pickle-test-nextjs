/* src/app/layout.tsx */
import "./globals.css";
import React from "react";
import { Metadata } from "next";
import Script from "next/script"; // 1. Script 컴포넌트 추가
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "피클테스트",
  description:
    "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~! 심리테스트/공포테스트",
  icons: {
    icon: "/img/favicon.png", // 파비콘 경로
  },

  keywords: [
    "심리테스트",
    "피클테스트",
    "심리분석",
    "성격 테스트",
    "나폴리탄",
    "나폴리탄 괴담",
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
    siteName: "PickleTest",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: 'https://pickletest.com/img/og-image.png', // public 폴더에 있는 이미지 경로
        width: 1200,
        height: 630,
      },
    ],
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
        {/* 구글 애드센스 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6955061481766922"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 3. 카카오 SDK 스크립트 추가 */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
