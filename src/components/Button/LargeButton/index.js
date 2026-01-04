"use client";

import React from "react";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore";

// 타입을 정의하던 부분을 지우고 일반 JS 함수 형태로 수정했습니다.
function LargeButton({ text = "테스트 시작하기", onClick, disabled }) {
  const { isHorror } = useThemeStore();

  return (
    <div style={{ width: "100%" }}>
      <button
        className={`button1 ${isHorror ? "horror_btn" : "day_btn"}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default LargeButton;
