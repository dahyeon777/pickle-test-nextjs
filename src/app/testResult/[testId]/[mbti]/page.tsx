"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { testDataList } from "../../../../TestData";
import Link from "next/link";
import styles from "./page.module.css";

function TestResultPage() {
  const params = useParams();
  const [resultData, setResultData] = useState<any>(null);
  const [testTitle, setTestTitle] = useState(""); // 테스트 제목을 위한 별도 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.testId && params?.mbti) {
      const tId = Number(params.testId);
      const mbtiKey = String(params.mbti).toUpperCase();

      const selectedTest = testDataList?.find((test) => Number(test.id) === tId);

      if (selectedTest) {
        setTestTitle(selectedTest.title); // 테스트 제목 저장 (예: 달콤한 디저트 테스트)
        
        if (selectedTest.results && selectedTest.results[mbtiKey]) {
          setResultData(selectedTest.results[mbtiKey]);
        }
      }
      setIsLoading(false);
    }
  }, [params]);

  if (isLoading) return <div className={styles.container}>로딩 중...</div>;

  if (!resultData) {
    return <div className={styles.container}>결과를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {/* 1. 상단 타이틀: testTitle 상태를 직접 사용하여 안정적으로 노출 */}
      <h1 className={styles.main_title}>✨ {testTitle} 결과 ✨</h1>

      <div className={styles.result_title_section}>
        <h3 className={styles.result_title}>
          당신은 <strong>"{resultData.title}"</strong> 입니다!
        </h3>

        <div className={styles.image_wrapper}>
          <img
            src={resultData.result}
            alt={resultData.title}
            className={styles.result_image}
          />
        </div>

        <p className={styles.description}>{resultData.description}</p>
      </div>

      <div className={styles.button_group}>
        <button 
          className={styles.share_btn} 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('결과 링크가 복사되었습니다!');
          }}
        >
          🔗 결과 공유하기 (링크 복사)
        </button>
        <Link href="/">
          <button className={styles.home_btn}>🏠 다시 테스트하기</button>
        </Link>
      </div>
    </div>
  );
}

export default TestResultPage;