"use client";

export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TotalDataStore } from "../../../allTestData"; // 통합 데이터 저장소
import LargeButton from "../../../components/Button/LargeButton";
import styles from "./page.module.css";
import { useThemeStore } from "@/src/store/useThemeStore";

/**
 * 테스트 준비 페이지 (Ready)
 * - URL의 mode(theme)와 type(contentType)을 기반으로 데이터를 로드합니다.
 */
function TestReadyPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // Zustand 스토어 상태 및 함수
  const { theme, contentType, setMode } = useThemeStore();

  const [selectedTestData, setSelectedTestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 시스템 상태 변수명 통일 (isNight)
  const isNight = theme === "night";

  useEffect(() => {
    // 1. URL 쿼리 파라미터에서 정보 추출
    const themeParam = searchParams.get("mode") as "day" | "night";
    const typeParam = searchParams.get("type") as "test" | "taro";

    // 2. URL로 직접 접속했을 경우를 대비해 스토어 상태 동기화
    if (themeParam && typeParam) {
      if (themeParam !== theme || typeParam !== contentType) {
        setMode(themeParam, typeParam);
      }
    }

    // 3. 데이터 로딩 로직
    if (params && params.testId) {
      const idToFind = Number(params.testId);
      
      // 현재 테마와 타입에 맞는 데이터 리스트 결정
      // 예: TotalDataStore["day"]["test"]
      const targetTheme = themeParam || theme;
      const targetType = typeParam || contentType;
      
      const targetList = TotalDataStore[targetTheme][targetType];
      const foundData = targetList.find((item: any) => item.id === idToFind);

      setSelectedTestData(foundData || null);
      setIsLoading(false);
    }
  }, [params, searchParams, theme, contentType, setMode]);

  if (isLoading) {
    return (
      <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
        <p className={styles.loadingText}>로딩 중...</p>
      </div>
    );
  }

  // 데이터를 찾지 못했을 경우
  if (!selectedTestData) {
    return (
      <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
        <div className={styles.errorWrapper}>
          <p>존재하지 않는 콘텐츠입니다. (ID: {params?.testId})</p>
          <Link href="/" className={styles.homeLink}>홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const { title: testTitle, id } = selectedTestData;

  return (
    <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
      {/* 1. 타이틀 영역 */}
      <div className={styles.titleWrapper}>
        <span className={styles.categoryBadge}>
          {contentType === "taro" ? "TAROT" : "TEST"}
        </span>
        <h1 className={styles.title}>{testTitle}</h1>
      </div>

      {/* 2. 하단 버튼 영역 */}
      <div className={styles.buttonWrapper}>
        {/* 다음 페이지로 현재 상태(mode, type)를 그대로 전달 */}
        <Link href={`/testStart/${id}?mode=${theme}&type=${contentType}`}>
          <LargeButton text="시작하기" />
        </Link>
      </div>
    </div>
  );
}

export default TestReadyPage;