export const runtime = "edge";

import React from "react";
import { TotalDataStore } from "../../../../allTestData";
import Link from "next/link";
import styles from "./page.module.css";
import ClientLogic from "./ClientLogic";
import TestResultClientContainer from "./TestResultClientContainer";

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

async function TestResultPage(props: { 
  params: Promise<{ testId: string; resultCode: string }>; 
  searchParams: Promise<{ mode?: string; type?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const currentMode = (searchParams.mode as "day" | "night") || "day";
  const currentType = (searchParams.type as "test" | "taro") || "test";
  const isNight = currentMode === "night";

  const tId = Number(params.testId);
  const rCode = String(params.resultCode);
  const lookupKey = REVERSE_MASK_MAP[rCode] || rCode.toUpperCase();

  const categoryData = (TotalDataStore as any)[currentMode]?.[currentType];
  const selectedTest = categoryData?.find((test: any) => Number(test.id) === tId);
  const resultData = selectedTest?.results?.[lookupKey];

  if (!resultData) {
    return (
      <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
        <div className={styles.content_wrapper}>
          <p>기록을 찾을 수 없습니다.</p>
          <Link href="/"><button className={styles.home_btn} style={{ marginTop: "20px" }}>홈으로 돌아가기</button></Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <ClientLogic themeParam={currentMode} typeParam={currentType} theme={currentMode} contentType={currentType} />
      <TestResultClientContainer 
        initialResultData={resultData}
        initialTestTitle={selectedTest.title}
        theme={currentMode}
        contentType={currentType}
        testId={tId}
        resultCode={rCode}
        shareUrl="" // 클라이언트에서 window.location.origin 결합해 사용하도록 컨테이너 내부 처리 가능
      />
    </>
  );
}

export default TestResultPage;