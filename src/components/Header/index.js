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
    // theme 값에 따라 night_mode 클래스를 동적으로 부여합니다.
    <header className={isNight ? "night_mode" : ""}>
      <div className="header_top_bar">
        <Link href="/">
          {isNight
            ? "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test!"
            : "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!"}
        </Link>
      </div>

      {/* 설치 가능할 때만 버튼 표시 */}
      {isInstallable && (
        <button className="install_btn" onClick={handleInstallClick}>
          앱 다운로드
        </button>
      )}
    </header>
  );
}

export default Header;
