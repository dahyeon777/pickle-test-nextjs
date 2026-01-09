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
  const testStartId = Number(params.testStartId);

  const nowTest = (TotalDataStore as any)[theme][contentType]?.find(
    (test: any) => test.id === testStartId
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [score, setScore] = useState<any>(() =>
    isNight
      ? { R: 0, B: 0, J: 0, O: 0, C: 0 }
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
    const typeParam = searchParams.get("type") as "test" | "taro";

    if (modeParam && typeParam) {
      if (modeParam !== theme || typeParam !== contentType) {
        setMode(modeParam, typeParam);
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
    } else {
      const resultKey = getResultKey(updatedScore);
      router.push(
        `/testResult/${testStartId}/${resultKey}?mode=${theme}&type=${contentType}`
      );
    }
  }

  if (!nowTest)
    return <div className={styles.container}>테스트를 찾을 수 없습니다.</div>;
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
