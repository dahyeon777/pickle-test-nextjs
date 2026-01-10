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
    apple: "/img/favicon192.png", // manifest와 경로 통일
  },
  
  // --- iOS 전용 PWA 설정 ---
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="피클테스트" />
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6955061481766922"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeTimeInitializer />
        <Header />
        <main>{children}</main>
        
        {/* iOS 전용 하단 말풍선 가이드 */}
        <IOSInstallGuide />
        
        <GoogleAnalytics gaId="G-WH9M5JGCTW" />
      </body>
    </html>
  );
}