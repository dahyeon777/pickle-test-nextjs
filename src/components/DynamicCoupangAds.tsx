"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

export default function DynamicCoupangAds() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 스크립트가 로드된 후 실행할 함수
  const initCoupang = () => {
    if (window.PartnersCoupang && containerRef.current) {
      new window.PartnersCoupang.G({
        id: 955335,
        template: "carousel",
        trackingCode: "AF6429150",
        width: "100%", // 모바일 대응 (가로 꽉 차게)
        height: "140",
        tsource: "",
      });
    }
  };

  return (
    <div className="w-full my-6 flex flex-col items-center">
      {/* 광고가 렌더링될 실제 박스 */}
      <div ref={containerRef} className="w-full max-w-[680px]">
        <Script
          src="https://ads-partners.coupang.com/g.js"
          strategy="afterInteractive"
          onLoad={initCoupang}
        />
      </div>
      
      {/* 공정위 필수 문구 (매우 중요!) */}
      <p className="text-[10px] text-gray-400 mt-2 text-center">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}

// TypeScript 에러 방지
declare global {
  interface Window {
    PartnersCoupang: any;
  }
}