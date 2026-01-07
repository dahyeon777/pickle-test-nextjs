"use client";

import React from "react";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore";

function LargeButton({ text = "테스트 시작하기", onClick, disabled }) {
  // 스토어에서 theme을 가져와 밤 모드 여부를 판단합니다.
  const { theme } = useThemeStore();
  const isNight = theme === "night";

  return (
    <div style={{ width: "100%" }}>
      <button
        className={`button1 ${isNight ? "horror_btn" : "day_btn"}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default LargeButton;