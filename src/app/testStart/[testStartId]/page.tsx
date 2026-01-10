"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import RadioOption from "../../../components/RadioOption";
import ProgressBar from "../../../components/ProgressBar";
import { TotalDataStore } from "../../../allTestData";
import { useThemeStore } from "@/src/store/useThemeStore";
import styles from "./page.module.css";

//낮 | 테스트
function calculateDayTestResult(scores: any) {
  const E_I = (scores.E_score || 0) >= (scores.I_score || 0) ? "E" : "I";
  const S_N = (scores.S_score || 0) >= (scores.N_score || 0) ? "S" : "N";
  const T_F = (scores.T_score || 0) >= (scores.F_score || 0) ? "T" : "F";
  const J_P = (scores.J_score || 0) >= (scores.P_score || 0) ? "J" : "P";
  return E_I + S_N + T_F + J_P;
}

//낮 | 타로
function calculateDayTaroResult(nowQuestion: any, selectedOptionId: string) {
  const selected = nowQuestion.options.find(
    (opt: any) => opt.optionId === selectedOptionId
  );
  return selected?.resultKey || "TARO_RESULT_1";
}

//밤 | 테스트
function calculateNightHorrorResult(scores: any) {
  const topType = Object.keys(scores).reduce((a, b) =>
    (scores[a] || 0) > (scores[b] || 0) ? a : b
  );
  return `TYPE_${topType}`;
}

function TestStartPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { theme, contentType, setMode } = useThemeStore();
  const isNight = theme === "night";
  const isTaro = contentType === "taro";
  const isBookMode = contentType === "book"; // 썰북 모드 확인
  const testStartId = Number(params.testStartId);

  const nowTest = (TotalDataStore as any)[theme][contentType]?.find(
    (test: any) => test.id === testStartId
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // --- [썰북 전용 상태 추가] ---
  const [storyPageIndex, setStoryPageIndex] = useState(0); // 도입부 썰 페이지 번호
  const [showIntro, setShowIntro] = useState(isBookMode); // 도입부를 보여줄지 여부
  const [showBridge, setShowBridge] = useState(false); // 브릿지 스토리를 보여줄지 여부

  const [score, setScore] = useState<any>(() =>
    isNight
      ? { R: 0, B: 0, J: 0, O: 0, C: 0, A: 0, E: 0, D: 0 } // 확장된 스코어 키 대응
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

  useEffect(() => {
    const modeParam = searchParams.get("mode") as "day" | "night";
    const typeParam = searchParams.get("type") as "test" | "taro" | "book";

    if (modeParam && typeParam) {
      if (modeParam !== theme || typeParam !== contentType) {
        setMode(modeParam, typeParam);
        if (typeParam === "book") setShowIntro(true);
      }
    }
  }, [searchParams, theme, contentType, setMode]);

  const nowQuestion = nowTest ? nowTest.questions[questionIndex] : null;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCardClick = (optionId: string) => {
    if (isTaro) {
      setSelectedOption(optionId);
    }
  };

  const getResultKey = (finalScore: any) => {
    if (isNight) {
      return calculateNightHorrorResult(finalScore);
    }
    return isTaro
      ? calculateDayTaroResult(nowQuestion, selectedOption!)
      : calculateDayTestResult(finalScore);
  };

  // --- [썰북 전용 핸들러] ---
  const handleNextStoryPage = () => {
    if (
      nowTest?.storyBook &&
      storyPageIndex < nowTest.storyBook.pages.length - 1
    ) {
      setStoryPageIndex(storyPageIndex + 1);
    } else {
      setShowIntro(false); // 도입부 종료 -> 첫 질문으로
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

    if (nowTest && nextIndex < nowTest.questions.length) {
      setQuestionIndex(nextIndex);
      setSelectedOption(null);

      // 다음 질문에 브릿지 스토리가 있다면 브릿지 화면 켜기
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

  if (!nowTest)
    return <div className={styles.container}>테스트를 찾을 수 없습니다.</div>;

  // --- [1. 도입부 썰북 렌더링] ---
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

  // --- [2. 중간 브릿지 스토리 렌더링] ---
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

  if (!nowQuestion) return <div className={styles.container}>로딩 중...</div>;

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

export default TestStartPage;
