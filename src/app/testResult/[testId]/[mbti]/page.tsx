"use client";
export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AllTestQuestionsData } from "../../../../TestData";
import { AllHorrorQuestionsData } from "../../../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import CoupangAd from "@/src/components/CoupangAd";

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

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert(
          isHorrorMode
            ? "실험 기록 링크가 복사되었습니다."
            : "결과 링크가 복사되었습니다!"
        );
      })
      .catch((err) => {
        console.error("복사 실패:", err);
      });
  };

  if (isLoading)
    return <div className={styles.container}>데이터 분석 중...</div>;
  if (!resultData)
    return <div className={styles.container}>기록을 찾을 수 없습니다.</div>;

  return (
    <div className={`${styles.container} ${isHorrorMode ? styles.horror_theme : ""}`}>
      {/* 1. 상단 타이틀 섹션 */}
      <h1 className={styles.main_title}>
        {isHorrorMode ? (
          <>실험 기록<br /> {testTitle}</>
        ) : (
          `✨ ${testTitle} 결과 ✨`
        )}
      </h1>

      {/* 2. 결과 카드 섹션: 모드에 따라 styles.horror_report 또는 styles.result_title_section 적용 */}
      <div className={isHorrorMode ? styles.horror_report : styles.result_title_section}>
        {isHorrorMode ? (
          /* --- 호러 모드 전용 레이아웃 --- */
          <>
            <h2 className={styles.horror_type_title}>{resultData.title}</h2>
            
            {resultData.description.includes("상태:") && (
              <div className={styles.status_badge}>
                {resultData.description.split("\n")[0]}
              </div>
            )}

            {resultData.result && (
              <div className={styles.image_wrapper}>
                <img src={resultData.result} alt="기록물" className={styles.result_image} />
              </div>
            )}

            <div className={styles.case_record}>
              <p className={styles.horror_description} style={{ whiteSpace: "pre-wrap" }}>
                {/* 첫 줄(상태:)을 제외하고 출력하는 로직 */}
                {resultData.description.includes("\n")
                  ? resultData.description.split("\n").slice(1).join("\n").trim()
                  : resultData.description.startsWith("상태:") ? "" : resultData.description}
              </p>
            </div>
          </>
        ) : (
          /* --- 일반 모드 전용 레이아웃 --- */
          <>
            <h3 className={styles.result_title}>
              당신은 <strong>"{resultData.title}"</strong> 입니다!
            </h3>
            {resultData.result && (
              <div className={styles.image_wrapper}>
                <img src={resultData.result} alt={resultData.title} className={styles.result_image} />
              </div>
            )}
            <p className={styles.description}>{resultData.description}</p>
          </>
        )}
      </div>

      {/* 3. 하단 버튼 그룹 */}
      <div className={styles.button_group}>
        <button
          onClick={handleCopyLink}
          className={isHorrorMode ? styles.horror_share_btn : styles.share_btn}
        >
          {isHorrorMode ? "🔗 기록 공유" : "🔗 결과 공유하기"}
        </button>

        <Link href="/" style={{ flex: 1, display: 'flex' }}>
          <button
            className={isHorrorMode ? styles.horror_home_btn : styles.home_btn}
            style={{ width: '100%' }}
          >
            ↩ 처음으로
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TestResultPage;