"use client";

import React from "react";

const NoEmojiText = ({ text, isCapturing, className }: { text: string; isCapturing: boolean; className?: string }) => {
  if (!text) return null;

  if (!isCapturing) {
    return (
      <span 
        className={className} 
        style={{ 
          whiteSpace: "pre-wrap", 
          wordBreak: "break-all", // 👈 단어가 길어도 박스 안에서 강제 줄바꿈
          display: "inline-block", // 👈 사파리 레이아웃 버그 방지
          width: "100%" 
        }}
      >
        {text}
      </span>
    );
  }

  // 이모티콘 제거 로직 (유니코드 대응 버전)
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

  const cleanedText = Array.from(text)
    .filter(char => !isEmoji(char))
    .join("");

  return (
    <span 
      className={className} 
      style={{ 
        whiteSpace: "pre-wrap", 
        wordBreak: "break-all", 
        display: "inline-block", // 👈 캡처 시에도 블록 속성을 유지해서 박스 크기 보존
        width: "100%",
        lineHeight: "1.6" // 👈 사파리에서 줄간격이 좁아지는 현상 방지
      }}
    >
      {cleanedText}
    </span>
  );
};

export default NoEmojiText;