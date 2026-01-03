/* src/app/layout.tsx */
import "./globals.css";
import React from "react";
import { Metadata } from "next";

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
    // images: [
    //   {
    //     url: "/og-image.png", // public 폴더에 넣은 이미지 경로
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
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
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
