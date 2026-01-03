"use client";

import { testDataList } from "../../TestData";
import { horrorTestDataList } from "../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";
import { useThemeStore } from "@/src/store/useThemeStore"; // 1. 스토어 임포트

function FirstPage() {
  // 2. Zustand 스토어에서 상태와 함수 가져오기
  const { isHorror, toggleTheme } = useThemeStore();

  // 기존 isNight를 isHorror로 대체하여 로직 유지
  const currentDataList = isHorror ? horrorTestDataList : testDataList;

  const imageList = currentDataList.map(({ id, title }, index) => (
    <div className={styles["grid-item"]} key={index}>
      {/* 3. 이동할 때도 현재 상태(isHorror)를 기준으로 쿼리 파라미터 전달 */}
      <Link href={`/testReady/${id}?mode=${isHorror ? "horror" : "normal"}`}>
        <div className={styles.testTitleBox}>
          <span className={styles.testTitleText}>{title}</span>
        </div>
      </Link>
    </div>
  ));

  return (
    <div
      className={`${styles.pageWrapper} ${
        isHorror ? styles.nightMode : styles.dayMode
      }`}
    >
      {/* --- 피클 아이콘들 --- */}
      <img
        src="/img/pickle_icon.png"
        className={`${styles.floatingPickle} ${styles.pickle1}`}
        alt="pickle"
      />
      <img
        src="/img/pickle_icon.png"
        className={`${styles.floatingPickle} ${styles.pickle2}`}
        alt="pickle"
      />
      {/* ------------------- */}

      {/* 4. 광고 컴포넌트에도 상태 전달 */}
      <CoupangAd isNight={isHorror} />

      <div className={styles.container}>
        <img
          src={
            isHorror
              ? "/img/hero_text_img_horror.png"
              : "/img/hero_text_img.png"
          }
          alt="히어로 이미지"
          className={styles.image_center}
        />
      </div>

      <main className={styles.mainArea}>
        <div className={styles.horrorButtonWrapper}>
          {/* 5. 버튼 클릭 시 toggleTheme 호출 */}
          <button className={styles.horrorButton} onClick={toggleTheme}>
            <div
              className={isHorror ? styles.greenLight : styles.redLight}
            ></div>
            <span className={styles.horrorText}>
              {isHorror ? "Day" : "Night"}
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
