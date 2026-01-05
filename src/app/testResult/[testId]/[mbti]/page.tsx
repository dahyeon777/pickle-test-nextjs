"use client";
export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { AllTestQuestionsData } from "../../../../TestData";
import { AllHorrorQuestionsData } from "../../../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import { useThemeStore } from "@/src/store/useThemeStore";
import KakaoShareButton from "@/src/components/KakaoShareButton";

function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { isHorror, setTheme } = useThemeStore();

  const [resultData, setResultData] = useState<any>(null);
  const [testTitle, setTestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 현재 모드 확인 (다시하기 링크에 사용)
  const currentMode =
    searchParams.get("mode") || (isHorror ? "horror" : "normal");

  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "horror" && !isHorror) setTheme("horror");
    if (modeParam === "normal" && isHorror) setTheme("normal");

    if (params?.testId && params?.mbti) {
      const tId = Number(params.testId);
      const resultKey = String(params.mbti).toUpperCase();
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
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert(
        isHorror
          ? "실험 기록 링크가 복사되었습니다."
          : "결과 링크가 복사되었습니다!"
      );
    });
  };

  if (isLoading)
    return (
      <div
        className={`${styles.container} ${
          isHorror ? styles.horror_theme : styles.dayMode
        }`}
      >
        데이터 분석 중...
      </div>
    );
  if (!resultData)
    return (
      <div
        className={`${styles.container} ${
          isHorror ? styles.horror_theme : styles.dayMode
        }`}
      >
        기록을 찾을 수 없습니다.
      </div>
    );

  return (
    <div
      className={`${styles.container} ${
        isHorror ? styles.horror_theme : styles.dayMode
      }`}
    >
      <div className={styles.content_wrapper}>
        <h1 className={styles.main_title}>
          {isHorror ? (
            <>
              실험 기록
              <br /> {testTitle}
            </>
          ) : (
            `${testTitle} 결과`
          )}
        </h1>

        <div
          className={
            isHorror ? styles.horror_report : styles.result_title_section
          }
        >
          <h2
            className={
              isHorror ? styles.horror_type_title : styles.result_title
            }
          >
            {isHorror
              ? resultData.title
              : `당신은 "${resultData.title}" 입니다!`}
          </h2>

          {resultData.result && (
            <img
              src={resultData.result}
              alt="결과"
              className={styles.result_image}
            />
          )}

          <p
            className={
              isHorror ? styles.horror_description : styles.description
            }
          >
            {resultData.description?.trim()}
          </p>
        </div>

        <div
          className={styles.button_group}
          style={{ flexDirection: "column", gap: "10px" }}
        >
          <KakaoShareButton
            title={
              isHorror
                ? `[실험기록] ${resultData.title}`
                : `[테스트결과] ${resultData.title}`
            }
            description={resultData.description?.slice(0, 45) + "..."}
            imageUrl={resultData.result}
            buttonText={
              isHorror ? "💬 실험 기록 전송" : "💬 카카오톡 결과 공유"
            }
          />

          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <button
              onClick={handleCopyLink}
              className={isHorror ? styles.horror_share_btn : styles.share_btn}
              style={{ flex: 1 }}
            >
              🔗 링크 복사
            </button>

            {/* 💡 수정된 부분: 처음으로 -> 다시하기 / 경로를 testIntro로 변경 */}
            <Link
              href={`/testReady/${params.testId}?mode=${currentMode}`}
              style={{ flex: 1, display: "flex" }}
            >
              <button
                className={isHorror ? styles.horror_home_btn : styles.home_btn}
                style={{ width: "100%" }}
              >
                ↩ 다시하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestResultPage;
