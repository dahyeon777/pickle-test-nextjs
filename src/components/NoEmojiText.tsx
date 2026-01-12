"use client";

import React from "react";

const NoEmojiText = ({ text, isCapturing, className }: { text: string; isCapturing: boolean; className?: string }) => {
  if (!text) return null;

  // 1. 평상시에는 로직을 타지 않음
  if (!isCapturing) {
    return <span className={className} style={{ whiteSpace: "pre-wrap" }}>{text}</span>;
  }

  // 2. 캡처 시: 이모티콘만 걸러내기 (한글/영어/숫자 완벽 보존)
  const isEmoji = (char: string) => {
    const code = char.codePointAt(0);
    if (!code) return false;
    
    // 이모티콘 유니코드 범위 (보통 이 범위 안에 이모티콘이 몰려 있습니다)
    return (
      (code >= 0x1F300 && code <= 0x1F9FF) || // Miscellaneous Symbols and Pictographs
      (code >= 0x1F600 && code <= 0x1F64F) || // Emoticons
      (code >= 0x1F680 && code <= 0x1F6FF) || // Transport and Map Symbols
      (code >= 0x2600 && code <= 0x26FF) ||   // Misc Symbols
      (code >= 0x2700 && code <= 0x27BF)      // Dingbats
    );
  };

  // 글자 하나씩 검사해서 이모티콘이 아닌 것만 합치기
  // Array.from을 써야 유니코드 문자가 깨지지 않고 정상적으로 쪼개집니다.
  const cleanedText = Array.from(text)
    .filter(char => !isEmoji(char))
    .join("");

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {cleanedText}
    </span>
  );
};

export default NoEmojiText;