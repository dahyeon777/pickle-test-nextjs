"use client";

export const runtime = "edge";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { TotalDataStore } from "../../../../allTestData";
import Link from "next/link";
import styles from "./page.module.css";
import { useThemeStore } from "@/src/store/useThemeStore";
import KakaoShareButton from "@/src/components/KakaoShareButton";
import DynamicCoupangAds from "../../../../components/DynamicCoupangAds";
import NoEmojiText from "../../../../components/NoEmojiText";

// --- 결과 숨김을 위한 매핑 테이블 ---
const MASK_MAP: { [key: string]: string } = {
  ENFP: "p01", ENFJ: "p02", ENTP: "p03", ENTJ: "p04",
  ESFP: "p05", ESFJ: "p06", ESTP: "p07", ESTJ: "p08",
  INFP: "p09", INFJ: "p10", INTP: "p11", INTJ: "p12",
  ISFP: "p13", ISFJ: "p14", ISTP: "p15", ISTJ: "p16",
  TYPE_R: "h01", TYPE_B: "h02", TYPE_J: "h03", TYPE_O: "h04", TYPE_C: "h05",
};

const REVERSE_MASK_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(MASK_MAP).map(([k, v]) => [v, k])
);

function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, contentType, setMode } = useThemeStore();
  
  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null); // 💡 캡처 전용 숨겨진 노드

  const [resultData, setResultData] = useState<any>(null);
  const [testTitle, setTestTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);

  const currentMode = (searchParams.get("mode") as "day" | "night") || theme;
  const currentType = (searchParams.get("type") as "test" | "taro") || contentType;
  const isNight = currentMode === "night";

  useEffect(() => {
    if (searchParams.get("mode") && searchParams.get("type")) {
      setMode(currentMode, currentType);
    }

    const loadAndMaskResult = () => {
      const tId = params?.testId ? Number(params.testId) : null;
      const rCode = params?.resultCode ? String(params.resultCode) : null;

      if (tId && rCode) {
        const lookupKey = REVERSE_MASK_MAP[rCode] || rCode.toUpperCase();
        const categoryData = (TotalDataStore as any)[currentMode]?.[currentType];

        if (categoryData) {
          const selectedTest = categoryData.find((test: any) => Number(test.id) === tId);
          if (selectedTest) {
            setTestTitle(selectedTest.title);
            const finalResult = selectedTest.results?.[lookupKey];

            if (finalResult) {
              setResultData(finalResult);
              const maskCode = MASK_MAP[lookupKey] || rCode;
              const maskedPath = `/testResult/${tId}/${maskCode}?mode=${currentMode}&type=${currentType}`;
              const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${maskedPath}` : "";
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
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert(isNight ? "실험 기록 링크가 복사되었습니다." : "결과 링크가 복사되었습니다!");
      });
    }
  };

  const handleSaveImage = async () => {
    if (captureRef.current === null) return;

    if (window.confirm(isNight ? "실험 기록 이미지를 다운로드 하시겠습니까?" : "결과 이미지를 다운로드 하시겠습니까?")) {
      try {
        setIsCapturing(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const { toJpeg } = await import("html-to-image");
        const node = captureRef.current;

        // 💡 뷰포트에 짤리지 않게 숨겨진 고정 영역(500px)을 촬영
        const dataUrl = await toJpeg(node, {
          cacheBust: true,
          backgroundColor: isNight ? "#bbbbbb" : "#cde3c6a9",
          pixelRatio: 2,
          style: {
            opacity: "1",
            visibility: "visible",
          }
        });

        const link = document.createElement("a");
        link.download = `Result_${params.testId}_${params.resultCode}.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Save Error:", err);
        alert("이미지 저장에 실패했습니다.");
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const handleRetry = () => {
    if (window.confirm(isNight ? "기록을 파기하고 다시 실험하시겠습니까?" : "다시 테스트하시겠습니까?")) {
      router.push(`/testReady/${params.testId}?mode=${currentMode}&type=${contentType}`);
    }
  };

  if (isLoading) return <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}><div className={styles.content_wrapper}>데이터 분석 중...</div></div>;
  if (!resultData) return <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}><div className={styles.content_wrapper}><p>기록을 찾을 수 없습니다.</p><Link href="/"><button className={styles.home_btn} style={{ marginTop: "20px" }}>홈으로 돌아가기</button></Link></div></div>;

  return (
    <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
      <div className={styles.content_wrapper}>
        
        {/* 1. 실제 사용자 화면 */}
        <div ref={resultRef} style={{ width: "100%", paddingBottom: "10px" }}>
          <h1 className={styles.main_title}>
            {isNight ? (
              <><NoEmojiText text="실험 기록" isCapturing={isCapturing} /><br /><NoEmojiText text={testTitle} isCapturing={isCapturing} /></>
            ) : (
              <><NoEmojiText text={testTitle} isCapturing={isCapturing} /> 결과</>
            )}
          </h1>
          <div className={isNight ? styles.horror_report : styles.result_title_section}>
            <h2 className={isNight ? styles.horror_type_title : styles.result_title}>
              {!isNight && '"'}<NoEmojiText text={resultData.title} isCapturing={isCapturing} />{!isNight && '"'}
            </h2>
            {resultData.result && <img src={resultData.result} alt="결과" className={styles.result_image} />}
            <p className={isNight ? styles.horror_description : styles.description}>
              <NoEmojiText text={resultData.description?.trim()} isCapturing={isCapturing} />
            </p>
          </div>
        </div>

        {/* 2. 💡 캡처 전용 숨겨진 노드 (iOS 짤림 방지용 고정 너비 박스) */}
        <div className={styles.capture_hidden_area}>
          <div ref={captureRef} style={{ width: "500px", padding: "40px 20px", boxSizing: "border-box", backgroundColor: isNight ? "#bbbbbb" : "#cde3c6a9" }}>
            <h1 className={styles.main_title} style={{ color: isNight ? '#d93838' : '#354a33' }}>
              {isNight ? `실험 기록\n${testTitle}` : `${testTitle} 결과`}
            </h1>
            <div className={isNight ? styles.horror_report : styles.result_title_section}>
              <h2 className={isNight ? styles.horror_type_title : styles.result_title}>
                {resultData.title}
              </h2>
              {resultData.result && <img src={resultData.result} alt="결과" className={styles.result_image} />}
              <p className={isNight ? styles.horror_description : styles.description}>
                {resultData.description?.trim()}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.button_group}>
          <div className={styles.share_row}>
            <div style={{ flex: 8.5 }}>
              <KakaoShareButton
                url={shareUrl}
                title={isNight ? `[실험기록] ${resultData.title}` : `[테스트결과] ${resultData.title}`}
                description={resultData.description?.slice(0, 45) + "..."}
                imageUrl={resultData.result}
                buttonText="💬 카카오톡 결과 공유"
              />
            </div>
            <button onClick={handleSaveImage} className={styles.save_btn} style={{ flex: 1.5 }}>💾</button>
          </div>
          <div className={styles.sub_button_row}>
            <button onClick={handleCopyLink} className={isNight ? styles.horror_share_btn : styles.share_btn}>🔗 링크 복사</button>
            <button onClick={handleRetry} className={isNight ? styles.horror_home_btn : styles.home_btn}>↩ 다시하기</button>
          </div>
        </div>
      </div>
      <DynamicCoupangAds />
    </div>
  );
}

export default TestResultPage;