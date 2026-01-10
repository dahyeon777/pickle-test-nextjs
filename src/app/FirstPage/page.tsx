"use client";

import React, { useState } from "react";
import { TotalDataStore } from "../../allTestData";
import { useThemeStore } from "@/src/store/useThemeStore";
import Link from "next/link";
import styles from "./page.module.css";
import SearchBar from "@/src/components/SearchBar/page";

function FirstPage() {
  const { theme, setMode } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");

  const isNight = theme === "night";

  const handleToggleTheme = () => {
    if (isNight) {
      setMode("day", "test");
    } else {
      setMode("night", "test");
    }
  };

  /**
   * 리스트 아이템 렌더링 함수
   */
  const renderGridItems = (
    dataList: any[],
    type: "test" | "taro" | "book",
    forcedTheme?: "day" | "night"
  ) => {
    if (!dataList || dataList.length === 0) return null;

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

    if (filteredList.length === 0 && searchQuery !== "") return null;

    return filteredList.map(({ id, title }, index) => {
      const itemTheme = forcedTheme || theme;
      const isSearching = searchQuery.trim() !== "";

      const itemCustomClass = isSearching
        ? itemTheme === "night"
          ? styles.nightItemBox
          : styles.dayItemBox
        : "";

      // [수정 부분] type이 book일 경우 부모 grid-item에 bookItem 클래스 추가
      const gridItemClass = type === "book" 
        ? `${styles["grid-item"]} ${styles.bookItem}` 
        : styles["grid-item"];

      const bookClass = type === "book" ? styles.bookItemBox : "";

      return (
        <div className={gridItemClass} key={`${type}-${id}-${index}`}>
          <Link
            href={`/testReady/${id}?mode=${itemTheme}&type=${type}`}
            onClick={() => setMode(itemTheme, type)}
          >
            <div
              className={`${styles.testTitleBox} ${itemCustomClass} ${bookClass}`}
            >
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
                  TotalDataStore.night.book || [],
                  "book",
                  "night"
                )}
                {renderGridItems(
                  TotalDataStore.night.taro || [],
                  "taro",
                  "night"
                )}
              </div>
            </>
          ) : /* [일반 모드] */
          isNight ? (
            <>
              {/* 밤 모드 전용: 피클 썰북 (가장 상단) */}
              {TotalDataStore.night.book &&
                TotalDataStore.night.book.length > 0 && (
                  <>
                    <h3 className={styles.rowTitle}>피클 썰북 (Story)</h3>
                    <div className={styles.bookRow}>
                      {renderGridItems(TotalDataStore.night.book, "book")}
                    </div>
                  </>
                )}

              <h3 className={styles.rowTitle}>공포 테스트</h3>
              <div className={styles.testRow}>
                {renderGridItems(TotalDataStore.night.test, "test")}
              </div>

              {TotalDataStore.night.taro &&
                TotalDataStore.night.taro.length > 0 && (
                  <>
                    <h3 className={styles.rowTitle}>피클 타로</h3>
                    <div className={styles.taroRow}>
                      {renderGridItems(TotalDataStore.night.taro, "taro")}
                    </div>
                  </>
                )}
            </>
          ) : (
            <>
              <h3 className={styles.rowTitle}>피클 타로</h3>
              <div className={styles.taroRow}>
                {renderGridItems(TotalDataStore.day.taro, "taro")}
              </div>

              <h3 className={styles.rowTitle}>피클 테스트</h3>
              <div className={styles.testRow}>
                {renderGridItems(TotalDataStore.day.test, "test")}
              </div>
            </>
          )}
        </div>
      </main>

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
          심리 테스트 모드입니다.
          <br />
          Night Mode (밤 버전): 어두운 밤의 분위기에 맞춰 긴장감과 스릴을
          제공하는 공포·미스터리 및 썰북 콘텐츠들로 구성되어 있습니다.
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