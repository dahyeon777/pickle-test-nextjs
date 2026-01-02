"use client";
export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation"; // useSearchParams 추가
import Link from "next/link";
import { testDataList } from "../../../TestData";
import { horrorTestDataList } from "../../../HorrorTestData"; // 호러 데이터 임포트
import LargeButton from "../../../components/Button/LargeButton";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";

function TestReadyPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // URL에서 mode 파라미터를 가져옵니다. (없으면 기본값 'normal')
  const mode = searchParams.get("mode") || "normal";
  const isHorrorMode = mode === "horror";

  const [selectedTestData, setSelectedTestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params && params.testId) {
      const idToFind = Number(params.testId);
      
      // 1. 모드에 따라 어떤 리스트에서 찾을지 결정합니다.
      const targetList = isHorrorMode ? horrorTestDataList : testDataList;
      
      // 2. 해당 리스트에서 ID가 일치하는 데이터를 찾습니다.
      const foundData = targetList.find((item) => item.id === idToFind);

      setSelectedTestData(foundData || null);
      setIsLoading(false);
    }
  }, [params, isHorrorMode]);

  if (isLoading) return <div className={styles.container}>로딩 중...</div>;

  if (!selectedTestData) {
    return (
      <div className={`${styles.container} ${isHorrorMode ? styles.nightMode : ""}`}>
        <p>테스트 데이터를 찾을 수 없습니다. (ID: {params?.testId})</p>
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    );
  }

  const { path: mainImagePath, title: testTitle, id } = selectedTestData;

  return (
    /* 호러 모드일 경우 배경색 등을 제어하기 위해 클래스를 동적으로 부여합니다 */
    <div className={`${styles.container} ${isHorrorMode ? styles.nightMode : styles.dayMode}`}>
      <CoupangAd isNight={isHorrorMode} />
      <h1 className={styles.title}>{testTitle}</h1>
      <img
        className={styles.img_test_main}
        src={mainImagePath}
        alt="선택된 테스트 이미지"
      />
      
      {/* 다음 단계인 testStart로 갈 때도 mode 정보를 유지합니다 */}
      <Link href={`/testStart/${id}?mode=${mode}`}>
        <LargeButton />
      </Link>
    </div>
  );
}

export default TestReadyPage;