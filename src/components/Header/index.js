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
    // 1. iOS 여부 확인
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // 2. 이미 설치된 상태(PWA 실행 중)인지 확인
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    // 아이폰(iOS)인데 아직 설치 안 된 경우, 버튼을 보여주어 안내 창을 띄울 수 있게 함
    if (isIOS && !isStandalone) {
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      // 브라우저 기본 팝업 방지
      e.preventDefault();
      // 이벤트를 상태에 저장
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
    // 클릭 시점에 다시 한번 iOS 확인
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // iOS인 경우 알림창으로 설치 방법 안내
    if (isIOS) {
      alert(
        "아이폰(iOS)은 Safari 브라우저 하단의 [공유] 버튼을 누른 뒤 '홈 화면에 추가'를 선택해 주세요!"
      );
      return;
    }

    // 안드로이드 및 PC 설치 로직
    if (!deferredPrompt) return;

    // 설치 팝업 표시
    deferredPrompt.prompt();

    // 사용자의 선택 기다리기
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("사용자가 앱 설치를 수락했습니다.");
    }

    // 설치 유도 후 초기화
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

      {/* 설치 가능하거나 iOS 안내가 필요할 때 버튼 표시 */}
      {isInstallable && (
        <button className="install_btn" onClick={handleInstallClick}>
          앱 다운로드
        </button>
      )}
    </header>
  );
}

export default Header;
