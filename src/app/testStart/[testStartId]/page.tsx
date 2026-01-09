"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import RadioOption from "../../../components/RadioOption";
import ProgressBar from "../../../components/ProgressBar";
import { TotalDataStore } from "../../../allTestData"; // 정확한 경로 확인 필요
import { useThemeStore } from "@/src/store/useThemeStore";
import styles from "./page.module.css";

// --- 로직 분리: 낮 버전 일반 테스트 (MBTI) ---
function calculateDayTestResult(scores: any) {
  const E_I = (scores.E_score || 0) >= (scores.I_score || 0) ? "E" : "I";
  const S_N = (scores.S_score || 0) >= (scores.N_score || 0) ? "S" : "N";
  const T_F = (scores.T_score || 0) >= (scores.F_score || 0) ? "T" : "F";
  const J_P = (scores.J_score || 0) >= (scores.P_score || 0) ? "J" : "P";
  return E_I + S_N + T_F + J_P;
}

// --- 로직 분리: 낮 버전 타로 테스트 (수정된 부분) ---
function calculateDayTaroResult(nowQuestion: any, selectedOptionId: string) {
  // 타로는 점수 합산이 아니라 선택한 옵션의 resultKey를 그대로 사용함
  const selected = nowQuestion.options.find(
    (opt: any) => opt.optionId === selectedOptionId
  );
  return selected?.resultKey || "TARO_RESULT_1";
}

// --- 로직 분리: 밤 버전 호러 테스트 ---
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

  // 최종 결과 도출 메인 함수 (매개변수 구조 유지)
  const getResultKey = (finalScore: any) => {
    if (isNight) {
      return calculateNightHorrorResult(finalScore);
    }
    return contentType === "taro"
      ? calculateDayTaroResult(nowQuestion, selectedOption!) // 타로일 때 현재 질문과 선택값 전달
      : calculateDayTestResult(finalScore);
  };

  function handleNextQuestion() {
    if (!selectedOption || !nowQuestion) return;

    const selected = nowQuestion.options.find(
      (opt: any) => opt.optionId === selectedOption
    );
    if (!selected) return;

    // 점수 누적 로직
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

      <div className={styles.radio_frame}>
        <h2 className={styles.answer_title}>{nowTest.title}</h2>
        <h3 className={styles.question_text}>
          Q{nowQuestion.questionId}. {nowQuestion.text}
        </h3>

        <div className={styles.options_container}>
          {nowQuestion.options.map((option: any) => (
            <RadioOption
              key={option.optionId}
              optionId={option.optionId}
              text={option.text}
              name={`question-${nowQuestion.questionId}`}
              onChange={handleOptionChange}
              checked={selectedOption === option.optionId}
            />
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
