"use client";

import { testDataList } from "../../TestData";
import Link from "next/link";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";

// 메인페이지
function FirstPage() {
  const handleHorrorToggle = () => {
    console.log("공포 테스트 데이터로 전환!");
  };

  // 테스트 이미지 목록 설정
  const imageList = testDataList.map(({ path, id }, index) => (
    <div className={styles["grid-item"]} key={index}>
      <Link href={`/testReady/${id}`}>
        {/* public 폴더 이미지는 path 경로가 /img/... 형식이면 그대로 작동합니다 */}
        <img src={path} alt="테스트이미지" />
      </Link>
    </div>
  ));

  return (
    <>
      <CoupangAd />
      <div className={styles.container}>
        <img
          src="/img/hero_text_img.png"
          alt="히어로 이미지"
          className={styles.image_center}
        />
      </div>

      <section className={styles.section}></section>

      <main className={styles.mainArea}>
        {/* [추가] 공포 테스트 전환 버튼 영역 */}
        <div className={styles.horrorButtonWrapper}>
          <button className={styles.horrorButton} onClick={handleHorrorToggle}>
            <div className={styles.redLight}></div>
            <span className={styles.horrorText}>잘못된 버튼입니다</span>
          </button>
        </div>

        {/* 메인 그리드 */}
        <div className={styles["grid-container"]}>{imageList}</div>
      </main>

      <section className={styles.section}></section>
    </>
  );
}

export default FirstPage;
