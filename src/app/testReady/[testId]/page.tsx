"use client";
export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { testDataList } from "../../../TestData";
import { horrorTestDataList } from "../../../HorrorTestData";
import LargeButton from "../../../components/Button/LargeButton";
import styles from "./page.module.css";
import { useThemeStore } from "@/src/store/useThemeStore"; // 1. 스토어 임포트

function TestReadyPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // 2. Zustand 스토어에서 상태 가져오기
  const { isHorror, setTheme } = useThemeStore();

  const [selectedTestData, setSelectedTestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3. URL 파라미터와 스토어 상태 동기화 (선택 사항이지만 권장)
    // 사용자가 링크를 직접 치고 들어왔을 때를 대비해 스토어 상태를 업데이트해줍니다.
    const modeParam = searchParams.get("mode");
    if (modeParam === "horror" && !isHorror) {
      setTheme("horror");
    } else if (modeParam === "normal" && isHorror) {
      setTheme("normal");
    }

    if (params && params.testId) {
      const idToFind = Number(params.testId);

      // 4. 스토어의 isHorror 값에 따라 데이터 결정
      const targetList = isHorror ? horrorTestDataList : testDataList;
      const foundData = targetList.find((item) => item.id === idToFind);

      setSelectedTestData(foundData || null);
      setIsLoading(false);
    }
  }, [params, isHorror, searchParams, setTheme]);

  if (isLoading) return <div className={styles.container}>로딩 중...</div>;

  if (!selectedTestData) {
    return (
      <div
        className={`${styles.container} ${isHorror ? styles.nightMode : ""}`}
      >
        <p>테스트 데이터를 찾을 수 없습니다. (ID: {params?.testId})</p>
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    );
  }

  const { title: testTitle, id } = selectedTestData;

  return (
    <div
      className={`${styles.container} ${
        isHorror ? styles.nightMode : styles.dayMode
      }`}
    >
      <h1 className={styles.title}>{testTitle}</h1>

      {/* 5. 다음 단계로 갈 때도 현재 스토어 상태를 쿼리로 유지 (새로고침 대비) */}
      <Link href={`/testStart/${id}?mode=${isHorror ? "horror" : "normal"}`}>
        <LargeButton />
      </Link>
    </div>
  );
}

export default TestReadyPage;
