"use client";

import React, { useEffect } from "react";
import styles from "./KakaoShareButton.module.css";

interface KakaoShareProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
}

const KakaoShareButton = ({
  title,
  description,
  imageUrl,
  buttonText,
}: KakaoShareProps) => {
  useEffect(() => {
    // 환경변수에서 키 가져오기
    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        if (KAKAO_KEY) {
          window.Kakao.init(KAKAO_KEY);
          console.log("Kakao SDK Initialized");
        } else {
          console.warn("Kakao JS Key가 없습니다. .env 파일을 확인해주세요.");
        }
      }
    }
  }, []);

  const handleShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오 공유를 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const currentUrl = window.location.href;
    const origin = window.location.origin;

    // 이미지가 상대 경로일 경우 절대 경로로 변환
    const absoluteImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${origin}${imageUrl}`;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: absoluteImageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: "결과 확인하기",
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        {
          title: "나도 테스트하기",
          link: {
            mobileWebUrl: origin,
            webUrl: origin,
          },
        },
      ],
    });
  };

  return (
    <button onClick={handleShare} className={styles.kakao_btn}>
      {buttonText || "카카오톡으로 공유하기"}
    </button>
  );
};

export default KakaoShareButton;
