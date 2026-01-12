"use client";

import React from "react";

interface NoEmojiTextProps {
  text: string;
  isCapturing: boolean;
  className?: string;
}

const NoEmojiText = ({ text, isCapturing, className }: NoEmojiTextProps) => {
  if (!text) return null;

  // 평소엔 원본 그대로 (줄바꿈 포함)
  if (!isCapturing) {
    // 💡 텍스트 내의 \n을 실제 줄바꿈으로 보여주려면 
    // 부모의 CSS에 white-space: pre-wrap; 이 있어야 합니다.
    return <span className={className}>{text}</span>;
  }

  // 캡처 시 로직
  const cleanedText = text
    //이모티콘 제거
    .replace(/[\u2600-\u27BF]|[\uD83C-\uD83E][\uDC00-\uDFFF]|[\u2011-\u26FF]/g, "")
    .replace(/ +/g, " ") 
    .trim();

  return (
    <span 
      className={className} 
      style={{ whiteSpace: "pre-wrap" }} // 💡 줄바꿈(\n)을 화면에 반영하기 위한 스타일
    >
      {cleanedText}
    </span>
  );
};

export default NoEmojiText;