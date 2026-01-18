"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RadioOption from "../../../components/RadioOption";
import ProgressBar from "../../../components/ProgressBar";
import styles from "./page.module.css";

// --- 기존 계산 로직 그대로 복사 (절대 수정 금지) ---
function calculateDayTestResult(scores: any) {
  const E_I = (scores.E_score || 0) >= (scores.I_score || 0) ? "E" : "I";
  const S_N = (scores.S_score || 0) >= (scores.N_score || 0) ? "S" : "N";
  const T_F = (scores.T_score || 0) >= (scores.F_score || 0) ? "T" : "F";
  const J_P = (scores.J_score || 0) >= (scores.P_score || 0) ? "J" : "P";
  return E_I + S_N + T_F + J_P;
}

function calculateDayTaroResult(nowQuestion: any, selectedOptionId: string) {
  const selected = nowQuestion.options.find(
    (opt: any) => opt.optionId === selectedOptionId
  );
  return selected?.resultKey || "TARO_RESULT_1";
}

function calculateNightHorrorResult(scores: any) {
  const topType = Object.keys(scores).reduce((a, b) =>
    (scores[a] || 0) > (scores[b] || 0) ? a : b
  );
  return `TYPE_${topType}`;
}

export default function TestStartClientContainer({
  initialTestData,
  theme,
  contentType,
  testStartId,
}: any) {
  const router = useRouter();
  const isNight = theme === "night";
  const isTaro = contentType === "taro";
  const isBookMode = contentType === "book";
  const nowTest = initialTestData;

  // --- 기존 상태(State) 그대로 유지 ---
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [storyPageIndex, setStoryPageIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(isBookMode);
  const [showBridge, setShowBridge] = useState(false);

  const [score, setScore] = useState<any>(() =>
    isNight
      ? { R: 0, B: 0, J: 0, O: 0, C: 0, A: 0, E: 0, D: 0 }
      : {
          E_score: 0,
          I_score: 0,
          S_score: 0,
          N_score: 0,
          T_score: 0,
          F_score: 0,
          J_score: 0,
          P_score: 0,
        }
  );

  const nowQuestion = nowTest.questions[questionIndex];

  // --- 기존 핸들러 함수들 그대로 유지 ---
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCardClick = (optionId: string) => {
    if (isTaro) setSelectedOption(optionId);
  };

  const getResultKey = (finalScore: any) => {
    if (isNight) return calculateNightHorrorResult(finalScore);
    return isTaro
      ? calculateDayTaroResult(nowQuestion, selectedOption!)
      : calculateDayTestResult(finalScore);
  };

  const handleNextStoryPage = () => {
    if (
      nowTest?.storyBook &&
      storyPageIndex < nowTest.storyBook.pages.length - 1
    ) {
      setStoryPageIndex(storyPageIndex + 1);
    } else {
      setShowIntro(false);
    }
  };

  function handleNextQuestion() {
    if (!selectedOption || !nowQuestion) return;
    const selected = nowQuestion.options.find(
      (opt: any) => opt.optionId === selectedOption
    );
    if (!selected) return;

    const updatedScore = { ...score };
    if (selected.score) {
      for (const key in selected.score) {
        updatedScore[key] = (updatedScore[key] || 0) + selected.score[key];
      }
    }
    setScore(updatedScore);

    const nextIndex = questionIndex + 1;
    if (nextIndex < nowTest.questions.length) {
      setQuestionIndex(nextIndex);
      setSelectedOption(null);
      if (isBookMode && nowTest.questions[nextIndex].bridgeStory) {
        setShowBridge(true);
      }
    } else {
      const resultKey = getResultKey(updatedScore);
      router.push(
        `/testResult/${testStartId}/${resultKey}?mode=${theme}&type=${contentType}`
      );
    }
  }

  // --- 기존 렌더링 UI 로직 그대로 유지 ---
  if (showIntro && nowTest.storyBook) {
    const currentPage = nowTest.storyBook.pages[storyPageIndex];
    return (
      <div
        className={`${styles.container} ${
          isNight ? styles.nightMode : styles.dayMode
        }`}
      >
        <div className={styles.story_frame}>
          <h2 className={styles.answer_title}>{nowTest.title}</h2>
          <div className={styles.story_content}>
            <p className={styles.story_text}>{currentPage.content}</p>
          </div>
          <button
            className={`${styles.button1} ${styles.horror_button}`}
            onClick={handleNextStoryPage}
          >
            {storyPageIndex === nowTest.storyBook.pages.length - 1
              ? "이야기 속으로"
              : "다음으로"}
          </button>
        </div>
      </div>
    );
  }

  if (showBridge && nowQuestion?.bridgeStory) {
    return (
      <div
        className={`${styles.container} ${
          isNight ? styles.nightMode : styles.dayMode
        }`}
      >
        <div className={styles.story_frame}>
          <div className={styles.bridge_content}>
            <p className={styles.bridge_text}>{nowQuestion.bridgeStory}</p>
          </div>
          <button
            className={`${styles.button1} ${styles.horror_button}`}
            onClick={() => setShowBridge(false)}
          >
            계속하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${
        isNight ? styles.nightMode : styles.dayMode
      }`}
    >
      <ProgressBar
        current={questionIndex + 1}
        total={nowTest.questions.length}
        color={isNight ? "#ff0000" : "#4CAF50"}
      />
      <div
        className={`${styles.radio_frame} ${
          isTaro ? styles.taro_frame_width : ""
        }`}
      >
        <h2 className={styles.answer_title}>{nowTest.title}</h2>
        <h3 className={styles.question_text}>
          Q{nowQuestion.questionId}. {nowQuestion.text}
        </h3>
        <div
          className={`${styles.options_container} ${
            isTaro ? styles.taro_grid : ""
          }`}
        >
          {nowQuestion.options.map((option: any) => (
            <div
              key={option.optionId}
              className={isTaro ? styles.taro_card_wrapper : ""}
              onClick={() => handleCardClick(option.optionId)}
            >
              <RadioOption
                optionId={option.optionId}
                text={option.text}
                name={`question-${nowQuestion.questionId}`}
                onChange={handleOptionChange}
                checked={selectedOption === option.optionId}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.button1} ${
          isNight ? styles.horror_button : styles.normal_button
        }`}
        disabled={!selectedOption}
        onClick={handleNextQuestion}
      >
        {questionIndex === nowTest.questions.length - 1
          ? "결과 확인하기"
          : "다음 질문"}
      </button>
    </div>
  );
}
