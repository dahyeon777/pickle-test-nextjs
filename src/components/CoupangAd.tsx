"use client";

import { useState, useEffect } from "react";
import styles from "./CoupangAd.module.css";

// 부모(Home)로부터 isNight 상태를 전달받습니다.
export default function CoupangAd({ isNight }: { isNight: boolean }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 낮 버전 광고 데이터
  const dayAds = {
    left: [
      "https://coupa.ng/ck9jIv",
      "https://coupa.ng/ck9lmJ",
      "https://coupa.ng/ck9jVA",
      "https://coupa.ng/ck9jWA",
    ],
    right: [
      "https://coupa.ng/ck9lqV",
      "https://coupa.ng/ck9jPB",
      "https://coupa.ng/ck9lsv",
      "https://coupa.ng/ck9loO",
    ],
  };

  // 밤 버전 광고 데이터 (여기에 공포용 광고 URL을 넣으세요)
  const nightAds = {
    left: [
      "https://coupa.ng/ck9mRm",
      "https://coupa.ng/ck9mWr",
      "https://coupa.ng/ck9mUb",
      "https://coupa.ng/ck9mVb",
    ],
    right: [
      "https://coupa.ng/ck9m3q",
      "https://coupa.ng/ck9m2q",
      "https://coupa.ng/ck9m0r",
      "https://coupa.ng/ck9mZw",
    ],
  };

  const currentAds = isNight ? nightAds : dayAds;

  const renderAds = (urls: string[]) =>
    urls.map((url, index) => (
      <div key={index} className={styles.adItem}>
        <iframe
          src={url}
          width="120"
          height="240"
          style={{ border: "none" }}
          scrolling="no"
          referrerPolicy="unsafe-url"
        ></iframe>
        <p className={styles.adText}>
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 일정액의 수수료를
          제공받습니다.
        </p>
      </div>
    ));

  if (!isMounted) return null;

  return (
    <>
      <aside
        className={`${styles.adWrapper} ${styles.leftSide} ${
          isNight ? styles.nightMode : ""
        }`}
      >
        {renderAds(currentAds.left)}
      </aside>

      <aside
        className={`${styles.adWrapper} ${styles.rightSide} ${
          isNight ? styles.nightMode : ""
        }`}
      >
        {renderAds(currentAds.right)}
      </aside>
    </>
  );
}
