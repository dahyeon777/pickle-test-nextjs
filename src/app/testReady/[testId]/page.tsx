export const runtime = "edge";

import React from "react";
import Link from "next/link";
import { TotalDataStore } from "../../../allTestData"; 
import LargeButton from "../../../components/Button/LargeButton";
import styles from "./page.module.css";
import ClientLogic from "./ClientLogic";

/**
 * 테스트 준비 페이지 (Ready)
 */
// Next.js 최신 버전은 params를 Promise로 받아야 에러가 안 날 수 있습니다.
async function TestReadyPage(props: { 
  params: Promise<{ testId: string }>; 
  searchParams: Promise<{ mode?: string; type?: string }>;
}) {
  // 1. 에러 방지를 위해 params와 searchParams를 기다립니다(await).
  const params = await props.params;
  const searchParams = await props.searchParams;

  const themeParam = searchParams.mode as "day" | "night";
  const typeParam = searchParams.type as "test" | "taro";
  
  const theme = themeParam || "day";
  const contentType = typeParam || "test";
  const isNight = theme === "night";

  const idToFind = Number(params.testId);

  // 2. 데이터 호출부 (기존 로직 유지)
  const targetThemeData = TotalDataStore[theme];
  const targetList = targetThemeData ? targetThemeData[contentType] : [];
  const selectedTestData = targetList?.find((item: any) => item.id === idToFind);

  if (!selectedTestData) {
    return (
      <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
        <div className={styles.errorWrapper}>
          <p>존재하지 않는 콘텐츠입니다. (ID: {params?.testId})</p>
          <Link href="/" className={styles.homeLink}>홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const { title: testTitle, id } = selectedTestData;

  return (
    <div className={`${styles.container} ${isNight ? styles.nightMode : styles.dayMode}`}>
      <ClientLogic 
        themeParam={themeParam} 
        typeParam={typeParam} 
        theme={theme} 
        contentType={contentType} 
      />

      <div className={styles.titleWrapper}>
        <span className={styles.categoryBadge}>
          {contentType === "taro" ? "TAROT" : "TEST"}
        </span>
        <h1 className={styles.title}>{testTitle}</h1>
      </div>

      <div className={styles.buttonWrapper}>
        {isNight ? (
          <div className={styles.warningBox}>
            <p className={styles.warningText}>※ 본 콘텐츠는 공포 및 미스터리 요소를 포함하고 있습니다.</p>
            <p className={styles.warningText}>노약자, 임산부, 심약자는 이용에 주의해 주시기 바랍니다.</p>
          </div>
        ) : (
          <div className={styles.infoBox}>
            <p className={styles.infoText}>※ 본 콘텐츠는 과학적 근거가 아닌<br />재미를 목적으로 제공됩니다.</p>
            <p className={styles.infoText}>모든 결과는 참고용으로만 활용해 주시길 바랍니다.</p>
          </div>
        )}

        <Link href={`/testStart/${id}?mode=${theme}&type=${contentType}`} className={styles.startLink}>
          <LargeButton text="시작하기" />
        </Link>
      </div>
    </div>
  );
}

export default TestReadyPage;