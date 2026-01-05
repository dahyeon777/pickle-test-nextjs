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
    const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    if (typeof window !== "undefined" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        if (KAKAO_KEY) {
          window.Kakao.init(KAKAO_KEY);
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
    // 💡 도메인을 직접 명시하여 카카오 서버가 헷갈리지 않게 합니다.
    const siteDomain = "https://pickletest.com";

    // 💡 이미지가 상대 경로(/img/...)라면 전체 주소로 합쳐줍니다.
    // 만약 이미지가 http로 시작하면 그대로 쓰고, 아니면 사이트 주소를 붙입니다.
    const finalImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${siteDomain}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: finalImageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      // 💡 소셜 정보(공유 이미지 하단 아이콘 옆 텍스트)를 추가하면 더 공식적으로 보입니다.
      social: {
        likeCount: 777,
        commentCount: 77,
        sharedCount: 777,
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
            mobileWebUrl: siteDomain,
            webUrl: siteDomain,
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