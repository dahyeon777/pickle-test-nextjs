"use client"; // Zustand를 사용하므로 클라이언트 컴포넌트 선언

import React from "react";
import Link from "next/link";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore"; // 1. 스토어 임포트

function Header() {
  // 2. 인자(isNight)를 받지 않고 스토어에서 직접 가져옵니다.
  const { isHorror } = useThemeStore();

  return (
    // 3. isHorror 상태에 따라 클래스를 부여합니다.
    <header className={isHorror ? "night_mode" : ""}>
      <div className="header_top_bar">
        <Link href="/">
          {isHorror
            ? "당신은 어떤 피클일까요? 기괴한 진실을 마주할 준비가 되셨나요?" // 호러용 문구 (선택사항)
            : "당신은 어떤 피클일까요? 개성을 톡 쏘게, 지금 바로 Test~!"}
        </Link>
      </div>
    </header>
  );
}

export default Header;
