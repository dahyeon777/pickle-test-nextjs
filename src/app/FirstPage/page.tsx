"use client";

import { testDataList } from "../../TestData";
import { horrorTestDataList } from "../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";

function FirstPage({ isNight, toggleMode }) {
  const currentDataList = isNight ? horrorTestDataList : testDataList;

  const titleList = currentDataList.map(({ title, id }, index) => (
    <div className={styles["grid-item"]} key={index}>
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

        <div className={styles["grid-container"]}>{titleList}</div>
      </main>
      <section style={{ height: "40px" }}></section>
    </div>
  );
}

export default FirstPage;
