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

// --- 결과 숨김을 위한 매핑 테이블 ---
const MASK_MAP: { [key: string]: string } = {
  ENFP: "p01", ENFJ: "p02", ENTP: "p03", ENTJ: "p04",
  ESFP: "p05", ESFJ: "p06", ESTP: "p07", ESTJ: "p08",
  INFP: "p09", INFJ: "p10", INTP: "p11", INTJ: "p12",
  ISFP: "p13", ISFJ: "p14", ISTP: "p15", ISTJ: "p16",
  TYPE_R: "h01", TYPE_B: "h02", TYPE_J: "h03", TYPE_O: "h04", TYPE_C: "h05",
};

// --- 역매핑 ---
const REVERSE_MASK_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(MASK_MAP).map(([k, v]) => [v, k])
);

// --- 이모티콘 제거 함수 ---
const removeEmojis = (str: string) => {
  if (!str) return "";
  return str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    )
    .trim();
};

function TestResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, contentType, setMode } = useThemeStore();
  const resultRef = useRef<HTMLDivElement>(null);

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
              window.history.replaceState(null, "", maskedPath);
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
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert(isNight ? "실험 기록 링크가 복사되었습니다." : "결과 링크가 복사되었습니다!");
    });
  };

  // --- 이미지 저장 로직 (Confirm 추가) ---
  const handleSaveImage = async () => {
    if (resultRef.current === null) return;

    const confirmMessage = isNight 
      ? "실험 기록 이미지를 다운로드 하시겠습니까?" 
      : "결과 이미지를 다운로드 하시겠습니까?";

    if (window.confirm(confirmMessage)) {
      try {
        setIsCapturing(true); 

        // 렌더링 동기화를 위한 짧은 지연
        await new Promise((resolve) => setTimeout(resolve, 100));

        const { toPng } = await import("html-to-image");
        const dataUrl = await toPng(resultRef.current, {
          cacheBust: true,
          backgroundColor: isNight ? "#bbbbbb" : "#cde3c6a9",
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = `${removeEmojis(testTitle)}_결과.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("이미지 저장 실패:", err);
        alert("이미지 저장에 실패했습니다.");
      } finally {
        setIsCapturing(false); 
      }
    }
  };

  const handleRetry = () => {
    const message = isNight ? "기록을 파기하고 다시 실험하시겠습니까?" : "다시 테스트하시겠습니까?";
    if (window.confirm(message)) {
      router.push(`/testReady/${params.testId}?mode=${currentMode}&type=${contentType}`);
    }
  };

  if (isLoading) {
    return (
      <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
        <div className={styles.content_wrapper}>데이터 분석 중...</div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
        <div className={styles.content_wrapper}>
          <p>기록을 찾을 수 없습니다.</p>
          <Link href="/">
            <button className={styles.home_btn} style={{ marginTop: "20px" }}>홈으로 돌아가기</button>
          </Link>
        </div>
      </div>
    );
  }

  const renderResultSection = () => {
    const displayTitle = isCapturing ? removeEmojis(resultData.title) : resultData.title;
    const displayDesc = isCapturing ? removeEmojis(resultData.description) : resultData.description;

    if (isNight) {
      return (
        <div className={styles.horror_report}>
          <h2 className={styles.horror_type_title}>{displayTitle}</h2>
          {resultData.result && (
            <img src={resultData.result} alt="실험결과" className={styles.result_image} />
          )}
          <p className={styles.horror_description}>{displayDesc?.trim()}</p>
        </div>
      );
    } else {
      return (
        <div className={styles.result_title_section}>
          <h2 className={styles.result_title}>{`"${displayTitle}"`}</h2>
          {resultData.result && (
            <img src={resultData.result} alt="결과" className={styles.result_image} />
          )}
          <p className={styles.description}>{displayDesc?.trim()}</p>
        </div>
      );
    }
  };

  return (
    <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
      <div className={styles.content_wrapper}>
        <div ref={resultRef} style={{ width: "100%", paddingBottom: "10px" }}>
          <h1 className={styles.main_title}>
            {isNight ? (
              <>
                {isCapturing ? removeEmojis("실험 기록") : "실험 기록"}
                <br /> {isCapturing ? removeEmojis(testTitle) : testTitle}
              </>
            ) : (
              `${isCapturing ? removeEmojis(testTitle) : testTitle} 결과`
            )}
          </h1>
          {renderResultSection()}
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
            <button onClick={handleSaveImage} className={styles.save_btn} title="이미지 저장" style={{ flex: 1.5 }}>
              💾
            </button>
          </div>

          <div className={styles.sub_button_row}>
            <button onClick={handleCopyLink} className={isNight ? styles.horror_share_btn : styles.share_btn}>
              🔗 링크 복사
            </button>
            <button onClick={handleRetry} className={isNight ? styles.horror_home_btn : styles.home_btn}>
              ↩ 다시하기
            </button>
          </div>
        </div>
      </div>
      <DynamicCoupangAds />
    </div>
  );
}

export default TestResultPage;