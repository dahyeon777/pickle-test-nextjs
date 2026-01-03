"use client";
export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AllTestQuestionsData } from "../../../../TestData";
import { AllHorrorQuestionsData } from "../../../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import { useThemeStore } from "@/src/store/useThemeStore"; // 1. 스토어 임포트

function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // 2. Zustand 스토어 상태 및 함수 가져오기
  const { isHorror, setTheme } = useThemeStore();

  const [resultData, setResultData] = useState<any>(null);
  const [testTitle, setTestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3. URL의 mode 파라미터와 스토어 상태 동기화
    // 결과 페이지는 공유가 많이 일어나므로 이 로직이 필수입니다.
    const modeParam = searchParams.get("mode");
    if (modeParam === "horror" && !isHorror) setTheme("horror");
    if (modeParam === "normal" && isHorror) setTheme("normal");

    if (params?.testId && params?.mbti) {
      const tId = Number(params.testId);
      const resultKey = String(params.mbti).toUpperCase();

      // 4. 스토어의 isHorror 값에 따라 데이터 리스트 선택
      const dataList = isHorror ? AllHorrorQuestionsData : AllTestQuestionsData;
      const selectedTest = dataList?.find((test) => Number(test.id) === tId);

      if (selectedTest) {
        setTestTitle(selectedTest.title);
        if (selectedTest.results && selectedTest.results[resultKey]) {
          setResultData(selectedTest.results[resultKey]);
        }
      }
      setIsLoading(false);
    }
  }, [params, isHorror, searchParams, setTheme]);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert(
          isHorror
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
    <div
      className={`${styles.container} ${isHorror ? styles.horror_theme : ""}`}
    >
      {/* 1. 상단 타이틀 섹션 */}
      <h1 className={styles.main_title}>
        {isHorror ? (
          <>
            실험 기록
            <br /> {testTitle}
          </>
        ) : (
          `✨ ${testTitle} 결과 ✨`
        )}
      </h1>

      {/* 2. 결과 카드 섹션 */}
      <div
        className={
          isHorror ? styles.horror_report : styles.result_title_section
        }
      >
        {isHorror ? (
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
                <img
                  src={resultData.result}
                  alt="기록물"
                  className={styles.result_image}
                />
              </div>
            )}

            <div className={styles.case_record}>
              <p
                className={styles.horror_description}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {resultData.description.includes("\n")
                  ? resultData.description
                      .split("\n")
                      .slice(1)
                      .join("\n")
                      .trim()
                  : resultData.description.startsWith("상태:")
                  ? ""
                  : resultData.description}
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

      {/* 3. 하단 버튼 그룹 */}
      <div className={styles.button_group}>
        <button
          onClick={handleCopyLink}
          className={isHorror ? styles.horror_share_btn : styles.share_btn}
        >
          {isHorror ? "🔗 기록 공유" : "🔗 결과 공유하기"}
        </button>

        <Link href="/" style={{ flex: 1, display: "flex" }}>
          <button
            className={isHorror ? styles.horror_home_btn : styles.home_btn}
            style={{ width: "100%" }}
          >
            ↩ 처음으로
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TestResultPage;
