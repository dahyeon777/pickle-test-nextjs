"use client";

import React, { useEffect, useState } from "react"; // 추가
import { useParams } from "next/navigation";
import Link from "next/link";
import { testDataList } from "../../../TestData";
import LargeButton from "../../../components/Button/LargeButton";
import styles from "./page.module.css";

function TestReadyPage() {
  const params = useParams();
  const [selectedTestData, setSelectedTestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params && params.testId) {
      const idToFind = Number(params.testId);
      // 데이터 리스트가 존재하는지 확인 후 찾기
      if (testDataList) {
        const foundData = testDataList.find((item) => item.id === idToFind);
        setSelectedTestData(foundData);
      }
      setIsLoading(false);
    }
  }, [params]);

  // 로딩 중일 때
  if (isLoading) return <div className={styles.container}>로딩 중...</div>;

  // 데이터를 못 찾았을 때
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
