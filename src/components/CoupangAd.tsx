"use client";

import { useState, useEffect } from "react";
import styles from "./CoupangAd.module.css";

export default function CoupangAd() {
  const [isMounted, setIsMounted] = useState(false);

  // 컴포넌트가 브라우저에 나타난 후에 실행됩니다.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const leftAds = [
    "https://coupa.ng/ck9jIv",
    "https://coupa.ng/ck9jPB",
    "https://coupa.ng/ck9jVA",
    "https://coupa.ng/ck9jWA",
  ];

  const rightAds = [
    "https://coupa.ng/ck9jIv",
    "https://coupa.ng/ck9jPB",
    "https://coupa.ng/ck9jVA",
    "https://coupa.ng/ck9jWA",
  ];

  const renderAds = (urls) =>
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

  // 아직 브라우저가 준비되지 않았다면 아무것도 보여주지 않습니다 (에러 방지)
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <aside className={`${styles.adWrapper} ${styles.leftSide}`}>
        {renderAds(leftAds)}
      </aside>

      <aside className={`${styles.adWrapper} ${styles.rightSide}`}>
        {renderAds(rightAds)}
      </aside>
    </>
  );
}
