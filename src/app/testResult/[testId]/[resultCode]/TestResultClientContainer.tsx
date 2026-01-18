"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import KakaoShareButton from "@/src/components/KakaoShareButton";
// import DynamicCoupangAds from "../../../../components/DynamicCoupangAds";
import NoEmojiText from "../../../../components/NoEmojiText";

export default function TestResultClientContainer({
  initialResultData,
  initialTestTitle,
  theme,
  contentType,
  testId,
  resultCode,
  shareUrl: initialShareUrl,
}: any) {
  const router = useRouter();
  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const [isCapturing, setIsCapturing] = useState(false);
  const isNight = theme === "night";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert(
          isNight
            ? "실험 기록 링크가 복사되었습니다."
            : "결과 링크가 복사되었습니다!"
        );
      });
    }
  };

  const handleSaveImage = async () => {
    if (captureRef.current === null) return;
    if (
      window.confirm(
        isNight
          ? "실험 기록 이미지를 다운로드 하시겠습니까?"
          : "결과 이미지를 다운로드 하시겠습니까?"
      )
    ) {
      try {
        setIsCapturing(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const { toJpeg } = await import("html-to-image");
        const node = captureRef.current;
        const dataUrl = await toJpeg(node, {
          cacheBust: true,
          backgroundColor: isNight ? "#bbbbbb" : "#cde3c6a9",
          pixelRatio: 2,
          style: { opacity: "1", visibility: "visible" },
        });
        const link = document.createElement("a");
        link.download = `Result_${testId}_${resultCode}.jpg`;
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
    if (
      window.confirm(
        isNight
          ? "기록을 파기하고 다시 실험하시겠습니까?"
          : "다시 테스트하시겠습니까?"
      )
    ) {
      router.push(`/testReady/${testId}?mode=${theme}&type=${contentType}`);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isNight ? styles.nightMode : styles.dayMode
      }`}
    >
      <div className={styles.content_wrapper}>
        <div ref={resultRef} style={{ width: "100%", paddingBottom: "10px" }}>
          <h1 className={styles.main_title}>
            {isNight ? (
              <>
                <NoEmojiText text="실험 기록" isCapturing={isCapturing} />
                <br />
                <NoEmojiText
                  text={initialTestTitle}
                  isCapturing={isCapturing}
                />
              </>
            ) : (
              <>
                <NoEmojiText
                  text={initialTestTitle}
                  isCapturing={isCapturing}
                />{" "}
                결과
              </>
            )}
          </h1>
          <div
            className={
              isNight ? styles.horror_report : styles.result_title_section
            }
          >
            <h2
              className={
                isNight ? styles.horror_type_title : styles.result_title
              }
            >
              {!isNight && '"'}
              <NoEmojiText
                text={initialResultData.title}
                isCapturing={isCapturing}
              />
              {!isNight && '"'}
            </h2>
            {initialResultData.result && (
              <img
                src={initialResultData.result}
                alt="결과"
                className={styles.result_image}
              />
            )}
            <p
              className={
                isNight ? styles.horror_description : styles.description
              }
            >
              <NoEmojiText
                text={initialResultData.description?.trim()}
                isCapturing={isCapturing}
              />
            </p>
          </div>
        </div>

        <div className={styles.capture_hidden_area}>
          <div
            ref={captureRef}
            style={{
              width: "500px",
              padding: "40px 20px",
              boxSizing: "border-box",
              backgroundColor: isNight ? "#bbbbbb" : "#cde3c6a9",
            }}
          >
            <h1
              className={styles.main_title}
              style={{ color: isNight ? "#d93838" : "#354a33" }}
            >
              {isNight
                ? `실험 기록\n${initialTestTitle}`
                : `${initialTestTitle} 결과`}
            </h1>
            <div
              className={
                isNight ? styles.horror_report : styles.result_title_section
              }
            >
              <h2
                className={
                  isNight ? styles.horror_type_title : styles.result_title
                }
              >
                {initialResultData.title}
              </h2>
              {initialResultData.result && (
                <img
                  src={initialResultData.result}
                  alt="결과"
                  className={styles.result_image}
                />
              )}
              <p
                className={
                  isNight ? styles.horror_description : styles.description
                }
              >
                {initialResultData.description?.trim()}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.button_group}>
          <div className={styles.share_row}>
            <div style={{ flex: 8.5 }}>
              <KakaoShareButton
                url={initialShareUrl}
                title={
                  isNight
                    ? `[실험기록] ${initialResultData.title}`
                    : `[테스트결과] ${initialResultData.title}`
                }
                description={
                  initialResultData.description?.slice(0, 45) + "..."
                }
                imageUrl={initialResultData.result}
                buttonText="💬 카카오톡 결과 공유"
              />
            </div>
            <button
              onClick={handleSaveImage}
              className={styles.save_btn}
              style={{ flex: 1.5 }}
            >
              💾
            </button>
          </div>
          <div className={styles.sub_button_row}>
            <button
              onClick={handleCopyLink}
              className={isNight ? styles.horror_share_btn : styles.share_btn}
            >
              🔗 링크 복사
            </button>
            <button
              onClick={handleRetry}
              className={isNight ? styles.horror_home_btn : styles.home_btn}
            >
              ↩ 다시하기
            </button>
          </div>
        </div>
      </div>
      {/* <DynamicCoupangAds /> */}
    </div>
  );
}
