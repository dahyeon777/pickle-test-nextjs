"use client";

import React from "react";
import Link from "next/link";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore";

function Header() {
  // 스토어에서 theme 상태를 가져옵니다.
  const { theme } = useThemeStore();
  const isNight = theme === "night";

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
    </header>
  );
}

export default Header;