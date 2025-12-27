"use client";

import styles from "./CoupangAd.module.css";

export default function CoupangAd() {
  return (
    <aside className={styles.adWrapper}>
      <iframe
        src="https://coupa.ng/ck9jIv"
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
    </aside>
  );
}
