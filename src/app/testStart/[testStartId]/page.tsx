export const runtime = "edge";

import React from "react";
import { TotalDataStore } from "../../../allTestData";
import styles from "./page.module.css";
import ClientLogic from "./ClientLogic";
import TestStartClientContainer from "./TestStartClientContainer"; // 아래에 클라이언트 컨테이너를 정의하거나 별도 파일로 관리

/**
 * 테스트 시작 페이지 (Start)
 */
async function TestStartPage(props: { 
  params: Promise<{ testStartId: string }>; 
  searchParams: Promise<{ mode?: string; type?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const themeParam = searchParams.mode as "day" | "night";
  const typeParam = searchParams.type as "test" | "taro" | "book";
  
  const theme = themeParam || "day";
  const contentType = typeParam || "test";
  const testStartId = Number(params.testStartId);

  const nowTest = (TotalDataStore as any)[theme][contentType]?.find(
    (test: any) => test.id === testStartId
  );

  // 구글 봇을 위한 예외 처리
  if (!nowTest) {
    return <div className={styles.container}>테스트를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {/* Zustand 테마 상태 동기화 */}
      <ClientLogic 
        themeParam={themeParam} 
        typeParam={typeParam} 
        theme={theme} 
        contentType={contentType} 
      />
      
      {/* 실제 테스트 로직이 담긴 클라이언트 컴포넌트 호출 */}
      {/* 기존 로직을 토씨 하나 안 틀리고 유지하기 위해 전체를 클라이언트 컴포넌트로 감쌉니다. */}
      <TestStartClientContainer 
        initialTestData={nowTest}
        theme={theme}
        contentType={contentType}
        testStartId={testStartId}
      />
    </>
  );
}

export default TestStartPage;