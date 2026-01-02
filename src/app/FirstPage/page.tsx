"use client";

import { testDataList } from "../../TestData";
import { horrorTestDataList } from "../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

interface FirstPageProps {
  isNight: boolean;
  toggleMode: () => void;
}

function FirstPage({ isNight, toggleMode }: FirstPageProps) {
  const currentDataList = isNight ? horrorTestDataList : testDataList;
  const [timeText, setTimeText] = useState("");

  // 낮일 때만 실제 한국 시간 표시
  useEffect(() => {
    if (isNight) {
      setTimeText("22:04");
      return;
    }

    const updateTime = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
      );
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setTimeText(`${hh}:${mm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [isNight]);

  const titleList = currentDataList.map(({ title, id }, index) => (
    <div className={styles.gridItem} key={index}>
      <Link href={`/testReady/${id}?mode=${isNight ? "horror" : "normal"}`}>
        <div className={styles.textWrapper}>
          <span className={styles.testTitle}>{title}</span>
        </div>
      </Link>
    </div>
  ));

  return (
    <div
      className={`${styles.pageWrapper} ${
        isNight ? styles.nightMode : styles.dayMode
      }`}
    >
      {/* 메인 이미지 */}
      <div className={styles.container}>
        <img
          src={
            isNight
              ? "/img/hero_text_img_horror.png"
              : "/img/hero_text_img.png"
          }
          alt="히어로 이미지"
          className={styles.imageCenter}
        />

        {/* 필름 카메라 시계 */}
        <span className={styles.filmClock} onClick={toggleMode}>
          {timeText}
        </span>
      </div>

      <main className={styles.mainArea}>
        <div className={styles.gridContainer}>{titleList}</div>
      </main>

      <section style={{ height: "40px" }} />
    </div>
  );
}

export default FirstPage;
