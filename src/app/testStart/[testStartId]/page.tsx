"use client";
export const runtime = "edge";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import RadioOption from "../../../components/RadioOption";
import ProgressBar from "../../../components/ProgressBar";
import { AllTestQuestionsData } from "../../../TestData";
import { AllHorrorQuestionsData } from "../../../HorrorTestData";
import { useThemeStore } from "@/src/store/useThemeStore"; // 1. 스토어 임포트
import styles from "./page.module.css";

// --- 로직 분리: 결과 계산 함수들 (동일) ---
function calculateMbti(scores: any) {
  const E_I = (scores.E_score || 0) >= (scores.I_score || 0) ? "E" : "I";
  const S_N = (scores.S_score || 0) >= (scores.N_score || 0) ? "S" : "N";
  const T_F = (scores.T_score || 0) >= (scores.F_score || 0) ? "T" : "F";
  const J_P = (scores.J_score || 0) >= (scores.P_score || 0) ? "J" : "P";
  return E_I + S_N + T_F + J_P;
}

function calculateHorrorScore(scores: any) {
  const topType = Object.keys(scores).reduce((a, b) =>
    (scores[a] || 0) > (scores[b] || 0) ? a : b
  );
  return `TYPE_${topType}`;
}

function TestStartPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // 2. 스토어 상태 및 테마 설정 함수 가져오기
  const { isHorror, setTheme } = useThemeStore();

  const testStartId = Number(params.testStartId);

  // 3. 스토어 상태에 따른 질문 데이터 선택
  const currentQuestionsData = isHorror
    ? AllHorrorQuestionsData
    : AllTestQuestionsData;
  const nowTest = currentQuestionsData.find((test) => test.id === testStartId);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 4. 초기 점수 상태 설정 (isHorror 기준)
  const [score, setScore] = useState<any>(() =>
    isHorror
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

  // URL 파라미터와 스토어 강제 동기화 (직접 링크 유입 대비)
  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "horror" && !isHorror) setTheme("horror");
    if (modeParam === "normal" && isHorror) setTheme("normal");
  }, [searchParams, isHorror, setTheme]);

  const nowQuestion = nowTest ? nowTest.questions[questionIndex] : null;

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  function nextquestion() {
    if (!selectedOption || !nowQuestion) return;

    const selected = nowQuestion.options.find(
      (opt) => opt.optionId === selectedOption
    );
    if (!selected || !selected.score) return;

    const currentScore = { ...score };
    for (const key in selected.score) {
      currentScore[key] = (currentScore[key] || 0) + selected.score[key];
    }
    setScore(currentScore);

    const nextIndex = questionIndex + 1;

    if (nowTest && nextIndex < nowTest.questions.length) {
      setQuestionIndex(nextIndex);
      setSelectedOption(null);
    } else {
      const finalResult = isHorror
        ? calculateHorrorScore(currentScore)
        : calculateMbti(currentScore);
      // 결과 페이지로 이동 시에도 현재 스토어 상태 전달
      router.push(
        `/testResult/${testStartId}/${finalResult}?mode=${
          isHorror ? "horror" : "normal"
        }`
      );
    }
  }

  if (!nowTest)
    return <div className={styles.container}>테스트를 찾을 수 없습니다.</div>;
  if (!nowQuestion) return <div className={styles.container}>로딩 중...</div>;

  return (
    <div className={`${styles.container} ${isHorror ? styles.nightMode : ""}`}>
      <ProgressBar
        current={questionIndex + 1}
        total={nowTest.questions.length}
        color={isHorror ? "#ff0000" : "#4CAF50"}
      />
      <div className={styles.radio_frame}>
        <h2 className={styles.answer_title}>{nowTest.title}</h2>
        <h3 className={styles.question_text}>
          Q{nowQuestion.questionId}. {nowQuestion.text}
        </h3>

        <div className={styles.options_container}>
          {nowQuestion.options.map((option) => (
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
          isHorror ? styles.horror_button : styles.normal_button
        }`}
        disabled={!selectedOption}
        onClick={nextquestion}
      >
        {questionIndex === nowTest.questions.length - 1
          ? "결과 확인하기"
          : "다음 질문"}
      </button>
    </div>
  );
}

export default TestStartPage;
