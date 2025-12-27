"use client";

import styles from "./CoupangAd.module.css";

export default function CoupangAd() {
  const adUrls = [
    "https://coupa.ng/ck9jIv",
    "https://coupa.ng/ck9jPB",
    "https://coupa.ng/ck9jVA",
    "https://coupa.ng/ck9jWA",
  ];

  return (
    <aside className={styles.adWrapper}>
      {adUrls.map((url, index) => (
        // 광고와 텍스트를 하나의 div로 묶어줍니다.
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
      ))}
    </aside>
  );
}
