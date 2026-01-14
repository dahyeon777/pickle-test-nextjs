"use client";

import React, { useMemo } from "react";

const NoEmojiText = ({
  text,
  isCapturing,
  className,
}: {
  text: string;
  isCapturing: boolean;
  className?: string;
}) => {
  if (!text) return null;

  // 이모티콘 제거 로직
  const cleanedText = useMemo(() => {
    const isEmoji = (char: string) => {
      const code = char.codePointAt(0);
      if (!code) return false;
      return (
        (code >= 0x1f300 && code <= 0x1f9ff) ||
        (code >= 0x1f600 && code <= 0x1f64f) ||
        (code >= 0x1f680 && code <= 0x1f6ff) ||
        (code >= 0x2600 && code <= 0x26ff) ||
        (code >= 0x2700 && code <= 0x27bf)
      );
    };
    return Array.from(text)
      .filter((char) => !isEmoji(char))
      .join("");
  }, [text]);

  return <span className={className}>{isCapturing ? cleanedText : text}</span>;
};

export default NoEmojiText;
