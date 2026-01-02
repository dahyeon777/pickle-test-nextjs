"use client";

import { testDataList } from "../../TestData";
import { horrorTestDataList } from "../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";

function FirstPage({ isNight, toggleMode }) {
  const currentDataList = isNight ? horrorTestDataList : testDataList;

  const imageList = currentDataList.map(({ id, title }, index) => (
    <div className={styles["grid-item"]} key={index}>
      <Link href={`/testReady/${id}?mode=${isNight ? 'horror' : 'normal'}`}>
        {/* 이미지 대신 텍스트 박스 사용 */}
        <div className={styles.testTitleBox}>
          <span className={styles.testTitleText}>{title}</span>
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
      <CoupangAd isNight={isNight} />

      <div className={styles.container}>
        <img
          src={
            isNight ? "/img/hero_text_img_horror.png" : "/img/hero_text_img.png"
          }
          alt="히어로 이미지"
          className={styles.image_center}
        />
      </div>

      <main className={styles.mainArea}>
        <div className={styles.horrorButtonWrapper}>
          <button className={styles.horrorButton} onClick={toggleMode}>
            <div
              className={isNight ? styles.greenLight : styles.redLight}
            ></div>
            <span className={styles.horrorText}>
              {isNight ? "Day" : "Night"}
            </span>
          </button>
        </div>

        <div className={styles["grid-container"]}>{imageList}</div>
      </main>

      <section className={styles.section}></section>
    </div>
  );
}

export default FirstPage;