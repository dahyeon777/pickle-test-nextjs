"use client";

import React, { useState } from "react";
import { TotalDataStore } from "../../allTestData";
import { useThemeStore } from "@/src/store/useThemeStore";
import Link from "next/link";
import styles from "./page.module.css";
import SearchBar from "@/src/components/SearchBar/page";

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
   * @param forcedTheme 검색 모드일 때 시각적 구분을 위한 강제 테마 설정
   */
  const renderGridItems = (
    dataList: any[],
    type: "test" | "taro",
    forcedTheme?: "day" | "night"
  ) => {
    if (!dataList || dataList.length === 0) return null;

    // --- 제목 및 태그 통합 검색 필터링 로직 ---
    const filteredList = dataList.filter((item) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();

      const titleMatch = item.title
        .replace(/\n/g, " ")
        .toLowerCase()
        .includes(query);

      const tagMatch = item.tags?.some((tag: string) =>
        tag.toLowerCase().includes(query)
      );

      return titleMatch || tagMatch;
    });

    if (filteredList.length === 0 && searchQuery !== "") {
      return null;
    }

    return filteredList.map(({ id, title }, index) => {
      // 검색 중일 때는 데이터가 속한 원래 테마(forcedTheme)를 우선 사용
      const itemTheme = forcedTheme || theme;
      const isSearching = searchQuery.trim() !== "";

      // 검색 결과일 때 시각적 구분 클래스 적용
      const itemCustomClass = isSearching
        ? itemTheme === "night"
          ? styles.nightItemBox
          : styles.dayItemBox
        : "";

      return (
        <div className={styles["grid-item"]} key={`${type}-${id}-${index}`}>
          <Link
            href={`/testReady/${id}?mode=${itemTheme}&type=${type}`}
            onClick={() => setMode(itemTheme, type)}
          >
            <div className={`${styles.testTitleBox} ${itemCustomClass}`}>
              <span className={styles.testTitleText}>{title}</span>
            </div>
          </Link>
        </div>
      );
    });
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
          {searchQuery.trim() !== "" ? (
            /* [통합 검색 결과 모드] */
            <>
              <h3 className={styles.rowTitle}>"{searchQuery}" 검색 결과</h3>
              <div className={styles.testRow}>
                {renderGridItems(TotalDataStore.day.test, "test", "day")}
                {renderGridItems(TotalDataStore.night.test, "test", "night")}
                {renderGridItems(TotalDataStore.day.taro, "taro", "day")}
                {renderGridItems(
                  TotalDataStore.night.taro || [],
                  "taro",
                  "night"
                )}
              </div>
            </>
          ) : /* [일반 모드 - 원본 구조 동일] */
          isNight ? (
            <>
              <h3 className={styles.rowTitle}>테스트</h3>
              <div className={styles.testRow}>
                {renderGridItems(TotalDataStore.night.test, "test")}
              </div>

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

      {/* 푸터 설명 영역 (원본 텍스트 그대로 유지) */}
      <div className={styles.footerSection}>
        <p className={styles.footerDescription}>
          피클테스트(Pickle Test)는 일상 속에서 즐기는 가벼운 스낵처럼,
          간편하지만 톡 쏘는 즐거움을 선사하는 글로벌 심리 테스트 플랫폼입니다.
          <br />
          일상생활 속에서 메인 음식에 곁들여 먹거나 간식으로 즐겨 먹는 '피클'의
          이미지에서 영감을 받아, 짧은 시간 안에 사용자의 내면을 날카롭고
          흥미롭게 분석하는 독창적인 콘텐츠를 제공합니다.
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
