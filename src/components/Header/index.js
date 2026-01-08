"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore";

function Header() {
  // 스토어에서 theme 상태를 가져옵니다.
  const { theme } = useThemeStore();
  const isNight = theme === "night";

  // PWA 설치 관련 상태
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // 1. 장치 확인 (대소문자 구분 없이 체크)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    // 2. 이미 PWA 앱으로 접속 중인지 확인
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    // [핵심] iOS는 이벤트를 지원하지 않으므로, 설치 안 된 상태라면 무조건 버튼 활성화
    if (isIOS && !isStandalone) {
      setIsInstallable(true);
    }

    // 안드로이드 및 PC용 설치 유도 이벤트
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true); // 이벤트가 발생하면 버튼 활성화
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    // iOS 대응: 버튼 클릭 시 안내 창 표시
    if (isIOS) {
      alert(
        "아이폰(iOS)은 Safari 브라우저 하단의 [공유] 버튼(네모에 화살표)을 누른 뒤, 리스트를 아래로 내려 '홈 화면에 추가'를 선택해 주세요!"
      );
      return;
    }

    // 안드로이드 및 PC 대응
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("사용자가 앱 설치를 수락했습니다.");
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <header className={isNight ? "night_mode" : ""}>
      <div className="header_top_bar">
        <Link href="/">
          {isNight
            ? "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test!"
            : "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!"}
        </Link>
      </div>

      {/* 이제 iOS에서도 이 버튼이 당당하게 뜹니다 */}
      {isInstallable && (
        <button className="install_btn" onClick={handleInstallClick}>
          앱 다운로드
        </button>
      )}
    </header>
  );
}

export default Header;
