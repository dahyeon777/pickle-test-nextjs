"use client";
export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AllTestQuestionsData } from "../../../../TestData";
import { AllHorrorQuestionsData } from "../../../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";

function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const [resultData, setResultData] = useState<any>(null);
  const [testTitle, setTestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const mode = searchParams.get("mode") || "normal";
  const isHorrorMode = mode === "horror";

  useEffect(() => {
    if (params?.testId && params?.mbti) {
      const tId = Number(params.testId);
      const resultKey = String(params.mbti).toUpperCase();

      const dataList = isHorrorMode
        ? AllHorrorQuestionsData
        : AllTestQuestionsData;
      const selectedTest = dataList?.find((test) => Number(test.id) === tId);

      if (selectedTest) {
        setTestTitle(selectedTest.title);
        if (selectedTest.results && selectedTest.results[resultKey]) {
          setResultData(selectedTest.results[resultKey]);
        }
      }
      setIsLoading(false);
    }
  }, [params, isHorrorMode]);

  if (isLoading)
    return <div className={styles.container}>데이터 분석 중...</div>;
  if (!resultData)
    return <div className={styles.container}>기록을 찾을 수 없습니다.</div>;

  return (
    <div
      className={`${styles.container} ${
        isHorrorMode ? styles.horror_theme : ""
      }`}
    >
      <h1 className={styles.main_title}>
        {isHorrorMode
          ? `[ 실험 기록: ${testTitle} ]`
          : `✨ ${testTitle} 결과 ✨`}
      </h1>

      <div className={styles.result_title_section}>
        {isHorrorMode ? (
          /* --- 호러 모드 (상태/본문 중복 해결 버전) --- */
          <div className={styles.horror_report}>
            <h2 className={styles.horror_type_title}>{resultData.title}</h2>

            {/* 1. 상단 상태 배지 (첫 줄만 추출) */}
            {resultData.description.includes("상태:") && (
              <div className={styles.status_badge}>
                {resultData.description.split("\n")[0]}
              </div>
            )}

            {/* 2. 사진이 있을 때만 이미지 영역 렌더링 */}
            {resultData.result && (
              <div className={styles.image_wrapper}>
                <img
                  src={resultData.result}
                  alt="기록물"
                  className={styles.result_image}
                />
              </div>
            )}

            {/* 3. 본문 (상태 줄을 제외한 나머지 텍스트만 출력하여 중복 방지) */}
            <div className={styles.case_record}>
              <p className={styles.horror_description}>
                {
                  resultData.description.includes("\n")
                    ? resultData.description.split("\n").slice(1).join("\n") // 첫 줄(상태) 제외하고 나머지 다 합침
                    : resultData.description.startsWith("상태:")
                    ? ""
                    : resultData.description // 줄바꿈 없는데 상태로 시작하면 공백 처리
                }
              </p>
            </div>
          </div>
        ) : (
          /* --- 일반 모드 --- */
          <>
            <h3 className={styles.result_title}>
              당신은 <strong>"{resultData.title}"</strong> 입니다!
            </h3>
            {resultData.result && (
              <div className={styles.image_wrapper}>
                <img
                  src={resultData.result}
                  alt={resultData.title}
                  className={styles.result_image}
                />
              </div>
            )}
            <p className={styles.description}>{resultData.description}</p>
          </>
        )}
      </div>

      {/* 하단 버튼 그룹 생략 (기존과 동일) */}
      <div className={styles.button_group}>
        <Link href="/">
          <button
            className={isHorrorMode ? styles.horror_home_btn : styles.home_btn}
          >
            ↩ 다시 처음으로
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TestResultPage;
