"use client";

import { testDataList } from "../../TestData";
import Link from "next/link";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";

// 메인페이지
function FirstPage() {
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
      {/* 이제 광고는 여기서 컴포넌트로 한 번만 딱 넣어주면 끝! */}
      <CoupangAd />
      <div className={styles.container}>
        {/* 중요: public 폴더 안의 이미지는 import 없이 
           아래처럼 문자열 경로 "/img/..." 로 바로 쓰면 됩니다.
        */}
        <img
          src="/img/hero_text_img.png"
          alt="히어로 이미지"
          className={styles.image_center}
        />
      </div>
      <section className={styles.section}></section>
      <main>
        <div className={styles["grid-container"]}>{imageList}</div>
      </main>

      <section className={styles.section}></section>
    </>
  );
}

export default FirstPage;
