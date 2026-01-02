"use client";

import { testDataList } from "../../TestData";
import { horrorTestDataList } from "../../HorrorTestData";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

interface FirstPageProps {
  isNight: boolean;
  toggleMode: () => void;
}

function FirstPage({ isNight, toggleMode }: FirstPageProps) {
  const currentDataList = isNight ? horrorTestDataList : testDataList;
  const [timeText, setTimeText] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 상태

  useEffect(() => {
    if (isNight) {
      setTimeText("22:04");
      return;
    }

    const updateTime = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
      );
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setTimeText(`${hh}:${mm}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, [isNight]);

  // 시계 클릭 핸들러
  const handleClockClick = () => {
    if (!isNight) {
      setShowModal(true); // 낮에서 밤으로 갈 때만 경고창
    } else {
      toggleMode(); // 밤에서 낮으로 올 때는 바로 실행
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    toggleMode();
  };

  const titleList = currentDataList.map(({ title, id }, index) => (
    <div className={styles.gridItem} key={index}>
      <Link href={`/testReady/${id}?mode=${isNight ? "horror" : "normal"}`}>
        <div className={styles.textWrapper}>
          <span className={styles.testTitle}>{title}</span>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className={`${styles.pageWrapper} ${isNight ? styles.nightMode : styles.dayMode}`}>
      {/* 메인 이미지 */}
      <div className={styles.container}>
        <img
          src={isNight ? "/img/hero_text_img_horror.png" : "/img/hero_text_img.png"}
          alt="히어로 이미지"
          className={styles.imageCenter}
        />

        {/* 필름 카메라 시계 */}
        <span className={styles.filmClock} onClick={handleClockClick}>
          {timeText}
        </span>
      </div>

      <main className={styles.mainArea}>
        <div className={styles.gridContainer}>{titleList}</div>
      </main>

      {/* 커스텀 경고 모달 */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p className={styles.modalWarning}>WARNING</p>
            <p className={styles.modalText}>
              영업 종료 시간(22:00) 이후에 <br />
              입장하시겠습니까?.
            </p>
            <p className={styles.modalSubText}>
              * 노약자 및 임산부, 심약자는 주의하십시오. <br />
              진입하시겠습니까?
            </p>
            <div className={styles.modalButtons}>
              <button onClick={handleConfirm} className={styles.confirmBtn}>진입</button>
              <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>취소</button>
            </div>
          </div>
        </div>
      )}

      <section style={{ height: "40px" }} />
    </div>
  );
}

export default FirstPage;