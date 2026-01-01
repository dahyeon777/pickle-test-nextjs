/* src/app/layout.tsx */
import "./globals.css";
import React from "react";
import Header from "../components/Header"; // 헤더 임포트

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