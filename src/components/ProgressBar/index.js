import React from "react";
import "./index.css"; // 별도의 CSS 파일을 만듭니다.

/**
 * 프로그레스 바 컴포넌트
 * @param {number} current - 현재 진행 단계 (예: 현재 질문 인덱스)
 * @param {number} total - 전체 단계 수 (예: 전체 질문 수)
 */
function ProgressBar({ current, total }) {
  // 진행률 계산 (0% ~ 100%)
  // Math.max(0, ...)을 사용하여 current가 0 미만일 경우 0으로 처리,
  // Math.min(total, ...)을 사용하여 current가 total을 초과해도 total로 처리하여 100%를 넘지 않게 합니다.
  const progress = Math.round((Math.max(0, current) / total) * 100);

  // 진행 바 스타일을 위한 너비
  const barWidth = `${progress}%`;

  // 사용자에게 보여줄 진행 현황 텍스트 (예: 5/10 또는 50%)
  const progressText = `${current} / ${total}`;
  // 또는 const progressText = `${progress}%`;

  return (
    <div className="progress-container">
      {/* 진행률 표시 텍스트 */}
      <div className="progress-text">{progressText}</div>

      {/* 실제 프로그레스 바 */}
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: barWidth }}
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={total}
          role="progressbar" // 웹 접근성을 위해 role과 aria-* 속성을 추가합니다.
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
