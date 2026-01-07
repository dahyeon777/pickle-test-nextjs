"use client";

export const runtime = "edge";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { TotalDataStore } from "../../../../allTestData";
import Link from "next/link";
import styles from "./page.module.css";
import { useThemeStore } from "@/src/store/useThemeStore";
import KakaoShareButton from "@/src/components/KakaoShareButton";
import DynamicCoupangAds from "../../../../components/DynamicCoupangAds";

// --- 결과 숨김을 위한 매핑 테이블 ---
const MASK_MAP: { [key: string]: string } = {
  ENFP: "p01",
  ENFJ: "p02",
  ENTP: "p03",
  ENTJ: "p04",
  ESFP: "p05",
  ESFJ: "p06",
  ESTP: "p07",
  ESTJ: "p08",
  INFP: "p09",
  INFJ: "p10",
  INTP: "p11",
  INTJ: "p12",
  ISFP: "p13",
  ISFJ: "p14",
  ISTP: "p15",
  ISTJ: "p16",
  TYPE_R: "h01",
  TYPE_B: "h02",
  TYPE_J: "h03",
  TYPE_O: "h04",
  TYPE_C: "h05",
};

// --- 역매핑 (암호 p01 -> 원본 ENFP) ---
const REVERSE_MASK_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(MASK_MAP).map(([k, v]) => [v, k])
);

function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { theme, contentType, setMode } = useThemeStore();

  const [resultData, setResultData] = useState<any>(null);
  const [testTitle, setTestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState(""); // 공유용 최종 URL 상태

  const currentMode = (searchParams.get("mode") as "day" | "night") || theme;
  const currentType =
    (searchParams.get("type") as "test" | "taro") || contentType;
  const isNight = currentMode === "night";

  useEffect(() => {
    // 1. 스토어 테마 동기화
    if (searchParams.get("mode") && searchParams.get("type")) {
      setMode(currentMode, currentType);
    }

    const loadAndMaskResult = () => {
      const tId = params?.testId ? Number(params.testId) : null;
      const rCode = params?.resultCode ? String(params.resultCode) : null;

      if (tId && rCode) {
        // 2. 입력값이 암호인지 확인하여 원본 키값 도출 (p01 -> ENFP)
        const lookupKey = REVERSE_MASK_MAP[rCode] || rCode.toUpperCase();

        const categoryData = (TotalDataStore as any)[currentMode]?.[
          currentType
        ];
        if (categoryData) {
          const selectedTest = categoryData.find(
            (test: any) => Number(test.id) === tId
          );
          if (selectedTest) {
            setTestTitle(selectedTest.title);
            const finalResult = selectedTest.results?.[lookupKey];

            if (finalResult) {
              setResultData(finalResult);

              // 3. 주소창 마스킹 처리 (ENFP -> p01)
              const maskCode = MASK_MAP[lookupKey] || rCode;
              const maskedPath = `/testResult/${tId}/${maskCode}?mode=${currentMode}&type=${currentType}`;

              // 브라우저 주소창만 변경
              window.history.replaceState(null, "", maskedPath);

              // 4. 공유용 URL 업데이트 (도메인 포함)
              const fullUrl = `${window.location.origin}${maskedPath}`;
              setShareUrl(fullUrl);
            }
          }
        }
      }
      setIsLoading(false);
    };

    loadAndMaskResult();
  }, [params, searchParams, currentMode, currentType, setMode]);

  const handleCopyLink = () => {
    // 이미 암호화된 현재 주소를 복사
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert(
        isNight
          ? "실험 기록 링크가 복사되었습니다."
          : "결과 링크가 복사되었습니다!"
      );
    });
  };

  if (isLoading) {
    return (
      <div
        className={`${styles.container} ${
          isNight ? styles.nightMode : styles.dayMode
        }`}
      >
        <div className={styles.content_wrapper}>데이터 분석 중...</div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div
        className={`${styles.container} ${
          isNight ? styles.nightMode : styles.dayMode
        }`}
      >
        <div className={styles.content_wrapper}>
          <p>기록을 찾을 수 없습니다.</p>
          <Link href="/">
            <button className={styles.home_btn} style={{ marginTop: "20px" }}>
              홈으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const renderResultSection = () => {
    if (isNight) {
      return (
        <div className={styles.horror_report}>
          <h2 className={styles.horror_type_title}>{resultData.title}</h2>
          {resultData.result && (
            <img
              src={resultData.result}
              alt="실험결과"
              className={styles.result_image}
            />
          )}
          <p className={styles.horror_description}>
            {resultData.description?.trim()}
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles.result_title_section}>
          <h2 className={styles.result_title}>
            {currentType === "taro"
              ? `당신의 운명은 "${resultData.title}"`
              : `당신은 "${resultData.title}" 입니다!`}
          </h2>
          {resultData.result && (
            <img
              src={resultData.result}
              alt="결과"
              className={styles.result_image}
            />
          )}
          <p className={styles.description}>{resultData.description?.trim()}</p>
        </div>
      );
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isNight ? styles.nightMode : styles.dayMode
      }`}
    >
      <div className={styles.content_wrapper}>
        <h1 className={styles.main_title}>
          {isNight ? (
            <>
              실험 기록
              <br /> {testTitle}
            </>
          ) : (
            `${testTitle} 결과`
          )}
        </h1>

        {renderResultSection()}

        <div className={styles.button_group}>
          {/* 암호화된 shareUrl이 생성된 후 버튼에 전달 */}
          <KakaoShareButton
            url={shareUrl}
            title={
              isNight
                ? `[실험기록] ${resultData.title}`
                : `[테스트결과] ${resultData.title}`
            }
            description={resultData.description?.slice(0, 45) + "..."}
            imageUrl={resultData.result}
            buttonText="💬 카카오톡 결과 공유"
          />

          <div
            className={styles.sub_button_row}
            style={{ display: "flex", gap: "10px", width: "100%" }}
          >
            <button
              onClick={handleCopyLink}
              className={isNight ? styles.horror_share_btn : styles.share_btn}
              style={{ flex: 1 }}
            >
              🔗 링크 복사
            </button>

            <Link
              href={`/testReady/${params.testId}?mode=${currentMode}&type=${currentType}`}
              style={{ flex: 1 }}
            >
              <button
                className={isNight ? styles.horror_home_btn : styles.home_btn}
                style={{ width: "100%" }}
              >
                ↩ 다시하기
              </button>
            </Link>
          </div>
        </div>
      </div>
      <DynamicCoupangAds />
    </div>
  );
}

export default TestResultPage;
