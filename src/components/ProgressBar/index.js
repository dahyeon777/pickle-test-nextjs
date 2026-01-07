"use client";

import React from "react";
import "./index.css";
import { useThemeStore } from "@/src/store/useThemeStore"; // 스토어 임포트

function ProgressBar({ current, total }) {
  // 스토어에서 theme을 가져와 밤 모드 여부를 판단합니다.
  const { theme } = useThemeStore();
  const isNight = theme === "night";

  // 진행률 계산
  const progress = Math.round((Math.max(0, current) / total) * 100);
  const barWidth = `${progress}%`;
  const progressText = `${current} / ${total}`;

  return (
    <div className="progress-container">
      {/* 텍스트 색상 변경 */}
      <div className={`progress-text ${isNight ? "night_text" : ""}`}>
        {progressText}
      </div>

      {/* 배경색 변경 */}
      <div className={`progress-bar-background ${isNight ? "night_bg" : ""}`}>
        <div
          className={`progress-bar-fill ${
            isNight ? "night_fill" : "day_fill"
          }`}
          style={{ width: barWidth }}
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          role="progressbar"
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;