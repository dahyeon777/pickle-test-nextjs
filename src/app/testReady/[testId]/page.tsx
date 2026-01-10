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
 */
function TestReadyPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { theme, contentType, setMode } = useThemeStore();

  const [selectedTestData, setSelectedTestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isNight = theme === "night";

  useEffect(() => {
    const themeParam = searchParams.get("mode") as "day" | "night";
    const typeParam = searchParams.get("type") as "test" | "taro";

    if (themeParam && typeParam) {
      if (themeParam !== theme || typeParam !== contentType) {
        setMode(themeParam, typeParam);
      }
    }

    if (params && params.testId) {
      const idToFind = Number(params.testId);
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
      <div
        className={`${styles.container} ${
          isNight ? styles.nightMode : styles.dayMode
        }`}
      >
        <p className={styles.loadingText}>로딩 중...</p>
      </div>
    );
  }

  if (!selectedTestData) {
    return (
      <div
        className={`${styles.container} ${
          isNight ? styles.nightMode : styles.dayMode
        }`}
      >
        <div className={styles.errorWrapper}>
          <p>존재하지 않는 콘텐츠입니다. (ID: {params?.testId})</p>
          <Link href="/" className={styles.homeLink}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { title: testTitle, id } = selectedTestData;

  return (
    <div
      className={`${styles.container} ${
        isNight ? styles.nightMode : styles.dayMode
      }`}
    >
      {/* 1. 타이틀 영역 */}
      <div className={styles.titleWrapper}>
        <span className={styles.categoryBadge}>
          {contentType === "taro" ? "TAROT" : "TEST"}
        </span>
        <h1 className={styles.title}>{testTitle}</h1>
      </div>

      {/* 2. 하단 버튼 영역 */}
      <div className={styles.buttonWrapper}>
        {isNight ? (
          /* Night 버전(밤)일 때 문구 */
          <div className={styles.warningBox}>
            <p className={styles.warningText}>
              ※ 본 콘텐츠는 공포 및 미스터리 요소를 포함하고 있습니다.
            </p>
            <p className={styles.warningText}>
              노약자, 임산부, 심약자는 이용에 주의해 주시기 바랍니다.
            </p>
          </div>
        ) : (
          /* Day 버전(낮)일 때 문구 */
          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              ※ 본 콘텐츠는 과학적 근거가 아닌
              <br />
              재미를 목적으로 제공됩니다.
            </p>
            <p className={styles.infoText}>
              모든 결과는 참고용으로만 활용해 주시길 바랍니다.
            </p>
          </div>
        )}

        <Link
          href={`/testStart/${id}?mode=${theme}&type=${contentType}`}
          className={styles.startLink}
        >
          <LargeButton text="시작하기" />
        </Link>
      </div>
    </div>
  );
}

export default TestReadyPage;
