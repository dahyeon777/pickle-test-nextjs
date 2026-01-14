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
      const gridItemClass =
        type === "book"
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
          🥒 피클테스트(Pickle Test): 당신의 일상에 톡 쏘는 즐거움을 더하는 심리
          분석 플랫폼. 일상 속에서 즐기는 가벼운 스낵처럼, 간편하지만 톡 쏘는
          즐거움을 선사하는 글로벌 심리 테스트 플랫폼입니다.
          <br />
          1. 브랜드 스토리: 왜 '피클'인가요? 우리는 흔히 메인 요리의 맛을 돋우기
          위해 피클을 곁들입니다. 피클은 그 자체로 주인공은 아닐지라도, 특유의
          새콤달콤하고 아삭한 식감으로 식사 전체의 풍미를 완성하는 중요한 역할을
          합니다. **피클테스트(Pickle Test)**는 바로 이러한 '피클'의 속성에서
          영감을 얻었습니다. 바쁜 현대인들의 일상 속에서 거창한 상담이나 복잡한
          검사가 아니더라도, 마치 간식을 먹듯 가볍고 빠르게 즐길 수 있으면서도
          내면의 본질을 꿰뚫는 날카로운 통찰력을 제공하는 것을 목표로 합니다.
          글로벌 유저 누구나 공감할 수 있는 보편적인 감정과 심리적 키워드를
          바탕으로 독창적인 콘텐츠를 설계합니다.
          <br />
          2. Day Mode (낮 버전): 부드러운 자아 탐색과 성격 분석 햇살이 비치는 낮
          시간 동안, 피클테스트는 당신의 든든한 심리 조력자가 됩니다. Day Mode는
          일상적인 고민, 인간관계, 직장 생활, 그리고 MBTI 기반의 성격 유형을
          심층적이면서도 부드럽게 분석해 줍니다. 자기 이해의 시작: "나는 왜 이런
          상황에서 이렇게 행동할까?"라는 근본적인 질문에 답을 찾아줍니다. 관계의
          기술: 친구, 연인, 동료와의 관계에서 발생하는 미묘한 심리적 갈등을
          진단하고 최적의 처세술을 제안합니다. 감성적인 접근: 따뜻한 일러스트와
          사용자 친화적인 UI를 통해 테스트를 진행하는 것만으로도 힐링이 되는
          경험을 선사합니다.
          <br />
          3. Night Mode (밤 버전): 심연의 호기심을 자극하는 미스터리 해가 지고
          어둠이 깔리면 피클테스트는 전혀 다른 얼굴로 변신합니다. Night Mode는
          인간의 본능적인 공포와 호기심을 자극하는 고농도 몰입 콘텐츠를
          제공합니다. 스릴 넘치는 공포 테스트: 단순한 깜짝 놀라움이 아닌, 심리적
          압박감과 긴장감을 유도하는 정교한 시나리오 기반의 공포 테스트를 즐길
          수 있습니다. 미스터리 & 썰북: 인터넷에서 화제가 된 괴담이나 기묘한
          이야기들을 인터랙티브한 콘텐츠로 재구성하여, 사용자가 직접 이야기의
          주인공이 된 듯한 몰입감을 줍니다. 심야의 심리 진단: 낮에는 차마 꺼내지
          못했던 내면의 어두운 면이나 무의식 속의 욕망을 탐구하는 독특한 분석을
          경험할 수 있습니다.
          <br />
          4. 글로벌 플랫폼으로서의 비전 피클테스트는 언어와 문화의 장벽을 넘어
          전 세계 사람들이 함께 즐기는 글로벌 플랫폼을 지향합니다. 각 문화권의
          특수성을 반영한 현지화된 심리 테스트를 통해, 전 세계 유저들이 자신의
          성향을 공유하고 소통할 수 있는 데이터 기반의 심리 엔터테인먼트
          생태계를 구축하고 있습니다. 단순한 재미를 넘어, 짧은 시간 안에 나를 더
          깊이 이해하고 타인과 연결될 수 있는 공간—지금 바로 피클테스트에서
          당신의 숨겨진 맛을 확인해 보세요.
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
