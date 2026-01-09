"use client";

import React, { useState } from "react";
import { TotalDataStore } from "../../allTestData";
import { useThemeStore } from "@/src/store/useThemeStore";
import Link from "next/link";
import styles from "./page.module.css";
import SearchBar from "@/src/components/SearchBar";

/**
 * 피클 테스트 메인 페이지
 * - Theme: day (낮), night (밤)
 * - ContentType: test (심리테스트), taro (타로)
 */
function FirstPage() {
  const { theme, setMode } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리

  const isNight = theme === "night";

  // 테마 전환 함수 (Night <-> Day)
  const handleToggleTheme = () => {
    if (isNight) {
      setMode("day", "test");
    } else {
      setMode("night", "test");
    }
  };

  /**
   * 리스트 아이템 렌더링 함수
   * @param dataList 출력할 데이터 배열
   * @param type 'test' | 'taro'
   */
  const renderGridItems = (dataList: any[], type: "test" | "taro") => {
    if (!dataList || dataList.length === 0) return null;

    // --- 제목 및 태그 통합 검색 필터링 로직 ---
    const filteredList = dataList.filter((item) => {
      // 검색어가 없으면 전체 표시
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();

      // 1. 제목 검색 (줄바꿈 제거 후 비교)
      const titleMatch = item.title
        .replace(/\n/g, " ")
        .toLowerCase()
        .includes(query);

      // 2. 태그 검색 (item.tags 배열 내 키워드 매칭)
      const tagMatch = item.tags?.some((tag: string) =>
        tag.toLowerCase().includes(query)
      );

      return titleMatch || tagMatch;
    });

    // 검색 결과가 없을 경우 해당 섹션 렌더링 안함
    if (filteredList.length === 0 && searchQuery !== "") {
      return null;
    }

    return filteredList.map(({ id, title }, index) => (
      <div className={styles["grid-item"]} key={`${type}-${id}-${index}`}>
        <Link
          href={`/testReady/${id}?mode=${theme}&type=${type}`}
          onClick={() => setMode(theme, type)}
        >
          <div className={styles.testTitleBox}>
            <span className={styles.testTitleText}>{title}</span>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div
      className={`${styles.pageWrapper} ${
        isNight ? styles.nightMode : styles.dayMode
      }`}
    >
      {/* 배경 피클 아이콘 */}
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

      {/* 상단 히어로 이미지 영역 */}
      <div className={styles.container}>
        <img
          src={
            isNight ? "/img/hero_text_img_horror.png" : "/img/hero_text_img.png"
          }
          alt="Pickle Test Hero"
          className={styles.image_center}
        />
      </div>

      <main className={styles.mainArea}>
        {/* 상단 검색바 + 테마 버튼 한 줄 배치 */}
        <div className={styles.topControlBar}>
          {/* SearchBar 컴포넌트와 상태 연동 */}
          <SearchBar
            isNight={isNight}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className={styles.themeButtonWrapper}>
            <button className={styles.themeButton} onClick={handleToggleTheme}>
              <div
                className={isNight ? styles.greenLight : styles.redLight}
              ></div>
              <span className={styles.themeButtonText}>
                {isNight ? "Day" : "Night"}
              </span>
            </button>
          </div>
        </div>

        {/* 데이터 리스트 영역 */}
        <div className={styles["grid-container"]}>
          {isNight ? (
            /* [Night 버전] - 테스트(2행)와 타로(1행) */
            <>
              <h3 className={styles.rowTitle}>테스트</h3>
              <div className={styles.testRow}>
                {renderGridItems(TotalDataStore.night.test, "test")}
              </div>

              {/* 밤 버전 타로 데이터가 있을 경우에만 렌더링 */}
              {TotalDataStore.night.taro &&
                TotalDataStore.night.taro.length > 0 && (
                  <>
                    <h3 className={styles.rowTitle}>타로</h3>
                    <div className={styles.taroRow}>
                      {renderGridItems(TotalDataStore.night.taro, "taro")}
                    </div>
                  </>
                )}
            </>
          ) : (
            /* [Day 버전] - 타로(1행)와 테스트(2행) */
            <>
              <h3 className={styles.rowTitle}>타로</h3>
              <div className={styles.taroRow}>
                {renderGridItems(TotalDataStore.day.taro, "taro")}
              </div>

              <h3 className={styles.rowTitle}>테스트</h3>
              <div className={styles.testRow}>
                {renderGridItems(TotalDataStore.day.test, "test")}
              </div>
            </>
          )}
        </div>
      </main>

      {/* 푸터 설명 영역 */}
      <div className={styles.footerSection}>
        <p className={styles.footerDescription}>
          피클테스트(Pickle Test)는 일상 속에서 즐기는 가벼운 스낵처럼,
          간편하지만 톡 쏘는 즐거움을 선사하는 글로벌 심리 테스트 플랫폼입니다.
          서구권에서 식탁의 감초 역할을 하는 '피클'의 이미지에서 영감을 받아,
          짧은 시간 안에 사용자의 내면을 날카롭고 흥미롭게 분석하는 독창적인
          콘텐츠를 제공합니다.
          <br />
          <br />
          Day Mode (낮 버전): 일상의 고민과 성격 유형을 부드럽게 분석해 주는
          심리 테스트 모드입니다. MBTI 기반의 성향 분석과 자아 탐색을 돕는 밝고
          경쾌한 콘텐츠들로 구성되어 있습니다.
          <br />
          Night Mode (밤 버전): 어두운 밤의 분위기에 맞춰 긴장감과 스릴을
          제공하는 공포·미스터리 테스트 모드입니다. 낮과는 전혀 다른 반전의
          재미를 경험할 수 있습니다.
        </p>

        <div className={styles.footerInfo}>
          <p>e-mail: contact.pickletest@gmail.com</p>
          <p>Copyright ⓒ 2026 Pickle Test. All rights reserved.</p>
          <p>
            <Link href="/privacy">개인정보 처리방침</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
