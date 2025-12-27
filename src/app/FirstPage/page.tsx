"use client";

import { testDataList } from "../../TestData";
import { horrorTestDataList } from "../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";

function FirstPage({ isNight, toggleMode }) {
  // 현재 모드에 맞는 데이터 선택
  const currentDataList = isNight ? horrorTestDataList : testDataList;

  // 테스트 이미지 목록 렌더링
  const imageList = currentDataList.map(({ path, id }, index) => (
    <div className={styles["grid-item"]} key={index}>
      <Link href={`/testReady/${id}`}>
        <img src={path} alt="테스트이미지" />
      </Link>
    </div>
  ));

  return (
    /* pageWrapper는 공통, nightMode/dayMode로 배경색 결정 */
    <div className={`${styles.pageWrapper} ${isNight ? styles.nightMode : styles.dayMode}`}>
      <CoupangAd isNight={isNight} />
      
      <div className={styles.container}>
        <img
          src={isNight ? "/img/hero_text_img_horror.png" : "/img/hero_text_img.png"}
          alt="히어로 이미지"
          className={styles.image_center}
        />
      </div>

      <section className={styles.section}></section>

      <main className={styles.mainArea}>
        <div className={styles.horrorButtonWrapper}>
          <button className={styles.horrorButton} onClick={toggleMode}>
            {/* 전조등 색상 변경: 밤엔 초록(Day로 돌아가기), 낮엔 빨강(Night로 가기) */}
            <div className={isNight ? styles.greenLight : styles.redLight}></div>
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