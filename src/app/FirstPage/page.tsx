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
      <p className={styles.footer}>
        피클테스트(Pickle Test)는 일상 속에서 즐기는 가벼운 스낵처럼, 간편하지만
        톡 쏘는 즐거움을 선사하는 글로벌 심리 테스트 플랫폼입니다. 서구권에서
        식탁의 감초 역할을 하는 '피클'의 이미지에서 영감을 받아, 짧은 시간 안에
        사용자의 내면을 날카롭고 흥미롭게 분석하는 독창적인 콘텐츠를 제공합니다.
        <br />
        본 플랫폼은 사용자의 현재 심리 상태와 잠재적 성향을 다각도로 조명하기
        위해 두 가지 반전된 테마를 운영하고 있습니다.
        <br />
        Day Mode (낮 버전): 일상의 고민과 성격 유형을 부드럽게 분석해 주는 심리
        테스트 모드입니다. MBTI 기반의 성향 분석과 자아 탐색을 돕는 밝고 경쾌한
        콘텐츠들로 구성되어 있습니다.
        <br />
        Night Mode (밤 버전): 어두운 밤의 분위기에 맞춰 긴장감과 스릴을 제공하는
        공포·미스터리 테스트 모드입니다. 심연의 공포나 본능적인 반응을
        테스트하며 낮과는 전혀 다른 반전의 재미를 경험할 수 있습니다.
        <br />
        피클테스트는 단순한 결과 제공을 넘어, 현대인들이 자기 자신을 더 깊이
        이해하고 타인과 재미있게 소통할 수 있는 매개체가 되고자 합니다. 모든
        콘텐츠는 최신 트렌드를 반영하여 지속적으로 업데이트되며, 브라우저 환경에
        최적화된 인터페이스를 통해 언제 어디서나 쾌적하게 이용하실 수 있습니다.
      </p>
      <div className={styles.footerContainer}>
        <p>e-mail: contact.pickletest@gmail.com</p>
        <p>Copyright ⓒ 2026 Pickle Test. All rights reserved.</p>
        <p><Link href="/privacy">
          개인정보 처리방침
        </Link></p>
        
      </div>
    </div>
  );
}

export default FirstPage;
