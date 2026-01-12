import "./globals.css";
import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import Header from "../components/Header";
import { GoogleAnalytics } from "@next/third-parties/google";
import IOSInstallGuide from "../components/IOSInstallGuide"; 
import ThemeTimeInitializer from "../components/ThemeTimeInitializer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pickletest.com"),
  title: "[심리테스트/공포테스트] 피클테스트",
  description: "[심리테스트/공포테스트] 당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~! 심리테스트/공포테스트",
  
  // --- PWA 및 아이콘 설정 ---
  manifest: "/manifest.json", 
  icons: {
    icon: "/img/favicon.png",
    apple: "/img/favicon192.png", 
  },
  
  // --- iOS 전용 PWA 설정 (Next.js 권장 방식) ---
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "피클테스트",
  },

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
        {/* [수정] 메타데이터 객체와 중복되는 수동 meta 태그들을 삭제하여 충돌 방지 */}
        
        {/* 구글 애드센스: 아이패드 안정성을 위해 lazyOnload 권장 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6955061481766922"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* suppressHydrationWarning: 아이패드 사파리 특유의 하이드레이션 경고가 에러로 번지는 것을 막아줌 */}
        <ThemeTimeInitializer />
        <Header />
        <main>{children}</main>
        
        <IOSInstallGuide />
        
        <GoogleAnalytics gaId="G-WH9M5JGCTW" />
      </body>
    </html>
  );
}