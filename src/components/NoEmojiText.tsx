"use client";

import React from "react";

interface NoEmojiTextProps {
  text: string;
  isCapturing: boolean;
  className?: string;
}

const NoEmojiText = ({ text, isCapturing, className }: NoEmojiTextProps) => {
  if (!text) return null;

  // 1. 평상시: 그냥 원본 출력 (아이패드 안심)
  if (!isCapturing) {
    return <span className={className} style={{ whiteSpace: "pre-wrap" }}>{text}</span>;
  }

  // 2. 캡처 시: 문제가 되는 유니코드 범위를 쓰지 않고 "허용할 문자"만 남깁니다.
  // 한글, 영어, 숫자, 공백, 일반 문장부호(.,!?()"-) 및 줄바꿈(\n)만 허용
  const cleanedText = text
    .replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s.,!?()\-""'']/g, "") 
    // 위 정규식은 '지정된 문자'가 아니면 다 지우라는 뜻입니다. (아이패드에 매우 가벼움)
    .trim();

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {cleanedText}
    </span>
  );
};

export default NoEmojiText;