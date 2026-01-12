"use client";

import React, { useMemo } from "react";

interface NoEmojiTextProps {
  text: string;
  isCapturing: boolean;
  className?: string;
}

const NoEmojiText = ({ text, isCapturing, className }: NoEmojiTextProps) => {
  if (!text) return null;

  // 이모티콘 제거 로직 (성능을 위해 useMemo 사용)
  const cleanedText = useMemo(() => {
    const isEmoji = (char: string) => {
      const code = char.codePointAt(0);
      if (!code) return false;
      return (
        (code >= 0x1F300 && code <= 0x1F9FF) || 
        (code >= 0x1F600 && code <= 0x1F64F) || 
        (code >= 0x1F680 && code <= 0x1F6FF) || 
        (code >= 0x2600 && code <= 0x26FF) ||   
        (code >= 0x2700 && code <= 0x27BF)      
      );
    };
    return Array.from(text).filter(char => !isEmoji(char)).join("");
  }, [text]);

  // 💡 중요: 화면용 스타일과 캡처용 스타일을 완전히 일치시킵니다.
  // 이렇게 하면 isCapturing이 변해도 레이아웃(개행)이 튀지 않습니다.
  const sharedStyle: React.CSSProperties = {
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    display: "inline-block", // 사파리 버그 방지를 위해 항상 유지
    width: "100%",
    lineHeight: "1.6",       // 줄간격 고정
    textAlign: "inherit"     // 부모의 정렬 속성 상속
  };

  return (
    <span className={className} style={sharedStyle}>
      {isCapturing ? cleanedText : text}
    </span>
  );
};

export default NoEmojiText;