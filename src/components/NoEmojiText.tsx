"use client";

import React from "react";

const NoEmojiText = ({ text, isCapturing, className }: { text: string; isCapturing: boolean; className?: string }) => {
  if (!text) return null;

  // 1. 평상시에는 로직을 아예 타지 않음
  if (!isCapturing) {
    return <span className={className} style={{ whiteSpace: "pre-wrap" }}>{text}</span>;
  }

  // 2. [보안/부하 방지] 정규식을 쓰지 않고 글자 하나씩 필터링
  // 한글, 영어, 숫자, 기본 기호, 줄바꿈만 직접 골라냅니다.
  const allowedChars = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ㄱ-ㅎㅏ-ㅣ가-힣.,!?()\"'-~\n\r";
  
  const cleanedText = text
    .split("") // 글자 단위로 쪼개기
    .filter(char => allowedChars.includes(char)) // 허용 목록에 있는 글자만 남기기
    .join(""); // 다시 합치기

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {cleanedText}
    </span>
  );
};

export default NoEmojiText;