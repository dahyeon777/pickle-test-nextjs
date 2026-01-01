"use client";
export const runtime = "edge";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import RadioOption from "../../../components/RadioOption";
import ProgressBar from "../../../components/ProgressBar";
import { AllTestQuestionsData } from "../../../TestData";
import { AllHorrorQuestionsData } from "../../../HorrorTestData";
import styles from "./page.module.css";

// --- 1. 로직 분리: 결과 계산 함수들 ---

// 일반 모드: MBTI 계산 로직
function calculateMbti(scores: any) {
  const E_I = (scores.E_score || 0) >= (scores.I_score || 0) ? "E" : "I";
  const S_N = (scores.S_score || 0) >= (scores.N_score || 0) ? "S" : "N";
  const T_F = (scores.T_score || 0) >= (scores.F_score || 0) ? "T" : "F";
  const J_P = (scores.J_score || 0) >= (scores.P_score || 0) ? "J" : "P";
  return E_I + S_N + T_F + J_P;
}

// 호러 모드: 가장 높은 가중치를 가진 타입을 TYPE_X 형태로 반환
function calculateHorrorScore(scores: any) {
  // scores에 담긴 키(R, B, J, O, C) 중 가장 값이 큰 키를 찾습니다.
  const topType = Object.keys(scores).reduce((a, b) =>
    (scores[a] || 0) > (scores[b] || 0) ? a : b
  );

  // 결과 페이지에서 HorrorTestData의 results 객체와 매칭하기 위해 TYPE_를 붙여줍니다.
  return `TYPE_${topType}`;
}

function TestStartPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "normal";
  const isHorrorMode = mode === "horror";
  const testStartId = Number(params.testStartId);

  const currentQuestionsData = isHorrorMode
    ? AllHorrorQuestionsData
    : AllTestQuestionsData;
  const nowTest = currentQuestionsData.find((test) => test.id === testStartId);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // 초기 점수 상태 설정
  const [score, setScore] = useState<any>(
    isHorrorMode
      ? { R: 0, B: 0, J: 0, O: 0, C: 0 } // 호러 가중치 키셋
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

    // 점수 업데이트 (기존 score 객체를 복사하여 선택된 옵션의 score를 더함)
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
      // 결과 산출
      const finalResult = isHorrorMode
        ? calculateHorrorScore(currentScore)
        : calculateMbti(currentScore);

      router.push(`/testResult/${testStartId}/${finalResult}?mode=${mode}`);
    }
  }

  if (!nowTest)
    return <div className={styles.container}>테스트를 찾을 수 없습니다.</div>;
  if (!nowQuestion) return <div className={styles.container}>로딩 중...</div>;

  return (
    <div
      className={`${styles.container} ${isHorrorMode ? styles.nightMode : ""}`}
    >
      <ProgressBar
        current={questionIndex + 1}
        total={nowTest.questions.length}
        color={isHorrorMode ? "#ff0000" : "#4CAF50"}
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
        className={`${styles.button1} ${isHorrorMode ? styles.horror_button : styles.normal_button}`}
        disabled={!selectedOption}
        onClick={nextquestion}
      >
        {questionIndex === nowTest.questions.length - 1 ? "결과 확인하기" : "다음 질문"}
      </button>
    </div>
  );
}

export default TestStartPage;


