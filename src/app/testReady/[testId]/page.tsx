"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { testDataList } from "../../../TestData";
import LargeButton from "../../../components/Button/LargeButton";
import styles from "./page.module.css";

function TestReadyPage() {
  const params = useParams();
  
  // 수정 포인트 1: <any>를 추가하여 어떤 데이터든 들어올 수 있게 허용합니다.
  const [selectedTestData, setSelectedTestData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params && params.testId) {
      const idToFind = Number(params.testId);
      if (testDataList) {
        const foundData = testDataList.find((item) => item.id === idToFind);
        
        // 수정 포인트 2: foundData가 있을 때만 저장하거나, 강제로 타입을 맞춰줍니다.
        setSelectedTestData(foundData || null);
      }
      setIsLoading(false);
    }
  }, [params]);

  if (isLoading) return <div className={styles.container}>로딩 중...</div>;

  if (!selectedTestData) {
    return (
      <div className={styles.container}>
        <p>테스트 데이터를 찾을 수 없습니다. (ID: {params?.testId})</p>
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    );
  }

  const { path: mainImagePath, title: testTitle, id } = selectedTestData;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{testTitle}</h1>
      <img
        className={styles.img_test_main}
        src={mainImagePath}
        alt="선택된 테스트 이미지"
      />
      <Link href={`/testStart/${id}`}>
        <LargeButton />
      </Link>
    </div>
  );
}

export default TestReadyPage;