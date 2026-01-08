import "./globals.css";
import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import Header from "../components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://pickletest.com"),
  title: "피클테스트",
  description: "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~! 심리테스트/공포테스트",
  
  // --- PWA 및 아이콘 설정 ---
  manifest: "/manifest.json", 
  icons: {
    icon: "/img/favicon.png",
    apple: "/icons/icon-192x192.png", // iOS용 아이콘
  },
  
  // --- iOS 전용 PWA 설정 (핵심 추가 항목) ---
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "피클테스트",
  },

  // --- 모바일 및 테마 설정 ---
  // viewport 설정은 Next.js 14+ 버전에서는 viewport 상수로 분리하는 것이 권장되나, 현재 구조를 유지하며 추가합니다.
  
  keywords: [
    "심리테스트", "피클테스트", "심리분석", "성격 테스트", "나폴리탄", 
    "나폴리탄 괴담", "mbti", "테스트", "공포테스트", "공포게임", "게임",
  ],
  openGraph: {
    title: "피클테스트",
    description: "당신은 어떤 피클일까요?",
    url: "https://pickletest.com",
    siteName: "PickleTest",
    locale: "ko_KR",
    type: "website",
    images: "https://pickletest.com/img/og-image.png",
  },
};

// Next.js 14 이상에서 권장하는 viewport 설정 방식
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#47753a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* iOS PWA 기능을 위한 명시적 메타 태그 (metadata 객체가 가끔 놓치는 경우 대비) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="피클테스트" />
        
        {/* 구글 애드센스 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6955061481766922"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        {/* 구글 애널리틱스 */}
        <GoogleAnalytics gaId="G-WH9M5JGCTW" />
      </body>
    </html>
  );
}