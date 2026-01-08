"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore";

function Header() {
  const { theme } = useThemeStore();
  const isNight = theme === "night";

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // 1. iOS 및 iPadOS 체크 (아이패드는 자신을 Mac으로 속이기 때문에 터치 포인트로 확인)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // 2. 이미 PWA 앱으로 접속 중인지 확인
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    // [핵심] 애플 기기(iOS/iPadOS)인데 아직 설치 안 된 경우 버튼 강제 활성화
    if (isIOS && !isStandalone) {
      console.log("애플 기기 감지: 버튼 강제 활성화");
      setIsInstallable(true);
    }

    // 안드로이드 및 PC용 설치 유도 이벤트
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
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
    const isIOS =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      alert(
        "아이패드/아이폰은 브라우저 상단(또는 하단)의 [공유] 버튼을 누른 뒤, '홈 화면에 추가'를 선택해 주세요!"
      );
      return;
    }

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

      {isInstallable && (
        <button className="install_btn" onClick={handleInstallClick}>
          앱 다운로드
        </button>
      )}
    </header>
  );
}

export default Header;
